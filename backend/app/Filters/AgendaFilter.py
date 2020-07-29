from rest_framework.filters import BaseFilterBackend

class AgendasFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        medico = request.query_params.getlist("medico")
        especialides = request.query_params.getlist("especialidade")
        data_inicio = request.query_params.get("data_inicio", None)
        data_fim = request.query_params.get("data_final", None)

        agendas = queryset.filter(
            medico__in=medico,
            medico__especialidade__id__in=especialides,
        )

        if data_inicio and data_fim:
            agendas = agendas.filter(dia__range=[data_inicio, data_fim])

        return agendas