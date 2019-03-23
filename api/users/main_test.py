import flask
from main import users


app = flask.Flask('functions')
methods = ['GET', 'POST', 'PUT', 'DELETE']

@app.route('/users', methods=methods)
@app.route('/users/<path>', methods=methods)
@app.route('/users/<path>/usergoals', methods=methods)
@app.route('/users/<path>/usergoals/<goalid>', methods=methods)
def catch_all(path='', goalid=''):
    flask.request.path = '/' + path
    return users(flask.request)


if __name__ == '__main__':
    app.run()