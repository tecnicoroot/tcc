import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  //Badge,
  Table,
  InputGroupAddon,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import "./atendimento.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import moment from 'moment';
import Container from "reactstrap/lib/Container";
import Agenda from "../../../componentes/agenda";

var now = new Date();

const api1 = new Api("v1","agenda");
//const api2 = new Api("v1","atendimentos/search")
class Atendimento extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        textoPesquisa: "",
        linhaSelecionada:0,
        corLinhaSelecionada: "row-clicked",
        dropdownOpen: new Array(19).fill(false),
        listaAtendimento : []
    };

  }
  cadastrarAtendimento = () => {
    this.props.history.push("/atendimento/cadastrar");
  }
  async componentDidMount() {
  
    try {
       if(this.props.notificacao !== ""){
        if(this.props.notificacao === "Salvo com sucesso")
          toast.success(this.props.notificacao);
        if(this.props.notificacao === "Alterado com sucesso")
          toast.warning(this.props.notificacao);
        if(this.props.notificacao === "Removido com sucesso")
          toast.error(this.props.notificacao);
          
      }
      this.dadosAtendimento();
    
    } catch (ex) {
      console.log(ex);
    }
  }
  
  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  
 dadosAtendimento = () =>{
  console.log("atendimento função")
  const items = api1.get('');
  const { token } = localStorage;
  fetch('http://localhost:8080/v1/agendadia', {
  method: 'get',
  headers: {'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`},
  
    }).then( response => response.json()
      
    ).then(data => {
     const {data: elements = []}  = data;
     this.setState({elements : items.data});
     const itens = [];
     elements.data.forEach(element => {
       
       const item = {};
       item._id = element.id;
       item.name  = element.nome;
       item.startDateTime = new Date(element.data_hora_marcada);
       item.endDateTime   = new Date(element.data_hora_marcada).setMinutes(140);
       item.classes     = 'color-1' ;

       item.data_nascimento  = element.data_nascimento;
       itens.push(item);
     });
     this.setState({listaAtendimento  : itens});
     console.log(this.state.listaAtendimento);    
  });

}
  render() {
    
    return (
      <>
     
      <Row>
      <Col xs="12" sm="12">
          <Card>
            
            <CardBody>
              <Row>
                <Col xs="6" sm="4">
                  {
                      this.state.listaAtendimento.map((element, index )=>{
                        return(
                          <Agenda key={element._id} 
                            titulo={moment(element.startDateTime).format('DD/MM/YYYY HH:mm')}
                            header={element.name} 
                            body={moment(element.data_nascimento).format('DD/MM/YYYY')}
                          />
                        )
                      })
                    
                  }
                  
                </Col>
                <Col xs="6" sm="4">
                  <Row>linha</Row>
                  <Row>linha</Row>
                  <Row>linha</Row>
                </Col>
              </Row>
              
              
            </CardBody>
          </Card>
        </Col>   
        
      </Row>
     
      </>
    );
  }
}
const mapStateToProps = state => ({
  notificacao: state.notificacao
});

const mapDispatchToProps = dispatch => ({
  setStatusNotificacao: status => dispatch(SET_STATUS_NOTIFICACAO(status))
});

export default connect(mapStateToProps,mapDispatchToProps)(Atendimento);
