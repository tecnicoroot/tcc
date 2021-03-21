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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notifyadd = (msn) => toast.success("Salvo com sucesso");
const notifyupdate = (msn) => toast.warning("Alterado com sucesso");
const notifydel = (msn) => toast.error("Removido com sucesso");
class ConsultaPaciente extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
      pacientes: [],
    };

  }

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:3100/paciente");
      this.setState({ pacientes: data });
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
    if (localStorage.getItem("cadastroPaciente")){
      if(localStorage.getItem("cadastroPaciente") === "add") {
        notifyadd();
      }
      if (localStorage.getItem("cadastroPaciente") === "update") {
        notifyupdate();
      }
      if (localStorage.getItem("cadastroPaciente") === "del") {
        notifydel();
      }
      localStorage.removeItem("cadastroPaciente");
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
    const { data } = await axios.get(`http://localhost:3100/paciente?q=${textoPesquisa}` );
    this.setState({pacientes:data})
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

  exibirpacienteSelecionado = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione um paciente!");
    }else{
      this.editarpaciente(linhaSelecionada);
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
              <h2><span>Consulta Paciente</span></h2>
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
                                    <Button onClick={this.cadastrarpaciente}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Novo
                  </Button>
                  <Button onClick={this.exibirpacienteSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
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
                  {this.state.pacientes.map((paciente) => (
                    <tr key={paciente.id}
                        onClick={(e) => this.selecionaLinha(paciente.id)}
                        id={paciente.id}
                        className={paciente.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{paciente.razaoSocial || "-"}</td>
                      <td>{paciente.nomeFantasia || "-"}</td>
                      <td>{paciente.cnpj || paciente.cpf}</td>
                      <td>{paciente.telefone}</td>
                      <td>{paciente.contato}</td>
                      <td>{paciente.status}</td>
                      <td>{paciente.email}</td>
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

export default ConsultaPaciente;