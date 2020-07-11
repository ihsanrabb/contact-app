import { FETCH_CONTACTS } from "../actions/fetchContacts"

const contactsReducer = (state = {}, {type, payload}) => {
    switch(type) {
        case FETCH_CONTACTS:
            return payload
        default:
            return state
    }
};

export default contactsReducer

