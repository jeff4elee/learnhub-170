import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {deleteTask} from "../../actions/taskActions";
import TaskCard from "../content/task-card";
import FaX from "react-icons/lib/fa/times-circle";
import Modal from 'react-modal';

const NotificationModal = styled(Modal)`
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 25%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;

    background-color: #239b88;
    // background-color: #F5F5F5;
    // background-color: red;

    // border: 2px solid transparent;
    border-radius: 5px;

    outline: none;
    text-align: center;

    color: white;
    // color: #474747;

    font-weight: bold;
    font-size: 20px;

`;

const Button = styled.button`
    border: none;
    border: 2px solid transparent;
    // border-radius: 5px;
    background-color: #239b88;
    // color: #AD2109;
    color: white;
    // width: 80%;
    padding: 0;
    margin: 0;
`;

const TasksContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditableCardLayout = styled.div`
    display: flex;


    // margin: 0;
`;

const TrashBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 2.5%;
    color: #AD2109;
    
    // padding-left: 5%;
`;

class EditableTaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id) {
        let newState = {
            modalIsOpen: true,
            id: id
        };

        

        this.setState(newState);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){

        const tasks = this.props.tasks.byId;

        let tasksList = [];
        if(this.props.taskIds) {
            tasksList = this.props.taskIds.map(id =>
                <EditableCardLayout key={id}>
                    <TaskCard analytics={this.props.analytics} task={tasks[id]}/>

                    <TrashBox><FaX size={28} onClick={() => this.openModal(id)}/></TrashBox>
                </EditableCardLayout>
            );
        }

        return (
            <div>
            <TasksContainer>
                {tasksList}
            </TasksContainer>

            <NotificationModal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}>
                    
                <p>Do you want to delete this task?</p>
                <Button style={{backgroundColor: "#AD2109"}} onClick={() => this.deleteResource(this.state.id)}>Yes, delete this task</Button>
                <Button style={{color: "white"}} onClick={() => this.closeModal()}>No, leave it</Button>
            </NotificationModal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        tasks: state.tasks,
    }
}

function mapDispatchToProps(dispatch){
    return{
        deleteTask: (task_id) => dispatch(deleteTask(task_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableTaskList);