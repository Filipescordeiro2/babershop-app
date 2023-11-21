import ApiService from "../../../apiService";

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

    validarSenha(senha) {
        const errosSenha = [];

        // Verifica o comprimento da senha
        if (senha.length < 6 || senha.length > 10) {
            errosSenha.push('A senha deve ter entre 6 e 10 caracteres.');
        }

        // Verifica se há pelo menos uma letra maiúscula
        if (!/[A-Z]/.test(senha)) {
            errosSenha.push('A senha deve conter pelo menos uma letra maiúscula.');
        }

        // Verifica se há pelo menos um número
        if (!/\d/.test(senha)) {
            errosSenha.push('A senha deve conter pelo menos um número.');
        }


        // Verifica se não há sequência de caracteres da esquerda para a direita ou vice-versa
        if (/abcdefghijklmnopqrstuvwxyz/.test(senha) || /zyxwvutsrqponmlkjihgfedcba/.test(senha) || /0123456789/.test(senha) || /9876543210/.test(senha)) {
            errosSenha.push('A senha não pode conter sequências de caracteres consecutivos.');
        }

        // Verifica se há pelo menos um caractere especial
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            errosSenha.push('A senha deve conter pelo menos um caractere especial.');
        }

        // Verifica se não há sequência numérica
        if (/\d{3,}/.test(senha)) {
            errosSenha.push('A senha não pode conter sequências numéricas.');
        }

        return errosSenha;
    }

    validar(profissional) {
        const erros = [];

        if (!profissional.nome) {
            erros.push('O campo nome é obrigatório.');
        }

        if (!profissional.cpf) {
            erros.push('O campo CPF é obrigatório.');
        } else {
            const errosCPF = this.validarCPF(profissional.cpf);
            if (errosCPF.length > 0) {
                erros.push('CPF inválido.');
            }
        }

        if (!profissional.dataDeNascimento) {
            erros.push('O campo data de nascimento é obrigatório.');
        }

        if (!profissional.telefone) {
            erros.push('O campo telefone é obrigatório.');
        }

        if (!profissional.email) {
            erros.push('O campo email é obrigatório.');
        } else if (!profissional.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email inválido.');
        }

        if (!profissional.senha) {
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
    buscarProfissional(idProfissional) {
        return this.get(`?idProfissional=${idProfissional}`);
    }


}

export default profissionalService