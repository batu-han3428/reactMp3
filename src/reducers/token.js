const MainToken = {token:"",refreshToken:""};


const mainTokenReducer = (state = MainToken, action) => {
    switch (action.type) {      
        case "SELECT_TOKEN":     
            return state.token;        
        case "UPDATE_TOKEN":
            return state = 
            {
                token: action.token,
                refreshToken:state.refreshToken
            }
        case "SELECT_REFRESHTOKEN":     
            return state.refreshToken;        
        case "UPDATE_REFRESHTOKEN":
            return state.refreshToken = action.refreshToken;
        default:
            return state;
    }
};

export default mainTokenReducer