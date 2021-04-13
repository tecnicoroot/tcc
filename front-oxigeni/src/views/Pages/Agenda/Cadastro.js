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
import "./agenda.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"



const api = new Api("v1","agenda");

const validacaoCadastro = Yup.object().shape({
  
  nome: Yup.string().required("O nome é obrigatório"),
  descricao: Yup.string().required("O descrição é obrigatório"),
});

class Agenda {
  nome = "";
  data_nascimento = "";
  data_hora_marcada = "";
  eh_paciente = "";
}

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRemover: false,
      id: "",
      agenda: new Agenda(),
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    if (id) {
      this.setState({disabled:true}) ;
      this.setState({ id }) // mesmo nome da variável
      const { data } = await api.get(`${id}`)
      this.setState({ agenda: data });
    }
  }

  salvar = async (agenda) => {
     console.log(agenda)
      await api.post("register", agenda);
      this.props.setStatusNotificacao("SUCCESS");
      
      this.props.history.push('/agenda');
  };

  abrirModal = () => {
    this.setState({ modal: true })
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/agenda");
  }

  abrirModalRemover = () => {
    this.setState({ modalRemover: true })
  }
  fecharModalRemover = () => {
    this.setState({ modalRemover: false })
  }
  
  render() {
    const { profileImg} = this.state
    return (
      <Row>
         <Col xs="12" sm="12">
          <Card>
          <CardHeader>
                <FormGroup row>
                  <Col xl="4">
                  <Col xl="12" >
                    <FormGroup row className="botoes-tela-lista">
                    <h2><span>Cadastro de Agenda</span> </h2>
                    </FormGroup>
                  </Col>
                  </Col>

                </FormGroup>
              </CardHeader>
              <CardBody>
              <Formik
                enableReinitialize={true}
                validationSchema={validacaoCadastro}
                initialValues={this.state.agenda}
                onSubmit={this.salvar}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <FormGroup row>
                      <Col xl="6">
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
                     
                    </FormGroup>

                    <FormGroup row>
                    <Col xl="6">
                        <FormGroup>
                          <Label for="descricao">Descrição</Label>
                          <Field
                            type="text"
                            id="descricao"
                            name="descricao"
                            placeholder="ex: Descrição do equipamento."
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="6">
                      <FormGroup>
                          <Label for="em_manutencao">Em manutenção*</Label>
                          <Field
                            label="em_manutencao"
                            name="em_manutencao"
                            component={(props) => (
                              <Input type="select" {...props}>
                                <option value="">Selecione um Perfil</option>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                              </Input>
                            )}
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
            </CardBody>
          </Card>
        </Col>
        <Modal isOpen={this.state.modal} toggle={this.fecharModal}
                className={'modal-success ' + this.props.className+'cancela'}>
          <ModalHeader toggle={this.fecharModal}>Cancelar Edição</ModalHeader>
          <ModalBody>
            Tem certeza que dejesa cancelar?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.cancelarModal}>Sim</Button>{' '}
            <Button color="secondary" onClick={this.fecharModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalRemover} toggle={this.fecharModalRemover}
                className={'modal-danger ' + this.props.className+'exclui'}>
            <ModalHeader toggle={this.fecharModalRemover}>Confirmar Remoção?</ModalHeader>
            <ModalBody>
            Tem certeza que deseja excluir este agenda? {this.state.agenda.razaoSocial }`?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={ () => this.excluiragenda(this.state.agenda.id)}>Sim</Button>{' '}
              <Button color="secondary" onClick={this.cancelarModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        
      </Row>
    );
  }
}
const mapStateToProps = state => ({
  notificacao: state.notificacao
});

const mapDispatchToProps = dispatch => ({
  setStatusNotificacao: status => dispatch(SET_STATUS_NOTIFICACAO(status))
});

export default connect(mapStateToProps,mapDispatchToProps)(Cadastro);

