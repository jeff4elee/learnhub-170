import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const ResourceContainer = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    flex: 1 1 1;
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 64%;
    font-weight: bold;
`;

const HCardBodyTitle = styled.div`
    color: #239b88;
    font-size: 130%;
`;

const HCardBodyDescription = styled.div`
    color: #474747;
    font-size: 18px;
    width: 100%;
`;

const HCardBodyAuthor = styled.div`
    color: #474747;
    opacity: .75;
    font-size: 110%;
`;

const HCardFooter = styled.div`
    color: #474747;
    width: 36%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    // border-left: thin solid #b2b5ba;
    font-size: 130%;
    font-weight: bold;
    text-align: right;
    padding-right: 5%;
    // background-color: red;
`;

const RatingSubtext = styled.h3`
    font-size: 75%;
    font-weight: bold;
    opacity: .5;
    padding: 0;
    padding-top: 2%;
    margin: 0;
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
            {/*{this.props.resource.rating_count > 0 && '/' + 5}*/}
            {this.props.resource.rating_count > 0 && ' / ' + 5}
        </div>;

        return (
            <ResourceContainer>
                <Link to={'/resource/' + this.props.resource.id} style={{textDecoration: 'none'}}>
                    <HCard>
                        <HCardBody>
                            <HCardBodyTitle>{this.props.resource.title}</HCardBodyTitle>
                            <HCardBodyAuthor>By {username}</HCardBodyAuthor>
                        </HCardBody>
                        <HCardFooter>
                            <div> {ratingDisplay} </div>
                            <div> 
                                <RatingSubtext>
                                    {this.props.resource.rating_count}
                                    {this.props.resource.rating_count === 1 ? ' Rating' : ' Ratings'} 
                                </RatingSubtext>
                            </div>
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