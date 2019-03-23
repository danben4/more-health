import flask
from main import coupons
import os


app = flask.Flask('functions')
methods = ['GET', 'POST', 'PUT', 'DELETE']

@app.route('/coupons', methods=methods)
@app.route('/coupons/<path>', methods=methods)
def catch_all(path=''):
    p = os.environ
    flask.request.path = '/' + path
    return coupons(flask.request)


if __name__ == '__main__':
    app.run()