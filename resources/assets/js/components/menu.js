import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import styled from 'styled-components';
import {logoutUser} from "../actions/userActions";
import history from '../history';

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5%;
    justify-content: center;
`;

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.logoutUser().then(() => {
            history.push("/");
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <FormContainer>
                <form onSubmit={this.handleSubmit}>
                        Menu:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>

                <button onClick={() => {this.handleLogout()}}> Logout </button>
            </FormContainer>
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