import ApiService from "../../apiService";
import ErroValidacao from "./exeption/ErroValidacao";

class clienteService extends ApiService{

    constructor(){
        super('/api/cliente')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais);
    }
    salvarcliente(cliente){
        return this.post('', cliente)
    }
    validar(cliente){

        const erros =[]

        if(!cliente.nome){

            erros.push('O campo nome é obrigatorio.')
        }
        if(!cliente.email){

            erros.push('O campo email é obrigatorio.')

        } else if(!cliente.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){

            erros.push('informe um email invalido')

        }
        if(!cliente.senha || !cliente.senhaRepeticao){

            erros.push('Digite a senha 2x')

        }else if (cliente.senha !== cliente.senhaRepeticao){

            erros.push('As senhas não batem.')

        }
        if(erros && erros.length>0){

            throw new ErroValidacao(erros);
        }

    }

}

export default clienteService