import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import Swal from 'sweetalert2'

class UpdateContact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName : "" ,
            lastName: "",
            age: "",
            photo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        let userId = this.props.match.params.id
        axios.get(`https://simple-contact-crud.herokuapp.com/contact/${userId}`)
            .then(({ data: contact }) => {
                this.setState({
                    firstName: contact.data.firstName,
                    lastName: contact.data.lastName,
                    age: contact.data.age,
                    photo: contact.data.photo
                })
            }).catch(err => console.log(err))
    }

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val});
    }

    handleSubmit(e) {
        e.preventDefault();
        let userId = this.props.match.params.id
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            photo: this.state.photo
        }
        axios.put(`https://simple-contact-crud.herokuapp.com/contact/${userId}`, data)
            .then((res) => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Contact Edited',
                })
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                })
            })
    }

    render() {
        return (
            <div>
                <Link to='/' className='close-create-contact'>Close</Link>
                <h2>Update Contact</h2>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
                    <div className='contact-avatar' style={{
                        backgroundImage: `url(${this.state.photo})`}}> 
                    </div>
                    <div className='create-contact-details'>
                        <input 
                            type='text' 
                            placeholder='First Name' 
                            name='firstName' 
                            value={this.state.firstName} 
                            onChange={this.handleChange} />
                        <input 
                            type='text' 
                            placeholder='Last Name' 
                            name='lastName'
                            value={this.state.lastName}
                            onChange={this.handleChange} />
                        <input 
                            type='number' 
                            placeholder='Age' 
                            name='age'
                            value={this.state.age}
                            onChange={this.handleChange} />
                        <input 
                            type='text' 
                            placeholder='Photo' 
                            name='photo'
                            value={this.state.photo}
                            onChange={this.handleChange} />
        
                        <button>Save Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateContact