from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator

from .BaseModel import Base
from .EspecialidadeModel import Especialidade

class Medico(Base):
    nome = models.CharField(max_length=255)

    crm = models.CharField(max_length=255, validators=[RegexValidator(
                                regex='^[0-9]*$',
                                message='Crm Deve Ser Conter Apenas Números',
                                code='invalid_crm'
                            ),], unique=True)

    email = models.EmailField(null=True, blank=True, unique=True)

    telefone = models.CharField(max_length=255, null=True, blank=True,  validators=[RegexValidator(
                                regex='^[0-9]*$',
                                message='Telefone Deve Ser Conter Apenas Números',
                                code='invalid_telefone'
                            ),], unique=True)
                            
    especialidade = models.ForeignKey(Especialidade, null=True, blank=True, related_name='especialidade', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Médico'
        verbose_name_plural = 'Médicos'
        unique_together = ['email', 'crm']
        ordering = ['id']

    def __str__(self):
        return self.nome
