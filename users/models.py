import os
import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):

    def profile_pic_path(self, filename):

        if filename != 'nopic.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'profile_pics/{userid}/{basename}_{randomstring}{ext}'.format(
                userid=self.pk, basename=basefilename, randomstring=randomstr,
                ext=file_extension)
    username = None
    email = models.EmailField(verbose_name=_('Email Address'), unique=True)
    mobile = models.BigIntegerField(null=True)
    gender = models.CharField(max_length=10,
                              choices=[('Male', 'Male'), ('Female', 'Female'),
                                       ('Other', 'Other')])
    city = models.CharField(max_length=500)
    state = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    language = models.CharField(max_length=100)
    facebook = models.CharField(max_length=500, blank=True)
    instagram = models.CharField(max_length=500, blank=True)
    twitter = models.CharField(max_length=500, blank=True)

    profile_pic = models.ImageField(default='nopic.jpg',
                                    upload_to=profile_pic_path)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    class Meta:

        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email
