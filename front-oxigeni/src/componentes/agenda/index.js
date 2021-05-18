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
   
   function Agenda(props){
       return(
           <>  
           
            <CCard 
            color="success"
            textColor="white"
            className={`mb-3 border-top-success border-top-3`}
            style={{ maxWidth: '18rem' }}
            
            >
            <CCardHeader>{props.titulo}</CCardHeader>
                <CCardBody>
                    <CCardTitle>{props.header}</CCardTitle>
                    <CCardText>
                        {props.body}
                    </CCardText>
                </CCardBody>
            </CCard>
           </>
       );
   }
   
  


export default Agenda;
