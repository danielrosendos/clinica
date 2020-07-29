from datetime import datetime

from .Models.ConsultaModel import Consulta

class Validators:

    def verificar_se_data_Esta_Expirada(self, dia, hora):

        verificar_data = datetime.strptime(f'{dia} {hora}', "%Y-%m-%d %H:%M:%S")

        return verificar_data < datetime.today()


    def verificar_se_usuario_esta_cadastrado_no_mesmo_dia(self, dia, hora, user):
        Consulta.objects.filter(
            dia=dia,
            horario=hora,
            user=user
        ).exists()


    def agenda_ja_esta_alocada(self, agenda, hora):
        Consulta.objects.filter(
            agenda__id=agenda,
            horario=hora
        ).exists()

    
    def verificar_se_posso_deletar_consulta(self, user, consulta):
        consulta = Consulta.objects.filter(
            pk=consulta,
            user=user
        )

        if not consulta.exists():
            return False

        data = consulta.first()

        if self.verificar_se_data_Esta_Expirada(data.dia, data.horario):
            return False

        return consulta