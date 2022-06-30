import Axios from 'axios';

export const post = async (url, value) =>{
    return await (await Axios.post('https://localhost:7024/api/'+url, value)).data; 
}