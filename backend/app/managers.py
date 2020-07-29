from datetime import date, datetime

from django.db import models
from django.db.models import Case, Exists, OuterRef, Prefetch, Q, Value, When

class AgendaQuerySet(models.QuerySet):

    def prefetch_horarios_disponiveis(self):
        from .Models.HorarioModel import Horario

        diaAtual = date.today()
        horaAtual = datetime.now().strftime('%H:%M')

        horarios_disponiveis = (
            Horario
            .objects
            .filter(
                disponivel=True,
                horario__gte=Case(
                    When(
                        Q(agenda__dia=diaAtual), then=Value(horaAtual)
                    ),
                    default=Value('00:00')
                )
            )
        )

        return self.prefetch_related(
            Prefetch('horarios', queryset=horarios_disponiveis, to_attr='horarios_disponiveis')
        )


class AgendaDisponivelManager(models.Manager):
    
    def get_queryset(self):
        from .Models.HorarioModel import Horario

        diaAtual = date.today()
        horaAtual = datetime.now().strftime('%H:%M')

        horarios = (
            Horario
            .objects
            .filter(
                agenda=OuterRef('pk'),
                disponivel=True,
                horario__gte=Case(
                    When(
                        Q(agenda__dia=diaAtual), then=Value(horaAtual)
                    ),
                    default=Value('00:00')
                )
            )
        )

        return super().get_queryset().filter(dia__gte=date.today()).filter(Exists(horarios))