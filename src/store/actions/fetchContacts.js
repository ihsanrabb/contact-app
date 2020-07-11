import axios from "axios"
export const FETCH_CONTACTS = "FETCH_CONTACTS"

const fetchContacts = (dispatch) => {
    const apiUrl = "https://simple-contact-crud.herokuapp.com/contact"
    axios.get(apiUrl)
      .then((res) => {
        dispatch({type: FETCH_CONTACTS, payload: res.data.data})
      }).catch(err => console.log(err))
}

export default fetchContacts