import React, { Component } from 'react';
import {connect} from 'react-redux';
import Poll from '../Poll/Poll';
import Input from '../Input/Input';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './App.css';

class App extends Component {

    render() {
        return (
            <>
            <Router>
            <Switch>
                <Route path="/" exact component={Input} />
                <Route path="/:route" component={Poll} />
            </Switch>
            </Router>

              <pre>{JSON.stringify(this.props,null,2)}</pre>
              </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(App);

