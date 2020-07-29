from django.db import models

from .BaseModel import Base
from .AgendaModel import Agenda

class Horario(Base):
    agenda = models.ForeignKey(Agenda, related_name='horarios', on_delete=models.PROTECT)

    horario = models.TimeField()
    
    disponivel = models.BooleanField('disponível', default=True, editable=False)

    class Meta:
        verbose_name = 'Horario'
        verbose_name_plural = 'Horarios'
        unique_together = ['agenda', 'horario']
        ordering = ['horario']

    def __str__(self):
        return self.horario.strftime('%H:%M')