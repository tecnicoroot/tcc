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
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselItem,
  CarouselCaption,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../../../componentes/formulario/input/";
import FieldMask from "../../../componentes/formulario/input-mask";
import axios from "axios";
import Toasty from '../../../componentes/Toasty/Toasty';

let items = [];
     
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      msg: localStorage.getItem('cadastroEstabelecimento'),
      
     
    };
    

  }
      
  render() {
    const { profileImg} = this.state
    const { activeIndex } = this.state;
    const teste =() => {
      return (
        <div></div>
      );
    }
    const slides2 = items.map((item) => {
      return (

        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.id}
        >
          <img className="d-block w-100" src={item.imagem} alt={item.descricao} />
          <CarouselCaption captionText={item.nome} captionHeader={item.nome} />
        </CarouselItem>
      );
    });
    return (
      <>
        {this.state.msg === "add" ? teste : ""}
     

      </>
    );
  }
}

export default Dashboard;