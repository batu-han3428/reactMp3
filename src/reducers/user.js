const user = {
    token:"",
    name:"",
    roles:[],
    isAuthenticated:false
}

const userReducer = (state = user, action) => {
    switch (action.type) {      
        case "LOGIN_USER":     
            return state = {
                token:action.token,
                name:action.name,
                roles:[...action.roles],
                isAuthenticated:action.isAuthenticated
            }
        case "LOGOUT_USER":
            return state = {
                token:"",
                name:"",
                roles:[],
                isAuthenticated:false
            }
        default:
            return state;
    }
};

export default userReducer