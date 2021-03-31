import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
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
import "./usuario.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"


const api = new Api("v1", "user");

const validacaoCadastro = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string().required("O e-mail é obrigatório"),
  perfil: Yup.string().required("O perfil é obrigatório"),
  status: Yup.string().required("O status é obrigatório"),  
});

class Usuario {
  name = "";
  perfil = "";
  status = "";
  email = "";
}

class EditarUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRemover: false,
      id: "",
      usuario: new Usuario(),
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    if (id) {
      this.setState({disabled:true}) ;
      this.setState({ id }) // mesmo nome da variável
      //console.log(id);
      const { data } = await api.get(`${id}`)
      //console.log(data);
      this.setState({ usuario: data.data });
      //console.log(this.state.usuario);
    }
  }

  salvar = async (usuario) => {
    const { id } = this.state;
    //console.info(usuario);  
    await api.put(`register/${id}`, usuario);
    this.props.setStatusNotificacao("WARNING");
       
      this.props.history.push('/usuario');
  };

  abrirModal = () => {
    this.setState({ modal: true })
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/usuario");
  }

  abrirModalRemover = () => {
    this.setState({ modalRemover: true })
  }
  fecharModalRemover = () => {
    this.setState({ modalRemover: false })
  }

  excluirUsuario = async (id) => {
    if (id) {
        await api.delete(`destroy/${id}`);
    }
    this.props.setStatusNotificacao("ERROR");
    this.props.history.push("/Usuario");
  }

  render() {
    return (
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <FormGroup row>
                <Col xl="4">
                  <Col xl="12" >
                    <FormGroup row className="botoes-tela-lista">
                      <h2><span>Editar de Usuário</span> </h2>
                    </FormGroup>
                  </Col>
                </Col>

              </FormGroup>
            </CardHeader>
            <CardBody>
              <Formik
                enableReinitialize={true}
                validationSchema={validacaoCadastro}
                initialValues={this.state.usuario}
                onSubmit={this.salvar}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <FormGroup row>
                      <Col xl="6">
                        <FormGroup>
                          <Label for="name">Nome*</Label>
                          <Field
                            htmlFor="name"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Insira o nome"
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="6">
                        <FormGroup>
                          <Label for="email">E-mail*</Label>
                          <Field
                            type="text"
                            id="email"
                            name="email"
                            placeholder="ex: nome@email.com"
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col xl="4">
                        <FormGroup>
                          <Label for="perfil">Perfil*</Label>
                          <Field
                            label="Perfil"
                            name="perfil"
                            component={(props) => (
                              <Input type="select" {...props}>
                                <option value="">Selecione um Perfil</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Secretária">Secretária</option>
                                <option value="Enfermeiro">Enfermeiro</option>
                                <option value="Médico">Médico</option>
                              </Input>
                            )}
                          />
                        </FormGroup>

                      </Col>


                      <Col xl="4">
                        <FormGroup>
                          <Label for="status">Status*</Label>
                          <Field
                            label="Status"
                            name="status"
                            component={(props) => (
                              <Input type="select" {...props}>
                                <option value="">Selecione um status</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Desativado">Desativado</option>
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
          className={'modal-success ' + this.props.className + 'cancela'}>
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
          className={'modal-danger ' + this.props.className + 'exclui'}>
          <ModalHeader toggle={this.fecharModalRemover}>Confirmar Remoção?</ModalHeader>
          <ModalBody>
            Tem certeza que deseja excluir este usuário? {this.state.usuario.email}`?
            </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.excluirUsuario(this.state.usuario.id)}>Sim</Button>{' '}
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

export default connect(mapStateToProps,mapDispatchToProps)(EditarUsuario);

