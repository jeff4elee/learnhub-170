import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactStars from 'react-stars'
import {fetchResource, rateResource} from "../actions/resourceActions";

const RatingModal = styled(Modal)`
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
    background-color: white;
    border: 1px solid #ccc;
    outline: none;
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
`;

const ActionButton = styled.button`
    background-color: #239b88;
    color: white;
    padding: 12px;
    margin-top: 12px;
    margin-left: 12px;
    margin-right: 12px;
    font-weight: bold;
    font-size: 20px;
`;

class Resource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    componentWillMount(){
        this.props.fetchResource(this.props.match.params.id);
    }
    
    changeRating(newRating) {

        const ratingData = {
            "resource_id": this.props.match.params.id,
            "user_id": this.props.user.id,
            "rating": newRating
        };

        this.props.rateResource(ratingData).then(() => {
            this.closeModal();
        });

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
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
                        <img src="http://via.placeholder.com/300x250"/>
                        <ActionButton> Add to Tasks </ActionButton>
                        <ActionButton onClick={() => this.openModal()}> Rate </ActionButton>
                        <ActionButton> Comment </ActionButton>
                        <ActionButton> Report </ActionButton>
                    </ResourceBody>

                </ResourceContainer>

                <RatingModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}>

                    <RatingBar>
                        <ReactStars
                            count={5}
                            onChange={this.changeRating}
                            size={40}
                            value={rating}
                            color2={'#ffd700'}/>
                    </RatingBar>

                </RatingModal>

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);