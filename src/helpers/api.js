import Axios from 'axios';

export const post = async (url, value) =>{
    try {
        return await (await Axios.post('https://localhost:7024/api/'+url, value,{ withCredentials: true })).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}

export const getYoutubeList = async () =>{
    try {
        return await (await Axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&videoCategoryId=10&key=AIzaSyAkfwCc7B6Jv86BE8tfUY99vozNTNeUr1g')).data.items; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}