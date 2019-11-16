import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {
    handleInput = (e) =>{
        this.props.dispatch({type:'ROUTE_INPUT', payload: e.target.value})
    }
    render() {
        return (
            <>
            <div className="centered">
                <input type="text" 
                className="inputDarkMode"
                value={this.props.newRouteInput} 
                onChange={this.handleInput} />
              
                
            </div>
              <pre>{JSON.stringify(this.props,null,2)}</pre>
              </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(App);

