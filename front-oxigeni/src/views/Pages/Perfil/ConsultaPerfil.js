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
import "./perfil.css";
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
      perfis: [],
    };

  }

  async componentDidMount() {
    try {
      const { data } = await axios.get("http://localhost:3100/perfil");
      this.setState({ perfis: data });
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
    if (localStorage.getItem("cadastroPerfil")){
      if(localStorage.getItem("cadastroPerfil") === "add") {
        notifyadd();
      }
      if (localStorage.getItem("cadastroPerfil") === "update") {
        notifyupdate();
      }
      if (localStorage.getItem("cadastroPerfil") === "del") {
        notifydel();
      }
      localStorage.removeItem("cadastroPerfil");
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
  cadastrarperfil = () => {
    this.props.history.push("/perfil/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  filtrar = async () => {
    const { textoPesquisa } = this.state;
    const { data } = await axios.get(`http://localhost:3100/perfil?q=${textoPesquisa}` );
    this.setState({perfis:data})
  }

  editarperfil = (id) => {
    this.props.history.push(`/perfil/editar/${id}`);
  }

  exibirperfil = (id) => {
    this.props.history.push(`/perfil/exibir/${id}`);
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
      alert("Selecione um perfil!");
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
              <h2><span>Consulta Perfil</span></h2>
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