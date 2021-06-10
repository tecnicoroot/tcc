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
  droppable2: 'selected'

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
}


class Atendimento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: new Array(19).fill(false),
      listaAtendimento: [],
      camaras: [],
      items: [],
      selected: [],
      modal: false,
      atendimento : new AtendimentoClass()
    };

    this.dadosAtendimento();
    this.dadosCamaras();

  }

  cadastrarAtendimento = () => {
    this.props.history.push("/atendimento/cadastrar");
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
  dadosCamaras = () => {
    const { token } = localStorage;
    fetch('http://localhost:8080/v1/camara', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },

    }).then(response => response.json()

    ).then(data => {
      const { data: elements = [] } = data;
      const itens = [];
      let nome = 0
      elements.data.forEach(element => {
         const item = {};
        item.id = element.id
        item.nome = element.nome;
        item.descricao = element.descricao;
        item.nome_descricao_sem_espaco = element.nome_descricao_sem_espaco;
        this.setState({ [item.nome_descricao_sem_espaco]: [] });
        itens.push(item);
      });

      this.setState({ camaras: itens });
    });
  }

  dadosAtendimento = async () => {
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

      if (destination.droppableId != 'items' && this.state[destination.droppableId].length > 0) {

        toast.error("Já existe um paciente em atendimento neste camara!");
        return;
      }

      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      })
    }
  }

  abrirModal = () => {
    //this.setState({ modal: true})
    this.props.history.push("/paciente/cadastrar");
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/atendimentos");
  }

  abrirModalCadastroAtendimento = (dados, camara) => {
    console.log(dados)
    const {atendimento } = this.state
    atendimento.id_agendamento = dados._id;
    atendimento.id_convenio = dados.id_convenio;
    atendimento.id_camara = camara
    
    this.setState({atendimento})
    this.setState({ modal: true})


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
                                                  <Button color="success" onClick={this.abrirModal}>Cadastrar Paciente</Button>

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
                      {
                        this.state.camaras.map((camara, index) => (
                          <Camara style="wi" titulo={camara.nome_descricao_sem_espaco} key={camara.id}
                            body={
                              <Droppable droppableId={camara.nome_descricao_sem_espaco}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {this.state[`${camara.nome_descricao_sem_espaco}`].map((item, index) => (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item.name + item._id}
                                        index={index}>
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                              )}>
                                              {item.content}
                                              <Card className="card">
                                                <CardHeader>
                                                  Paciente: {item.name} Data Nascimento: {moment(item.data_nascimento).format('DD/MM/YYYY')}
                                                </CardHeader>
                                                <CardFooter>
                                                  <Row>

                                                    <Button className="btnagenda" color="info" onClick={() => this.abrirModalCadastroAtendimento(item, camara.id)}>Cadastro Atendimento</Button>

                                                    <Button className="btnagenda" color="success" onClick={this.abrirModalCadastroAtendimento}>Iníciar Atendimento</Button>


                                                    <Button className="btnagenda" color="success" onClick={this.abrirModalCadastroAtendimento}>Iníciar Procedimento</Button>

                                                    <Button className="btnagenda" color="danger" onClick={this.abrirModalCadastroAtendimento}>Finalizar Procedimento</Button>

                                                    <Button className="btnagenda" color="danger" onClick={this.abrirModalCadastroAtendimento}>Finalizar Atendimento</Button>

                                                  </Row>

                                                </CardFooter>
                                              </Card>
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>

                            }
                          >

                          </Camara>
                        ))
                      }

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
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="4">
                        <FormGroup>
                          <Label for="id_paciente">ID</Label>
                          <Field
                            htmlFor="id_paciente"
                            type="number"
                            id="id_paciente"
                            name="id_paciente"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col xl="4">
                        <FormGroup>
                          <Label for="id_agendamento">Agendamento*</Label>
                          <Field
                            htmlFor="id_agendamento"
                            type="number"
                            id="id_agendamento"
                            name="id_agendamento"
                            placeholder="número de identificação"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="4">
                        <FormGroup>
                          <Label for="id_convenio">Convênio*</Label>
                          <Field
                            htmlFor="id_convenio"
                            type="number"
                            id="id_convenio"
                            name="id_convenio"
                            placeholder="número de identificação"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="4">
                        <FormGroup>
                          <Label for="id_camara">Camara*</Label>
                          <Field
                            htmlFor="id_camara"
                            type="number"
                            id="id_camara"
                            name="id_camara"
                            placeholder="número de identificação"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>


 
                   


                    <div className="d-flex justify-content-end mt-5">
                      <Button
                        style={{ width: "150px" }}
                        color="success"
                        className="btn mr-3"
                        type="submit"
                      >
                        {this.state.id ? "Atualizar" : "Salvar"}
                      </Button>

                      <Button
                        onClick={this.abrirModal}
                        style={{ width: "150px" }}
                        color="warning"
                        className="btn mr-3"
                      >
                        Cancelar
                      </Button>
                      {this.state.id ? (
                        <Button
                          onClick={this.abrirModalRemover}
                          style={{ width: "150px" }}
                          color="danger"
                          className="btn mr-3 hide"
                        >
                          Apagar
                        </Button>
                      ) : (
                          ""
                        )}

                    </div>
                  </Form>
                )}
              </Formik>        
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.fecharModal}>Cancelar</Button>
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
