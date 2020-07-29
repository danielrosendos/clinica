from django.db import models

from .BaseModel import Base

class Especialidade(Base):
    nome = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name = 'Especialidade'
        verbose_name_plural = 'Especialidades'
        ordering = ['id']

    def __str__(self):
        return self.nome