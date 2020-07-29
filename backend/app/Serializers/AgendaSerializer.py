from rest_framework import serializers

from ..Models.AgendaModel import Agenda

from ..Serializers.MedicosSerializer import MedicoSerializer

class AgendaSerializer(serializers.ModelSerializer):
    medico = MedicoSerializer()
    horarios = serializers.StringRelatedField(many=True, source='horarios_disponiveis')

    class Meta:
        model = Agenda
         
        fields = (
            'id',
            'medico',
            'dia',
            'horarios'
        )