from datetime import date, datetime
from rest_framework.filters import BaseFilterBackend
from django.db.models import Case, Q, Value, When

class ConsultasFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        diaAtual = date.today()
        horaAtual = datetime.now().strftime('%H:%M')

        return queryset.filter(
            user=request.user,
            dia__gte=date.today(),
            horario__gte=Case(
                When(
                    Q(agenda__dia=diaAtual), then=Value(horaAtual)
                ),
                default=Value('00:00')
            )
        )