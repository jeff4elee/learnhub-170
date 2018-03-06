import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import * as ReactGA from "react-ga";

const ResourceContainer = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    flex: 1 1 1;
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
    height: 100%;
`;

const HCardBody = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 70%;
    font-weight: bold;
    overflow-wrap: break-word;
`;

const HCardBodyTitle = styled.div`
    color: #239b88;
    font-size: 130%;
`;

const HCardBodyAuthor = styled.div`
    color: #474747;
    opacity: .75;
    font-size: 110%;
`;

const HCardBodyTags = styled.div`
    margin-top: 2px;
    display: flex;
    overflow: scroll;
    list-style-type:none;
`;

const Tag = styled.div`
    background-color: #239b88;
    color: white;
    opacity: .75;
    margin-right: 2px;
    padding: 0px 4px;
    font-size: 80%;
    white-space: nowrap;
`;

const HCardFooter = styled.div`
    color: #474747;
    width: 30%;
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

function dateDiffInDays(a, b) {

    var _MS_PER_MINUTE = 1000 * 60;

    var _MS_PER_HOUR = 1000 * 60 * 60;

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDay(), a.getHours(), a.getMinutes(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(),  b.getDay(), b.getHours(), a.getMinutes(), b.getDate());

    var diff = Math.floor((utc2 - utc1)/_MS_PER_MINUTE);
    var timeField = "minutes";

    if(diff >= 60){
        diff = Math.floor((utc2 - utc1)/_MS_PER_HOUR);
        timeField = "hours";
        if(diff >= 24){
            diff = Math.floor((utc2 - utc1)/_MS_PER_DAY);
            timeField = "days"
        }
    }

    return diff.toString() + " " + timeField + " ago";
}

class ResourceCard extends Component {
    constructor(props) {
        super(props);

        this.fireGa = this.fireGa.bind(this);
    }

    fireGa(){

        if(this.props.analytics === true) {
            ReactGA.event({
                category: 'Click Through',
                action: 'Clicked',
            });
        }

    }

    render() {

        const userId = this.props.resource.user_id;
        const username = this.props.users.byId[userId].name;
        const tags = this.props.resource.tags.map(tag => <Tag key={tag}>{tag}</Tag>);

        // let username = '';
        // if (user !== undefined) {
        //     username = user.name;
        // }

        const ratingDisplay = <div>
            {this.props.resource.rating}
            {this.props.resource.rating_count > 0 && ' / ' + 5}
        </div>;

        let now = new Date(new Date().toUTCString().substr(0, 25));
        const createdAt = new Date(this.props.resource.created_at);
        const diff = dateDiffInDays(createdAt, now);

        return (
            <ResourceContainer onClick={() => this.fireGa()}>
                <Link to={'/resource/' + this.props.resource.id} style={{textDecoration: 'none'}}>
                    <HCard>
                        <HCardBody>
                            <HCardBodyTitle>{this.props.resource.title}</HCardBodyTitle>
                            <HCardBodyAuthor>By {username}, {diff}</HCardBodyAuthor>
                            <HCardBodyTags>{tags}</HCardBodyTags>
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