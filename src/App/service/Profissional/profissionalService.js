import ApiService from "../../apiService";

class profissionalService extends ApiService{

    constructor(){
        super('/api/profissional')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais);
    }
    salvarprofissional(profissional){
        return this.post('', profissional)
    }
    validar(profissional){

        const erros =[]

        if(!profissional.nome){

            erros.push('O campo nome é obrigatorio.')
        }
        if(!profissional.email){

            erros.push('O campo email é obrigatorio.')

        } else if(!profissional.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){

            erros.push('informe um email invalido')

        }
        if(!profissional.senha || !profissional.senhaRepeticao){

            erros.push('Digite a senha 2x')

        }else if (profissional.senha !== profissional.senhaRepeticao){

            erros.push('As senhas não batem.')

        }
        if(erros && erros.length>0){

        }

    }

}

export default profissionalService