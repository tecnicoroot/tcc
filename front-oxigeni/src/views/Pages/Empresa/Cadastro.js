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
import "./empresa.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"



const api = new Api("v1","empresa");

const validacaoCadastro = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  perfil: Yup.string().required("O perfil é obrigatório"),
  status: Yup.string().required("O status é obrigatório"),
  password: Yup.string().required('A senha é obrigatória'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('A senha é obrigatória'),
  email: Yup.string().required("O email é obrigatório").email("Email inválido"),
});

class Empresa {
  pessoa = "física";
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
  ie = "";
  fax = "";
}

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRemover: false,
      id: "",
      empresa: new Empresa(),
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
      const { data } = await api.get(`${id}`)
      this.setState({ empresa: data });
    }
  }

  salvar = async (empresa) => {
     console.log(empresa)
      await api.post("register", empresa);
      this.props.setStatusNotificacao("SUCCESS");
      
      this.props.history.push('/empresa');
  };

  abrirModal = () => {
    this.setState({ modal: true })
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/empresa");
  }

  abrirModalRemover = () => {
    this.setState({ modalRemover: true })
  }
  fecharModalRemover = () => {
    this.setState({ modalRemover: false })
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
                    <h2><span>Cadastro de empresa</span> </h2>
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
                initialValues={this.state.empresa}
                onSubmit={this.salvar}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <FormGroup row className="justify-content-center">
                      <Field
                        name="pessoa"
                        component={(props) => (
                          <>
                            <FormGroup check inline>
                              <Input
                                {...props}
                                valid={null}
                                type="radio"
                                id="fisica"
                                value="física"
                                checked={props.value === "física"}
                                onChange={(e) => {
                                  props.onChange(e);
                                  this.setPessoaFisica();
                                  setFieldValue("cnpj", "", false);
                                  setFieldValue("razaoSocial", "", true);
                                  setFieldValue("nomeFantasia", "", false);
                                }}
                              />
                              <Label check for="fisica">
                                Pessoa Física
                              </Label>
                            </FormGroup>

                            <FormGroup check inline>
                              <Input
                                {...props}
                                valid={null}
                                type="radio"
                                id="juridica"
                                value="jurídica"
                                checked={props.value === "jurídica"}
                                onChange={(e) => {
                                  props.onChange(e);
                                  this.setPessoajuridica();
                                  setFieldValue("cpf", "", false);
                                }}
                              />
                              <Label check for="juridica">
                                Pessoa Jurídica
                              </Label>
                            </FormGroup>
                          </>
                        )}
                      />
                    </FormGroup>

                    <FormGroup row>
                      <Col xl="1">
                        <FormGroup>
                          <Label htmlFor="codigo">Código</Label>
                          <Input
                            type="text"
                            id="codigo"
                            placeholder="código"
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="4">
                        <FormGroup>
                          <Label for="razao_social">Razão Social / Nome*</Label>
                          <Field
                            htmlFor="razao_social"
                            type="text"
                            id="razao_social"
                            name="razao_social"
                            placeholder="Insira a Razão Social"

                          />
                        </FormGroup>
                      </Col>

                      <Col xl="4">
                        <FormGroup>
                          <Label for="nome_fantasia">Nome Fantasia*</Label>
                          <Field
                            type="text"
                            id="nome_fantasia"
                            name="nome_fantasia"
                            placeholder="Insira o nome fantasia"
                            disabled={this.state.pessoaJuridica}
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="3">
                        <FormGroup>
                          <Label htmlFor="cnpj">CNPJ*</Label>
                          <FieldMask
                            placeholder="ex 99.999.999/9999-99"
                            mask="99.999.999/9999-99"
                            name="cnpj"
                            disabled={this.state.pessoaJuridica}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="3">
                        <FormGroup>
                          <Label htmlFor="ie">Inscrição estadual</Label>
                          <FieldMask
                            placeholder="ex Isento"
                            
                            name="ie"
                           
                          />
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col xl="2">
                        <FormGroup>
                          <Label for="cpf">CPF*</Label>
                          <FieldMask
                            placeholder="Ex: 999.999.999-99"
                            mask="999.999.999-99"
                            name="cpf"
                            label="CPF"
                            disabled={this.state.pessoaFisica}
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="2">
                        <FormGroup>
                          <Label for="status">Status*</Label>
                          <Field
                            label="Status"
                            id="status"
                            name="status"
                            component={(props) => (
                              <Input type="select" {...props}>
                                <option value="">Selecione um status</option>
                                <option value="ativo">Ativo</option>
                                <option value="suspenso">Suspenso</option>
                                <option value="destivado">Desativado</option>
                              </Input>
                            )}
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="2">
                        <FormGroup>
                          <Label for="cep">CEP*</Label>
                          <FieldMask
                            placeholder="Ex: 99999-999"
                            mask="99999-999"
                            name="cep"
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="3">
                        <FormGroup>
                          <Label for="cidade">Cidade*</Label>
                          <Field type="text" id="cidade" name="cidade" />
                        </FormGroup>
                      </Col>
                      <Col xl="3">
                        <FormGroup>
                          <Label for="bairro">Bairro</Label>
                          <Field type="text" id="bairro" name="bairro" />
                        </FormGroup>
                      </Col>
                      <Col xl="3">
                        <FormGroup>
                          <Label for="estado">Estado*</Label>
                          <Field type="text" id="estado" name="estado" />
                        </FormGroup>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col xl="5">
                        <FormGroup>
                          <Label for="endereco">Endereco*</Label>
                          <Field
                            type="text"
                            id="endereco"
                            name="endereco"
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="2">
                        <FormGroup>
                          <Label htmlFor="numero">Número*</Label>
                          <Field type="text" name="numero" id="numero" />
                        </FormGroup>
                      </Col>

                      <Col xl="5">
                        <FormGroup>
                          <Label for="complemento">Complemento</Label>
                          <Field
                            type="text"
                            name="complemento"
                            id="complemento"
                          />
                        </FormGroup>
                      </Col>


                    </FormGroup>

                    <FormGroup row>
                      <Col xl="6">
                        <FormGroup>
                          <Label for="contato">Contato*</Label>
                          <Field
                            type="text"
                            id="contato"
                            name="contato"
                            placeholder="ex Maria"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="telefone">Telefone Comercial*</Label>
                          <FieldMask
                            type="text"
                            id="telefone"
                            name="telefone"
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
                        <FormGroup>
                          <Label for="email">E-mail*</Label>
                          <Field
                            type="text"
                            id="email"
                            name="email"
                            placeholder="ex: nome@email.com"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="licenca">Número de Licenças*</Label>
                          <Field
                            type="text"
                            id="licenca"
                            name="licenca"
                            placeholder="0"
                          />
                        </FormGroup>
                      </Col>

                      <Col xl="6">
                      <Label for="imagem">Logo</Label>
                        <Card className="h-100">
                          <CardBody>
                           <img src={profileImg} alt="" id="img" className="img" />
                          </CardBody>
                          <CardFooter>
                            <Field type="file" accept="image/*" name="image" id="image" onChange={this.imageHandler} />
                          </CardFooter>
                        </Card>
                      </Col>
                    </FormGroup>

                    <div className="d-flex justify-content-end mt-5">
                      <Button
                        style={{ width: "150px" }}
                        color="success"
                        className="btn mr-3"
                        type="submit"
                      >
                        { this.state.id ?"Atualizar" : "Salvar"}
                      </Button>

                      <Button
                        onClick={this.abrirModal}
                        style={{ width: "150px" }}
                        color="warning"
                        className="btn mr-3"
                      >
                        Cancelar
                      </Button>
                      { this.state.id ? (
                        <Button
                        onClick={this.abrirModalRemover}
                        style={{ width: "150px"}}
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
            Tem certeza que deseja excluir este empresa? {this.state.empresa.razaoSocial }`?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={ () => this.excluirempresa(this.state.empresa.id)}>Sim</Button>{' '}
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

