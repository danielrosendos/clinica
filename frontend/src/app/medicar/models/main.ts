export interface Medicos {

    id: number;
    crm: number;
    nome: string;
    especialidade: string;

}

export interface Consultas {

    id: number;
    dia: Date;
    horario: string;
    data_agendamento: Date;
    medico: object;

}

export interface Especialidades {

    id: number;
    nome: string;
    selected?: boolean;

}

export interface Agendas {
    id: number;
    medico: object;
    dia: string;
    horario: object;
}

export interface ConsultaForm {
    especialidade?: any;
    medico?: any;
}

export interface Consulta {
    id: number;
    agenda: number;
    horario: number;
    data_agendamento: string;
    user: number;
}