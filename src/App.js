import React from 'react';
import './App.css';
import axios from "axios";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContact";
import { Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts : []
    }
  }

  componentDidMount() {
    const apiUrl = "https://simple-contact-crud.herokuapp.com/contact"
    axios.get(apiUrl)
      .then((res) => {
        this.setState({contacts: res.data.data})
      }).catch(err => console.log(err))
  }

  removeContact = (contact) => {
    axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${contact.id}`)
      .then((res) => {
        console.log(res)
      }).catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
            <ListContacts 
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
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
