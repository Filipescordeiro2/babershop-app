import ApiService from "../../apiService";

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
    validar(usuario) {
        const erros = [];

        if (!usuario.nome) {
            erros.push('O campo nome é obrigatório.');
        }

      

        if (!usuario.cpf) {
            erros.push('O campo CPF é obrigatório.');
        } else {
            const errosCPF = this.validarCPF(usuario.cpf);
            if (errosCPF.length > 0) {
                erros.push('CPF inválido.');
            }
        }

        if (!usuario.dataDeNascimento) {
            erros.push('O campo data de nascimento é obrigatório.');
        }

        if (!usuario.telefone) {
            erros.push('O campo telefone é obrigatório.');
        }

        if (!usuario.email) {
            erros.push('O campo email é obrigatório.');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email inválido.');
        }

        if (!usuario.senha) {
            erros.push('Digite a senha');
        }

        return erros; // Retorna o array de erros ou um array vazio se não houver erros.
    }


    validarCPF(cpf) {
        const erros = [];

        if (!cpf) {
            erros.push('O campo CPF é obrigatório.');
        } else {
            // Remove caracteres não numéricos do CPF
            cpf = cpf.replace(/[^\d]/g, '');

            // Verifica se o CPF tem 11 dígitos
            if (cpf.length !== 11) {
                erros.push('CPF deve conter 11 dígitos.');
            }

            // Verifica dígitos repetidos
            if (/^(\d)\1{10}$/.test(cpf)) {
                erros.push('CPF inválido (todos os dígitos iguais).');
            }

            // Calcula o primeiro dígito verificador
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let resto = soma % 11;
            let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

            // Verifica o primeiro dígito verificador
            if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
                erros.push('CPF inválido.');
            }

            // Calcula o segundo dígito verificador
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i)) * (11 - i);
            }
            resto = soma % 11;
            let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

            // Verifica o segundo dígito verificador
            if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
                erros.push('CPF inválido.');
            }
        }

        return erros;
    }
    buscarCliente(idCliente) {
        return this.get(`?idCliente=${idCliente}`);
    }


}

export default clienteService