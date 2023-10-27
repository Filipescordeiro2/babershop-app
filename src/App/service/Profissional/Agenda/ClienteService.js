import ApiService from "../../../apiService";

export default class ClienteService extends ApiService{

    constructor() {
        super('/api/cliente/buscarPorNome');
    }
    buscarCliente(clienteFiltro){
        let params =`?nome=${clienteFiltro.nome}`;

        if(clienteFiltro.sobrenome){
            params+= `?sobrenome=${clienteFiltro.sobrenome}`;
        }
        if (clienteFiltro.email){
            params+= `?email=${clienteFiltro.email}`;
        }
        if (clienteFiltro.cpf){
            params+= `?cpf=${clienteFiltro.cpf}`;
        }
        return this.get(params)
    }


}