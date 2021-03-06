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
    distance_categories = ['Run', 'Cycling']
    count_categories = ['Workout']
    # Find the correct user
    id = request.path.lstrip('/')
    user = __get_user_by_id(id)
    if not user:
        return 'No user found', 404
    __add_user_recent_activities(USERS.child(id), file_index)
    goal_list = user['usergoals']
    for key, goal in goal_list.items():
        cat = goal['category']
        goal_start = goal['startDate']
        goal_end = goal['endDate']
        root = 'data'
        total = 0
        goal_total = goal['total']
        if cat in distance_categories:
            goal_total *= 1000   # converts to KM from M

        all_files = ['demo0.json', 'demo.json']
        file = all_files[file_index]
        try:
            with open(os.path.join(root, file), encoding='utf-8') as f:
                data = json.load(f)
                if data['fileDescriptor']['serviceName'] == 'fitbit':
                    for file_data in data['fileData']:
                        ts = int(file_data["createddate"] / 1000)
                        if goal_start <= ts <= goal_end:
                            activity_name = file_data["activityname"]
                            # Found activity that matches the current goal
                            steps = file_data["steps"]
                            calories = file_data["calories"]
                            distance = file_data["distance"]
                            if activity_name in distance_categories and cat in distance_categories:
                                total += distance
                            elif activity_name in count_categories and cat in count_categories:
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


def __add_user_recent_activities(user, file_index):
    all_files = ['demo0.json', 'demo.json']
    file = all_files[file_index]
    activities_ref = user.child('useractivities')
    activities_ref.delete()
    try:
        with open(os.path.join('data', file), encoding='utf-8') as f:
            data = json.load(f)
            if data['fileDescriptor']['serviceName'] == 'fitbit':
                for file_data in data['fileData']:
                    ts = int(file_data["createddate"])
                    activity = {}
                    activity['date'] = ts
                    activity['category'] = file_data["activityname"]
                    activity['calories'] = file_data["calories"]
                    activity['distance'] = file_data["distance"]
                    activities_ref.push(activity)
    except Exception as e:
        print(str(e))
        pass


def digime(request):
    if request.method == 'POST':
        return __sync_digime(request)
    else:
        return 'Method not supported', 405
