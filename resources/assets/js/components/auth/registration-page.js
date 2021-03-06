import React, {Component} from 'react';
import {registerUser} from '../../actions/userActions'
import {connect} from 'react-redux';
import history from '../../history';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const RegistrationLayout = styled.div`
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
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Error = styled.div`
    color: red;
    font-style: italic;
    font-size: 12px;
`;

const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    width: 80%;
    display: inline-flex;
    font-weight: bold;
    padding: 10px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    &:hover {
        background-color: #166357;
    }
`;

const SubtitleText = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-top: 2.5%;
    margin-bottom: 5%;
    color: #474747;
`;


class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: false
        };

        //bind functions to component
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handlePassConfChange = this.handlePassConfChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({username: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePassChange(event) {
        this.setState({password: event.target.value});
    }

    handlePassConfChange(event) {
        this.setState({password_confirmation: event.target.value});
    }

    handleSubmit(event) {

        const user = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };

        this.props.registerUser(user).then(() => {
            history.push("/");
        });

        event.preventDefault();

    }

    render() {

        let nameError = "";
        let emailError = "";
        let passwordError = "";

        if (this.props.error) {
            if ("name" in this.props.error) {
                console.log(this.props.error.name);
                nameError = <Error> {this.props.error.name[0]} </Error>;
            }

            if ("email" in this.props.error) {
                emailError = <Error> {this.props.error.email[0]} </Error>;
            }

            if ("password" in this.props.error) {
                passwordError = <Error> {this.props.error.password[0]} </Error>;
            }

        }

        return (
            <RegistrationLayout>

                <FormContainer flexDirection="row">
                    <SubtitleText>Register Your Account</SubtitleText>

                    <Form onSubmit={this.handleSubmit}>

                        Name {nameError}

                        <Input type="text" value={this.state.username} onChange={this.handleNameChange}/>

                        Email {emailError}

                        <Input type="text" value={this.state.email} onChange={this.handleEmailChange}/>

                        Password {passwordError}

                        <Input type="password" value={this.state.password} onChange={this.handlePassChange}/>

                        Password Confirmation

                        <Input type="password" value={this.state.password_confirmation}
                               onChange={this.handlePassConfChange}/>

                        <CenteredContainer>
                            <BootButton>Submit Registration</BootButton>
                        </CenteredContainer>
                    </Form>

                </FormContainer>

                <Link to="/"> Return to Login </Link>

            </RegistrationLayout>

        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.registrationError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: user => dispatch(registerUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
