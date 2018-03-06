import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../form/search-form';
import ResourceList from './resource-list';
import {fetchPopular} from '../../actions/subjectActions';
import ReactGA from 'react-ga';

ReactGA.pageview(window.location.pathname + window.location.search);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    justify-content: center;
`;

const SearchBarContainer = styled.div`
    margin-top: 5%;
`; 

const SubtitleText = styled.div`
   font-size: 20px;
   font-weight: bold;
   margin-left: 2.5%;
   margin-top: 5%;
   color: #474747;
`;

class SearchPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchPopular();
    }
    render(){

        const byId = this.props.resources.byId;

        function sort(arr) {
            return arr.concat().sort(function(p1, p2) { return byId[p2].rating - byId[p1].rating; });
        }

        const topResources = sort(this.props.resources.allIds).slice(0, 5);

        return (

            <Container>
                <SearchBarContainer>
                    <SearchForm/>
                </SearchBarContainer>
                <SubtitleText> Search Results </SubtitleText>
                <ResourceList analytics={true} resourceIds={this.props.resources.searchIds}/>
                <SubtitleText> Popular Resources </SubtitleText>
                <ResourceList analytics={true} resourceIds={topResources}/>
            </Container>

        );
    }
}


function mapStateToProps(state) {
    return {
        resources: state.resources
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopular: () => dispatch(fetchPopular())
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
