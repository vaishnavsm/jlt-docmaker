from django.db import models
from django.contrib.auth.models import User
import json
import os

def content_file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s_%s.%s" % (instance.name, instance.version, ext)
    return os.path.join('media',os.path.join('templates', filename))
# Create your models here.
class Template(models.Model):
    name = models.TextField(default = "")
    category = models.TextField(default = "")
    security_level = models.IntegerField(default = 0)
    security_labels = models.TextField(default = "[]")
    version = models.IntegerField(default = 0)
    doc = models.FileField(upload_to=content_file_name)
    authorised = models.BooleanField(default = False)
    def dominates(self, obj):
        if int(self.security_level) > int(obj.security_level): 
            # print("Security Level Fail")
            return False
        if not set(json.loads(obj.security_labels)).issubset(set(json.loads(self.security_labels))):
            # print("Security Label Fail: %s vs %s"%(json.loads(obj.security_labels), json.loads(self.security_labels)))
            return False
        return True
    def __str__(self):
        return self.name
    

class UserClass(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, null = False)
    security_level = models.IntegerField(default = 10000)
    security_labels = models.TextField(default = "[]")
    has_admin = models.BooleanField(default = False)
    def dominates(self, obj):
        if int(self.security_level) > int(obj.security_level):  
            # print("Security Level Fail")
            return False
        if not set(json.loads(obj.security_labels)).issubset(set(json.loads(self.security_labels))):
            # print("Security Label Fail: %s vs %s"%(json.loads(obj.security_labels), json.loads(self.security_labels)))
            return False
        return True
    def __str__(self):
        return "User %s"%(self.user.username,)

class LogEntry(models.Model):
    actor = models.ForeignKey(UserClass, on_delete=models.CASCADE)
    action = models.TextField(default = "")
    def __str__(self):
        return "%s did %s"%(self.actor, self.action)
    