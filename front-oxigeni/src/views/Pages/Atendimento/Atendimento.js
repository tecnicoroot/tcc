import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
 } from "reactstrap";
 import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../../../componentes/formulario/input";
import FieldMask from "../../../componentes/formulario/input-mask";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./atendimento.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import moment from 'moment';
import Camara from "../../../componentes/camara";



var now = new Date();

const agenda = new Api("v1", "agenda");
const camara = new Api("v1", "camara");
const api3 = new Api("v1", "paciente");
const api4 = new Api("v1", "convenio");

const validacaoCadastro = Yup.object().shape({
  
  nome: Yup.string().required("O nome é obrigatório"),
  email: Yup.string().required("O email é obrigatório").email("Email inválido"),
});

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: '100%'
});

let id2List = {
  droppable: 'items',
  droppable2: 'atendimentos'

};
class AtendimentoClass {
  'id' = "";
  'id_paciente' = 0;
  'id_camara' = 0;
  'id_convenio' = 0;
  'id_agendamento' = 0;
  'data_hora_chegada_paciente' = "";
  'data_hora_inicio_procedimento' = "";
  'data_hora_fim_procedimento' = "";
  'nome' = '';
  'nascimento' = "";
}

class Paciente{
  nome = "";
  data_nascimento = "";
  sexo = "";
  cpf = "";
  identidade = "";
  celular = "";
  telefone = "";
  email = "";
  plano_saude = "";
  numero_plano = "";
  endereco = "";
  numero = "";
  complemento = "";
  bairro = "";
  cidade = "";
  estado = "";
  cep = "";
}


class Atendimento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: new Array(19).fill(false),
      listaAtendimento: [],
      camaras: [],
      items: [],
      atendimentos: [],
      modal: false,
      modalDadosPaciente: false,
      atendimento : new AtendimentoClass(),
      paciente : new Paciente()
    };

    this.dadosAgendamento();
  }

  async componentDidMount() {
    try {
      if (this.props.notificacao !== "") {
        if (this.props.notificacao === "Salvo com sucesso")
          toast.success(this.props.notificacao);
        if (this.props.notificacao === "Alterado com sucesso")
          toast.warning(this.props.notificacao);
        if (this.props.notificacao === "Removido com sucesso")
          toast.error(this.props.notificacao);
        
      }
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

  dadosAgendamento = async () => {
    const itens = [];
    const elementos = [];
    const { token } = localStorage;
    fetch('http://localhost:8080/v1/agendadia', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },

    }).then(response => response.json()

    ).then(data => {
      const { data: elements = [] } = data;


      elements.data.forEach(element => {
        const item = {};
        item._id = element.id;
        item.name = element.nome;
        item.startDateTime = new Date(element.data_hora_marcada);
        item.endDateTime = new Date(element.data_hora_marcada).setMinutes(140);
        item.classes = 'color-1';
        item.data_nascimento = element.data_nascimento;
        item.eh_paciente = element.eh_paciente;
        item.id_convenio = element.id_convenio;

        itens.push(item);

      });

      this.setState({ items: itens });    


    });

  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;

  };



  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  getList = id => this.state[id];

  onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = this.reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };
      this.setState(state);
    } else {

      const result = this.move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      })
    }
  }
  abrirModal = (item) => {
    const {atendimento } = this.state
   
    atendimento.nome = item.name;
    atendimento.nascimento = item.data_nascimento;
    
    this.setState({atendimento})
    this.setState({ modal: true})
    
  }
  fecharModal = () => {
    this.setState({ modal: false })
    
  }
  fecharModalDadosPaciente = () => {
    this.setState({ modalDadosPaciente: false })
  }
  cancelarModal = () => {
    this.props.history.push("/atendimentos");
  }
  handleBlur = (e) => {
    console.log(e.target.value);

  }

  validaDados = async (dados) => {
    //console.log(dados);
    const { token } = localStorage;
    const result = await api3.post('verificaExistePacienteAgendamento', 
        JSON.stringify({
          "nome": dados.nome, 
          "nascimento": dados.nascimento
        })
        ,
        {
          headers: {'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`},
        }).then(function(data) {
          return data;
         }
        );
    
    if(result != null || result != []){
      const result2 = await api4.get(`${result.data.data[0].plano_saude}`, 
        {
          headers: {'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`},
        }).then(function(data) {
          return data;
         }
        );

      const paciente = {};
      paciente.id = result.data.data[0].id;
      paciente.nome = result.data.data[0].nome;
      paciente.data_nascimento = result.data.data[0].data_nascimento;
      paciente.sexo = result.data.data[0].sexo;
      paciente.cpf = result.data.data[0].cpf;
      paciente.identidade = result.data.data[0].identidade;
      paciente.celular = result.data.data[0].celular;
      paciente.telefone = result.data.data[0].telefone;
      paciente.email = result.data.data[0].email;
      paciente.plano_saude = result2.data.data.data[0].nome;
      paciente.numero_plano = result.data.data[0].numero_plano;
      paciente.endereco = result.data.data[0].endereco;
      paciente.numero = result.data.data[0].numero;
      paciente.complemento = result.data.data[0].complemento;
      paciente.bairro = result.data.data[0].bairro;
      paciente.cidade = result.data.data[0].cidade;
      paciente.estado = result.data.data[0].estado;
      paciente.cep = result.data.data[0].cep;

      //console.log(paciente);
      this.setState({paciente})
      this.setState({modalDadosPaciente: true})
    }
  }

  editarpaciente = (id) => {
    this.props.history.push(`/paciente/editar/${id}`);
  }

  render() {

    return (
      <>
        <Row>
          <Col xs="12">
            <Card>

              <CardBody >
                <Row>
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    <Col xs="6">

                      <Camara titulo={
                        <>
                          Agendamentos
                        </>
                        }
                        body={
                          <Droppable droppableId="items">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.items.map((item, index) => (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item.name + item._id}
                                    index={index}

                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}>

                                        <Card className="card"
                                          style={{ color: item.eh_paciente == 0 ? "red" : "green" }}

                                        >
                                          <CardHeader>
                                            Paciente: {item.name} {item.eh_paciente}
                                          </CardHeader>
                                          <CardFooter>
                                            Data Nascimento: {moment(item.data_nascimento).format('DD/MM/YYYY')} <br></br>
                                            {

                                              item.eh_paciente == 0 ? (
                                                <>
                                                  <Button color="success" onClick={() => this.abrirModal(item)}>Cadastrar Paciente</Button>

                                                </>
                                              ) : ''

                                            }
                                          </CardFooter>
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        }
                      >
                      </Camara>

                    </Col>
                    <Col xs="6">
                    <Camara titulo={
                        <>
                          Confirmação Agendamento
                        </>
                        }
                        body={
                          <Droppable droppableId="atendimentos">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.atendimentos.map((item, index) => (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item.name + item._id}
                                    index={index}

                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}>

                                        <Card className="card"
                                          style={{ color: item.eh_paciente == 0 ? "red" : "green" }}

                                        >
                                          <CardHeader>
                                            Paciente: {item.name} {item.eh_paciente}
                                          </CardHeader>
                                          <CardFooter>
                                            Data Nascimento: {moment(item.data_nascimento).format('DD/MM/YYYY')} <br></br>
                                            {

                                              
                                                <>
                                                  <Button color="success" onClick={() => this.abrirModal(item)}>Cadastrar Atendimento</Button>

                                                </>
                                              

                                            }
                                          </CardFooter>
                                        </Card>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        }
                      >
                      </Camara>

   

                    </Col>
                  </DragDropContext>

                </Row>
              </CardBody>
            </Card>
          </Col>
          <Modal isOpen={this.state.modal} toggle={this.fecharModal}
            className={'modal-success ' + this.props.className + 'cadastro'}>
            <ModalHeader toggle={this.fecharModal}>Cadastro Atendimento</ModalHeader>
            <ModalBody>
            <Formik
                enableReinitialize={true}
                validationSchema={validacaoCadastro}
                initialValues={this.state.atendimento}
                onSubmit={this.salvar}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <FormGroup row>
                      <Col xl="12">
                        <FormGroup>
                          <Label for="nome">Nome*</Label>
                          <Field
                            htmlFor="nome"
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Insira o nome"
                            onBlur={(e) => this.handleBlur(e)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="nascimento">Data Nasc.</Label>
                          <Field
                            type="date"
                            id="dnascimento"
                            name="nascimento"
                            placeholder=""
                            
                          />
                        </FormGroup>
                      </Col>
                      </FormGroup>

                    <div className="d-flex justify-content-end mt-5">
                    <Button
                        style={{ width: "150px" }}
                        color="info"
                        className="btn mr-3"
                        onClick={() => this.validaDados(this.state.atendimento)}
                      >
                        Pesquisar
                      </Button>
                      <Button
                        style={{ width: "150px" }}
                        color="success"
                        className="btn mr-3"
                        type="submit"
                      >
                        {this.state.id ? "Atualizar" : "Salvar"}
                      </Button>

                      <Button
                        onClick={this.fecharModal}
                        style={{ width: "150px" }}
                        color="warning"
                        className="btn mr-3"
                      >
                        Cancelar
                      </Button>
                      
                    </div>
                  </Form>
                )}
              </Formik>        
            </ModalBody>
            <ModalFooter>
             
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalDadosPaciente} toggle={this.fecharModalDadosPaciente}
            className={'modal-info ' + this.props.className + 'cadastro'}>
            <ModalHeader toggle={this.fecharModalDadosPaciente}>Dados do Paciente</ModalHeader>
            <ModalBody>
              <Row>
                <Col xl="12"> 
                  <FormGroup>
                    <Label className="labelDados" for="nome">Nome: </Label>
                    <Label className="labelDados"><strong> {this.state.paciente.nome}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Data Nascimento: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.data_nascimento}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Telefone: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.telefone}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Celular: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.celular}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Email: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.email}</strong></Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl="12">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Endereco: </Label>
                    <Label className="labelDados"><strong>{ this.state.paciente.endereco}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Número: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.numero}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Compl.: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.complemento}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Bairro: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.bairro}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label  className="labelDados"for="nome">Cidade / UF: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.cidade} / {this.state.paciente.estado}</strong></Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Identidade: </Label>
                    <Label className="labelDados"><strong> {this.state.paciente.identidade}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label  className="labelDados"for="nome">CPF: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.cpf} </strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Plano de Saúde.: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.plano_saude}</strong></Label>
                  </FormGroup>
                </Col>
                <Col xl="6">
                  <FormGroup>
                    <Label className="labelDados" for="nome">Número plano.: </Label>
                    <Label className="labelDados"><strong>{this.state.paciente.numero_plano}</strong></Label>
                  </FormGroup>
                </Col>
               
              </Row>
           
            </ModalBody>
            <ModalFooter>
            <Button
                onClick={() => this.editarpaciente(this.state.paciente.id)}
                style={{ width: "150px" }}
                color="warning"
                className="btn mr-3"
              >
                Editar
              </Button>    
              <Button
                onClick={this.fecharModalDadosPaciente}
                style={{ width: "150px" }}
                color="danger"
                className="btn mr-3"
              >
                Fechar
              </Button>
            </ModalFooter>
          </Modal>
          
        


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

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
