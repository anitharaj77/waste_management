from django.shortcuts import redirect
from django.contrib import auth
from django.shortcuts import render
from os import listdir
from os.path import isfile, join
from project10 import settings
from .forms import ImageForm
import numpy as np
from tensorflow.keras.models import load_model
import json
from django.http import HttpResponseRedirect, JsonResponse
from django.template import loader
from django.core.serializers import serialize
from io import BytesIO
from csv import writer
from os import walk
import os
from tensorflow.keras.preprocessing import image

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


def waste_prediction():
    path = "C:\\Users\\julia\Documents\\Uni\\09_Semester\\temp\\project_anitha\\media\\images"
    files = [f for f in listdir(path) if isfile(join(path, f))]
    model = load_model("C:\\Users\\julia\\Documents\\Uni\\09_Semester\\temp\\project_anitha\\classifyWaste.h5")
    test_image = image.load_img(path + "/" + files[0], target_size=(224, 224))
    for f in os.listdir(path):
        os.remove(os.path.join(path, f))
    # plt.axis("off")
    # plt.imshow(test_image)
    # plt.show()

    test_image = image.img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)

    predicted_array = model.predict(test_image)
    predicted_value = output_class[np.argmax(predicted_array)]
    predicted_accuracy = round(np.max(predicted_array) * 100, 2)

    return str(predicted_value)


def classify(request):
    txt = waste_prediction()
    # txt = waste_prediction("C:\\Users\\anith\\OneDrive\\Desktop\\projectk\\project10\\static\\images\\test.jpg")
    List = [str(request.GET.get('loc', '')), str(txt)]
    with open('waste.csv', 'a') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow(List)
        f_object.close()
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
