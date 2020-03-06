import React from 'react';
import '../App.css';
import FilaAlumno from './FilaAlumno'

export default class ListaAlumnos extends React.Component {
    _renderEstado = (alumno) =>{
        
        let estado;
        let clase;
        if(alumno.nota >= 7)
         {
            estado="Promocionado";
            clase="table-success";
         }
        if(alumno.nota >= 4 && alumno.nota < 7)
        {
            estado="Aprobado";
            clase="table-primary";
        }
        if(alumno.nota < 4)
        {
            estado="Desaprobado";
            clase="table-danger";
        }
         return <FilaAlumno deleteAlumno={this.props.handleDelete} key={alumno.id} alumno={alumno} estado={estado} clase={clase} />
    }



    render(){
    const {listaAlumnos} = this.props;

    return (
        <table className="table table-hover alumnos">
        <thead>
        <tr className="table-active">
            <th scope="col">Alumno</th>
            <th scope="col">Nota</th>
            <th scope="col">Estado</th>
            <th scope="col">#</th>
        </tr>
        </thead>
        <tbody id="alumnos">
        {   
            listaAlumnos.map(alumno=>
                (
                    this._renderEstado(alumno)  
                )
            )
        }
        </tbody>
        </table>
    );
    }
}


