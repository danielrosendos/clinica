from django.urls import path

from rest_framework.routers import SimpleRouter

from .views import (
    EspecialidadeViewSet, 
    MedicoViewSet, 
    AgendaViewSet, 
    ConsultaViewSet, 
    LoginViewSet, 
    LogoutViewSet, 
    RegisterUserViewSet
    )

router = SimpleRouter()

router.register('especialidades', EspecialidadeViewSet)
router.register('medicos', MedicoViewSet)
router.register('agendas', AgendaViewSet)
router.register('consultas', ConsultaViewSet)

urlpatterns = [ 
    path('especialidades/', EspecialidadeViewSet.as_view({'get': 'list'}), name='especialidades'),
    path('medicos/', MedicoViewSet.as_view({'get': 'list'}), name='medicos'),
    path('agendas/', AgendaViewSet.as_view({'get': 'list'}), name='agendas'),
    path('consultas/<int:pk>', ConsultaViewSet, name='consultas')
]