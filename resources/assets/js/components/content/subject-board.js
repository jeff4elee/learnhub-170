import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceList from "../layout/resource-list";
import {fetchSubject} from "../../actions/subjectActions"

const TitleContainer = styled.div`
    width = 90%;
    text-align = left;
    padding-left: 20px;
`;

const Title = styled.h2`
    font-size: 35px;
    font-weight: bold;
    color: #474747;
`;

class SubjectBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchSubject(this.props.match.params.id);
    }

    render(){

        const subject = this.props.subjects.byId[this.props.match.params.id];

        return (
            <div>

                <TitleContainer>
                    <Title>
                        {subject.title}
                    </Title>
                </TitleContainer>

                <ResourceList resourceIds={subject.resources}/>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources,
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSubject: (subjectId) => dispatch(fetchSubject(subjectId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBoard);