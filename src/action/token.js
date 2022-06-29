export const SelectToken = () => ({
    type: "SELECT_TOKEN"
})

export const UpdateToken = (token) => ({
    type: "UPDATE_TOKEN",
    token
})

export const SelectRefreshToken = () => ({
    type: "SELECT_REFRESHTOKEN"
})

export const UpdateRefreshToken = (refreshtoken) => ({
    type: "UPDATE_REFRESHTOKEN",
    refreshtoken
})