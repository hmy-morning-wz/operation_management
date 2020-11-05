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
    //商品列表类型接口
    getTypeList() {
        const url = `${host}operation-goods/goods/getTypeList`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //商品列表类型接口
    getStatusList() {
        const url = `${host}operation-goods/goods/getStatusList`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //商品分类接口
    getClassifyList() {
        const url = `${host}operation-goods/goods/getClassifyList`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //获取列表数据接口
    getTableList(data) {
        const url = `${host}operation-goods/goods/getGoodsList`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //商品详情接口
    getGoodsDetail(id) {
        const url = `${host}operation-goods/goods/getGoodsDetail?id=${id}`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //添加商品接口
    addGoods(data) {
        const url = `${host}operation-goods/goods/addGoods`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
     //编辑商品接口
     updateGoods(data) {
        const url = `${host}operation-goods/goods/updateGoods`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //编辑商品状态
    updateStatus(data) {
        const url = `${host}operation-goods/goods/updateStatus`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //获取商户列表
    getBrandNameList() {
        const url = `${host}voucher/voucherTemplateQuery/getBrandNameList`
        return getJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
    //券模版列表
    getTemplateList(id) {
        const url = `${host}voucher/voucherTemplateQuery/queryVoucherTemplateList?brandName=${id}`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response)
            },
            response => {
                return Promise.reject(response)
            }
        )
    },
};
