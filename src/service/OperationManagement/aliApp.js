import HOST_CONFIG from 'hostconfig';
import * as ajax from 'ajax';
import { getJSON, postJSON, putJSON, delData } from '../../utils/ajax';

let host = HOST_CONFIG.nethost;
export default {

 //贴加banner接口
 addBannerImg(data) {
    const url = `${host}prefer/banner/addBanner`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
//删除banner接口
deleteBanner(id) {
    const url = `${host}prefer/banner/deleteBanner?id=${id}`;
    return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
//获取banner详情接口
getBannerDetail(id) {
    const url = `${host}prefer/banner/getBannerDetail?id=${id}`;
    return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
        });
    },
 //获取banner列表接口
 getBannerList(data) {
    const url = `${host}prefer/banner/getBannerList`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
        });
    },
//更新banner列表接口
updateBanner(data) {
    const url = `${host}prefer/banner/updateBanner`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
//支付宝新增icon接口
addAliAppIcon(data) {
    const url = `${host}prefer/icon/add`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
},
//删除icon接口
deleteIcon(iconId) {
    const url = `${host}prefer/icon/delete?iconId=${iconId}`;
    return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
//获取支付宝icon数据
getByParam(data) {
    const url = `${host}prefer/icon/getByParam`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
        });
    },
//更新支付宝icon列表接口
updateIcon(data) {
    const url = `${host}prefer/icon/update`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
},

};
