import React, { Component } from "react";
let items = [];
     
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      msg: localStorage.getItem('cadastroEstabelecimento'),
      
     
    };
    

  }
      
  render() {
    
    const teste =() => {
      return (
        <div></div>
      );
    }
    return (
      <>
        {this.state.msg === "add" ? teste : ""}
     

      </>
    );
  }
}

export default Dashboard;