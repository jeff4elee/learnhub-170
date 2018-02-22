import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactStars from 'react-stars'
import {fetchResource, rateResource} from "../../actions/resourceActions";
import {addResourceAsTask} from "../../actions/taskActions";

const NotificationModal = styled(Modal)`
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 20%;
    display: flex;
    justify-content:center;
    align-content:center;
    flex-direction:column;
    background-color: #239b88;
    border: 1px solid #ccc;
    outline: none;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 20px;
`;

const RatingBar = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`

`;

const ResourceContainer = styled.div`
    width: 90%;
    margin: auto;
`;

const ResourceBody = styled.div`
    flex-direction: column;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
`;

const BootButton = styled.button`

    margin-top: 1em;

    background-color: #239b88;
    color: white;
    width: 100%;
    display: inline-flex;
    font-weight: bold;
    padding: 5px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    margin: .75em 0 .75em 0;

    &:hover {
        background-color: #166357;
    }

`;

const Image = styled.img`
    margin-top: .5em;
    margin-bottom: .5em;
`;

class Resource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            ratingModal: false,
            taskAddingModal: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.changeRating = this.changeRating.bind(this);
        this.addToTask = this.addToTask.bind(this);
    }

    addToTask() {
        this.props.addResourceAsTask(this.props.match.params.id).then(() => {
            this.openModal("task");
        });
    }

    changeRating(newRating) {

        const ratingData = {
            "resource_id": this.props.match.params.id,
            "rating": newRating
        };

        this.props.rateResource(ratingData).then(() => {
            this.closeModal();
        });

    }

    componentWillMount() {
        this.props.fetchResource(this.props.match.params.id);
    }

    openModal(type) {

        let newState = {
            ...this.state,
            modalIsOpen: true,
            ratingModal: false,
            taskAddingModal: false
        };

        if (type === "rate") {
            newState['ratingModal'] = true;
        } else if (type === "task") {
            newState['taskAddingModal'] = true;
        }

        this.setState(newState);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {

        const resource = this.props.resources.byId[this.props.match.params.id];
        const rating = this.props.resources.byId[this.props.match.params.id].personal_rating;

        return (
            <Container>
                <ResourceContainer>
                    <h1><b>{resource.title}</b></h1>
                    <div>
                        <b>Links To: </b>
                        <a href={resource.url} target="_blank"> {resource.url_domain} </a>
                    </div>
                    <ResourceBody>
                        <Image src="http://via.placeholder.com/300x250"/>
                            <BootButton onClick={() => this.addToTask()}> Add to Tasks </BootButton>
                            <BootButton onClick={() => this.openModal("rate")}> Rate </BootButton>
                            <BootButton> Comment </BootButton>
                            <BootButton> Report </BootButton>
                    </ResourceBody>
                </ResourceContainer>

                <NotificationModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}>

                    {
                        this.state.taskAddingModal && "Task added successfully!"
                    }

                    {
                        this.state.ratingModal &&
                        <RatingBar>
                            <ReactStars
                                count={5}
                                onChange={this.changeRating}
                                size={40}
                                value={rating}
                                color2={'#ffd700'}/>
                        </RatingBar>
                    }

                </NotificationModal>

            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        resources: state.resources,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchResource: (resourceId) => dispatch(fetchResource(resourceId)),
        rateResource: (ratingData) => dispatch(rateResource(ratingData)),
        addResourceAsTask: (resourceId) => dispatch(addResourceAsTask(resourceId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);