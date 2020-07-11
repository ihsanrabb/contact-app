import React, { Component } from "react"
import { Link } from 'react-router-dom'
import fetchContacts from "./store/actions/fetchContacts";
import {connect} from "react-redux";
import axios from "axios"
import Swal from 'sweetalert2'

class ListContacts extends Component {

    componentDidMount() {
        this.props.fetchContacts()
    }

    removeContact = (contact) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${contact.id}`)
                .then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.props.fetchContacts()
                }).catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message
                    })
                })
            }
          })
    }

    render() {

        return (
            <div className="list-contacts">
                <div className='list-contacts-top'>
                <input
                    className='search-contacts'
                    type='text'
                    placeholder='Search contacts..'
                    
                />
                    <Link
                    to='/create'
                    className='add-contact'>
                    Add Contact</Link>
                </div>

                <div className="container">
                    <ol className='contact-list'>
                        {this.props.contacts.map( contact => (
                            <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.photo})`
                            }}> </div>
                            <div className='contact-details'>
                                <p>fullname : {contact.firstName} {contact.lastName}</p>
                                <p>age : {contact.age}</p>
                            </div>

                            <Link to={`/update/${contact.id}`} className='edit-contact'>Add Contact</Link>

                            <button className='contact-remove' onClick={() => this.removeContact(contact)}>
                                Remove
                            </button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      contacts: state.contacts,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchContacts: ()=> dispatch(fetchContacts),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContacts);