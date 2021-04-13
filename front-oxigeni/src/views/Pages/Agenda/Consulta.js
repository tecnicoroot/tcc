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
import "./agenda.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import ReactPaginate from 'react-paginate';
const api1 = new Api("v1","agenda");
const api2 = new Api("v1","agendas/search")
class Consulta extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
     
      allAgendas: [],
      currentAgenda: [], 
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
      const {data: allAgendas }  = await api1.get("");
      this.setState({currentAgenda: allAgendas.data.data});
     
      this.setState({links: allAgendas.data.links});
    
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
  cadastraragenda = () => {
    this.props.history.push("/agenda/cadastrar");
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
        fetch('http://localhost:8080/v1/agendas/search', {
        method: 'post',
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`},
        body: JSON.stringify({
            q: textoPesquisa
        })
          }).then( response => response.json()
            
          ).then(data => {
            const {data: allAgendas = []}  = data;
            
            this.setState({allAgendas});
            //console.log(this.state.allAgendas);
            this.setState({currentAgenda: allAgendas.data});
            this.setState({links: allAgendas.links});
        });

      this.setState({busca : 1})
      
     }else{
      const {data: allAgendas =[]}  = await api1.get(``);
      this.setState({allAgendas});
      this.setState({currentAgenda: allAgendas.data.data}); 
      this.setState({links: allAgendas.data.links});
      this.setState({busca : 0})
         
     }
        
  }
  
  exibePaginaSelecionada = async (pagina) => {
    
    const {data: allAgendas }  = await api1.get(`?page=${pagina}`);
    this.setState({currentAgenda: allAgendas.data.data});
    this.setState({links: allAgendas.data.links});
    this.setState({currentPage: allAgendas.data.current_page })
    
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

  editaragenda = (id) => {
    this.props.history.push(`/agenda/editar/${id}`);
  }

  exibiragenda = (id) => {
    this.props.history.push(`/agenda/exibir/${id}`);
  }
  selecionaLinha = (id) => {
 
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirAgendaSelecionada = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione uma Agenda!");
    }else{
      this.editaragenda(linhaSelecionada);
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
            <h4><span>Consulta de Agenda</span></h4>
            </Col>
            
            <Col xl="5">
            <Col xl="8" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastraragenda}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirAgendaSelecionada}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
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
                    <th>Descrição</th>
                   
                  </tr>
                </thead>
                
                <tbody>
                  {this.state.currentAgenda.map((agenda) => (
                    <tr key={agenda.id}
                        onClick={(e) => this.selecionaLinha(agenda.id)}
                        id={agenda.id}
                        className={agenda.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{agenda.nome || "-"}</td>
                      <td>{agenda.descricao || "-"}</td>

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
