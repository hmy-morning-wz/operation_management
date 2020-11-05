import HOST_CONFIG from 'hostconfig'
import * as ajax from 'ajax'
import {
    getJSON,
    postJSON,
    putJSON,
    delData
} from '../../utils/ajax'

let host = HOST_CONFIG.nethost
export default {
    //获取券类型标示符接口
    getCoupTypeList() {
        const url = `${host}voucher/alipass/type/querySupportTypeList`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    // 模版券列表
    getTemplateList(data) {
        const url = `${host}voucher/alipass/type/queryAlipassTypeList`;
        return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //json解析接口
    parseTplContent(data) {
        const url = `${host}voucher/alipass/type/parseTplContent`;
        return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //新增券模版接口
    addAlipassType(data) {
        const url = `${host}/voucher/alipass/type/addOrUpdateAlipassType`;
        return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //券模版详情接口
    getAlipassDetailById(id) {
        const url = `${host}/voucher/alipass/type/getAlipassDetailById?alipassTypeId=${id}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //获取alipass券模版类型的集合
    queryAlipassTypeList(id) {
        const url = `${host}/voucher/alipass/placeholder/queryAlipassTypeList?alipassTypeId=${id}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
        });
    },

};
