import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Button,
  //Pagination,
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
import "./usuario.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import ReactPaginate from 'react-paginate';
import Pagination from '../../../componentes/formulario/Pagination';
const api1 = new Api("usuario");

class ConsultaUsuario extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
      
      allUsers: [],
      currentUsers: [], 
      currentPage: null,
      totalPages: null,
     
    };

  }
  onPageChanged = data => {
    
    const { allUsers } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = allUsers.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
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
      
      const { data: allUsers } = await api1.get("filtro?pagina=1&quantidade=5&filtro=");
      
      this.setState({ allUsers });
  
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
  cadastrarusuario = () => {
    this.props.history.push("/usuario/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  // filtrar = async () => {
    
  //   const { textoPesquisa } = this.state;
  //   if(textoPesquisa){
  //     const { data: allUsers = [] } = await api1.get(`${textoPesquisa}`);
  //     this.setState({ allUsers });
  //     this.setState({currentUsers: allUsers})

  //   }else{
  //     const { data: allUsers = [] } = await api1.get("");
  //     this.setState({ allUsers });
  //     this.setState({currentUsers: allUsers})
  
  //   }
        
  // }

  editarusuario = (id) => {
    this.props.history.push(`/usuario/editar/${id}`);
  }

  exibirusuario = (id) => {
    this.props.history.push(`/usuario/exibir/${id}`);
  }
  selecionaLinha = (id) => {
 
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirUsuarioSelecionado = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione um usuário!");
    }else{
      this.editarusuario(linhaSelecionada);
    }
  }
  
  render() {
    const { allUsers, currentUsers, currentPage, totalPages } = this.state;
    const totalUsers = allUsers.length;

    if (totalUsers === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();    
    return (
      <>
     
      <Row>
      <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
              <Col xl="3">
            <h4><span>Consulta de Usuário</span></h4>
            </Col>
            <Col xl="2">
              <h5 className={headerClass}>
                <strong>{totalUsers}</strong> Usuários
              </h5>
            </Col>  
            <Col xl="2">
            { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Páginas <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) } 
              
            </Col> 
            <Col xl="5">
            <Col xl="8" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastrarusuario}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirUsuarioSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
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
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Status</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentUsers.map((usuario) => (
                    <tr key={usuario.id}
                        onClick={(e) => this.selecionaLinha(usuario.id)}
                        id={usuario.id}
                        className={usuario.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{usuario.name || "-"}</td>
                      <td>{usuario.email || "-"}</td>
                      <td>{usuario.perfil}</td>
                      <td>{usuario.status}</td>
                    </tr>
                  ))}
                </tbody>
                
               
              </Table>
   
              <Pagination totalRecords={totalUsers} pageLimit={4} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                
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

export default connect(mapStateToProps,mapDispatchToProps)(ConsultaUsuario);
//export default ConsultaUsuario;
