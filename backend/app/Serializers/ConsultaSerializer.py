from datetime import date
from rest_framework import serializers

from ..Models.AgendaModel import Agenda
from ..Models.ConsultaModel import Consulta

from ..Serializers.MedicosSerializer import MedicoSerializer

from ..validators import Validators


class getDefaultUser:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user

class ConsultaSerializer(serializers.ModelSerializer):

    id_agenda = serializers.PrimaryKeyRelatedField(
        queryset=Agenda.objects.filter(dia__gte=date.today()),
        write_only=True,
        label='agenda'
    )

    dia = serializers.DateField(source="agenda.dia", read_only=True)
    
    medico = MedicoSerializer(source="agenda.medico", read_only=True)

    user = serializers.HiddenField(default=getDefaultUser())

    class Meta:
        model = Consulta
        fields = ['id', 'dia', 'horario', 'datado_do_agendamento', 'medico', 'user', 'id_agenda']


    def validate(self, data):

        agenda = data['id_agenda']
        horario = data['horario']

        if Validators().verificar_se_data_Esta_Expirada(agenda.dia, horario):
            raise serializers.ValidationError("Data e Hora são menores que a data Atual")

        if Validators().verificar_se_usuario_esta_cadastrado_no_mesmo_dia(agenda.dia, horario, data['user']):
            raise serializers.ValidationError("Paciente já possuí data e horario marcados para esse horário")

        if Validators().agenda_ja_esta_alocada(agenda.pk, horario):
            raise serializers.ValidationError('Agenda em uso')

        if not agenda.horarios.filter(disponivel=True, horario=horario).exists():
            raise  serializers.ValidationError('Horário indisponível')

        return data

    
    def create(self, data):
        agenda = data.pop('id_agenda')

        return Consulta.objects.create(
            dia=agenda.dia,
            agenda=agenda,
            user=data['user'],
            horario=data['horario']
        )