import LocalStorageService from "../../LocalStorage/LocalStorageService";
export const clienteAgendado = 'clienteAgendado'

export default class AuthService{

    static obterClienteAgendado(){
        return LocalStorageService.obterItem('clienteAgendado')
    }
}
