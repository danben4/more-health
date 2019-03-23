import firebase_admin
from firebase_admin import db
import flask

firebase_admin.initialize_app(options={
    'databaseURL': 'https://more-health.firebaseio.com/',
})

USERS = db.reference('users')


def __get_user_by_id(id):
    return USERS.child(id).get()


def create_user(request):
    req = request.json
    user = USERS.push(req)
    return flask.jsonify({'id': user.key}), 201


def get_all_users():
    users = USERS.get()
    if not users:
        return 'No users found', 404
    users = [user for user in users.values()]
    return flask.jsonify(users)


def get_user(id):
    user = __get_user_by_id(id)
    if not user:
        return 'User not found', 404
    return flask.jsonify(user)


def delete_user(id):
    user = __get_user_by_id(id)
    if not user:
        return 'User not found', 404
    USERS.child(id).delete()
    return flask.jsonify({'success': True})


def update_user(id, request):
    user = __get_user_by_id(id)
    if not user:
        return 'User not found', 404
    req = request.json
    USERS.child(id).update(req)
    return flask.jsonify({'success': True})



def users(request):
    if request.path == '/' or request.path == '':
        if request.method == 'POST':
            return create_user(request)
        elif request.method == 'GET':
            return get_all_users()
        else:
            return 'Method not supported', 405
    if request.path.startswith('/'):
        id = request.path.lstrip('/')
        if request.method == 'GET':
            return get_user(id)
        elif request.method == 'DELETE':
            return delete_user(id)
        elif request.method == 'PUT':
            return update_user(id, request)
        else:
            return 'Method not supported', 405
    return 'URL not found', 404
