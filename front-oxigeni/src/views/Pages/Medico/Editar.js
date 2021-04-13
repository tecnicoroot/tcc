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
import "./medico.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"


const api = new Api("v1", "medic");

const validacaoCadastro = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  crm: Yup.string().required("O perfil é obrigatório"),
  email: Yup.string().required("O email é obrigatório").email("Email inválido"),
});

class Medico {
  id = "";
  razao_social = "";
  nome_fantasia = "";
  status = "";
  cep = "";
  endereco = "";
  numero = "";
  complemento = "";
  cidade = "";
  estado = "";
  cnpj = "";
  cpf = "";
  contato = "";
  telefone = "";
  email = "";
  logo = "";
  licenca =  0;
}

class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRemover: false,
      id: "",
      medico: new Medico(),
      pessoaJuridica: true,
      pessoaFisica: false,
      profileImg:'',
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    if (id) {
      this.setState({disabled:true}) ;
      this.setState({ id }) // mesmo nome da variável
      //console.log(id);
      const { data } = await api.get(`${id}`)
      
      
      if(data.data.cnpj != ""){
        data.data.pessoa = "jurídica";
        this.setPessoajuridica();
      }else{
        data.data.pessoa = "física";
        this.setPessoaFisica();
      }
      this.setState({ medico: data.data });
      
    }
  }

  salvar = async (medico) => {
    const { id } = this.state;
    //console.info(medico);  
    await api.put(`register/${id}`, medico);
    this.props.setStatusNotificacao("WARNING");
       
      this.props.history.push('/medico');
  };

  abrirModal = () => {
    this.setState({ modal: true })
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/medico");
  }

  abrirModalRemover = () => {
    this.setState({ modalRemover: true })
  }
  fecharModalRemover = () => {
    this.setState({ modalRemover: false })
  }

  excluirmedico = async (id) => {
    if (id) {
        await api.delete(`destroy/${id}`);
    }
    this.props.setStatusNotificacao("ERROR");
    this.props.history.push("/medico");
  }

  setPessoajuridica = () => {
    this.setState({ pessoaJuridica: false, pessoaFisica: true });
  };

  setPessoaFisica = () => {
    this.setState({ pessoaFisica: false, pessoaJuridica: true });
  };
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
                      <h2><span>Editar de Usuário</span> </h2>
                    </FormGroup>
                  </Col>
                </Col>

              </FormGroup>
            </CardHeader>
            <CardBody>
            <Formik
                enableReinitialize={true}
                // remover este comentário 
                validationSchema={validacaoCadastro}
                validationSchema={null}
                initialValues={this.state.medico}
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

                    <Col xl="6">
                      <FormGroup>
                        <Label for="crm">CRM</Label>
                        <Field
                          type="text"
                          id="crm"
                          name="crm"
                          placeholder="ex: mg 99999"
                        />
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  <Col xl="6">
                      <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Field
                          type="text"
                          id="email"
                          name="email"
                          placeholder="ex: medico@medico.com"
                        />
                      </FormGroup>
                    </Col>
                    <Col xl="6">
                      <FormGroup>
                      <Label for="telefone">Telefone</Label>
                        <FieldMask
                          type="text"
                          id="telefone"
                          name="telefone"
                          mask="(99) 99999-9999"
                          placeholder="ex (99) 9999-99999"
                        />
                      </FormGroup>
                      <FormGroup>
                      <Label for="celular">Celular</Label>
                        <FieldMask
                          type="text"
                          id="celular"
                          name="celular"
                          mask="(99) 99999-9999"
                          placeholder="ex (99) 9999-99999"
                        />
                      </FormGroup>
                      <FormGroup>
                      <Label for="fax">Fax</Label>
                        <FieldMask
                          type="text"
                          id="fax"
                          name="fax"
                          mask="(99) 99999-9999"
                          placeholder="ex (99) 9999-99999"
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
            Tem certeza que deseja excluir este usuário? {this.state.medico.email}`?
            </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.excluirmedico(this.state.medico.id)}>Sim</Button>{' '}
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

export default connect(mapStateToProps,mapDispatchToProps)(Editar);

