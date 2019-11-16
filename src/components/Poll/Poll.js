import React, { Component } from 'react';
import { connect } from 'react-redux';

class Poll extends Component {
    
    render() {
        const poll_name = this.props.match.params.route;
        return (
            <>
                <div>
                    <h1>I'm a poll</h1>
                    <h3>{poll_name}</h3>
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Poll);

