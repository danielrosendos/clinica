from rest_framework.filters import BaseFilterBackend

class MedicoFilter(BaseFilterBackend):

     def filter_queryset(self, request, queryset, view):
        especialidades = request.query_params.getlist("especialidade")

        if especialidades:
            return queryset.filter(especialidade__id__in=especialidades)
            
        return queryset