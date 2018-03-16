import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import FaSquareO from "react-icons/lib/fa/square-o";
import FaSquareCheckSquareO from "react-icons/lib/fa/check-square-o";
import {toggleTask} from "../../actions/taskActions";

const TaskContainer = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    flex: 1 1 1;

    margin-top: 8px;
    margin-bottom: 8px;
    
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

const HCard = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const HCardBody = styled(Link)`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 70%;
    font-weight: bold;
    overflow-wrap: break-word;
`;

const HCardBodyTitle = styled.div`
    color: #239b88;
    font-size: 140%;
`;

const HCardInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin: 0;
    padding: 0;
`;

const HCardBodyDescription = styled.div`
    color: #474747;
    width: 100%;

    font-size: 110%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const HCardBodyAuthor = styled.div`
    color: #474747;
    opacity: .75;
    font-size: 100%;
`;

const HCardFooter = styled.div`
    color: #474747;
    width: 30%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`;

const Checkbox = styled.button`
    
`;

function dateDiffInDays(utc1, utc2) {

    var _MS_PER_MINUTE = 1000 * 60;

    var _MS_PER_HOUR = 1000 * 60 * 60;

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;

    var diff = Math.floor((utc2 - utc1) / _MS_PER_MINUTE);
    var timeField = "min";

    if (diff >= 60) {
        diff = Math.floor((utc2 - utc1) / _MS_PER_HOUR);
        if (diff === 1) {
            timeField = "hour";
        } else {
            timeField = "hours";

        }
        if (diff >= 24) {
            diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
            if (diff === 1) {
                timeField = "day";
            } else {
                timeField = "days";
            }
        }
    }

    return diff.toString() + " " + timeField + " ago";
}

class TaskCard extends Component {
    constructor(props) {
        super(props);
        this.toggleTask = this.toggleTask.bind(this);
    }

    toggleTask(){
        this.props.toggleTask(this.props.task.id);
    }

    render() {

        const resource = this.props.resources.byId[this.props.task.resource_id];
        const user = this.props.users.byId[resource.user_id];

        let username = '';

        if (user !== undefined) {
            username = user.name;
        }

        const ratingDisplay = <div>
            {resource.rating}
            {resource.rating_count > 0 && '/' + 5}
        </div>;

        let now = new Date(new Date().toISOString().replace(/\..+/, ''));

        const createdAt = new Date(resource.created_at);
        const diff = dateDiffInDays(createdAt, now);

        return (
            <TaskContainer>
                <HCard>
                    <HCardBody to={'/resource/' + resource.id} style={{textDecoration: 'none'}}>
                        <HCardBodyTitle>{resource.title}</HCardBodyTitle>
                        <HCardBodyDescription>{resource.description}</HCardBodyDescription>
                        <HCardBodyAuthor>By {username}, {diff} </HCardBodyAuthor>
                    </HCardBody>
                    <HCardFooter>
                        { this.props.task.completed ?
                            <FaSquareCheckSquareO style={{cursor: "pointer", marginLeft: "6%"}} size={40} onClick={() => this.toggleTask()}/>
                            :
                            <FaSquareO style={{cursor: "pointer"}} size={40} onClick={() => this.toggleTask()}/>
                        }
                    </HCardFooter>
                </HCard>
            </TaskContainer>
        )
    }
}


function mapStateToProps(state) {
    return {
        resources: state.resources,
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTask: (taskId) => dispatch(toggleTask(taskId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);