import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"

class CreateContact extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName : "" ,
            lastName: "",
            age: "",
            photo: "",
            image: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val});
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.image)
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            photo: this.state.photo
        }
        axios.post('https://simple-contact-crud.herokuapp.com/contact', data)
            .then((res) => {
                console.log(res)
            }).catch((err) => console.log(err))
    }

    render() {
        return (
            <div>
                <Link to='/' className='close-create-contact'>Close</Link>

                <h2>Add Contact</h2>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
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

                        {/* <input 
                            type="file" 
                            accept="image/png, image/jpeg"
                            onChange={this.handleImageChange}
                            ref={this.fileInput} /> */}


                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact