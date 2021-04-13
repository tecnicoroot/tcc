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
  //FormGroup,
  //Label,
} from "reactstrap";
import axios from "axios";
import "./paciente.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import ReactPaginate from 'react-paginate';
//import Pagination from '../../../componentes/formulario/Pagination';
const api1 = new Api("v1","paciente");
const api2 = new Api("v1","pacientes/search")
class Consulta extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
     
      allPacientes: [],
      currentPaciente: [], 
      currentPage: 1,
      totalPages: null,
      totalUsers: 0,
      quantidade: 5,
      paginas: [],
      links:[],
      busca : 0,
    };

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
      this.props.setStatusNotificacao("");
      const {data: allPacientes }  = await api1.get("");
      this.setState({currentPaciente: allPacientes.data.data});
     
      this.setState({links: allPacientes.data.links});
    
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
  cadastrarpaciente = () => {
    this.props.history.push("/paciente/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  filtrar = async () => {
     const { textoPesquisa } = this.state;
     
     //console.log(textoPesquisa);
     if(textoPesquisa){
        const { token } = localStorage;
        fetch('http://localhost:8080/v1/pacientes/search', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`},
        body: JSON.stringify({
            q: textoPesquisa
        })
          }).then( response => response.json()
            
          ).then(data => {
            const {data: allPacientes = []}  = data;
            
            this.setState({allPacientes});
            //console.log(this.state.allPacientes);
            this.setState({currentPaciente: allPacientes.data});
            this.setState({links: allPacientes.links});
        });

      this.setState({busca : 1})
      
     }else{
      const {data: allPacientes =[]}  = await api1.get(``);
      this.setState({allPacientes});
      this.setState({currentPaciente: allPacientes.data.data}); 
      this.setState({links: allPacientes.data.links});
      this.setState({busca : 0})
         
     }
        
  }
  
  exibePaginaSelecionada = async (pagina) => {
    
    const {data: allPacientes }  = await api1.get(`?page=${pagina}`);
    this.setState({currentPaciente: allPacientes.data.data});
    this.setState({links: allPacientes.data.links});
    this.setState({currentPage: allPacientes.data.current_page })
    
  }

  alteralink = (labelButton) => {
    if(labelButton === "pagination.previous"){
      return "Anterior"
    }
    if(labelButton === "pagination.next"){
      return "Próxima"
    }
    return labelButton;
  }

  editarpaciente = (id) => {
    this.props.history.push(`/paciente/editar/${id}`);
  }

  exibirpaciente = (id) => {
    this.props.history.push(`/paciente/exibir/${id}`);
  }
  selecionaLinha = (id) => {
 
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirPacienteSelecionada = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione uma Paciente!");
    }else{
      this.editarpaciente(linhaSelecionada);
    }
  }
  carregaDados = (busca) => {
    const lista = []
    if(busca == 0){
      const quantidade = this.state.quantidade;
      const totalPages = Math.ceil(quantidade/5);
          for(let i=0;  i < totalPages; i++){
        lista.push(i)
      }
      return lista;
    }else{
      return lista;
    }
  }
  render() {
    
    const lista = this.carregaDados(this.state.busca);
        
    if (this.state.totalUsers.length === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', this.state.currentPage ? 'border-gray border-right' : ''].join(' ').trim();    
    return (
      <>
     
      <Row>
      <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
              <Col xl="3">
            <h4><span>Consulta de Paciente</span></h4>
            </Col>
            
            <Col xl="5">
            <Col xl="8" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastrarpaciente}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirPacienteSelecionada}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Detalhes
                  </Button>
                </Col>
            </Col>

          </Row> 
            </CardHeader>
            <CardBody>
              <div className="my-3 d-flex flex-wrap justify-content-between">
                <Col xl="5" className="px-0">
                  <InputGroup>
                    <Input onChange={this.dataBindind} id="appendedInputButton" type="text" />
                    <InputGroupAddon addonType="append">
                      <Button onClick={this.filtrar} color="secondary">Pesquisar!</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                
              </div>
              
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Nome </th>
                    <th>Data Nasc.</th>
                    <th>Celular</th>
                    <th>Telefone</th>
                   
                  </tr>
                </thead>
                
                <tbody>
                  {this.state.currentPaciente.map((paciente) => (
                    <tr key={paciente.id}
                        onClick={(e) => this.selecionaLinha(paciente.id)}
                        id={paciente.id}
                        className={paciente.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{paciente.nome || "-"}</td>
                      <td>{paciente.data_nascimento|| "-"}</td>
                      <td>{paciente.celular}</td>
                      <td>{paciente.telefone}</td>
                    </tr>
                  ))}
                </tbody>
                
               
              </Table>
              <div className="d-flex justify-content-end">
                <Pagination>
         
                  {
                      this.state.links.map((link) => (
                        link.label = this.alteralink(link.label),
                        <PaginationItem key={link.label}>
                        <PaginationLink tag="button" className={link.label == this.state.currentPage ? 'isActive' : ''} onClick={() => this.exibePaginaSelecionada(link.url)}>{link.label}</PaginationLink>
                      </PaginationItem>
                      ))
                      
                  }
                </Pagination>
              </div>
             
                
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

export default connect(mapStateToProps,mapDispatchToProps)(Consulta);
