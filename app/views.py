from django.shortcuts import render, redirect
from django.contrib import auth
from django.shortcuts import render
from .forms import ImageForm
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf
import matplotlib.pyplot as plt
from django.http import HttpResponse, response
import json
import os
from django.core.files.storage import FileSystemStorage
from .models import *
from django.contrib import messages
from django.http import HttpResponse
from django.http import HttpResponseRedirect, JsonResponse
import shutil
from django.template import loader
from django.core.serializers import serialize
from django.http import FileResponse
from django.template.loader import get_template
from io import BytesIO
from csv import writer

from tensorflow.keras.preprocessing import image

output_class = ["batteries", "clothes", "e-waste", "glass", "light blubs", "metal", "organic", "paper", "plastic"]


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


def waste_prediction(new_image):
    model = load_model("C:\\Users\\anith\\OneDrive\\Desktop\\projectk\\project10\\static\\classifyWaste.h5")
    test_image = image.load_img(new_image, target_size=(224, 224))
    #plt.axis("off")
    #plt.imshow(test_image)
    #plt.show()

    test_image = image.img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)

    predicted_array = model.predict(test_image)
    predicted_value = output_class[np.argmax(predicted_array)]
    predicted_accuracy = round(np.max(predicted_array) * 100, 2)

    return str(predicted_value)


def up(request):
    return render(request, "upload_lite.html")

def classify(request):
    #txt = waste_prediction("C:\\Users\\julia\\Documents\\Uni\\09_Semester\\temp\\project_anitha\\staticfiles\\images\\
    txt = waste_prediction("C:\\Users\\anith\\OneDrive\\Desktop\\projectk\\project10\\static\\images\\test.jpg")
    List = [str( request.GET.get('loc', '')), str(txt)]
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
            form.save()
            # Get the current instance object to display in the template
            img_obj = form.instance
            return render(request, '', {'form': form, 'img_obj': img_obj})
    else:
        form = ImageForm()
        return render(request, '', {'form': form})
