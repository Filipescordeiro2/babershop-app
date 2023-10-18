import Localstorage from "../LocalStorage/LocalStorageService";

export const PROFISSIONAL_LOGADO='_profissional_logado'
export default class AuthService{
    static isProfissionalAutenticado(){
        const profissional = Localstorage.obterItem(PROFISSIONAL_LOGADO)
        return profissional && profissional.id;
    }

    static removerUsuarioAutenticado(){
        Localstorage.removerItem(PROFISSIONAL_LOGADO)
    }
    static logar(profissional){

        Localstorage.adicioanarItem(PROFISSIONAL_LOGADO,profissional)
    }
    static obterProfissionalAutenticado(){
        return Localstorage.obterItem(PROFISSIONAL_LOGADO)
    }
}