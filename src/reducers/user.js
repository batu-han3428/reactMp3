const user = {
    token:"",
    name:"",
    roles:[],
    isAuthenticated:false,
    exp:''
}

const userReducer = (state = user, action) => {
    switch (action.type) {      
        case "LOGIN_USER":     
            return state = {
                token:action.user.token,
                name:action.user.name,
                roles:action.user.roles,
                isAuthenticated:action.user.isAuthenticated,
                exp:action.user.exp
            }
        case "LOGOUT_USER":
            return state = {
                token:"",
                name:"",
                roles:[],
                isAuthenticated:false,
                exp:''
            }
        default:
            return state;
    }
};

export default userReducer