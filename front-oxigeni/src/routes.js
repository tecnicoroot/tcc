import React from 'react';

//const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Dashboard = React.lazy(() => import('./views/Pages/Dashboard/Dashboard'));
const Estabelecimento = React.lazy(() => import('./views/Pages/Estabelecimento/ConsultaEstabelecimento'));
const EstabelecimentoCadastro = React.lazy(() => import('./views/Pages/Estabelecimento/CadastroEstabelecimento'));
const CadastroCliente = React.lazy(() => import('./views/Pages/Cliente/CadastroCliente'));
const ConsultaCliente = React.lazy(() => import('./views/Pages/Cliente/ConsultaCliente'));
const CadastroPaciente = React.lazy(() => import('./views/Pages/Paciente/CadastroPaciente'));
const ConsultaPaciente = React.lazy(() => import('./views/Pages/Paciente/ConsultaPaciente'));
const CadastroConvenio = React.lazy(() => import('./views/Pages/Convenio/CadastroConvenio'));
const ConsultaConvenio = React.lazy(() => import('./views/Pages/Convenio/ConsultaConvenio'));
const CadastroPerfil = React.lazy(() => import('./views/Pages/Perfil/CadastroPerfil'));
const ConsultaPerfil = React.lazy(() => import('./views/Pages/Perfil/ConsultaPerfil'));
const ConsultaUsuario = React.lazy(() => import('./views/Pages/Usuario/ConsultaUsuario'));
const CadastroUsuario = React.lazy(() => import('./views/Pages/Usuario/CadastroUsuario'));
const EditarUsuario = React.lazy(() => import('./views/Pages/Usuario/EditarUsuario'));
const EditarSenha = React.lazy(() => import('./views/Pages/Usuario/EditarSenha'));

const routes = [
   { path: '/', exact: true, name: 'Home' },
   { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
   { path: '/estabelecimento', exact: true, name: 'Estabelecimento', component: Estabelecimento },
   { path: '/estabelecimento/cadastrar', exact: true, name: 'Cadastro', component: EstabelecimentoCadastro },
   { path: '/estabelecimento/editar/:id', exact: true, name: 'Editar', component: EstabelecimentoCadastro },
   { path: '/estabelecimento/exibir/:id', exact: true, name: 'Editar', component: EstabelecimentoCadastro },
   { path: '/cliente/cadastrar', exact: true, name: 'Cadastro', component: CadastroCliente },
   { path: '/cliente', exact: true, name: 'Cliente Fornecedor', component: ConsultaCliente },
   { path: '/paciente/cadastrar', exact: true, name: 'Cadastro', component: CadastroPaciente },
   { path: '/paciente', exact: true, name: 'Paciente', component: ConsultaPaciente },
   { path: '/convenio/cadastrar', exact: true, name: 'Cadastro', component: CadastroConvenio },
   { path: '/convenio', exact: true, name: 'Convênio', component: ConsultaConvenio },
   { path: '/perfil/cadastrar', exact: true, name: 'Cadastro', component: CadastroPerfil },
   { path: '/perfil', exact: true, name: 'Perfil', component: ConsultaPerfil },
   { path: '/usuario/cadastrar', exact: true, name: 'Cadastro', component: CadastroUsuario },
   { path: '/usuario/editar/:id', exact: true, name: 'Editar', component: EditarUsuario },
   { path: '/usuario/trocarSenha/:id', exact: true, name: 'Alterar', component: EditarSenha },
   { path: '/usuario', exact: true, name: 'Usuário', component: ConsultaUsuario },
];

export default routes;
