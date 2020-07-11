import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
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

                            <button className='contact-remove' onClick={() => this.props.onDeleteContact(contact)}>
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

export default ListContacts