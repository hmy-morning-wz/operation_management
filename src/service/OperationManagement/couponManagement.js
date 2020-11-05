import HOST_CONFIG from 'hostconfig'
import * as ajax from 'ajax'
import { getJSON, postJSON, putJSON, delData } from '../../utils/ajax'

let host = HOST_CONFIG.nethost
export default {
  //券模版列表接口
  getVoucherList(data) {
    const url = `${host}voucher/voucherTemplate/templateList`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
//添加
addVoucher(data) {
    const url = `${host}voucher/voucherTemplate/addTemplate`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
//添加兑换券接口
addVoucherTemplate(data) {
    const url = `${host}voucher/voucherTemplate/addVoucherTemplate`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //更新审核状态接口
 upVoucher(data) {
    const url = `${host}voucher/voucherTemplate/updateTemplate`;
    return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //获取券详情
 getVoucher(id) {
    const url = `${host}voucher/voucherTemplate/templateInfo?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //删除券模版
 delVoucher(id) {
    const url = `${host}voucher/voucherTemplate/deleteVoucherTemeplate?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //结束
 endVoucher(id) {
    const url = `${host}voucher/voucherTemplate/endVoucherTemeplate?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },






//添加支付宝券
addApliVoucher(data) {
    const url = `${host}voucher/alipayVoucher/addAlipayTemplate`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
  //支付宝券模版列表接口
getVoucherApliList(data) {
    const url = `${host}voucher/alipayVoucher/aliTemplateList`
    return postJSON(url, data).then(
      response => {
        return Promise.resolve(response)
      },
      response => {
        return Promise.reject(response)
      }
    )
  },
//获取支付宝券详情
getApliVoucher(id) {
    const url = `${host}voucher/alipayVoucher/alipayTemplateInfo?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //删除支付宝券模版
 delApliVoucher(id) {
    const url = `${host}voucher/alipayVoucher/deleteAlipayTemeplate?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //修改支付宝券模版
 editApliVoucher(data) {
    const url = `${host}voucher/alipayVoucher/updateAliTemplate`;
    return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },
 //支付宝券模版结束
 endApliVoucher(id) {
    const url = `${host}voucher/alipayVoucher/endAlipayTemeplate?temeplateId=${id}`;
    return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
        });
    },



};

