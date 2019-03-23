import flask

def __import_digime_data(request):
    return 'Here digi.me data should be imported.'

def digime_data(request):
    if request.path == '/' or request.path == '':
        if request.method == 'POST':
            return __import_digime_data(request)
        else:
            return 'Method not supported', 405
    return 'URL not found', 404