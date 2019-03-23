import firebase_admin
from firebase_admin import db
import flask

firebase_admin.initialize_app(options={
    'databaseURL': 'https://more-health.firebaseio.com/',
})

COUPONS = db.reference('coupons')

def __get_coupon_by_id(id):
    return COUPONS.child(id).get()

def create_coupon(request):
    req = request.json
    user = COUPONS.push(req)
    return flask.jsonify({'id': user.key}), 201


def get_all_coupons():
    coupons = COUPONS.get()
    if not coupons:
        return 'No coupons found', 404
    coupons = [coupon for coupons in coupons.values()]
    return flask.jsonify(coupons)


def get_coupon(id):
    coupon = __get_coupon_by_id(id)
    if not coupon:
        return 'Coupon not found', 404
    return flask.jsonify(coupon)


def delete_coupon(id):
    uscouponer = __get_coupon_by_id(id)
    if not coupon:
        return 'Coupon not found', 404
    COUPONS.child(id).delete()
    return flask.jsonify({'success': True})


def update_coupon(id, request):
    user = __get_coupon_by_id(id)
    if not coupon:
        return 'Coupon not found', 404
    req = request.json
    COUPONS.child(id).update(req)
    return flask.jsonify({'success': True})



def coupons(request):
    if request.path == '/' or request.path == '':
        if request.method == 'POST':
            return create_coupon(request)
        elif request.method == 'GET':
            return get_all_coupons()
        else:
            return 'Method not supported', 405
    if request.path.startswith('/'):
        id = request.path.lstrip('/')
        if request.method == 'GET':
            return get_coupon(id)
        elif request.method == 'DELETE':
            return delete_coupon(id)
        elif request.method == 'PUT':
            return update_coupon(id, request)
        else:
            return 'Method not supported', 405
    return 'URL not found', 404
