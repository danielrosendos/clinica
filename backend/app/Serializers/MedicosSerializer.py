from rest_framework import serializers

from ..Models.MedicoModel import Medico
from ..Serializers.EspecialidadeSerializer import EspecialidadeSerializer


class MedicoSerializer(serializers.ModelSerializer):
    especialidade = EspecialidadeSerializer(many=False, read_only=True)
    
    class Meta:
        model = Medico

        extra_kwargs = {
            'email': {'write_only': True},
            'telefone': {'write_only': True}
        }
        
        fields = (
            'id',
            'nome',
            'crm',
            'email',
            'telefone',
            'especialidade'
        )