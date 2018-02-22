import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import CommentForm from '../form/comment-form';
import CommentList from '../comment/comment-list';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5%;
    justify-content: center;
`;

class CommentPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const resource = this.props.resource;

        return (

            <Container>
                <CommentList commentIds={resource.comments}/>
                <CommentForm resourceId={resource.id}/>
            </Container>

        );
    }
}


function mapStateToProps(state) {
    return {
        resources: state.resources,
        comments: state.comments,
        users: state.users,
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, null)(CommentPage);