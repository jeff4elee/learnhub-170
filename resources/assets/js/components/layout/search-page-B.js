import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../form/search-form';
import SubjectList from './subject-list';
import {fetchPopular} from '../../actions/subjectActions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    justify-content: center;
`;

const SubtitleText = styled.div`
   font-size: 28px;
   font-weight: bold;
   margin-left: 2.5%;
`;

class SearchPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchPopular();
    }

    render() {

        const byId = this.props.subjects.byId;

        function sort(arr) {
            return arr.concat().sort(function(p1, p2) { return byId[p2].subscribers - byId[p1].subscribers; });
        }

        const topSubjects = sort(this.props.subjects.allIds).slice(0, 5);

        return (

            <Container>
                <SearchForm/>
                <SubtitleText> Search Results </SubtitleText>
                <SubjectList subjectIds={this.props.subjects.searchIds}/>
                <SubtitleText> Popular Topics </SubtitleText>
                <SubjectList subjectIds={topSubjects}/>
            </Container>

        );
    }
}

function mapStateToProps(state) {
    return {
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopular: () => dispatch(fetchPopular())
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);