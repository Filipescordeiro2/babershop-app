import ApiService from "../../../apiService";
import axios from 'axios'; // Importe o axios

export default class agendamentoService extends ApiService{
    constructor() {
        super('/api/agendamentos');
    }

    obterListaDeServico(){
        return [

            {label:'CORTE, BARBA E SOBRANCELHA',value:'TIPO_1_CORTE_BARBA_SOBRANCELHA'},
            {label:'CORTE E SOBRANCELHA',value:'TIPO_2_CORTE_SOBRANCELHA'},
            {label:'CORTE E BARBA',value:'TIPO_3_CORTE_BARBA'},
            {label:'CORTE E PENTEADO',value:'TIPO_4_CORTE_PENTEADO'},
            {label:'BARBA',value:'TIPO_5_BARBA'},
            {label:'CORTE',value:'TIPO_6_CORTE'}
        ]
    }

    async obterListaDeProfissionais() {
        try {
            const response = await axios.get('http://localhost:8080/api/profissional/nomes'); // Substitua pela rota correta da sua API
            return response.data;
        } catch (error) {
            console.error('Erro ao obter a lista de profissionais:', error);
            return [];
        }
    }

    salvarAgendamento(agendamento){
        return this.post('',agendamento)
    }
}