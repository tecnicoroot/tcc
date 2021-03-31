import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Row,
  Button,

} from "reactstrap";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../../../componentes/formulario/input";
import "./usuario.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";

const api = new Api("v1","user");

const validacaoCadastro = Yup.object().shape({
  password: Yup.string().required('A senha é obrigatória'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('A senha é obrigatória'),
  });

class Usuario {
  password = "";
  password_confirmation = "";
}

class EditarSenha extends Component {
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
      const { data } = await api.get(`${id}`)
      this.setState({ usuario: data });
    }
  }

  salvar = async (usuario) => {
    const { id } = this.state;
    if (id) {
            await api.put(`register/${id}`, usuario);
            this.props.setStatusNotificacao("WARNING");
    } else {
            await api.post("register", usuario);
    }
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
                      <h2><span>Trocar Senha</span> </h2>
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

                      <Col xl="4">
                        <FormGroup>
                          <Label for="password">Senha*</Label>
                          <Field
                            htmlFor="password"
                            type="password"
                            id="password"
                            name="password"
                           

                          />
                        </FormGroup>
                      </Col>
                      <Col xl="4">

                        <FormGroup>
                          <Label for="password_confirmation">Confirmar*</Label>
                          <Field
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            
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
                      
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
       
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

export default connect(mapStateToProps,mapDispatchToProps)(EditarSenha);

//export default EditarSenha;
