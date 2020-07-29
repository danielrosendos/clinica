from django.contrib import admin

from .Models.MedicoModel import Medico
from .Models.EspecialidadeModel import Especialidade
from .Models.AgendaModel import Agenda
from .Models.HorarioModel import Horario
from .Models.ConsultaModel import Consulta


class Horarios(admin.TabularInline):   
    model = Horario


@admin.register(Especialidade)
class EspecialidadeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', )


@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'crm', 'email', 'telefone', 'especialidade')


@admin.register(Agenda)
class AgendaAdmin(admin.ModelAdmin):
    list_display = ('id', 'medico', 'dia')
    inlines = (Horarios,)


@admin.register(Consulta)
class ConsultaAdmin(admin.ModelAdmin):
    list_display = ('id', 'agenda', 'horario', 'datado_do_agendamento', 'user')
