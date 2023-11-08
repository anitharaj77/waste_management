from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class userlogin(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

from django.db import models
class Image(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images')
    def __str__(self):
        return self.title