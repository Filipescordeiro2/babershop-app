import ApiService from "../../../apiService";
import ErroValidacao from "./exeption/ErroValidacao";

export default class agendamentoService extends ApiService{
    constructor() {
        super('/api/agendamentos');
    }


    consultar(agendamentoFiltro){
        let params =`?ano=${agendamentoFiltro.ano}`
        if (agendamentoFiltro.mes){
            params =`${params}&mes=${agendamentoFiltro.mes}`
        }
        if (agendamentoFiltro.tipo){
            params=`${params}&tipo=${agendamentoFiltro.tipo}`
        }
        if (agendamentoFiltro.status){
            params=`${params}&status=${agendamentoFiltro.status}`
        }
        if (agendamentoFiltro.usuario){
            params=`${params}&usuario=${agendamentoFiltro.usuario}`
        }
        if(agendamentoFiltro.descricao){
            params=`${params}&descricao=${agendamentoFiltro.descricao}`
        }
        return this.get(params);
    }
    deletar(id){
        return this.delete(`/${id}`)
    }
    salvar(agendamento){
        return this.post(``,agendamento)
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    atualizar(agendamento){
        return this.put(`/${agendamento.id}`,agendamento);
    }

    validar(agendamento){

        const erros=[];

        if(!agendamento.ano){
            erros.push("Informe o ano.")
        }
        if(!agendamento.mes){
            erros.push("Informe o mes.")
        }
        if(!agendamento.descricao){
            erros.push("Informe uma descrição")
        }
        if(!agendamento.valor){
            erros.push("Informe o valor.")
        }
        if(!agendamento.tipo){
            erros.push("Informe o tipo.")
        }
        if(!agendamento.ano){
            erros.push("Informe o ano.")
        }

        if(erros && erros.length>0){
            throw new ErroValidacao(erros);
        }

    }
    alterarStatus(id,status){
        return this.put(`/${id}/atualiza-status`,{status})
    }

}