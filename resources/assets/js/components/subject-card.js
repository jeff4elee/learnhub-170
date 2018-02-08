import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const SubjectContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 500px;
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 80%;
`;

const HCardFooter = styled.div`
    border-left: thin solid #b2b5ba;
`;

class SubjectCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SubjectContainer>
                    <HCard>
                        <HCardBody>
                            <Link to={`/subject/2`} style={{ textDecoration: 'none' }}>
                                <div>Title</div>
                            </Link>
                            <div>Description</div>
                        </HCardBody>
                        <HCardFooter>
                            <img src="http://via.placeholder.com/300x200"/>
                        </HCardFooter>
                    </HCard>
            </SubjectContainer>
        )
    }
}

export default SubjectCard;