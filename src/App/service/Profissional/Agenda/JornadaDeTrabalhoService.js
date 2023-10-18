import ApiService from "../../../apiService";

export default class JornadaDeTrabalhoService extends ApiService{
    constructor() {
        super('/api/jornadaDeTrabalho');
    }

    obterListaDeJornada(){
        return [

            {label:'Selecione',value:''},
            {label:'Manhã (09:00 às 12:00)',value:'MANHA'},
            {label:'Tarde (13:00 às 18:00)',value:'TARDE'},
            {label:'Noite (19:00 às 22:00)',value:'NOITE'}
        ]
    }
    // Método para cadastrar uma nova jornada
    postJornada(jornadaData) {
        return this.post('/cadastrar/jornada', jornadaData);
    }

}