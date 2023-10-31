import React, { useState } from "react";
import 'primeicons/primeicons.css';


export default function AgendamentoClienteTable(props) {

    const registrosPorPagina = 5;
    const [paginaAtual, setPaginaAtual] = useState(1);
    const calcularIndiceInicial = (paginaAtual, registrosPorPagina) => (paginaAtual - 1) * registrosPorPagina;
    const calcularIndiceFinal = (paginaAtual, registrosPorPagina) => paginaAtual * registrosPorPagina;

    const indiceInicial = calcularIndiceInicial(paginaAtual, registrosPorPagina);
    const indiceFinal = calcularIndiceFinal(paginaAtual, registrosPorPagina);
    const registrosExibidos = props.agendamentos.slice(indiceInicial, indiceFinal);

    const rows = registrosExibidos.map(agendamento => (
        <tr key={agendamento.id}>
            <td>{agendamento.cliente.nome}</td>
            <td>{agendamento.horario.data}</td>
            <td>{agendamento.horario.hora}</td>
            <td>{agendamento.cliente.telefone}</td>
            <td>{agendamento.descricaoAgendamento}</td>
            <td>{agendamento.statusAgendamento}</td>
            <td>
                <button  disabled={agendamento.statusAgendamento !='AGENDADO'} className="btn btn-success"
                         onClick={e=>props.alterarStatus(agendamento,'REALIZADO')}
                >REALIZADO</button>
            </td>
            <td>
                <button  disabled={agendamento.statusAgendamento !='AGENDADO'} className="btn btn-danger"
                         onClick={e=>props.alterarStatus(agendamento,'CANCELADO')}
                >CANCELAR</button>
            </td>
        </tr>
    ));

    const totalPages = Math.ceil(props.agendamentos.length / registrosPorPagina);

    const handleChangePage = (newPage) => {
        setPaginaAtual(newPage);
    };

    const paginationButtons = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationButtons.push(
            <button key={page} onClick={() => handleChangePage(page)}>
                {page}
            </button>
        );
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>

            <div className="pagination">
                {paginationButtons}
            </div>
        </div>
    );
}
