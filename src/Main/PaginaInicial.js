import React from "react";


class PaginaInicial extends  React.Component{
    render() {
        return(
            <div className="jumbotron">
                <h1 class="display-3">Somos a Baber Shop!</h1>
                <p class="lead">Esse é seu sistema de controle da Babearia.</p>
                <hr className="my-4"/>
                <p className="lead"> A Revolução no Agendamento de Barbearias</p>
                <p className="lead">
                    Na era da tecnologia e da praticidade, o agendamento de serviços se tornou uma parte essencial do
                    nosso dia a dia. E, em um mundo onde o tempo é um recurso valioso, ter controle total sobre a sua agenda se tornou fundamental.
                    É nesse contexto que surge o nosso sistema de agendamento de barbearia, uma ferramenta que tem
                    revolucionado a maneira como as pessoas cuidam de sua aparência e administram seu tempo.
                </p>
                <p className="lead"> A Evolução do Agendamento de Barbearias</p>
                <p className="lead">
                    Até não muito tempo atrás, marcar um horário em uma barbearia era uma tarefa que demandava tempo e paciência.
                    As chamadas telefônicas intermináveis, a espera em filas ou a necessidade de ir pessoalmente ao estabelecimento eram comuns.
                    Isso não apenas desperdiçava o tempo do cliente, mas também sobrecarregava os barbeiros e cabeleireiros com um
                    gerenciamento de agenda manual propenso a erros.
                </p>
                <p className="lead"> O Controle em Suas Mãos</p>

                <p className="lead">
                    Com a introdução do nosso sistema de agendamento de barbearia, o controle está agora nas mãos dos clientes e dos
                    próprios estabelecimentos. Ao acessar a plataforma online ou o aplicativo móvel, os clientes podem navegar pelas datas e
                    horários disponíveis, escolher seu profissional de preferência e confirmar sua reserva com alguns cliques.
                    Adeus às chamadas telefônicas frustrantes e às esperas desnecessárias!
                </p>
                <p className="lead"> Vantagens para os Clientes</p>

                <p className="lead">
                   <li> Agendamento Flexível: Com a facilidade de acesso a horários disponíveis, os clientes podem marcar suas visitas à barbearia de acordo com sua conveniência, 24 horas por dia, 7 dias por semana.</li>
                     <li>Lembretes e Notificações: Lembretes automáticos por e-mail ou mensagens de texto ajudam os clientes a não esquecer seus compromissos, garantindo que não haja desperdício de tempo.</li>
                </p>
                <p className="lead">Vantagens para as Barbearias</p>
                  <li>Gestão Simplificada: Os estabelecimentos podem gerenciar suas agendas com facilidade, evitando sobreposições de horários e garantindo um fluxo de clientes mais eficiente.</li>
                  <li>Maior Visibilidade: As barbearias podem promover seus serviços e profissionais online, atraindo uma clientela mais ampla e diversificada.</li>
                <p className="lead"> Conclusão</p>
                <p className="lead">
                    Nosso sistema de agendamento de barbearia é muito mais do que uma simples ferramenta.
                    Ele é a resposta à necessidade de controle, eficiência e comodidade em um mundo cada vez mais dinâmico.
                    Proporcionando benefícios tanto para os clientes quanto para as barbearias, ele desempenha um papel fundamental na
                    evolução desse setor, tornando o ato de cuidar da aparência algo mais fácil, prático e eficaz.
                    Junte-se a nós nessa revolução no agendamento de serviços de beleza e tenha o controle da sua agenda em suas mãos.
                </p>

                <hr className="my-4"/>
                <p>Faça Login e aproveite.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/login-profissional" role="button"><i className="fa fa-users"></i>Login Profissional</a>
                    <a className="btn btn-danger btn-lg" href="#/login-usuario" role="button"><i className="fa fa-users"></i>Login Cliente</a>
                </p>
            </div>

        )
    }
}
export default PaginaInicial