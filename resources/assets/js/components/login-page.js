import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser, registerUser, logoutUser, resumeSession} from "../actions/userActions";
import styled from 'styled-components';
import history from '../history';
import {Link} from 'react-router-dom';

const LoginLayout = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FormContainer = styled.div`
    padding: 1em 1em 0.5em 1em;
    background: #f4f7f8;
    margin: auto;
    margin-top: 10%;
    margin-bottom: 10%;
    width: 85%;
    flex-direction: row;
`;

const CenteredContainer = styled.div`
    padding: 1em 1em 0.5em 1em;
    background: #f4f7f8;
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-radius: 3px;
    margin-bottom: 1em;
    padding: 0.25em;
    display: inline-flex
`;

const Form = styled.form`
    width: 100%;
    margin: auto;
    flex-direction: column;
`;

const Error = styled.div`
    color: red;
    font-style: italic;
    font-size: 12px;
`;

const Button = styled.input`
    background-color: #239b88;
    color: white;
    width: 50%;
    display: inline-flex;
    font-weight: bold;
    padding: 5px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;

    letter-spacing: 1px;
`;

const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    width: 25%;
    display: inline-flex;
    font-weight: bold;
    padding: 5px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    &:hover {
        background-color: #166357;
    }

`;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', email: '', password: '', error: false, remember: false};

        //bind functions to component
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    handleCheckboxChange(event) {
        console.log(this.state);
        this.setState({...this.state, remember: !this.state.remember});
        console.log(this.state);
    }

    handleSubmit(event) {

        const user = {
            email: this.state.email,
            password: this.state.password,
            remember: true
        };

        if (this.state.remember) {
            const user = {...user, remember: true};
        }

        this.props.loginUser(user);

        event.preventDefault();

    }

    render() {

        return (
            <LoginLayout>
                <FormContainer>

                    <Form onSubmit={this.handleSubmit}>
                        Email
                        <Input type="text" value={this.state.email} onChange={this.handleEmailChange}/>

                        Password
                        <Input type="password" value={this.state.password} onChange={this.handlePassChange}/>

                        <input type="checkbox" onChange={this.handleCheckboxChange}/> Remember Me

                        <CenteredContainer>
                            <BootButton>Login</BootButton>
                        </CenteredContainer>
                    </Form>

                </FormContainer>
                <Link to="/register"> Register Here </Link>
            </LoginLayout>
        )

    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);