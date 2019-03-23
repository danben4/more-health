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


def __import_digime_data(request):
    run_cat_name = 'Walk'
    count_cat_name = 'Count'
    # Find the correct user
    id = request.path.lstrip('/')
    user = __get_user_by_id(id)
    if not user:
        return 'No user found', 404
    goal_list = user['usergoals']
    for key, goal in goal_list.items():
        cat = goal['category']
        goal_start = datetime.strptime(goal['startDate'], '%M/%d/%Y')
        goal_end = datetime.strptime(goal['endDate'], '%M/%d/%Y')
        increment = run_cat_name if cat == 'run' else count_cat_name
        root = 'data'
        total = 0
        goal_total = goal['total']
        if increment == 'run':
            goal_total *= 1000   # converts to KM from M
        for file in os.listdir(root):
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
                                total += distance if increment == run_cat_name else 1
            except Exception:
                pass
        goal_completed = total > goal_total
        goal_ratio = 1 if goal_completed else total / goal_total
        user['usergoals'][key]['totalCompleted'] = goal_ratio
        user['usergoals'][key]['isComplete'] = goal_completed
    USERS.child(id).update(user)
    # TODO update user object and post it
    return flask.jsonify({"success": True})




    return 'Here digi.me data should be imported.'


def digime_data(request):
    if request.method == 'POST':
        return __import_digime_data(request)
    else:
        return 'Method not supported', 405
    return 'URL not found', 404

#
#
# import os
# import json
# from datetime import datetime
#
# if __name__ == '__main__':
#     good_files = [
#         '18_1_3_7_1_D201710_1.json',
#         '18_1_3_7_2_D201801_1.json',
#         '18_4_18_3_300_D201802_1.json',
#         '18_1_3_7_2_D201710_1.json',
#         '18_1_3_7_1_D201801_1.json',
#         '18_4_18_3_300_D201804_1.json',
#         '18_4_18_3_300_D201711_1.json',
#         '18_4_18_3_300_D201801_1.json',
#         '18_4_18_3_300_D201803_1.json',
#         '18_4_18_3_300_D201712_1.json',
#     ]
#     root = 'data'
#     for file in os.listdir(root):
#         if file not in good_files:
#             continue
#         with open(os.path.join(root, file), encoding='utf-8') as f:
#             data = json.load(f)
#             if data['fileDescriptor']['serviceName'] == 'fitbit':
#                 for file_data in data['fileData']:
#                     ts = int(file_data["createddate"] / 1000)
#                     stamp = datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
#                     print("Date: {} -- Calories: {} -- Steps: {} -- Activity name: {}".format(stamp, file_data["calories"], file_data["steps"], file_data["activityname"]))
#                     print('lol')

