import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {createResource} from '../../actions/resourceActions';
import history from '../../history';
import Modal from 'react-modal';
import {isAlphaNumeric} from '../utils';

const Container = styled.div`
    background-color: black
    border: 2px solid black;
    border-radius: 5px;
`;

const StyledInput = styled.input`
    width: 90%;
    margin: 5% 0 2.5% 0;
    padding: 0.25em;
    display: inline-flex

    border-color: transparent;
    border: none;
    border-bottom: 2px solid #636B6F;


    background-color: transparent;

    &:focus {
        border-bottom: 3px solid #239b88;
        outline: none;
        color: #239b88;
    }

`;

const Input = styled.input`
    width: 90%;
    margin: 2.5% 0;
    padding: 0.25em;
    display: inline-flex;


    background-color: white;
    border: none;
    // border: 2px solid transparent;
    border-radius: 5px;

    box-shadow: inset 0 7px 9px -9px rgba(0,0,0,0.4);

    &:focus {
        border: 3px solid #239b88;
        outline: none;
        color: #239b88;
    }

`;

const TextArea = Input.withComponent('textarea');

const TextBox = TextArea.extend`
    // border: 2px solid transparent;
    border-radius: 5px;
    background-color: #fcfcfc;

    // box-shadow: inset 0 4px 8px -1px rgba(0,0,0,0.1);

    &:focus {
        border: 3px solid #239b88;
        border-radius: 5px;
        outline: none;
        color: #239b88;
    }
`;

const HelperText = styled.div`
    color: gray;
    font-style: italic;
    font-size: 12px;
`;

const BootButton = styled.button`

    margin-top: 1em;

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

    &:hover {
        background-color: #166357;
    }

`;

const NotificationModal = styled(Modal)`
    background-color: #239b88;
    color: white;
    width: 40%;
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 20%;
    display: flex;
    justify-content:center;
    align-content:center;
    outline: none;
    flex-direction: column;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    font0family: Helvetica;
    border-radius: 5px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
    justify-content: center;
    padding-bottom: 5%;

    border: 2px solid transparent;
    border-radius: 5px;

    background-color: #F5F5F5;
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
`;

const Error = styled.div`
    color: red;
    font-style: italic;
    font-size: 12px;
    align-self: left;
    margin-left: 5%;
`;

class ResourceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            title: '',
            url: '',
            description: '',
            tags: '',
            urlError: false,
            modalIsOpen: false,
            error: false
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        history.push('/');
    }

    handleSubjectChange(event) {
        this.setState({
            error: false,
            subject: event.target.value
        });
    }

    handleTitleChange(event) {
        this.setState({
            error: false,
            title: event.target.value
        });
    }

    handleUrlChange(event) {
        this.setState({
            error: false,
            url: event.target.value
        });
    }

    handleTagChange(event){
        this.setState({
            tags: event.target.value
        });
    }

    handleDescriptionChange(event) {

        this.setState({
            error: false,
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.subject || !this.state.title || !this.state.url || !this.state.description
            || this.state.subject.length > 20){
            this.setState({error: true});
            return;
        }

        let valid_url = this.state.url;

        const pattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

        if (!valid_url.match(/^[a-zA-Z]+:\/\//)) {
            valid_url = 'https://' + valid_url;
        }

        if (!pattern.test(valid_url)) {
            this.setState({urlError: true});
            return;
        }

        if(!this.state.tags){
            this.props.createResource({
                ...this.state, url: valid_url, tags: null
            }).then(() => {
                this.openModal();
            });
            return;
        }

        let parsedTags = this.state.tags;

        parsedTags = parsedTags.split(",");

        for(let i = 0; i < parsedTags.length; i++) {

            if(isAlphaNumeric(parsedTags[i])) {
                parsedTags[i] = parsedTags[i].trim();
            }
        }

        this.props.createResource({
            ...this.state, url: valid_url, tags: parsedTags
        }).then(() => {
            this.openModal();
        });
    }

    render() {

        return (
            <Container>
                <FormContainer onSubmit={this.handleSubmit}>

                    <StyledInput type="text" value={this.state.subject} onChange={this.handleSubjectChange} placeholder="Subject"/>
                    { this.state.error && (!this.state.subject || this.state.subject.length > 20) && <Error> Invalid - Input is empty or greater than 20 characters </Error>}

                    <Input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Resource Title"/>
                    { this.state.error && !this.state.title && <Error> Invalid Title</Error>}

                    <Input type="text" value={this.state.url} onChange={this.handleUrlChange} placeholder="Resource URL"/>
                    { (this.state.error && !this.state.url || this.state.urlError) && <Error> Invalid URL </Error>}

                    <Input type="text" value={this.state.tags} onChange={this.handleTagChange} placeholder="Tags (comma separated)"/>

                    <TextBox rows="7" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description"/>
                    { this.state.error && !this.state.description && <Error> Invalid Description</Error>}

                    <BootButton> Create Resource </BootButton>
                </FormContainer>

                <NotificationModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}>

                    Resource Successfully Created!

                </NotificationModal>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createResource: (resource) => dispatch(createResource(resource))
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(ResourceForm);