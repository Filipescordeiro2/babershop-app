import React from "react";
import 'primeicons/primeicons.css'


export default props=>{

    const rows= props.horarios.map(horario=>{
        return(
            <tr key={horario.id}>
                <td>{horario.data}</td>
                <td>{horario.hora}</td>
                <td>{horario.periodo}</td>
                <td>{horario.status}</td>
                <td>{horario.profissional.id}</td>
                <td>
                    <button className="btn btn-success">Agendamento Finalizado</button>
                    <button className="btn btn-danger">Deletar Horario</button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Data</th>
                <th scope="col">Hora</th>
                <th scope="col">Periodo</th>
                <th scope="col">Status</th>
                <th scope="col">Codigo Profissional</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}