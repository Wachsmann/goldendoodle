import React from 'react';
import { connect } from 'react-redux';
import RegisterView  from './RegisterView';
import {stocksActions } from '../../_actions';

class Register extends React.Component {

  onSend(obj){
    //console.log(obj);
    this.props.dispatch(stocksActions.register(obj));
    this.props.onClose();
  }

  render() {

    

    return (
      <div>
        <RegisterView 
          onSend={this.onSend} 
          props={this.props}
          title={"Novo estoque"} 
        />
      </div>
    );
  }
}

const connectedRegister = connect()(Register);
export { connectedRegister as Register };
