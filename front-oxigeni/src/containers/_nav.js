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
        name: 'Estabelecimentos',
        to: '/estabelecimento',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cliente / Fornecedor',
        to: '/Cliente',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Perfil',
        to: '/dashboard',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Usuário',
        to: '/usuario',
      },
    ]
  
  },
/**
 *   {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    permissao :"Administrador"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Paciente',
    to: '/paciente',
    icon: 'cil-speedometer',
    permissao :"Operador"
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Agenda',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Prontuário',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Faturamento',
    route: '/dashboard',
    icon: 'cil-puzzle',
    _children: [

    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Financeiro',
    route: '/dashboard',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Convênio',
        to: '/convenio',
      },
    ]
  },
  
 */
  
]
const claims = getClaims();
const menuFiltrado = menu.filter(item => {
  const valido = claims.some( claim => item.permissao === claim || claim === "AdminClaim");
  return valido;
});

export default menuFiltrado;