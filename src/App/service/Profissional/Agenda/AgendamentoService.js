import ApiService from "../../../apiService";


export default class AgendamentoService extends ApiService{

    constructor() {
        super('/api/agendamentos');
    }


    buscarAgendamento(AgendamentoFiltro) {
        let params = `?idCliente=${AgendamentoFiltro.idCliente}`;

        if (AgendamentoFiltro.data) {
            params += `&data=${AgendamentoFiltro.data}`;
        }

        if (AgendamentoFiltro.hora) {
            params += `&hora=${AgendamentoFiltro.hora}`;
        }

        if (AgendamentoFiltro.status) {
            params += `&status=${AgendamentoFiltro.status}`;
        }

        return this.get(params);
    }


}