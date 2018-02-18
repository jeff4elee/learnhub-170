import React, {Component} from "react";
import Comment from "./comment";
import {connect} from 'react-redux';

class CommentChain extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state){
    return {
    };
}

export default connect(mapStateToProps, null)(CommentChain);