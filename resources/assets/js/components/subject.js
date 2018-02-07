import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const SubjectContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 400px;
    margin-top: 10px;
    margin-bottom: 10px;
    
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`;

const HCard = styled.div`
    display: flex;
    flex-direction: row;
`;

const HCardBody = styled.div`
    width: 80%;
`;

const HCardFooter = styled.div`
`;

class Subject extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <SubjectContainer>
                <HCard>
                    <HCardBody/>
                    <HCardFooter>
                        <img src="http://via.placeholder.com/250x175" />
                    </HCardFooter>
                </HCard>
            </SubjectContainer>
        )
    }
}

export default Subject;