import React from 'react';
import './App.css';
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContact";
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
            <ListContacts />
        )} />

        <Route path='/create' render={({ history }) => (
          <CreateContact />
        )} />

        <Route 
          exact
          path='/update/:id' 
          location={this.props.location} 
          render={({ location, match }) => (
          <UpdateContact  match={match} />
        )} />

      </div>
    );
  }
}

export default App;
