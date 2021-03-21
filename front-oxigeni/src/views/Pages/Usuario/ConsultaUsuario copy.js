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
import "./usuario.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"
import ReactPaginate from 'react-paginate';
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
      usuarios: [],
      offset: 0,
      users: [],
      elements: [],
      perPage: 5,
      currentPage: 0,
    };

  }

  async componentDidMount() {
    try {
      
      const { data } = await api1.get("");
      this.setState({ usuarios: data });
      if(this.props.notificacao !== ""){
        if(this.props.notificacao === "Salvo com sucesso")
          toast.success(this.props.notificacao);
        if(this.props.notificacao === "Alterado com sucesso")
          toast.warning(this.props.notificacao);
        if(this.props.notificacao === "Removido com sucesso")
          toast.error(this.props.notificacao);
      
      }
      this.receivedData()
  
    } catch (ex) {
      console.log(ex);
    }
  }
  
setElementsForCurrentpage() {
    let elements = this.state.users.data
            .slice(this.state.offset, this.state.offset + this.state.perPage)
         .map((users, index) => {
             return (
                 <tbody>
            
                     <tr key={users.id}
                        onClick={(e) => this.selecionaLinha(users.id)}
                        id={users.id}
                        className={users.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{users.name || "-"}</td>
                      <td>{users.email || "-"}</td>
                      <td>{users.perfil}</td>
                      <td>{users.status}</td>
                    </tr>
                 </tbody>
             )
         })
    this.setState({ elements: elements })
}

handlePageClick = (users) => {
    const selectedPage = users.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.setElementsForCurrentpage()
    })
}

async receivedData() {
    this.setState({
        users: await api1.get(""),
        pageCount: Math.ceil(this.state.users.length / this.state.perPage)
    }, () => this.setElementsForCurrentpage())
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

  filtrar = async () => {
    const { textoPesquisa } = this.state;
    const { data } = await axios.get(`http://localhost:3100/usuario?q=${textoPesquisa}` );
    this.setState({usuarios:data})
  }

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
    let 
        paginationElement = (
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}
                containerClassName={"pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
        );
    
    return (
      <>
      {/* <Row>
        <div>
          
       </div>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <h2><span>Consulta de Usuário</span></h2>
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
                <Col xl="4" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastrarusuario}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirUsuarioSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Detalhes
                  </Button>
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
                  {this.state.usuarios.map((usuario) => (
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
              <div className="d-flex justify-content-end">
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button" />
                  </PaginationItem>
                </Pagination>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row> */}

      <Row>
      <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <h4><span>Consulta de Usuário</span></h4>
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
                <Col xl="4" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastrarusuario}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirUsuarioSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Detalhes
                  </Button>
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
               
                {this.state.elements}
               
              </Table>
   
                
                {paginationElement}
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
