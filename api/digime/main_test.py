import flask
from main import digime


app = flask.Flask('functions')
methods = ['POST']

@app.route('/digime', methods=methods)
@app.route('/digime/<path>', methods=methods)
def catch_all(path=''):
    flask.request.path = '/' + path
    return digime(flask.request)


if __name__ == '__main__':
    app.run()
