import flask
from main import users
import os


app = flask.Flask('functions')
methods = ['GET', 'POST', 'PUT', 'DELETE']

@app.route('/users', methods=methods)
@app.route('/users/<path>', methods=methods)
def catch_all(path=''):
    p = os.environ
    flask.request.path = '/' + path
    return users(flask.request)


if __name__ == '__main__':
    app.run()