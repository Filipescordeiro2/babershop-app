import React, { useState } from "react";
import 'primeicons/primeicons.css'
import ReactPaginate from 'react-paginate';

export default props => {
    const horariosPorPagina = 5; // Número de itens por página
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * horariosPorPagina;
    const horariosDaPagina = props.horarios.slice(offset, offset + horariosPorPagina);

    const rows = horariosDaPagina.map(horario => {
        return (
            <tr key={horario.id}>
                <td>{horario.data}</td>
                <td>{horario.hora}</td>
                <td>{horario.periodo}</td>
                <td>{horario.status}</td>
                <td>
                    <button type="button" onClick={event => props.redirectToAgendar(horario)} className="btn btn-success">
                        AGENDAR
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>

            <ReactPaginate
                pageCount={Math.ceil(props.horarios.length / horariosPorPagina)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
            />
        </div>
    );
};
