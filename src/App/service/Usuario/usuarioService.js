import ApiService from "../../apiService";

class usuarioService extends ApiService{

    constructor(){
        super('/api/cliente')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais);
    }
    salvarcliente(cliente){
        return this.post('', cliente)
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
        } else {
            // Parse da data de nascimento no formato dd/mm/aaaa
            const [dia, mes, ano] = usuario.dataDeNascimento.split('/');
            const dataNascimento = new Date(`${ano}-${mes}-${dia}`);
            dataNascimento.setHours(0, 0, 0, 0); // Define as horas, minutos, segundos e milissegundos para zero

            // Obtenção da data atual no mesmo formato
            const dataAtual = new Date();
            const hoje = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;
            dataAtual.setDate(dataAtual.getDate());
            dataAtual.setHours(0, 0, 0, 0); // Define as horas, minutos, segundos e milissegundos para zero


            if (dataNascimento.getTime() >= dataAtual.getTime()) {
                erros.push('A data de nascimento deve ser anterior à data atual.');
            }
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
        return erros;
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
    alterarStatus(id,status){
        return this.put(`/${id}/atualiza-status`,{status})
    }


}

export default usuarioService