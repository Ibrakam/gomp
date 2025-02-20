from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request, 'index.html')


import os
from django.http import FileResponse, Http404
from django.conf import settings


def download_media_file(request, file_name):
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)

    if os.path.exists(file_path):
        response = FileResponse(open(file_path, 'rb'), as_attachment=True)
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
        return response
    else:
        raise Http404("Файл не найден")
