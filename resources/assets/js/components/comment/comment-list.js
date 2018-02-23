import React, {Component} from "react";
import Comment from "./comment";
import {connect} from 'react-redux';
import styled from 'styled-components';

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        const comments = this.props.comments.byId;

        let commentList = [];

        if(this.props.commentIds) {
            commentList = this.props.commentIds.map(id => <Comment key={id} comment={comments[id]}/>);
        }

        return (
            <CommentsContainer>
                {commentList}
            </CommentsContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        comments: state.comments,
    }
}

export default connect(mapStateToProps, null)(CommentList);