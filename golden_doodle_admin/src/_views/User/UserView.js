import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import {Button,Modal,Dialog,DialogTitle,DialogActions} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TablePaginationActions  from '../../_components/Users/TablePaginationActions';
import {Register,Edit}  from '../../_components/Users';

class UserView extends React.Component {
    constructor(props) {
        super(props);
        //dispatch action to get  items
        
        this.props.dispatch(
            userActions.getAll()
        );
        
        this.state = {
            openRegister: false,
            openEdit:false,
            filters:[],
            data:[],
            order: 'asc',
            orderBy: 'name',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            totalRows:0,
        };
    
    }
    
    handleDelete = (e,id,tableData)=>{
        this.setState({"openDelete":true,itemId:id});
    }
    handleEdit = (event,id,tableData) =>{
        console.log("EDIT",tableData,event,id);
        
        this.setState({itemId:id,openEdit:true});

    }
    handleRowsPerPage = (rowsPerPageChild) =>{
        this.setState({rowsPerPage: rowsPerPageChild});
        this.props.dispatch(userActions.getAll(this.state));
    }
    HandleChangePage = (changePage) =>{
        this.setState({page:changePage});
        
        this.props.dispatch(userActions.getAll(this.state,changePage));
    }  
    handleCloseRegister = () => {
        this.setState({ openRegister: false });
    }
    handleCloseEdit = () => {
        this.setState({ openEdit: false });
    }
    handleCloseDelete = () => {
        this.setState({ openDelete: false });
    }    
    handleConfirmDelete = () =>{
        this.setState({"openDelete":false});
        
    }

    render() {
        var {users} = this.props;
        var { filters,order,orderBy,selected,page,rowsPerPage,totalRows,data} = this.state;
        var table = users.table ? users.table : {filters,order,orderBy,selected,page,rowsPerPage,totalRows,data};
        return (
            <div>
                <TablePaginationActions 
                    onChangeRowsPerPage={this.handleRowsPerPage} 
                    onChangePage={this.HandleChangePage} 
                    handleDelete={this.handleDelete} 
                    handleEdit={this.handleEdit}
                    tableData={
                        {      
                            filters:filters,
                            order: table.order,
                            orderBy: orderBy,
                            selected: selected,
                            data: table.data,
                            page: table.page,
                            rowsPerPage: table.rowsPerPage,
                            totalRows:table.totalRows
                      }
                }/>
                <Button 
                    variant="fab" color="primary" aria-label="Adicionar"
                    style={{position: 'absolute',bottom: 90,right: 25,}} 
                    onClick={()=>{this.setState({ openRegister: true })}}

                >
                    <AddIcon/>
                </Button>
                
                <Modal onClose={this.handleCloseRegister} open={this.state.openRegister}>
                    <Register  onClose={this.handleCloseRegister}/>
                </Modal>
                <Modal onClose={this.handleCloseEdit} open={this.state.openEdit}>
                    <Edit itemId={this.state.itemId}  onClose={this.handleCloseEdit}/>
                </Modal>
                <Dialog
                  open={this.state.openDelete}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Deseja realmente excluir?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleCloseDelete} color="primary">
                      Não
                    </Button>
                    <Button onClick={this.handleConfirmDelete} color="primary" autoFocus>
                      Sim
                    </Button>
                  </DialogActions>
                </Dialog>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    const { authentication,users } = state;
    console.log(users);
    return {
        authentication,
        users
    };
}

const connectedUserView = connect(mapStateToProps)(UserView);
export { connectedUserView as UserView };