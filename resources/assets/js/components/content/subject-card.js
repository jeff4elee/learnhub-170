import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {toggleSubscription} from "../../actions/subjectActions";
import * as ReactGA from "react-ga";

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
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    margin-top: 8px;
    margin-bottom: 8px;
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
    width: 58%;
    overflow-wrap: break-word;
`;

const HCardDescription = styled(Link)`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    // justify-content: center;
`;

const HCardTitle = styled.h3`
    font-size: 200%;
    color: #239b88;
`;

const HCardFooter = styled.div`
    width: 42%;
    // border-left: thin solid #b2b5ba;
    font-size: 120%;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
        this.fireGa = this.fireGa.bind(this);
    }

    toggleSubscription(subjectId) {
        this.props.toggleSubscription(subjectId)
    }

    fireGa(){

        if(this.props.analytics !== undefined) {
            ReactGA.event({
                category: 'Click Through',
                action: 'Clicked',
            });
        }

    }

    render() {

        const numSubscribers = this.props.subject.subscribers;

        return (
            <SubjectContainer>
                <HCard>
                    <HCardBody onClick={() => this.fireGa()}>
                        <HCardDescription to={`/subject/` + this.props.subject.id} style={{textDecoration: 'none'}}>
                                <div style={{fontSize: "1.75em", color: "#239b88"}}>{this.props.subject.title}</div>
                                {/*<HCardTitle>{this.props.subject.title}</HCardTitle>*/}
                                <div style={{fontSize: "1em"}}>{this.props.subject.description}</div>
                        </HCardDescription>
                        {this.props.subject.subscribed ?
                            <UnsubscribeButton onClick={() => this.toggleSubscription(this.props.subject.id)}>Unsubscribe</UnsubscribeButton>
                            :
                            <SubscribeButton onClick={() => this.toggleSubscription(this.props.subject.id)}>Subscribe</SubscribeButton>
                        }
                    </HCardBody>
                    <HCardFooter>
                        <div style={{textAlign: "center"}}>{ numSubscribers } { numSubscribers !== 1 ? "Subscribers" : "Subscriber" }</div>
                        {/*<RightImage src="http://via.placeholder.com/200x150"/>*/}
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