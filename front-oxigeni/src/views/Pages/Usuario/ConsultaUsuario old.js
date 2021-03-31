import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  //Badge,
  Table,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import axios from "axios";
import "./usuario.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
//import Pagination from '../../../componentes/formulario/Pagination';
const api1 = new Api("v1","user");

class ConsultaUsuario extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      textoPesquisa: "",
      linhaSelecionada:0,
      corLinhaSelecionada: "row-clicked",
      dropdownOpen: new Array(19).fill(false),
      
      allUsers: [],
      currentUsers: [], 
      currentPage: 1,
      totalPages: 1,
      /*this.state = {
        posts: [],
        completed: false,
        pageCount: 1,
        currentPage: 1
      };
  */
      
      
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  
  async componentDidMount() {
    try {
       if(this.props.notificacao !== ""){
        if(this.props.notificacao === "Salvo com sucesso")
          toast.success(this.props.notificacao);
        if(this.props.notificacao === "Alterado com sucesso")
          toast.warning(this.props.notificacao);
        if(this.props.notificacao === "Removido com sucesso")
          toast.error(this.props.notificacao);
      
      }
      
      const { data: allUsers = [] } = await api1.get("/");
      const users = allUsers.data.data;
      //console.log(allUsers.data);
      this.setState({ currentUsers : users});
      
    } catch (ex) {
      console.log(ex);
    }
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  cadastrarusuario = () => {
    this.props.history.push("/usuario/cadastrar");
  }

  dataBindind = (event) => {
    const { value } = event.target;
    this.setState({ textoPesquisa: value });
  };

  filtrar = async () => {
    
     const { textoPesquisa } = this.state;
        if(textoPesquisa){
          //const { data: allUsers = [] } = await api1.get(`${textoPesquisa}`);
          const { data: allUsers = [] } = await api1.get(`/`);
          this.setState({ allUsers });
          this.setState({currentUsers: allUsers})
          console.log("1");
        }else{
          const { data: allUsers = [] } = await api1.get("/");
          this.setState({ allUsers });
          this.setState({currentUsers: allUsers})
          console.log("2");
        }
        
    }

  editarusuario = (id) => {
    this.props.history.push(`/usuario/editar/${id}`);
  }

  exibirusuario = (id) => {
    this.props.history.push(`/usuario/exibir/${id}`);
  }
  selecionaLinha = (id) => {
 
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada !== id){
      this.setState({linhaSelecionada: id});
    }else{
      this.setState({linhaSelecionada: 0});
    }
  }

  exibirUsuarioSelecionado = () =>{
    const { linhaSelecionada } = this.state;
    if(linhaSelecionada === 0){
      alert("Selecione um usuário!");
    }else{
      this.editarusuario(linhaSelecionada);
    }
  }
  async handlePageClick(data) {
		const page = data.selected >= 0 ? data.selected + 1 : 0;
		await Promise.resolve(this.setState(() => ({ currentPage: page })));

		this.getPostData();
	}

	async getPostData() {
		//Progress.show();

		if (this.props.history.pushState) {
			const newUrl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				'?page=' +
				this.state.currentPage;
			window.history.pushState({ path: newUrl }, '', newUrl);

			const response = await axios.post(newUrl);
      console.log(response.data);
			try {
				if (response.data.status == 'success') {
					this.setState(() => ({
						posts: response.data.data.posts.data,
						currentPage: response.data.data.posts.current_page,
						pageCount: response.data.data.posts.last_page
					}));
					window.scrollTo(0, 0);
					Progress.hide();
				} else {
					Progress.hide();
					console.log("deu erro");
				}
			} catch (error) {
				Progress.hide();
				console.log(error);
			}
		}
	}
  render() {
    const { allUsers, currentUsers, currentPage, totalPages } = this.state;
    const totalUsers = currentUsers.length;
    
    //console.log(currentUsers);
    if (totalUsers === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();    
    return (
      <>
     
      <Row>
      <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
              <Col xl="3">
            <h4><span>Consulta de Usuário</span></h4>
            </Col>
            <Col xl="2">
              <h5 className={headerClass}>
                <strong>{totalUsers ? totalUsers : 0}</strong> Usuários
              </h5>
            </Col>  
            <Col xl="2">
            { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Páginas <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) } 
              
            </Col> 
            <Col xl="5">
            <Col xl="8" className="px-0">
                  <PrivateComponent permissao="Administrador">
                      <Button onClick={this.cadastrarusuario}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                        Novo
                      </Button>
                  </PrivateComponent>
                                    
                  <Button onClick={this.exibirUsuarioSelecionado}  color="ghost-info" style={{ width: "100px", marginRight: "20px"}}>
                    Detalhes
                  </Button>
                </Col>
            </Col>

          </Row> 
            </CardHeader>
            <CardBody>
              <div className="my-3 d-flex flex-wrap justify-content-between">
                <Col xl="5" className="px-0">
                  <InputGroup>
                    <Input onChange={this.dataBindind} id="appendedInputButton" type="text" />
                    <InputGroupAddon addonType="append">
                      <Button onClick={this.filtrar} color="secondary">Pesquisar!</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                
              </div>
              
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Nome </th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Status</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentUsers.map((usuario) => (
                    <tr key={usuario.id}
                        onClick={(e) => this.selecionaLinha(usuario.id)}
                        id={usuario.id}
                        className={usuario.id === this.state.linhaSelecionada ? "row-clicked" : ""}
                    >
                      <td>{usuario.name || "-"}</td>
                      <td>{usuario.email || "-"}</td>
                      <td>{usuario.perfil}</td>
                      <td>{usuario.status}</td>
                    </tr>
                  ))}
                </tbody>
                
               
              </Table>
   
              <ReactPaginate
                pageCount={this.state.pageCount}
                initialPage={this.state.currentPage - 1}
                forcePage={this.state.currentPage - 1}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                previousLabel="&#x276E;"
                nextLabel="&#x276F;"
                containerClassName="uk-pagination uk-flex-center"
                activeClassName="uk-active"
                disabledClassName="uk-disabled"
                onPageChange={this.handlePageClick}
                disableInitialCallback={true}
              />
                
              </CardBody>
          </Card>
        </Col>      
      </Row>
      </>
    );
  }
}
const mapStateToProps = state => ({
  notificacao: state.notificacao
});

const mapDispatchToProps = dispatch => ({
  setStatusNotificacao: status => dispatch(SET_STATUS_NOTIFICACAO(status))
});

export default connect(mapStateToProps,mapDispatchToProps)(ConsultaUsuario);
//export default ConsultaUsuario;
