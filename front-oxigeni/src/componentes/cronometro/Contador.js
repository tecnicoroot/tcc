import React from 'react';
import {
    Col, Row, Button
   } from "reactstrap";
import moment from 'moment';
require('moment/locale/pt-br.js');
class Contador extends React.Component{
    constructor(props){
        super(props);
        this.state={
          segundos: 0,
          minutos: 0,
          horas : 0,
          stop: true,
          nameStop: "Iniciar",
          name: "Relógio", 
          parcial: ""
        };
      }
       zerarCronometro() {
          this.state.segundos = -1
          this.state.minutos = 0
          this.state.parcial = ""
       }
      
      parcial(){
        let p = this.state.minutos+ ":"+ this.state.segundos + "\n\n"
        this.state.parcial = this.state.parcial + p
      }
      
      pararTempo(){
        this.setState({ 
            stop: !this.state.stop 
          })
        if (this.state.stop)
          this.state.nameStop = "Parar"
        else
          this.state.nameStop = "Iniciar"
      }
    
      incrementar () {
        if (this.state.stop === false){
          this.setState(
             function (state, props) {
              if (state.segundos >= 59){
                this.zerar();
                this.incrementarMinuto(state);
              }
              if (state.minutos >= 59){
                this.zerarMinutos();
                this.incrementarHora(state);
              } 
              return({ segundos: state.segundos +1})
             })
        }
      }
      
      incrementarMinuto (state) {
        this.setState(() => { 
          return {minutos: state.minutos +1}
        })
      };
      
      incrementarHora(state) {
        this.setState(() => { 
          return {horas: state.horas +1}
        })
      };

      zerar () {
        this.setState({ 
          segundos: 0 
        })
      }
      zerarMinutos () {
        this.setState({ 
          minutos: 0 
        })
      }
      componentDidMount(){
        this.timer = setInterval(
          () => this.incrementar(), 1000);

          if(this.props.tempoinicial){
            const now = moment(new Date())
            const tempo = moment.duration(now.diff(new Date(this.props.tempoinicial)))
            this.setState({horas : tempo.hours()})
            this.setState({minutos : tempo.minutes()})
            this.setState({segundos : tempo.seconds()})
            this.setState({stop:false})
            
            
          }
      }
      
      inicia = () => {        
        this.pararTempo();
        this.props.funcaoInicio(this.props.atendimento);
        
      }
    
      finaliza = () => {
        this.props.funcaoFinalizar(this.props.atendimento);
        this.setState({stop:true})
      }
    
    render(){
        return(
            <Row>
                <Col xl="6">
                <Button
                    onClick={ () => this.inicia(this.props.atendimento)}
                    style={{ width: "150px" }}
                    color="success"
                    className="btn mr-3"
                >
                    {this.state.nameStop}
                </Button>
                <Button
                    onClick={ () => this.finaliza()}
                    style={{ width: "150px",marginTop: "5px" }}
                    color="danger"
                    className="btn mr-3"
                >
                    Finalizar
                </Button>
                </Col>
                <Col xl='6'>
                    Tempo decorrido:<br></br>
                    <h1>{this.state.horas < 10 ? '0'+this.state.horas : this.state.horas }:{this.state.minutos < 10 ? '0'+this.state.minutos : this.state.minutos }:{this.state.segundos < 10 ? '0'+this.state.segundos : this.state.segundos}</h1>
                    
                </Col>
                </Row>
        )
           
    }

}

export default Contador