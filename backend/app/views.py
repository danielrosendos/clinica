from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated

from .Filters.MedicoFilter import MedicoFilter
from .Filters.AgendaFilter import AgendasFilter
from .Filters.ConsultaFilter import ConsultasFilter

from .Models.EspecialidadeModel import Especialidade
from .Serializers.EspecialidadeSerializer import EspecialidadeSerializer

from .Models.MedicoModel import Medico
from .Serializers.MedicosSerializer import MedicoSerializer

from .Models.AgendaModel import Agenda
from .Serializers.AgendaSerializer import AgendaSerializer

from .Models.ConsultaModel import Consulta
from .Serializers.ConsultaSerializer import ConsultaSerializer

from .validators import Validators

from django.contrib.auth.models import User
from .Serializers.UserSerializer import UserSerializer 


class EspecialidadeViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    queryset = Especialidade.objects.all()
    serializer_class = EspecialidadeSerializer
    filter_backends = [SearchFilter]
    search_fields = ['nome']


class MedicoViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer
    filter_backends = [SearchFilter, MedicoFilter]
    search_fields = ['nome']


class AgendaViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    queryset = Agenda.disponivel.prefetch_horarios_disponiveis()
    serializer_class = AgendaSerializer
    ordering_fields = ['dia']
    filter_backends = [AgendasFilter]


class ConsultaViewSet(
        mixins.ListModelMixin, 
        mixins.CreateModelMixin, 
        mixins.DestroyModelMixin, 
        viewsets.GenericViewSet
        ):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
    filter_backends = [ConsultasFilter]


    def destroy(self, request, *args, **kwargs):
        consulta = Validators().verificar_se_posso_deletar_consulta(request.user.pk, kwargs['pk'])

        if not consulta:
            return Response('Não foi possível desmarcar esta consulta', status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(consulta)
        
        return Response(status=status.HTTP_200_OK)


class RegisterUserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class LogoutViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response("Usuário Deslogado Com Sucesso", status=status.HTTP_200_OK)

class LoginViewSet(ObtainAuthToken):
    queryset = Token.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {
                "id": user.pk,
                "username": user.username,
                "email": user.email,
                "is_staff": user.is_staff,
                "token": token.key,
            },
            status=status.HTTP_200_OK,
        )