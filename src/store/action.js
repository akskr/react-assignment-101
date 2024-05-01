function registerUser(user) {
    return {
        type: "REGISTER",
        payload: { name: user.name, email: user.email, password: user.password}
    }
}

function loginUser(user) {
    return {
        type: "LOGIN",
        payload: { email: user.email, password: user.password}
    }
}

function logoutUser(user) {
    return {
        type: "LOGOUT",
        payload: { email: user.email}
    }
}

function addToDeals(email, dealId) {
    return {
        type: "ADD_DEALS",
        payload: {email: email, id: dealId}
    }
}

function removeFromDeals(email, dealId) {
    return {
        type: "REMOVE_DEALS",
        payload: {email: email, id: dealId}
    }
}
export { registerUser, loginUser, logoutUser, addToDeals, removeFromDeals }