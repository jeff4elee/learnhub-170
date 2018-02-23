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

const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    display: inline-flex;
    font-weight: bold;
    font-size: 120%;
    padding: 4% 10%;
    margin-left: 5%;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    &:hover {
        background-color: #166357;
    }
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
                <div style={{padding: '30% 0%'}}>
                </div>
                <BootButton onClick={() => {this.handleLogout()}}> Logout </BootButton>
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