import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import Modal from 'react-modal';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replying: false,
            viewingProfileId: null,
        };
    }

    render() {

        return (
            <div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);