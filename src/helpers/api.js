import Axios from 'axios';

export const post = async (url, value) =>{
    try {
        return await (await Axios.post('https://localhost:7024/api/'+url, value,{ withCredentials: true })).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}