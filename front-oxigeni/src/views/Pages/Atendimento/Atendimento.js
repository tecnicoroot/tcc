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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./atendimento.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import moment from 'moment';
import Camara from "../../../componentes/camara";

const api1 = new Api("v1", "atendimento");

const api3 = new Api("v1", "paciente");

const api5 = new Api("v1", "agenda");

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

class AtendimentoClass {
  'id' = null;
  'id_paciente' = 0;
  'id_camara' = 1;
  'id_convenio' = 0;
  'id_agendamento' = 0;
  'data_hora_chegada_paciente' = null;
  'data_hora_inicio_procedimento' = null;
  'data_hora_fim_procedimento' = null;
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
  dadosAgendamento = async () => {
    const itens = [];
    const itens2 =[]
    
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
      const filtro = elements.data.filter(function(data){
        
        return data.comfirmado === 0 || data.comfirmado === null;
      })

      const filtro2 = elements.data.filter(function(data){
        
        return data.comfirmado === 1;
      })

      filtro.forEach(element => {
        const item = {};
        item._id = element.id;
        item.name = element.nome;
        item.startDateTime = new Date(element.data_hora_marcada);
        item.endDateTime = new Date(element.data_hora_marcada).setMinutes(140);
        item.classes = 'color-1';
        item.data_nascimento = element.data_nascimento;
        item.eh_paciente = element.eh_paciente;
        item.id_convenio = element.id_convenio;
        item.comfirmado = element.comfirmado;

        itens.push(item);

      });

      filtro2.forEach(element => {
       
        itens._id = element.id;
        itens.name = element.nome;
        itens.startDateTime = new Date(element.data_hora_marcada);
        itens.endDateTime = new Date(element.data_hora_marcada).setMinutes(140);
        itens.classes = 'color-1';
        itens.data_nascimento = element.data_nascimento;
        itens.comfirmado = element.comfirmado;
        itens.eh_paciente = element.eh_paciente;
        itens.id_convenio = element.id_convenio;

        itens2.push(itens);

      });

      this.setState({ items: itens });    
      this.setState({ atendimentos: itens2 });    

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

      if (result.atendimentos[0].eh_paciente == null || result.atendimentos[0].eh_paciente == 0) {

        toast.error("Deve ser realizado o cadastro do paciente antes de confimar o agendamento!");
        return;
      }


      this.setState({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      })
    }
  }
  abrirCadastroPaciente = () => {
    this.props.history.push(`/paciente/cadastrar`);
  }

  abrirModal = (item) => {
    const {atendimento } = this.state
    console.log("item", item)
    atendimento.nome = item.name;
    atendimento.nascimento = item.data_nascimento;
    atendimento.id_agendamento = item._id;
    atendimento.id_convenio = item.id_convenio;
    atendimento.agenda = item;
    
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
    
    if(result.data.data !== null || result.data.data !== [] || result.data.data.length != '0'){
      console.log(result.data.data.length )
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
      paciente.plano_saude = result.data.data[0].plano_saude;
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

  salvar = async (atendimento) => {
    atendimento.id_paciente = this.state.paciente.id;
    const { agendamentos } = this.state;
    const {agenda } = atendimento
   /* const filtro = this.state.agendamentos.filter(function(agendamento){
      return agendamento.nome == this.state.paciente.nome && agendamento.data_nascimento == this.state.paciente.data_nascimento;
    });
    */
    //console.log("agendamentos", agendamentos);
    console.log("filtro", agenda);
    
    await api1.post("register", atendimento);
    agenda.comfirmado = 1;
    await api5.put(`register/${agenda._id}`, agenda);
    
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
                          Atendimentos Confirmados
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
                                              item.comfirmado != 1 ? (
                                                <>
                                                <Button color="success" onClick={() => this.abrirModal(item)}>Cadastrar Atendimento</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
