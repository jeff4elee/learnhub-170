import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const ResourceContainer = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 80%;
    height: 125px;
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 70%;
    font-weight: bold;
`;

const HCardBodyTitle = styled.div`
    color: #239b88;
    font-size: 28px;
`;

const HCardBodyDescription = styled.div`
    color: black;
    font-size: 18px;
`;

const HCardBodyAuthor = styled.div`
    color: black;
    font-size: 16px;
    text-align: right;
`;

const HCardFooter = styled.div`
    color: black;
    width: 30%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: thin solid #b2b5ba;
    font-size: 20px;
    font-weight: bold;
`;

class ResourceCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const userId = this.props.resource.user_id;
        const user = this.props.users.byId[userId];

        let username = '';

        if (user !== undefined) {
            username = user.name;
        }

        const ratingDisplay = <div>
            {this.props.resource.rating}
            {this.props.resource.rating_count > 0 && '/' + 5}
        </div>;

        return (
            <ResourceContainer>
                <Link to={'/resource/' + this.props.resource.id} style={{textDecoration: 'none'}}>
                    <HCard>
                        <HCardBody>
                            <HCardBodyTitle>{this.props.resource.title}</HCardBodyTitle>
                            <HCardBodyDescription>{this.props.resource.description}</HCardBodyDescription>
                            <HCardBodyAuthor>By {username}</HCardBodyAuthor>
                        </HCardBody>
                        <HCardFooter>
                            <div> {ratingDisplay} </div>
                            <div> {this.props.resource.rating_count}
                                {this.props.resource.rating_count === 1 ? ' rating' : ' ratings'} </div>
                        </HCardFooter>
                    </HCard>
                </Link>
            </ResourceContainer>
        )
    }
}


function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCard);