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
    //获取列表数据接口
    getTableList(data) {
        const url = `${host}buslove/participantManage/getReviewList`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //获取信息接口
    getDetail(id) {
        const url = `${host}buslove/participantManage/getReviewDetail?id=${id}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //更新审核状态接口
    updateStatus(id, status) {
        const url = `${host}buslove/participantManage/updateStatus?id=${id}&status=${status}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //更新投票
    updateVote(id, manualVotes) {
        const url = `${host}buslove/participantManage/addManualVotes?id=${id}&manualVotes=${manualVotes}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },

    //活动列表接口
    getActivityList(data) {
        const url = `${host}operation-activity/activity/getActivityList`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //获取活动类型接口
    getActivityType() {
        const url = `${host}operation-activity/activity/getActivityType`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //获取活动详情接口
    getActivityDetail(id) {
        const url = `${host}operation-activity/activity/getActivityDetail?id=${id}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //添加活动接口
    addActivity(data) {
        const url = `${host}operation-activity/activity/addActivity`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //更新活动接口
    updateActivity(data) {
        const url = `${host}operation-activity/activity/updateActivity`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //获取商品名称列表
    getBrandNameList() {
        const url = `${host}voucher/alipayVoucher/getBrandNameList`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    //获取商品名称列表
    getTemplateBrandName(data) {
        const url = `${host}voucher/alipayVoucher/getTemplateListByBrandName?brandName=${data}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //获取优惠券关联
    getTemplateListByIds(data) {
        const url = `${host}voucher/alipayVoucher/getTemplateListByIds`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },

};
