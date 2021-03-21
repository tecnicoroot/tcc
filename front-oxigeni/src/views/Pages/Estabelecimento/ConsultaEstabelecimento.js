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
import "./estabelecimento.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";

const notifyadd = (msn) => toast.success("Salvo com sucesso");
const notifyupdate = (msn) => toast.warning("Alterado com sucesso");
const notifydel = (msn) => toast.error("Removido com sucesso");
class ConsultaEstabelecimento extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
      estabelecimentos: [],
    };

  }

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:3100/estabelecimento");
      this.setState({ estabelecimentos: data });
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
    if (localStorage.getItem("cadastroEstabelecimento")){
      if(localStorage.getItem("cadastroEstabelecimento") === "add") {
        notifyadd();
      }
      if (localStorage.getItem("cadastroEstabelecimento") === "update") {
        notifyupdate();
      }
      if (localStorage.getItem("cadastroEstabelecimento") === "del") {
        notifydel();
      }
      localStorage.removeItem("cadastroEstabelecimento");
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
  cadastrarestabelecimento = () => {
    this.props.history.push("/estabelecimento/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  filtrar = async () => {
    const { textoPesquisa } = this.state;
    const { data } = await axios.get(`http://localhost:3100/estabelecimento?q=${textoPesquisa}` );
    this.setState({estabelecimentos:data})
  }

  editarestabelecimento = (id) => {
    this.props.history.push(`/estabelecimento/editar/${id}`);
  }

  exibirestabelecimento = (id) => {
    this.props.history.push(`/estabelecimento/exibir/${id}`);
  }
  selecionaLinha = (id) => {
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirestabelecimentoSelecionado = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione um estabelecimento!");
    }else{
      this.editarestabelecimento(linhaSelecionada);
    }
  }
  render() {
    return (
      <Row>
        <div>
          <strong><ToastContainer /></strong> 
       </div>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <h2><span>Consulta de estabelecimento</span></h2>
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
                  <PrivateComponent permissao="Operador">
                      <Button onClick={this.cadastrarestabelecimento}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirestabelecimentoSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Detalhes
                  </Button>
                </Col>
              </div>

              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Razão Social</th>
                    <th>Nome Fantasia</th>
                    <th>CNPJ / CPF</th>
                    <th>Telefone</th>
                    <th>Contato</th>
                    <th>Status</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.estabelecimentos.map((estabelecimento) => (
                    <tr key={estabelecimento.id}
                        onClick={(e) => this.selecionaLinha(estabelecimento.id)}
                        id={estabelecimento.id}
                        className={estabelecimento.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{estabelecimento.razaoSocial || "-"}</td>
                      <td>{estabelecimento.nomeFantasia || "-"}</td>
                      <td>{estabelecimento.cnpj || estabelecimento.cpf}</td>
                      <td>{estabelecimento.telefone}</td>
                      <td>{estabelecimento.contato}</td>
                      <td>{estabelecimento.status}</td>
                      <td>{estabelecimento.email}</td>
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
      </Row>
    );
  }
}

export default ConsultaEstabelecimento;
