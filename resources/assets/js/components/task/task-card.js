import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import FaSquareO from "react-icons/lib/fa/square-o";

const TaskContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 80%;
    height: 125px;
    margin-top: 10px;
    margin-bottom: 10px;
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 70%;
    font-weight: bold;
`;

const HCardBodyTitle = styled.div`
    color: #239b88;
    font-size: 28px;
`;

const HCardBodyDescription = styled.div`
    color: black;
    font-size: 18px;
`;

const HCardBodyAuthor = styled.div`
    color: black;
    font-size: 16px;
    text-align: right;
`;

const HCardFooter = styled.div`
    color: black;
    width: 30%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: thin solid #b2b5ba;
    font-size: 20px;
    font-weight: bold;
`;

const Checkbox = styled.button`
    
`;

class TaskCard extends Component {
    constructor(props) {
        super(props);
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

        return (
            <TaskContainer>
                <HCard>
                    <HCardBody to={'/resource/' + resource.id} style={{textDecoration: 'none'}}>
                        <HCardBodyTitle>{resource.title}</HCardBodyTitle>
                        <HCardBodyDescription>{resource.description}</HCardBodyDescription>
                        <HCardBodyAuthor>By {username}</HCardBodyAuthor>
                    </HCardBody>
                    <HCardFooter>
                        <FaSquareO style={{cursor: "pointer"}} size={40}/>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);