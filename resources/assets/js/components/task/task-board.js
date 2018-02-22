import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import TaskCard from "./task-card";
import {fetchAllTasks} from "../../actions/taskActions";

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class TaskBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchAllTasks();
    }

    render() {

        const tasks = this.props.tasks;
        const taskIds = tasks.allIds;

        let taskList = [];

        if (taskIds) {

            //display subscribed tasks first
            taskIds.sort(function (a, b) {
                if (!tasks.byId[a].completed) {
                    return -1;
                } else if (!tasks.byId[b].completed) {
                    return 1;
                }
                return 0;
            });

            taskList = taskIds.map(id => <TaskCard key={id} task={tasks.byId[id]}/>);
        }


        return (
            <TaskContainer>
                {taskList}
            </TaskContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllTasks: () => dispatch(fetchAllTasks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);