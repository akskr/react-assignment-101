import { combineReducers } from 'redux'
import { showToastErrorMessage, showToastSuccessMessage,showToastWarningMessage } from "../components/notification";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case "REGISTER":
            if (state.length) {
                const user = state.find((user) => user.email === action.payload.email);
                if (user) {
                    showToastErrorMessage();
                    return state;
                }
            }
            showToastSuccessMessage();
            return [...state, {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                isloggedin: false,
                cart: []
            }
        ]
        case "LOGIN":
            let indexOfUser = state.findIndex((user) => user.email === action.payload.email);
            if (indexOfUser === -1) {
                showToastErrorMessage("User not found!");
                return state;
            }
            if (state[indexOfUser].password !== action.payload.password) {
                showToastErrorMessage("Invalid password!");
                return state;
            }
            state[indexOfUser].isloggedin = true;
            showToastSuccessMessage("User logged in successfully!");
            return [...state]
        case "LOGOUT":
            let indexOfUserToLogout = state.findIndex((user) => user.email === action.payload.email);
            state[indexOfUserToLogout].isloggedin = false;
            showToastSuccessMessage("User logged out successfully!");
            return [...state]
        case "ADD_DEALS":
            let indexOfUserToAddDeal = state.findIndex((user) => user.email === action.payload.email);
            if (indexOfUserToAddDeal  === -1) {
                showToastErrorMessage("Unable to add to deals!");
            }
            if (state[indexOfUserToAddDeal].cart.indexOf(action.payload.id) === -1) {
                state[indexOfUserToAddDeal].cart.push(action.payload.id);
                showToastSuccessMessage("Item added to deals successfully!");
                return  [...state];
            } else {
                showToastWarningMessage("Item aleady added in deals!");
            }
            return state
        case "REMOVE_DEALS":
            let indexOfUserToRemoveDeal = state.findIndex((user) => user.email === action.payload.email);
            if (indexOfUserToRemoveDeal  === -1) {
                showToastErrorMessage("Unable to remove from deals!");
            }
            if (state[indexOfUserToRemoveDeal].cart.indexOf(action.payload.id) !== -1) {
                state[indexOfUserToRemoveDeal].cart = state[indexOfUserToRemoveDeal].cart.filter(function(item) {
                    return item !== action.payload.id
                })
                showToastSuccessMessage("Item removed from deals successfully!");
                return  [...state];
            } else {
                showToastWarningMessage("Item not present in the deals!");
            }
            return state
        default: return state
    }
}

const rootReducer = combineReducers({
    users: userReducer,
});

export default rootReducer;
