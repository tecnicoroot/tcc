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
import "./paciente.css";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao"

const api = new Api("v1", "paciente");
const api2 = new Api("v1","convenio");

const validacaoCadastro = Yup.object().shape({
  nome: Yup.string().required("O nome é obrigatório"),
  email: Yup.string().required("O email é obrigatório").email("Email inválido"),
});

class Paciente {
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

class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalRemover: false,
      id: "",
      paciente: new Paciente(),
      planos : [],
      nome : "",
      data_nascimento : ""
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    
    if (id) {
      this.setState({disabled:true}) ;
      this.setState({ id }) // mesmo nome da variável
      //console.log(id);
      const { data } = await api.get(`${id}`)

      this.setState({ paciente: data.data });
      const planos  = await api2.get("");
      this.setState({ planos: planos.data.data.data });
    }
  }

  salvar = async (paciente) => {
    const { id } = this.state;
    const { token } = localStorage;
    //console.info(paciente);  
    await api.put(`register/${id}`, paciente);
    console.log( paciente.nome,  paciente.data_nascimento )
    /*await api.post("verificaExistePacienteAgendamento", {
      'nome': paciente.nome,
      'nascimento': paciente.data_nascimento
    }, {
      headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*',
      Authorization: `Bearer ${token}`},
    }
    ).then(function(data) {
      console.log(data.data.data);
      if(data.data.data == true){
        return 1;
      }else{
        return 0;
      }
      
    }
  );
    await fetch('http://localhost:8080/v1/paciente/verificaExistePacienteAgendamento', {
    method: 'post',
    //mode:"no-cors",
    credentials: 'same-origin',
    origins: '*',
    headers: {'Content-Type': 'application/json',Accept: 'application/json',
    Authorization: `Bearer ${token}`},
    body: JSON.stringify({
      "nome": paciente.nome, 
      "nascimento": paciente.data_nascimento
    })
      }).then(data => {
       
                               
        console.log(data);
        
                
       });
*/
    

    this.props.setStatusNotificacao("WARNING");
    this.props.history.goBack(); 
    //this.props.history.push('/paciente');
  };

  abrirModal = () => {
    this.setState({ modal: true })
  }
  fecharModal = () => {
    this.setState({ modal: false })
  }
  cancelarModal = () => {
    this.props.history.push("/paciente");
  }

  abrirModalRemover = () => {
    this.setState({ modalRemover: true })
  }
  fecharModalRemover = () => {
    this.setState({ modalRemover: false })
  }

  excluirpaciente = async (id) => {
    if (id) {
        await api.delete(`destroy/${id}`);
    }
    this.props.setStatusNotificacao("ERROR");
    this.props.history.push("/paciente");
  }

  setPessoajuridica = () => {
    this.setState({ pessoaJuridica: false, pessoaFisica: true });
  };

  setPessoaFisica = () => {
    this.setState({ pessoaFisica: false, pessoaJuridica: true });
  };
  render() {
    const elements = this.state.planos;
    return (
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <FormGroup row>
                <Col xl="4">
                  <Col xl="12" >
                    <FormGroup row className="botoes-tela-lista">
                      <h2><span>Editar de Paciente</span> </h2>
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
                initialValues={this.state.paciente}
                onSubmit={this.salvar}
              >
                {({ errors, touched, setFieldValue }) => (
                   <Form>
                    
                   <FormGroup row>
                     
                     <Col xl="4">
                       <FormGroup>
                         <Label for="nome">Nome</Label>
                         <Field
                           type="text"
                           id="nome"
                           name="nome"
                           placeholder="Insira o nome fantasia"
                           
                         />
                       </FormGroup>
                     </Col>
                     <Col xl="4">
                     <FormGroup>
                         <Label for="sexo">Genero*</Label>
                         <Field
                           label="Status"
                           id="sexo"
                           name="sexo"
                           component={(props) => (
                             <Input type="select" {...props}>
                               <option value="">Selecione</option>
                               <option value="Feminino">Feminino</option>
                               <option value="Masculino">Masculino</option>
                               <option value="Outros">Outros</option>
                             </Input>
                           )}
                         />
                       </FormGroup>
                       </Col>
                       <Col xl="4">
                       <FormGroup>
                         <Label for="data_nascimento">Data Nasc.</Label>
                         <Field
                           type="date"
                           id="data_nascimento"
                           name="data_nascimento"
                           placeholder=""
                           
                         />
                       </FormGroup>
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Col xl="3">
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
                     <Col xl="3">
                        <FormGroup>
                          <Label for="identidade">Identidade*</Label>
                          <FieldMask
                            placeholder="Número da identidade"
                            name="identidade"
                            label="identidade"
                            
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
                     <Col xl="2">
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
                         <Label for="email">E-mail*</Label>
                         <Field
                           type="text"
                           id="email"
                           name="email"
                           placeholder="ex: nome@email.com"
                         />
                       </FormGroup>
                       
                     </Col>

                     <Col xl="6">
                     <FormGroup>
                         <Label for="plano_saude">Plano de Saúde*</Label>
                         <Field
                           label="Plano de Saúde"
                           id="plano_saude"
                           name="plano_saude"
                           component={(props) => (
                             <Input type="select" {...props}>
                              {
                                 elements.map((element, index)=>{
                                     return(<option key={element.id}>{element.nome} </option>);
                                   })
                             }
                           </Input>
                           )}
                         />
                       </FormGroup>
                     <FormGroup>
                         <Label for="numero_plano">Número</Label>
                         <Field
                           type="text"
                           id="numero_plano"
                           name="numero_plano"
                           placeholder="Número Carteira Plano"
                           
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
            Tem certeza que deseja excluir este usuário? {this.state.paciente.email}`?
            </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.excluirpaciente(this.state.paciente.id)}>Sim</Button>{' '}
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

