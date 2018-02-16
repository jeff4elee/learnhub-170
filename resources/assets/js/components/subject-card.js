import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {toggleSubscription} from "../actions/subjectActions";

const BootButton = styled.button`
    color: white;
    display: inline-flex;
    font-weight: bold;
    padding: 5px 7px;
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

const SubjectContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

const HCard = styled.div`
    display: flex;
    flex-direction: row;
`;

const HCardBody = styled.div`
    color: black;
    padding: 2.5%;
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const HCardDescription = styled(Link)`
    display: flex;
    flex-grow: 1;
`;

const HCardFooter = styled.div`
    width: 40%;
    border-left: thin solid #b2b5ba;
`;

const RightImage = styled.img`
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    width: 100%;
`;

class SubjectCard extends Component {
    constructor(props) {
        super(props);
        this.toggleSubscription = this.toggleSubscription.bind(this);
    }

    toggleSubscription(subjectId) {
        this.props.toggleSubscription(subjectId)
    }

    render() {
        return (
            <SubjectContainer>
                <HCard>
                    <HCardBody>
                        <HCardDescription to={`/subject/` + this.props.subject.id} style={{textDecoration: 'none'}}>
                                <div style={{fontSize: "2em"}}>{this.props.subject.title}</div>
                                <div style={{fontSize: "1em"}}>{this.props.subject.description}</div>
                        </HCardDescription>
                        {this.props.subject.subscribed ?
                            <UnsubscribeButton onClick={() => this.toggleSubscription(this.props.subject.id)}>Unsubscribe</UnsubscribeButton>
                            :
                            <SubscribeButton onClick={() => this.toggleSubscription(this.props.subject.id)}>Subscribe</SubscribeButton>
                        }
                    </HCardBody>
                    <HCardFooter>
                        <RightImage src="http://via.placeholder.com/200x150"/>
                    </HCardFooter>
                </HCard>
            </SubjectContainer>
        )
    }
}


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        toggleSubscription: (subjectId) => dispatch(toggleSubscription(subjectId))
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(SubjectCard);