import React, { useState } from "react";
import 'primeicons/primeicons.css';


export default function AgendamentoTable(props) {
    const registrosPorPagina = 5;
    const [paginaAtual, setPaginaAtual] = useState(1);
    const calcularIndiceInicial = (paginaAtual, registrosPorPagina) => (paginaAtual - 1) * registrosPorPagina;
    const calcularIndiceFinal = (paginaAtual, registrosPorPagina) => paginaAtual * registrosPorPagina;

    const indiceInicial = calcularIndiceInicial(paginaAtual, registrosPorPagina);
    const indiceFinal = calcularIndiceFinal(paginaAtual, registrosPorPagina);
    const registrosExibidos = props.agendamentos.slice(indiceInicial, indiceFinal);

    const rows = registrosExibidos.map(agendamento => (
        <tr key={agendamento.id}>
            <td>{agendamento.profissional.nome}</td>
            <td>{agendamento.horario.data}</td>
            <td>{agendamento.horario.hora}</td>
            <td>{agendamento.horario.periodo}</td>
            <td>{agendamento.descricaoAgendamento}</td>
            <td>{agendamento.statusAgendamento}</td>
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
                    <th scope="col">Nome Profissional</th>
                    <th scope="col">Data</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Status</th>
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
