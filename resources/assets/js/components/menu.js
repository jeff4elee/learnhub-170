import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import styled from 'styled-components';
import {logoutUser} from "../actions/userActions";
import history from '../history';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5%;
    justify-content: center;
`;

class Menu extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.logoutUser().then(() => {
            history.push("/");
        })
    }


    render() {
        return (
            <Container>
                <button onClick={() => {this.handleLogout()}}> Logout </button>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        example: state.example
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendExampleAction: () => dispatch(sendExampleAction()),
        resetStore: () => dispatch(resetStore()),
        logoutUser: () => dispatch(logoutUser())
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Menu);