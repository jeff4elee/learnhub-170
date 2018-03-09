import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {deleteTask} from "../../actions/taskActions";
import TaskCard from "../content/task-card";
import FaX from "react-icons/lib/fa/times-circle";

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
    }

    render(){

        const tasks = this.props.tasks.byId;

        let tasksList = [];
        if(this.props.taskIds) {
            tasksList = this.props.taskIds.map(id =>
                <EditableCardLayout key={id}>
                    <TaskCard analytics={this.props.analytics} task={tasks[id]}/>
                    <TrashBox><FaX size={28} onClick={() => this.props.deleteTask(id)}/></TrashBox>
                </EditableCardLayout>
            );
        }

        return (
            <TasksContainer>
                {tasksList}
            </TasksContainer>
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