from rest_framework import serializers

from ..Models.EspecialidadeModel import Especialidade

class EspecialidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidade
        
        fields = (
            'id',
            'nome'
        )