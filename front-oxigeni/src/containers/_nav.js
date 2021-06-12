import { getClaims } from "../services/token-service";
const menu = [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Administração',
    route: '/dashboard',
    icon: 'cil-puzzle',
    permissao :"Administrador",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Empressa',
        to: '/empresa',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Médico',
        to: '/medico',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Usuário',
        to: '/usuario',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Convênio',
        to: '/convenio',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Camara',
        to: '/camara',
      },
    ]
  
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Paciente',
    to: '/paciente',
    icon: 'cil-puzzle',
    permissao : "Secretária",
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Atendimento',
    to: '/atendimento',
    icon: 'cil-puzzle',
    permissao : "Enfermeiro",
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Procedimento',
    to: '/procedimento',
    icon: 'cil-puzzle',
    permissao : "Enfermeiro",
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Agenda',
    to: '/agenda',
    icon: 'cil-puzzle',
    permissao : "Secretária",
  },
   
 
  
]
const claims = getClaims();
const menuFiltrado = menu.filter(item => {
  const valido = claims.some( claim => item.permissao === claim || claim === "Administrador");
  return valido;
});

export default menuFiltrado;