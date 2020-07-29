from django.db import models
from django.contrib.auth.models import User

from .BaseModel import Base
from .AgendaModel import Agenda


class Consulta(Base):
    dia = models.DateField()

    agenda = models.ForeignKey(Agenda, related_name="agenda", on_delete=models.CASCADE)

    horario = models.TimeField()

    datado_do_agendamento = models.DateTimeField(auto_now=True, editable=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Consulta'
        verbose_name_plural = 'Consultas'
        ordering = ['dia', 'horario']

    def __str__(self):
        return self.datado_do_agendamento.strftime("%H:%M")