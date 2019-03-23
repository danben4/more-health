import json
import os
from datetime import datetime
import firebase_admin
from firebase_admin import db
import flask


firebase_admin.initialize_app(options={
    'databaseURL': 'https://more-health.firebaseio.com/',
})

USERS = db.reference('users')


def __get_user_by_id(id):
    return USERS.child(id).get()


def __sync_digime(request):
    req = request.json
    file_index = req['fileId']
    run_cat_name = 'Run'
    count_cat_name = 'Count'
    # Find the correct user
    id = request.path.lstrip('/')
    user = __get_user_by_id(id)
    if not user:
        return 'No user found', 404
    goal_list = user['usergoals']
    for key, goal in goal_list.items():
        cat = goal['category']
        goal_start = datetime.strptime(goal['startDate'], '%d/%m/%Y')
        goal_end = datetime.strptime(goal['endDate'], '%d/%m/%Y')
        increment = run_cat_name if cat == 'Run' else count_cat_name
        root = 'data'
        total = 0
        goal_total = goal['total']
        if increment == run_cat_name:
            goal_total *= 1000   # converts to KM from M

        all_files = ['demo1.json', 'demo2.json', 'demo3.json']
        file = all_files[file_index]
        try:
            with open(os.path.join(root, file), encoding='utf-8') as f:
                data = json.load(f)
                if data['fileDescriptor']['serviceName'] == 'fitbit':
                    for file_data in data['fileData']:
                        ts = int(file_data["createddate"] / 1000)
                        stamp = datetime.utcfromtimestamp(ts)  # .strftime('%Y-%m-%d %H:%M:%S')
                        if goal_start <= stamp <= goal_end:
                            activity_name = file_data["activityname"]
                            # Found activity that matches the current goal
                            steps = file_data["steps"]
                            calories = file_data["calories"]
                            distance = file_data["distance"]
                            if increment == activity_name == "Run":
                                total += distance
                            elif increment == "Count" and activity_name != "Run":
                                total += 1
        except Exception as e:
            print(str(e))
            pass
        goal_completed = total > goal_total
        goal_ratio = 1 if goal_completed else total / goal_total
        user['usergoals'][key]['totalCompleted'] = goal_ratio
        user['usergoals'][key]['isComplete'] = goal_completed
    USERS.child(id).update(user)
    # TODO update user object and post it
    return flask.jsonify({"success": True})


def digime(request):
    if request.method == 'POST':
        return __sync_digime(request)
    else:
        return 'Method not supported', 405
