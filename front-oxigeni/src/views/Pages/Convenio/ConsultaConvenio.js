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
import "./convenio.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notifyadd = (msn) => toast.success("Salvo com sucesso");
const notifyupdate = (msn) => toast.warning("Alterado com sucesso");
const notifydel = (msn) => toast.error("Removido com sucesso");
class ConsultaConvenio extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
      convenios: [],
    };

  }

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:3100/convenio");
      this.setState({ convenios: data });
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
    if (localStorage.getItem("cadastroConvenio")){
      if(localStorage.getItem("cadastroConvenio") === "add") {
        notifyadd();
      }
      if (localStorage.getItem("cadastroConvenio") === "update") {
        notifyupdate();
      }
      if (localStorage.getItem("cadastroConvenio") === "del") {
        notifydel();
      }
      localStorage.removeItem("cadastroConvenio");
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
  cadastrarconvenio = () => {
    this.props.history.push("/convenio/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  filtrar = async () => {
    const { textoPesquisa } = this.state;
    const { data } = await axios.get(`http://localhost:3100/convenio?q=${textoPesquisa}` );
    this.setState({convenios:data})
  }

  editarconvenio = (id) => {
    this.props.history.push(`/convenio/editar/${id}`);
  }

  exibirconvenio = (id) => {
    this.props.history.push(`/convenio/exibir/${id}`);
  }
  selecionaLinha = (id) => {
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirconvenioSelecionado = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione um convênio!");
    }else{
      this.editarconvenio(linhaSelecionada);
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
              <h2><span>Consulta Convênio</span></h2>
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
                                    <Button onClick={this.cadastrarconvenio}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Novo
                  </Button>
                  <Button onClick={this.exibirconvenioSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
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
                  {this.state.convenios.map((convenio) => (
                    <tr key={convenio.id}
                        onClick={(e) => this.selecionaLinha(convenio.id)}
                        id={convenio.id}
                        className={convenio.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{convenio.razaoSocial || "-"}</td>
                      <td>{convenio.nomeFantasia || "-"}</td>
                      <td>{convenio.cnpj || convenio.cpf}</td>
                      <td>{convenio.telefone}</td>
                      <td>{convenio.contato}</td>
                      <td>{convenio.status}</td>
                      <td>{convenio.email}</td>
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

export default ConsultaConvenio;
