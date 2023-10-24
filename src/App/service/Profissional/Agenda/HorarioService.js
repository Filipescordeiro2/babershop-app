import ApiService from "../../../apiService";

export default class HorarioService extends ApiService{
    constructor() {
        super('/api/Horario');
    }

    buscarHorarios(horariofiltro) {
        let params = `?data=${horariofiltro.data}`;

        if (horariofiltro.periodo) {
            params += `&periodo=${horariofiltro.periodo}`;
        }

        if (horariofiltro.hora) {
            params += `&hora=${horariofiltro.hora}`;
        }

        if (horariofiltro.status) {
            params += `&status=${horariofiltro.status}`;
        }

        if (horariofiltro.Profissional) {
            params += `&Profissional=${horariofiltro.Profissional}`;
        }

        return this.get(params);
    }

    buscarHorariosPorNome(params) {
        const queryParams = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&');

        return this.get(`/buscarHorario?${queryParams}`);
    }
    buscarHorarioPorProfissional(Profissional) {
        return this.get(`?Profissional=${Profissional}`);
    }
    deletar(id){
        return this.delete(`/${id}`)
    }



}