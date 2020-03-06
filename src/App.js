import React from 'react'
import './App.css';
import ListaAlumnos from './components/ListaAlumnos'
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      listaAlumnos: this.leerLocalStorage(),
      showModal: false,
      showModalDelete:false,
      alumnoIdToDelete: 0
    }
  }

  leerLocalStorage= ()=>
  {
    if(localStorage.getItem('datosAlumnos')!==undefined && localStorage.getItem('datosAlumnos')!==null)   
      return JSON.parse(localStorage.getItem('datosAlumnos'));        
    else
      return [];
  }

  guardarLocalStorage=(datosAlumnos)=>
  {
      localStorage.setItem('datosAlumnos', JSON.stringify(datosAlumnos));
  }

  handleClose = () => {
    this.setState({showModal: false});
  }

  handleShow = () => {
    this.setState({showModal: true});
  }
  
  handleCloseDelete= () => {
    this.setState({showModalDelete: false});
  }

  handleShowDelete = (e) => {
    this.setState({showModalDelete: true, alumnoIdToDelete: e.target.id});
    //console.log(e.target)
  }

  handleAdd = () => {
    //var _listaAlumnos = this.leerLocalStorage();
    let _listaAlumnos=this.state.listaAlumnos;
    let alumno=document.getElementById("txtAlumno").value;
    let nota=parseInt(document.getElementById("txtNota").value);
    
    let d= new Date();
    let id=parseInt(d.getYear().toString() + d.getMonth().toString() + d.getDay().toString() + d.getHours().toString() +      d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString());

    const newAlumno = {
      name: alumno,
      id: id,
      nota: nota
    };
    
    //let _listaAlumnos=this.state.listaAlumnos;
    _listaAlumnos.push(newAlumno);
    this.guardarLocalStorage(_listaAlumnos);
    this.setState({listaAlumnos: _listaAlumnos});
    
    this.handleClose();
  }

  
  handleDelete = (e) =>{
    let idToDelete=this.state.alumnoIdToDelete;
    let datosAlumnosFiltrado= this.state.listaAlumnos.filter(function(el){
        return el.id !== parseInt(idToDelete);
    });
    
    this.guardarLocalStorage(datosAlumnosFiltrado);
    this.setState({listaAlumnos: datosAlumnosFiltrado, alumnoIdToDelete:0});
    
    this.handleCloseDelete();
  }


  
  render()
  {
    return (
      <div className="App">
        <h2 className="titulo">Listado Alumnos</h2>
        <Button type="button" className="btn btn-primary" onClick={this.handleShow} data-modaltrigger="awesome">Agregar alumno</Button>
        <ListaAlumnos listaAlumnos={this.state.listaAlumnos} handleDelete={this.handleShowDelete}></ListaAlumnos>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ingresar Alumno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Nombre</label> 
              <input className="form-control" placeholder="Nombre" type="text" id="txtAlumno"/>
              <br />
              <label>Nota</label> 
              <input className="form-control" placeholder="Nota"  type="number" id="txtNota"/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={this.handleAdd}>
                Agregar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showModalDelete} onHide={this.handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confimación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Esta seguro de eliminar el registro?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseDelete}>
                No
              </Button>
              <Button variant="primary" onClick={this.handleDelete}>
                Si
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }
}
