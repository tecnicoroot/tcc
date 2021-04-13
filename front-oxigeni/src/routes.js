import React from 'react';

//const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Dashboard = React.lazy(() => import('./views/Pages/Dashboard/Dashboard'));

/* Usuário */
const ConsultaUsuario = React.lazy(() => import('./views/Pages/Usuario/ConsultaUsuario'));
const CadastroUsuario = React.lazy(() => import('./views/Pages/Usuario/CadastroUsuario'));
const EditarUsuario = React.lazy(() => import('./views/Pages/Usuario/EditarUsuario'));
const EditarSenha = React.lazy(() => import('./views/Pages/Usuario/EditarSenha'));

/* Empresa */
const ConsultaEmpresa = React.lazy(() => import('./views/Pages/Empresa/Consulta'));
const CadastroEmpresa = React.lazy(() => import('./views/Pages/Empresa/Cadastro'));
const EditarEmpresa = React.lazy(() => import('./views/Pages/Empresa/Editar'));

/* Medico*/
const ConsultaMedico = React.lazy(() => import('./views/Pages/Medico/Consulta'));
const CadastroMedico = React.lazy(() => import('./views/Pages/Medico/Cadastro'));
const EditarMedico = React.lazy(() => import('./views/Pages/Medico/Editar'));

/* Convênio*/
const ConsultaConvenio = React.lazy(() => import('./views/Pages/Convenio/Consulta'));
const CadastroConvenio = React.lazy(() => import('./views/Pages/Convenio/Cadastro'));
const EditarConvenio = React.lazy(() => import('./views/Pages/Convenio/Editar'));

/* Camara*/
const ConsultaCamara = React.lazy(() => import('./views/Pages/Camara/Consulta'));
const CadastroCamara = React.lazy(() => import('./views/Pages/Camara/Cadastro'));
const EditarCamara = React.lazy(() => import('./views/Pages/Camara/Editar'));

/* Paciente*/
const ConsultaPaciente = React.lazy(() => import('./views/Pages/Paciente/Consulta'));
const CadastroPaciente = React.lazy(() => import('./views/Pages/Paciente/Cadastro'));
const EditarPaciente = React.lazy(() => import('./views/Pages/Paciente/Editar'));

/* agenda*/
const ConsultaAgenda = React.lazy(() => import('./views/Pages/Agenda/Consulta'));
const CadastroAgenda = React.lazy(() => import('./views/Pages/Agenda/Cadastro'));
const EditarAgenda = React.lazy(() => import('./views/Pages/Agenda/Editar'));
const Agenda = React.lazy(() => import('./views/Pages/Agenda/Agenda'));

const routes = [
   { path: '/', exact: true, name: 'Home' },
   { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },

   /* Usuário */
   { path: '/usuario/cadastrar', exact: true, name: 'Cadastro', component: CadastroUsuario },
   { path: '/usuario/editar/:id', exact: true, name: 'Editar', component: EditarUsuario },
   { path: '/usuario/trocarSenha/:id', exact: true, name: 'Alterar', component: EditarSenha },
   { path: '/usuario', exact: true, name: 'Usuário', component: ConsultaUsuario },

   /* Empresa */
   { path: '/empresa/cadastrar', exact: true, name: 'Cadastro', component: CadastroEmpresa },
   { path: '/empresa/editar/:id', exact: true, name: 'Editar', component: EditarEmpresa },
   { path: '/empresa', exact: true, name: 'Empresa', component: ConsultaEmpresa },

    /* Médico */
    { path: '/medico/cadastrar', exact: true, name: 'Cadastro', component: CadastroMedico },
    { path: '/medico/editar/:id', exact: true, name: 'Editar', component: EditarMedico},
    { path: '/medico', exact: true, name: 'Médico', component: ConsultaMedico},

    /* Convênio */
    { path: '/convenio/cadastrar', exact: true, name: 'Cadastro', component: CadastroConvenio },
    { path: '/convenio/editar/:id', exact: true, name: 'Editar', component: EditarConvenio},
    { path: '/convenio', exact: true, name: 'Convênio', component: ConsultaConvenio},

    /* Câmara */
    { path: '/camara/cadastrar', exact: true, name: 'Cadastro', component: CadastroCamara },
    { path: '/camara/editar/:id', exact: true, name: 'Editar', component: EditarCamara},
    { path: '/camara', exact: true, name: 'Camâra', component: ConsultaCamara},

    /* Paciente */
    { path: '/paciente/cadastrar', exact: true, name: 'Cadastro', component: CadastroPaciente },
    { path: '/paciente/editar/:id', exact: true, name: 'Editar', component: EditarPaciente},
    { path: '/paciente', exact: true, name: 'Paciente', component: ConsultaPaciente},

    /* Agenda */
    { path: '/agenda/cadastrar', exact: true, name: 'Cadastro', component: CadastroAgenda },
    { path: '/agenda/editar/:id', exact: true, name: 'Editar', component: EditarAgenda},
    { path: '/agenda', exact: true, name: 'Agenda', component: Agenda},
];

export default routes;
