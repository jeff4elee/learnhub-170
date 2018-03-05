import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {createResource} from '../../actions/resourceActions';
import history from '../../history';
import Modal from 'react-modal';

const Container = styled.div`
    background-color: black
    border: 2px solid black;
    border-radius: 5px;
`;

const Input = styled.input`
    width: 90%;
    margin: 1em 0em;
    padding: 0.25em;
    display: inline-flex

    border-color: transparent;
    border: none;
    border-bottom: 2px solid #474747;
    background-color: transparent;

    &:focus {
        border-bottom: 3px solid #239b88;
        outline: none;
        color: #239b88;
    }

`;

const TextArea = Input.withComponent('textarea');

const TextBox = TextArea.extend`
    border: 2px solid transparent;
    border-radius: 5px;
    background-color: #fcfcfc;

    // box-shadow: inset 0 4px 8px -1px rgba(0,0,0,0.1);

    &:focus {
        border: 2px solid #239b88;
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
            modalIsOpen: false,
            error: false
        };

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
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
            ...this.state,
            error: false,
            subject: event.target.value
        });
    }

    handleTitleChange(event) {
        this.setState({
            ...this.state,
            error: false,
            title: event.target.value
        });
    }

    handleUrlChange(event) {
        this.setState({
            ...this.state,
            error: false,
            url: event.target.value
        });
    }

    handleDescriptionChange(event) {

        this.setState({
            ...this.state,
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

        if (!valid_url.match(/^[a-zA-Z]+:\/\//)) {
            valid_url = 'https://' + valid_url;
        }

        this.props.createResource({
            ...this.state, url: valid_url
        }).then(() => {
            this.openModal();
        });
    }

    render() {

        return (
            <Container>
                {/*<div>*/}

                <FormContainer onSubmit={this.handleSubmit}>

                    <Input type="text" value={this.state.subject} onChange={this.handleSubjectChange} placeholder="Topic"/>
                    { this.state.error && (!this.state.subject || this.state.subject.length > 20) && <Error> Invalid - Input is empty or greater than 20 characters </Error>}

                    <Input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title"/>
                    { this.state.error && !this.state.title && <Error> Invalid Title </Error>}

                    <Input type="text" value={this.state.url} onChange={this.handleUrlChange} placeholder="Resource URL"/>
                    { this.state.error && !this.state.url && <Error> Invalid URL </Error>}

                    {/*<Input type="text" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description"/>
                    { this.state.error && !this.state.description && <Error> Invalid Description </Error>}*/}

                    <TextBox rows="7" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description"></TextBox>
                    { this.state.error && !this.state.description && <Error> Invalid Description </Error>}

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
            // {/*</div>*/}
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