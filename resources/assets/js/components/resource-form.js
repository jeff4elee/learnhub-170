import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
    justify-content: center;
`;

class ResourceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <FormContainer onSubmit={this.handleSubmit}>
                Subject:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                Resource Title:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                Link:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                Description:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <input type="submit" value="Submit"/>
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
        resetStore: () => dispatch(resetStore())
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);