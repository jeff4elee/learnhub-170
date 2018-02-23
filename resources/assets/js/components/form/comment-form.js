import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {commentOnResource} from '../../actions/resourceActions';
import history from '../../history';
import Modal from 'react-modal';

const Input = styled.input`
    width: 90%;
    margin: 1em 0em;
    padding: 0.25em;
    display: inline-flex

    border-color: transparent;
    border: none;
    border-bottom: 3px solid #474747;
    background-color: transparent;

    &:focus {
        border-bottom: 3px solid #239b88;
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
    border-radius: 2px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
    justify-content: center;
`;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };

        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCommentChange(event){
        event.preventDefault();
        this.setState({...this.state, comment: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.commentOnResource({
            ...this.state, resource_id: this.props.resourceId
        });
    }

    render() {
        return (
            <div>

                <FormContainer onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.comment} onChange={this.handleCommentChange} placeholder="Comment"/>
                    <BootButton> Post </BootButton>
                </FormContainer>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        commentOnResource: (comment) => dispatch(commentOnResource(comment))
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);