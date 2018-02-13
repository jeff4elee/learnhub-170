import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import styled from 'styled-components';
import createResource from '../actions/resourceActions'

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
            link: '',
            description: ''
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubjectChange(event){
        this.setState({
            ...state,
            subject: event.target.value
        });
    }

    handleTitleChange(event) {
        this.setState({
            ...state,
            title: event.target.value
        });
    }

    handleLinkChange(event){
        this.setState({
            ...state,
            link: event.target.value
        });
    }

    handleDescriptionChange(event){
        this.setState({
            ...state,
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createResource({...state});
    }

    render() {
        return (
            <FormContainer onSubmit={this.handleSubmit}>
                Subject:
                <input type="text" value={this.state.subject} onChange={this.handleSubjectChange}/>
                Resource Title:
                <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                Link:
                <input type="text" value={this.state.link} onChange={this.handleLinkChange}/>
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
        createResource: () => dispatch(createResource())
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);