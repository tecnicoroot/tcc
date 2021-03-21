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
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../../../componentes/formulario/input";
import FieldMask from "../../../componentes/formulario/input-mask";
import axios from "axios";
import "./perfil.css";

const validacaoCadastro = Yup.object().shape({
    razaoSocial: Yup.string().when("pessoa", (pessoa, schema) => {
      const isPessoaJuridica = pessoa === "jurídica";
      return isPessoaJuridica
        ? schema
            .max(240, "O tamanho máximo é de 240 caracteres")
            .required("A razão social é obrigatória. ")
        : schema.notRequired();
    }),

    nomeFantasia: Yup.string().when("pessoa", (pessoa, schema) => {
      const isPessoaJuridica = pessoa === "jurídica";
      return isPessoaJuridica
        ? schema
            .max(240, "O tamanho máximo é de 240 caracteres")
            .required("O nome fantasia é obrigatório. ")
        : schema.notRequired();
    }),

    cnpj: Yup.string().when("pessoa", (pessoa, schema) => {
      return pessoa === "jurídica"
        ? schema
            .required("Informe um CNPJ válido")
            .matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/g, {
              message: "Informe um CNPJ válido.",
            })
        : schema.notRequired();
    }),

    cpf: Yup.string().when("pessoa", (pessoa, schema) => {
      return pessoa === "física"
        ? schema
            .required("Informe um CPF válido.")
            .matches(/^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$/, {
              message: "Informe um CPF válido.",
            })
        : schema.notRequired();
    }),

    status: Yup.string().required("O status é obrigatório"),

    cep: Yup.string()
      .max(9, "O tamanho é de 9 caracteres")
      .required("O cep é obrigatório.")
      .matches(/[0-9]{5}-[\d]{3}/g, {
        message: "Informe um cep válido",
      }),

    cidade: Yup.string().required("A cidade é obrigatória."),

    estado: Yup.string().required("O estado é obrigatório."),

    logradouro: Yup.string().required("O logradouro é obrigatório."),

    numero: Yup.number()
      .typeError("informe um número válido")
      .integer("informe um número válido")
      .required("O número é obrigatório"),

    contato: Yup.string().required("O contato é obrigatório"),

    telefone: Yup.string()
      .required("O telefone é obrigatório")
      .matches(/\(\d{2,}\) \d{4,}-\d{4}/g, { message: "Telefone inválido" }),

    email: Yup.string().required("O email é obrigatório").email("Email inválido"),
  });

  class Paciente {
    pessoa = "física";
    codigo = "";
    razaoSocial = "";
    nomeFantasia = "";
    status = "";
    cep = "";
    logradouro = "";
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

  class CadastroPaciente extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        modalRemover: false,
        id:"",
        pessoaJuridica: true,
        pessoaFisica: false,
        profileImg:'',
        paciente: new Paciente(),
      };
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        if(id){
          this.setState({ id }) // mesmo nome da variável
          const { data } = await axios.get(`http://localhost:3100/paciente/${id}` );

          this.setState({paciente: data});
          if(this.state.paciente.pessoa === "física"){
            this.setPessoaFisica();
          }else{
            this.setPessoajuridica();
          }
        }
      }

      setPessoajuridica = () => {
        this.setState({ pessoaJuridica: false, pessoaFisica: true });
      };

      setPessoaFisica = () => {
        this.setState({ pessoaFisica: false, pessoaJuridica: true });
      };

      salvar = async (paciente) => {
        const { id } = this.state;
        if(this.state.profileImg !== ""){
          paciente.logo =  this.state.profileImg;
        };
        if(id){
          await axios.put(`http://localhost:3100/paciente/${id}`, paciente);
          localStorage.setItem("cadastroPaciente", "update");
        }else{
          await axios.post("http://localhost:3100/paciente", paciente);
          localStorage.setItem("cadastroPaciente", "add");
        }
        this.props.history.push('/paciente');
      };

      abrirModal = () =>{
        this.setState({ modal: true})
      }
      fecharModal = () => {
       this.setState({ modal: false})
      }
      cancelarModal = () => {
        this.props.history.push("/paciente");
      }

      abrirModalRemover = () => {
       this.setState({ modalRemover: true})
      }
      fecharModalRemover = () => {
       this.setState({ modalRemover: false})
      }

      excluirpaciente = async (id) =>{
        if(id){
         await axios.delete(`http://localhost:3100/paciente/${id}`);
        }
        localStorage.setItem("cadastroPaciente", "del");
        this.props.history.push("/paciente");
      }
      imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({profileImg: reader.result});
          }
        }
        reader.readAsDataURL(e.target.files[0])
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
                        <h2><span>Cadastro Paciente</span> </h2>
                        </FormGroup>
                      </Col>
                      </Col>

                    </FormGroup>
                  </CardHeader>
                <CardBody>
                  <Formik
                    enableReinitialize={true}
                    validationSchema={validacaoCadastro}
                    initialValues={this.state.paciente}
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
                              <Label for="razaoSocial">Razão Social / Nome*</Label>
                              <Field
                                htmlFor="razaoSocial"
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                placeholder="Insira a Razão Social"

                              />
                            </FormGroup>
                          </Col>

                          <Col xl="4">
                            <FormGroup>
                              <Label for="nomeFantasia">Nome Fantasia*</Label>
                              <Field
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
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
                              <Label for="estado">Estado*</Label>
                              <Field type="text" id="estado" name="estado" />
                            </FormGroup>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col xl="5">
                            <FormGroup>
                              <Label for="logradouro">Logradouro*</Label>
                              <Field
                                type="text"
                                id="logradouro"
                                name="logradouro"
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
                Tem certeza que deseja excluir este paciente? {this.state.paciente.razaoSocial }`?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={ () => this.excluirpaciente(this.state.paciente.id)}>Sim</Button>{' '}
                  <Button color="secondary" onClick={this.cancelarModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>
          </Row>
        );
      }
    }

    export default CadastroPaciente;