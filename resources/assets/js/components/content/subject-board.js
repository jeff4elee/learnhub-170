import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceList from "../layout/resource-list";
import {fetchSubject} from "../../actions/subjectActions"
import {toggleSubscription} from "../../actions/subjectActions";

const TitleContainer = styled.div`
    width = 90%;
    text-align = left;
    padding-left: 5%;
`;

const Title = styled.h2`
    font-size: 30px;
    font-weight: bold;
    color: #474747;
    overflow-wrap: break-word;
`;
//
// const ButtonContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// `;

const BootButton = styled.button`
    height: 50%;
    color: white;
    display: inline-flex;
    font-weight: bold;
    padding: 3px 5px;
    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;
`;

const SubscribeButton = styled(BootButton)`
    background-color: #239b88;
    
    &:hover {
        background-color: #166357;
    }
`;

const UnsubscribeButton = styled(BootButton)`
    background-color: #166357;
`;

const SubHeader = styled.div`
    display: flex;

    width = 90%;
    text-align = left;

    padding-left: 5.5%;
    padding-right: 5.5%;
    padding-bottom: 0;

    margin-top: 5%;

    justify-content: space-between;
    font-weight: bold;

`;

class SubjectBoard extends Component {
    constructor(props) {
        super(props);
        this.toggleSubscription = this.toggleSubscription.bind(this);
    }

    toggleSubscription(subjectId) {
        this.props.toggleSubscription(subjectId)
    }

    componentWillMount() {
        this.props.fetchSubject(this.props.match.params.id);
    }

    render() {

        const subject = this.props.subjects.byId[this.props.match.params.id];

        return (
            <div>

                <TitleContainer>
                    <Title>
                        {subject.title}
                    </Title>
                    {/*<ButtonContainer>*/}
                    {subject.subscribed ?
                        <UnsubscribeButton onClick={() => this.toggleSubscription(subject.id)}>Unsubscribe</UnsubscribeButton>
                        :
                        <SubscribeButton onClick={() => this.toggleSubscription(subject.id)}>Subscribe</SubscribeButton>
                    }
                    {/*</ButtonContainer>*/}
                </TitleContainer>

                <SubHeader>
                    <div>
                        Resource
                    </div>

                    <div>
                        Rating
                    </div>
                </SubHeader>

                <ResourceList resourceIds={subject.resources}/>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        resources: state.resources,
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSubject: (subjectId) => dispatch(fetchSubject(subjectId)),
        toggleSubscription: (subjectId) => dispatch(toggleSubscription(subjectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBoard);