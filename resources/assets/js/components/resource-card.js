import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const ResourceContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 300px;
    height: 150px;
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
    height: 100%;
`;

const HCardBody = styled.div`
    width: 80%;
`;

const HCardFooter = styled.div`
    width: 20%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: thin solid #b2b5ba;
`;

class ResourceCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ResourceContainer>
                <Link to={`/resource/2`} style={{textDecoration: 'none'}}>
                    <HCard>
                        <HCardBody/>
                        <HCardFooter>
                            <div> 5</div>
                            <div> -</div>
                            <div> 5</div>
                        </HCardFooter>
                    </HCard>
                </Link>
            </ResourceContainer>
        )
    }
}

export default ResourceCard;