import flask

def __sync_digime_data(request):
    return 'Here we can sync digi.me data'

def digime_data(request):
    if request.path == '/' or request.path == '':
        if request.method == 'POST':
            return __sync_digime_data(request)
        else:
            return 'Method not supported', 405
    return 'URL not found', 404