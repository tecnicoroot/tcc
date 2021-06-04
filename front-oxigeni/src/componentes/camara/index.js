import React from "react";
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
   import ReactDOM from 'react-dom';
   import {CCard, CCardBody, CCardHeader, CCardText, CCardTitle} from '@coreui/react';
   
   function Camara(props){
       return(
            <CCard 
            color="default"
            textColor= {props.cor}
            className={`mb-3 border-top-success border-top-3`}
            style={{ maxWidth: '100%' }}
            >
            <CCardHeader>{props.titulo}</CCardHeader>
                <CCardBody>
                        {props.body}
                </CCardBody>
            </CCard>     
       );
   }
export default Camara;