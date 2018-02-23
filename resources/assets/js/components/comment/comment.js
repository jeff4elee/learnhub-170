import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import Modal from 'react-modal';

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const comment = this.props.comment;
        const user = this.props.users.byId[comment.user_id];

        return (
            <div>
                {user.name}: {comment.comment}
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);