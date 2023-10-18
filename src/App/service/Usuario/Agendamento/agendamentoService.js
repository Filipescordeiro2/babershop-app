import ApiService from "../../../apiService";
import ErroValidacao from "./exeption/ErroValidacao";

export default class agendamentoService extends ApiService{
    constructor() {
        super('/api/agendamentos');
    }


    buscarAgendamento(agendamentoFiltro) {
        let params = `?dataAgendamento=${agendamentoFiltro.dataAgendamento}`;

        if (agendamentoFiltro.descricaoAgendamento) {
            params += `&descricaoAgendamento=${agendamentoFiltro.descricaoAgendamento}`;
        }

        if (agendamentoFiltro.horaAgendamento) {
            params += `&horaAgendamento=${agendamentoFiltro.horaAgendamento}`;
        }

        if (agendamentoFiltro.cliente) {
            params += `&cliente=${agendamentoFiltro.cliente}`;
        }

        return this.get(params);
    }

}