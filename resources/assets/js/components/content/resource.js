import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import ReactStars from 'react-stars'
import {fetchResource, rateResource} from "../../actions/resourceActions";
import {addResourceAsTask} from "../../actions/taskActions";
import {Link} from 'react-router-dom';

const NotificationModal = styled(Modal)`
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 15%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;

    // background-color: #239b88;
    background-color: red;

    border: 2px solid transparent;
    border-radius: 5px;

    outline: none;
    text-align: center;

    color: white;
    font-weight: bold;
    font-size: 20px;

`;

const Container = styled.div``;

const RatingBar = styled.div`
    display: flex;
    justify-content: center;
`;

const RoundedDiv = styled.div`
    border-radius: 5px;
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

const Image = styled.img`
    margin-top: .5em;
    margin-bottom: .5em;
`;

const BootButton = styled.button`

    background-color: #239b88;
    color: white;
    width: 100%;
    display: inline-flex;
    font-size: 120%;
    font-weight: bold;
    // padding: 5px 7px;
    padding: 10px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    margin: 2.5% 0 2.5% 0;

    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.4);

    &:hover {
        background-color: #166357;
    }
`;

const BootLink = styled(Link)`
    text-align: center;
    text-decoration: none;

    background-color: #239b88;
    color: white;
    width: 100%;
    display: inline-flex;
    font-size: 120%;

    font-weight: bold;
    padding: 10px 7px;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    margin: 2.5% 0 2.5% 0;

    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.5);

    &:hover {
        text-decoration: none;
        background-color: #166357;
    }

    &:active {
        text-decoration: none;
        color: white;
        background-color: #166357;
    }
`;

const TitleText = styled.div`
   font-size: 200%;
   font-weight: bold;
   color: #474747;
   overflow-wrap: break-word;
`;

const SubtitleText = TitleText.extend`
    font-size: 110%;
    color: #636B6F;
    margin-bottom: 5%;
`;

const BreadCrumbs = styled.div`
    margin: 0;
    margin-top: 2.5%;
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    font-size: 100%;
`;

const StyledCrumb = styled(Link)`
    margin-left: 1.5%;
    // color: #239b88;
    color: #636B6F;
    font-weight: bold;
`;

const StyledCrumbDiv = styled.div`
    margin-left: 1.5%;
    color: #239b88;
    font-weight: bold;
`;

const Spacing = styled.div`
    margin: 10% 0;
`;

class Resource extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            ratingModal: false,
            taskAddingModal: false,
            reported: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.report = this.report.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.addToTask = this.addToTask.bind(this);
        this.submitRating = this.submitRating.bind(this);
    }

    addToTask() {
        this.props.addResourceAsTask(this.props.match.params.id).then(() => {
            this.openModal("task");
        });
    }

    submitRating() {
        const ratingData = {
            "resource_id": this.props.match.params.id,
            "rating": this.state.rating
        };

        this.props.rateResource(ratingData).then(() => {
            this.closeModal();
        });
    }

    changeRating(newRating) {
        this.setState({rating: newRating});
    }

    componentWillMount() {
        this.props.fetchResource(this.props.match.params.id).then(() => {
            this.setState({rating: this.props.resources.byId[this.props.match.params.id].personal_rating});
        });
    }

    report() {
        this.setState({reported: true});
    }

    openModal(type) {

        let newState = {
            modalIsOpen: true,
            ratingModal: false,
            taskAddingModal: false,
            reported: false
        };

        if (type === "rate") {
            newState['ratingModal'] = true;
        } else if (type === "task") {
            newState['taskAddingModal'] = true;
        } else if (type === "report") {
            newState['reported'] = true;
        }

        this.setState(newState);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {

        const resource = this.props.resources.byId[this.props.match.params.id];
        const subject = this.props.subjects.byId[parseInt(resource.subject_id)];

        return (
            <Container>

                {subject !== undefined && <BreadCrumbs>
                    <StyledCrumb to={"/"} style={{marginLeft: "0"}}>Home ></StyledCrumb>
                    <StyledCrumb to={"/subject/" + subject.id}>{subject.title} ></StyledCrumb>
                    <StyledCrumbDiv>{resource.title}</StyledCrumbDiv>
                </BreadCrumbs>}

                <ResourceContainer>

                    <TitleText>{resource.title}</TitleText>
                        <SubtitleText>
                            Links To: <a href={resource.url} target="_blank"> {resource.url_domain} </a>
                        </SubtitleText>
                    <ResourceBody>
                        {/*<a href={resource.url} target="_blank"><Image src="http://via.placeholder.com/300x250"/></a>*/}
                        <div><b> Description: </b>{resource.description} </div>
                        <Spacing></Spacing>
                        <BootButton onClick={() => this.addToTask()}> Save to Tasklist </BootButton>
                        <BootButton onClick={() => this.openModal("rate")}> Rate </BootButton>
                        <BootLink to={"/comments/" + resource.id}> Comment </BootLink>
                        <BootButton onClick={() => this.openModal("report")}> Report </BootButton>
                    </ResourceBody>
                </ResourceContainer>

                <NotificationModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}>


                    {this.state.taskAddingModal && "Task added successfully!"}


                    {this.state.ratingModal &&
                    <div>
                        <RatingBar>
                            <ReactStars
                                count={5}
                                onChange={this.changeRating}
                                size={50}
                                value={this.state.rating}
                                color2={'#ffd700'}/>
                        </RatingBar>
                        <button onClick={() => this.submitRating()}>Submit</button>
                    </div>}

                    {this.state.reported && "Resource has been reported"}

                </NotificationModal>


            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        resources: state.resources,
        comments: state.comments,
        user: state.auth.user,
        subjects: state.subjects
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