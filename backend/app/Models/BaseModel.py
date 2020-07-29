from django.db import models

class Base(models.Model):
    created_at = models.DateField(auto_now=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        abstract = True