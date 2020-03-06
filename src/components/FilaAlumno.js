import React from 'react';

function FilaAlumno(props) {
    return (
        <tr className={props.clase}>
            <td>{props.alumno.name} </td> 
            <td>{props.alumno.nota} </td> 
            <td>{props.estado}</td> 
            <td><button id={props.alumno.id} onClick={props.deleteAlumno}>Delete</button></td>
        </tr>
    );
}

export default FilaAlumno;