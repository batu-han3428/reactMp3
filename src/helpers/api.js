import Axios from 'axios';

export const post = async (url, value) =>{
    try {
        return await (await Axios.post('https://mp3-api.batuhanfindik.com/api/'+url, value,{ withCredentials: true })).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}

export const getYoutubeList = async (country = "w") =>{
    try {
        return await (await Axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&${regionCodeParameters(country)}videoCategoryId=10&key=AIzaSyAkfwCc7B6Jv86BE8tfUY99vozNTNeUr1g`)).data.items; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}

const regionCodeParameters = (country = "w") => {
    if(country === "TR")
        return "regionCode=TR&";
    else if(country === "FR")
        return "regionCode=FR&";
    else if(country === "GB")
        return "regionCode=GB&";
    else if(country === "ES")
        return "regionCode=ES&";
    else if(country === "US")
        return "regionCode=US&";
    else if(country === "DE")
        return "regionCode=DE&";
    else if(country === "IT")
        return "regionCode=IT&";
    else
        return ""
}