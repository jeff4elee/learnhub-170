import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import styled from 'styled-components';
import {createResource} from '../actions/resourceActions'

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
        this.state = {
            subject: '',
            title: '',
            url: '',
            description: ''
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubjectChange(event){
        this.setState({
            ...this.state,
            subject: event.target.value
        });
    }

    handleTitleChange(event) {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    handleUrlChange(event){
        this.setState({
            ...this.state,
            url: event.target.value
        });
    }

    handleDescriptionChange(event){
        this.setState({
            ...this.state,
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.createResource({...this.state});
    }

    render() {
        return (
            <FormContainer onSubmit={this.handleSubmit}>
                Subject:
                <input type="text" value={this.state.subject} onChange={this.handleSubjectChange}/>
                Resource Title:
                <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                Url:
                <input type="text" value={this.state.url} onChange={this.handleUrlChange}/>
                Description:
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
                <input type="submit" value="Submit"/>
            </FormContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createResource: (resource) => dispatch(createResource(resource))
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);