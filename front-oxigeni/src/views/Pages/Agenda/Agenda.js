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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import "./agenda.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from "../../../componentes/private-component";
import Api from "../../../services/api";
import { connect } from "react-redux";
import { SET_STATUS_NOTIFICACAO, } from "../../../store/reducers/notificacao";
import moment from 'moment';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst /*, Modal */} from 'react-agenda';
import CardFooter from "reactstrap/lib/CardFooter";

var now = new Date();

require('moment/locale/pt-br.js');
var colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
    "color-2":"rgba(242, 177, 52, 1)" ,
    "color-3":"rgba(235, 85, 59, 1)" ,
    "color-4":"rgba(70, 159, 213, 1)",
    "color-5":"rgba(170, 59, 123, 1)"
  }

  var items = [
    
    ];

const api1 = new Api("v1","agenda");
const api2 = new Api("v1","agendas/search")
class Agenda extends Component {
  constructor(props) {
    super(props);
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.toggle = this.toggle.bind(this);
    this.state = {
        textoPesquisa: "",
        linhaSelecionada:0,
        corLinhaSelecionada: "row-clicked",
        dropdownOpen: new Array(19).fill(false),
     
      
        items:[],
        selected:[],
        cellHeight:(60 / 2),
        showModal:false,
        locale:"pt-br",
        rowsPerHour:6,
        numberOfDays:5,
        startDate: new Date()

    };

  }
  cadastraragenda = () => {
    this.props.history.push("/agenda/cadastrar");
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
      this.dadosAgenda();
    
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
 
dadosAgenda = () =>{
   //console.log("agenda função")
   const items = api1.get('');
   const { token } = localStorage;
   fetch('http://localhost:8080/v1/agenda', {
   method: 'get',
   headers: {'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`},
   
     }).then( response => response.json()
       
     ).then(data => {
      const {data: elements = []}  = data;
      this.setState({elements : items.data});
      const itens = [];
      elements.data.forEach(element => {
        
        const item = {};
        item._id = element.id;
        item.name  = element.nome;
        item.startDateTime = new Date(element.data_hora_marcada);
        item.endDateTime   = new Date(element.data_hora_marcada).setMinutes(140);
        item.classes       = 'color-1' ;
        itens.push(item);
      });
      this.setState({items : itens});
      this.items = itens;
      
   });

}


componentWillReceiveProps(next , last){
    if(next.items){

    this.setState({items:next.items})
    }
}

handleItemEdit(item, openModal) {
  //console.log(item);
  this.props.history.push(`/agenda/editar/${item._id}`);
    /*if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
    */
}

handleCellSelection(item, openModal) {
    //console.log(item)
    if(this.state.selected && this.state.selected[0] === item){
      this.cadastraragenda()
      localStorage.setItem("horaInicial", item);;
      //return  this._openModal();
    }
    this.setState({selected:[item] })
}

zoomIn(){
  var num = this.state.cellHeight + 10
  this.setState({cellHeight:num})
}

zoomOut(){
  var num = this.state.cellHeight - 10
  this.setState({cellHeight:num})
}


handleDateRangeChange (startDate, endDate) {
  this.setState({startDate:startDate })
}

handleRangeSelection (selected) {
  //console.log("arrastar", selected)
  this.setState({selected:selected , showCtrl:true})
  this._openModal();
}

_openModal(){
  this.setState({showModal:true})
}
_closeModal(e){
  if(e){
    e.stopPropagation();
    e.preventDefault();
  }
  this.setState({showModal:false})
}

handleItemChange(items , item){
  //console.log("soltar", item);
  this.setState({items:items})
}

handleItemSize(items , item){
  this.setState({items:items})
}

removeEvent(items , item){
  //console.log(item);
  this.setState({ items:items});
  this.excluiragenda(item._id);
}

excluiragenda = async (id) => {
  if (id) {
      await api1.delete(`destroy/${id}`);
  }
  this.props.setStatusNotificacao("ERROR");
  this.props.history.push("/agenda");
}

addNewEvent (items , newItems){
  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}

editEvent (items , item){
  
  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}

changeView (days , event ){
  this.setState({numberOfDays:days})
}
    
  render() {
        var AgendaItem = function(props){
        //console.log( ' item component props' , props)
        return <div draggable="true" style={{display:'block', position:'absolute'}} >
          
              <p className="paragenda">{props.item.name} </p>
              <p  ><Button color="secondary" className="btnagenda" onClick={()=> props.edit(props.item)}>Editar </Button>
              <Button  color="danger" className="btnagenda" onClick={()=> props.remove(props.item)}>Cancelar </Button></p>
              
            
          
          
          
          </div>
    }
    
    return (
      <>
     
      <Row>
      <Col xs="12" sm="12">
          <Card>
            
            <CardBody>
              <div className="content-expanded ">
                <div className="control-buttons">
                    <Button
                        onClick={this.zoomIn}
                        style={{ width: "50px" }}
                        color="info"
                        className="btn mr-1 hide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon c-icon-1xl" role="img"><polygon fill="var(--ci-primary-color, currentColor)" points="208 96 176 96 176 176 96 176 96 208 176 208 176 288 208 288 208 208 288 208 288 176 208 176 208 96" class="ci-primary"></polygon>
                        <path fill="var(--ci-primary-color, currentColor)" d="M479.6,400.4l-81.084-81.084-62.368-25.767A175.008,175.008,0,0,0,368,192.687c0-97.047-78.953-176-176-176S16,95.64,16,192.687s78.953,176,176,176a175.028,175.028,0,0,0,101.619-32.378l25.7,62.2L400.4,479.6a56,56,0,0,0,79.2-79.2ZM48,192.687c0-79.4,64.6-144,144-144s144,64.6,144,144-64.6,144-144,144S48,272.088,48,192.687ZM456.971,456.971a24.029,24.029,0,0,1-33.942,0L346.457,380.4l-23.894-57.835L380.4,346.457l76.573,76.572A24.029,24.029,0,0,1,456.971,456.971Z" class="ci-primary"></path>
                        </svg>
                    </Button>

                    <Button
                        onClick={this.zoomOut}
                        style={{ width: "50px" }}
                        color="info"
                        className="btn mr-1 hide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon c-icon-1xl" role="img"><rect width="192" height="32" x="96.344" y="175.313" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect>
                        <path fill="var(--ci-primary-color, currentColor)" d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" class="ci-primary"></path>
                        </svg>
                    </Button>
                    <Button
                        onClick={this.cadastraragenda}
                        //onClick={this._openModal}
                        style={{ width: "50px" }}
                        color="success"
                        className="btn mr-1 hide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon c-icon-1xl" role="img"><rect width="208" height="32" x="256" y="152" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><rect width="288" height="32" x="176" y="256" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><rect width="288" height="32" x="176" y="360" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><polygon fill="var(--ci-primary-color, currentColor)" points="192 152 128 152 128 88 96 88 96 152 32 152 32 184 96 184 96 248 128 248 128 184 192 184 192 152" class="ci-primary"></polygon></svg>
                    </Button>
                    <Button
                        onClick={this.changeView.bind(null , 5)}
                        style={{ width: "100px" }}
                        color="info"
                        className="btn mr-1 hide"
                    >
                        {moment.duration(5, "day").humanize()}  
                    </Button>
                         
                      <Button
                          onClick={this.changeView.bind(null , 3)}
                          style={{ width: "100px" }}
                          color="info"
                          className="btn mr-1 hide"
                      >
                          {moment.duration(3, "day").humanize()}  
                      </Button>     
                      <Button
                          onClick={this.changeView.bind(null , 1)}
                          style={{ width: "100px" }}
                          color="info"
                          className="btn mr-1 hide"
                      >
                          {moment.duration(1, "day").humanize()}  
                      </Button>
                        
                </div>
                <ReactAgenda
                      minDate={new Date(now.getFullYear(), now.getMonth()-3)}
                      maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                      startDate={this.state.startDate}
                      startAtTime={7}
                      endAtTime={19}
                      cellHeight={this.state.cellHeight}
                      locale="pt-br"
                      items={this.state.items}
                      numberOfDays={this.state.numberOfDays}
                      headFormat={"ddd DD MMM"}
                      rowsPerHour={this.state.rowsPerHour}
                      itemColors={colors}
                      helper={true}
                      itemComponent={AgendaItem}
                      view="calendar"
                      autoScale={false}
                      fixedHeader={true}
                      onRangeSelection={this.handleRangeSelection.bind(this)}
                      onChangeEvent={this.handleItemChange.bind(this)}
                      onChangeDuration={this.handleItemSize.bind(this)}
                      onItemEdit={this.handleItemEdit.bind(this)}
                      onCellSelect={this.handleCellSelection.bind(this)}
                      onItemRemove={this.removeEvent.bind(this)}
                      onDateRangeChange={this.handleDateRangeChange.bind(this)} />
                      {
                      this.state.showModal? 

                      
                      
                      <Modal clickOutside={this._closeModal} >
                        <div className="modal  box-card ">
                            
                            <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />

                        </div>
                      </Modal>
                    :''
                      }
              </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Agenda);
