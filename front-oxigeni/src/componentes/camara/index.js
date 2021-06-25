import React from "react";


   import {CCard, CCardBody, CCardHeader} from '@coreui/react';
   
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