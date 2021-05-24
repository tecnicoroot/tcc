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
           <>  
           
            <CCard 
            color="default"
            textColor="success"
            
            >
            <CCardHeader>{props.titulo}</CCardHeader>
                <CCardBody>
                        <CCardText>
                        {props.body}
                    </CCardText>
                </CCardBody>
            </CCard>
           </>
       );
   }
export default Camara;