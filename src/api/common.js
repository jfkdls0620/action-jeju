import axios from 'axios'
const SETTINGS = {
    DOMAIN: '/api'
};

export default {
    request(settings) {
        const GET_URL = settings.url;
        // ajax로 시작하지않는 url은 api를 붙여준다.
        if (!GET_URL.startsWith('/ajax')) {
            settings.url = SETTINGS.DOMAIN + GET_URL;
        }
        if (process.env.NODE_ENV !== 'development'){
            if (!GET_URL.startsWith('/ajax')) {
                settings.url = 'http://www.actionjeju.com/societive' + SETTINGS.DOMAIN + GET_URL;
            }else{
                settings.url = 'http://www.actionjeju.com/societive' + GET_URL;
            }
        }
        //console.log(settings)
        return axios(settings)
            .then(res => res)
            .catch(err => {
                throw err
            })
    }
}