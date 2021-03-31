import React from 'react'
import {
  //CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { user, idUser } from "../services/token-service";
//import { Redirect } from 'react-router-dom';
//import { cibWindows } from '@coreui/icons';


const TheHeaderDropdown = () => {
  const logout = () => {
    localStorage.clear("token");
    window.location.reload();
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/user.png'}
            className="c-avatar-img"
            alt={user()}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to={'/usuario/trocarSenha/'+idUser()}>
          <CIcon name="cil-bell" className="mfe-2" /> 
          Alterar Senha 
        </CDropdownItem>
                <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
              
        <CDropdownItem onClick={() => logout()}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
