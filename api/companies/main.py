import firebase_admin
from firebase_admin import db
import flask

firebase_admin.initialize_app(options={
    'databaseURL': 'https://more-health.firebaseio.com/',
})

COMPANIES = db.reference('companies')

def __get_company_by_id(id):
    return COMPANIES.child(id).get()


def create_company(request):
    req = request.json
    company = COMPANIES.push(req)
    return flask.jsonify({'id': company.key}), 201


def get_all_companies():
    companies = COMPANIES.get()
    if not companies:
        return 'No companies found', 404
    companies = [company for company in companies.values()]
    return flask.jsonify(companies)


def get_company(id):
    company = __get_company_by_id(id)
    if not company:
        return 'Company not found', 404
    return flask.jsonify(company)


def delete_company(id):
    company = __get_company_by_id(id)
    if not company:
        return 'Company not found', 404
    COMPANIES.child(id).delete()
    return flask.jsonify({'success': True})


def update_company(id, request):
    company = __get_company_by_id(id)
    if not company:
        return 'Company not found', 404
    req = request.json
    COMPANIES.child(id).update(req)
    return flask.jsonify({'success': True})


def companies(request):
    if request.path == '/' or request.path == '':
        if request.method == 'POST':
            return create_company(request)
        elif request.method == 'GET':
            return get_all_companies()
        else:
            return 'Method not supported', 405
    if request.path.startswith('/'):
        id = request.path.lstrip('/')
        if request.method == 'GET':
            return get_company(id)
        elif request.method == 'DELETE':
            return delete_company(id)
        elif request.method == 'PUT':
            return update_company(id, request)
        else:
            return 'Method not supported', 405
    return 'URL not found', 404