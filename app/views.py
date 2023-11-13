import numpy as np
import os
from csv import writer
from datetime import datetime
from django.contrib import auth
from django.shortcuts import redirect
from django.shortcuts import render
from os import listdir
from os.path import isfile, join
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from .forms import ImageForm

# path_media = "C:\\Users\\julia\Documents\\Uni\\09_Semester\\temp\\project_anitha\\media\\images"
# path_model = "C:\\Users\\julia\\Documents\\Uni\\09_Semester\\temp\\project_anitha\\classifyWaste.h5"
path_media = "C:\\Users\\anith\\OneDrive\\Desktop\\projectk\\project10\\media\\images"
path_model = "C:\\Users\\anith\\OneDrive\\Desktop\\projectk\\project10\\static\\classifyWaste.h5"

output_class = ["batteries", "clothes", "e-waste", "glass", "light blubs", "metal", "organic", "paper", "plastic"]
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Create your views here.

def login(request):
    if request.method == 'POST':
        user = auth.authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('landing/')
        else:
            return render(request, 'account/login.html', {'error': 'Username or password is incorrect!'})
    else:
        return render(request, 'account/login.html')


def landing(request):
    return render(request, "landingPage.html")

def dashboard(request):
    return render(request, "dashboard.html")

def waste_prediction():
    files = [f for f in listdir(path_media) if isfile(join(path_media, f))]
    if len(files) == 0:
        return -1
    model = load_model(path_model)
    test_image = image.load_img(path_media + "/" + files[0], target_size=(224, 224))
    for f in os.listdir(path_media):
        os.remove(os.path.join(path_media, f))

    test_image = image.img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)

    predicted_array = model.predict(test_image)
    predicted_value = output_class[np.argmax(predicted_array)]
    predicted_accuracy = round(np.max(predicted_array) * 100, 2)

    return str(predicted_value)


def classify(request):
    txt = waste_prediction()
    if txt == -1:
        return image_upload_view(request)
    List = [str(request.GET.get('loc', '')), str(txt), datetime.now().strftime("%Y-%m-%d %H:%M:%S")]
    with open('waste.csv', 'a', newline='') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow(List)
    return render(request, "materials/" + txt + ".html")


def image_upload_view(request):
    """Process images uploaded by users"""
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.title = "Test.png"
            pic = form.save()
            # Get the current instance object to display in the template
            img_obj = form.instance
            return render(request, 'upload_lite.html', {'form': form, 'img_obj': img_obj})
    else:
        form = ImageForm()
        return render(request, 'upload_lite.html', {'form': form})
