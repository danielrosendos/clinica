from django.db import models
from datetime import date, datetime
from django.core.exceptions import ValidationError

from .BaseModel import Base
from .MedicoModel import Medico

from ..managers import AgendaDisponivelManager, AgendaQuerySet

def validar_data_de_Agendamento(value):
    diaDeHoje = date.today()
    if (value < diaDeHoje):
        raise ValidationError('A Data Não pode Ser Menor Que a Data Atual')



class Agenda(Base):
    medico = models.ForeignKey(Medico, related_name='medico', on_delete=models.CASCADE)
    
    dia = models.DateField(validators=[validar_data_de_Agendamento])

    objects = models.Manager()

    disponivel = AgendaDisponivelManager.from_queryset(AgendaQuerySet)()

    class Meta:
        verbose_name = 'Agenda'
        verbose_name_plural = 'Agendas'
        unique_together = ['medico', 'dia']
        ordering = ['dia']

    def __str__(self):
        return self.dia.strftime("%d/%m/%Y")