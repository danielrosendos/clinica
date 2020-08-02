from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_delete, post_save

from .BaseModel import Base
from .AgendaModel import Agenda
from .HorarioModel import Horario


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

@receiver(post_save, sender=Consulta)
def marcar_horario_como_indisponivel(sender, instance, created, **kwargs):
    if created:
        (
            Horario
            .objects
            .filter(agenda__dia=instance.dia, horario=instance.horario)
            .update(disponivel=False)
        )

@receiver(post_delete, sender=Consulta)
def marcar_horario_como_disponivel(sender, instance, **kwargs):
    (
        Horario
        .objects
        .filter(agenda__dia=instance.dia, horario=instance.horario)
        .update(disponivel=True)
    )