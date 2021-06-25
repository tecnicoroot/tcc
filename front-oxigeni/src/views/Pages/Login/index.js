import React, { Component } from 'react';

import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import { setToken } from "../../../services/token-service";
import {Formik, Form } from "formik";
import * as Yup from "yup";
import Field from "../../../componentes/formulario/input";
import Axios from 'axios';
const validacaoLogin = Yup.object().shape({
    email: Yup.string().required("O usuário é obrigatório"),
    password: Yup.string().required("A senha é obrigatória")
});

class Login extends Component {
    constructor(props){
        super();
        this.state = {
            loginIncorreto:false,
            usuario : {
                email : "",
                password : "",
            }

        }
    }

    login = async(usuario) => {
        //console.log(usuario);
        //const api = new Api("http://localhost:8000/auth");
        try {
            const { data } = await Axios.post("http://localhost:8080/v1/auth/login",usuario);
            setToken(data.token);
            this.props.history.push("/");
        } catch (error) {
            this.setState({loginIncorreto: true});
        }
    }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                    {this.state.loginIncorreto && (<span>Usuário ou senha incorreto</span>)}
                  <CardBody>
                    <Formik 
                        validationSchema={validacaoLogin} 
                        onSubmit={this.login} 
                        initialValues={this.state.usuario}>
                        { () => (
                            <Form>
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              
                              <Field type="email" id="email" name="email" placeholder="E-mail"/>
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              
                              <Field type="password" id="password" name="password" placeholder="Senha"/>
                            </InputGroup>
                            <Row>
                              <Col xs="6">
                                <Button type="submit" color="primary" className="px-4">Login</Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button color="link" className="px-0">Forgot password?</Button>
                              </Col>
                            </Row>
                            </Form>
                        )}
                    </Formik>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Oxygeni</h2>
                      <p>Sistema para gerenciamento de agendas para procedimentos hiperbáricos.</p>
                      
                    </div>
                  </CardBody>
                </Card>
                
              </CardGroup>
              
            

            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default Login;