import flask
from main import companies
import os


app = flask.Flask('functions')
methods = ['GET', 'POST', 'PUT', 'DELETE']

@app.route('/companies', methods=methods)
@app.route('/users/<path>', methods=methods)
def catch_all(path=''):
    p = os.environ
    flask.request.path = '/' + path
    return companies(flask.request)


if __name__ == '__main__':
    app.run()