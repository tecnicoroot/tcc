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

const api1 = new Api("v1", "atendimento");
const api2 = new Api("v1", "camara");
const api3 = new Api("v1", "paciente");
const api4 = new Api("v1", "convenio");

const validacaoCadastro = Yup.object().shape({
  
  nome: Yup.string().required("O nome é obrigatório"),

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


class Procedimento extends Component {
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
      paciente : new Paciente(),
    };

    this.dadosAgendamento();
    this.dadosCamaras();
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
                                            Paciente: {item.name}
                                          </CardHeader>
                                          <CardFooter>
                                            Data Nascimento: {moment(item.data_nascimento).format('DD/MM/YYYY')} <br></br>
                                            {

                                              item.eh_paciente == 0 ? (
                                                <>
                                                  <Button color="success" onClick={() => this.abrirCadastroPaciente()}>Cadastrar Paciente</Button>

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
                                            Paciente: {item.name}
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
                        <FormGroup>
                          <Label for="id_camara">Camara*</Label>
                          <Field
                            label="Plano de Saúde"
                            id="id_camara"
                            name="id_camara"
                            component={(props) => (
                              <Input type="select" {...props}>
                                <option value="">Selecione</option>
                               {
                                  this.state.camaras.map((element, index)=>{
                                      return(<option key={element.id} value={element.id}>{element.nome} - {element.descricao}</option>);
                                    })
                              }
                            </Input>
                            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Procedimento);
