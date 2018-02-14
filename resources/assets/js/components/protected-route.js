import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

class ProtectedRoute extends Component {
    render() {
        const {component: Component, ...props} = this.props;
        return (
            <Route
                {...props}
                render={props => (
                    this.props.user !== null ?
                        <Component {...props} /> :
                        <Redirect to='/login'/>
                )}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

export default connect(mapStateToProps,null)(ProtectedRoute);
