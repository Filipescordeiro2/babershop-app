import Localstorage from '../../LocalStorage/LocalStorageService'
import {USUARIO_LOGADO} from "../authServiceUsuario";

export const HorarioSelecionado='HorarioSelecionado'


export default class AuthServiceHorario {

    static removerHorarioSelecionado(){
        Localstorage.removerItem(HorarioSelecionado)
    }
    static obterHorarioSelecionado(){
        return Localstorage.obterItem(HorarioSelecionado)
    }
}
