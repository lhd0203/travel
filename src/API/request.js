import axios from 'axios'
const https = axios.create({
    baseURL: 'https://travelapi.teachlee.com/apif/',
    // baseURL:'https://api.vvhan.com/api',
    timeout: 3000
})
// 添加请求拦截器
https.interceptors.request.use(
    (config) => {
        console.log("请求拦截器生效")
        return config
    }
)
//添加响应拦截器
https.interceptors.response.use(
    (response) => {
        console.log("响应拦截器生效")
        return response.data
    }
)

export default {
    get1(url, params){
        return https.get(url, {params})
    },
    post1(url, data){
        return https.post(url, {data})
    }
}