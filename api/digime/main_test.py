import flask
from main import digime_data
import os


app = flask.Flask('functions')
methods = ['POST']

@app.route('/digime', methods=methods)
@app.route('/digime/<path>', methods=methods)
def catch_all(path=''):
    flask.request.path = '/' + path
    return digime_data(flask.request)


if __name__ == '__main__':
    app.run()