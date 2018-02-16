import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {createResource} from '../actions/resourceActions';
import history from '../history';
import Modal from 'react-modal';

const Input = styled.input`
    width: 100%;
    border: none;
    border-radius: 3px;
    margin-bottom: 1em;
    padding: 0.25em;
    display: inline-flex
`;

const HelperText = styled.div`
    color: gray;
    font-style: italic;
    font-size: 12px;
`;

const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    width: 40%;
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
    font-size: 30px;
    font-weight: bold;
`;

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
            description: '',
            modalIsOpen: false,
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
            subject: event.target.value
        });
    }

    handleTitleChange(event) {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    handleUrlChange(event) {
        this.setState({
            ...this.state,
            url: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            description: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.createResource({...this.state, user_id: this.props.user.id}).then(() => {
            this.openModal();
        });
    }

    render() {
        return (
            <div>

                <FormContainer onSubmit={this.handleSubmit}>
                    Subject:
                    <Input type="text" value={this.state.subject} onChange={this.handleSubjectChange}/>
                    Resource Title:
                    <Input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                    Url:
                    <HelperText> Urls must be in the format: https://www.example.com </HelperText>
                    <Input type="text" value={this.state.url} onChange={this.handleUrlChange}/>

                    Description:
                    <Input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
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

            </div>
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