import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import CommentForm from '../form/comment-form';
import CommentList from '../comment/comment-list';
import {fetchResourceComments} from '../../actions/resourceActions';
import {Link} from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5%;
    justify-content: center;
`;

const CommentPageTitle = styled.div`
    color: #474747;
    font-size: 150%;
    margin-bottom: 5%;
    font-weight: bold;
`;

const BreadCrumb = styled(Link)`
    color: #239b88;
    font-weight: bold;
`;

class CommentPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchResourceComments(this.props.match.params.id);
    }

    render() {

        const resource = this.props.resources.byId[this.props.match.params.id];

        return (

            <Container>
                <CommentPageTitle>Commenting on <BreadCrumb to={"/resource/" + resource.id}>{resource.title}</BreadCrumb></CommentPageTitle>
                {resource && <CommentList commentIds={resource.comments}/>}
                <CommentForm resourceId={resource.id}/>
            </Container>


        );
    }
}


function mapStateToProps(state) {
    return {
        resources: state.resources,
        comments: state.comments,
        users: state.users,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchResourceComments: resourceId => dispatch(fetchResourceComments(resourceId))
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(CommentPage);