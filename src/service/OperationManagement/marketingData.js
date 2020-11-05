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
    getActivityNameList() {
        const url = `${host}operation-activity/activity/getActivityNameList`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    getActivityData(data) {
        const url = `${host}data-track/activity/findActivityTrackList`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    // 获取渠道名称列表
    getChannelNameList() {
        const url = `${host}prefer/channel/getChannelNameList`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    // 获取页面名称列表
    getPageNameList(id) {
        const url = `${host}prefer/page/getPageNameList?channelId=${id}`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    getBusTypeList(channelId, channelPageId) {
        const url = `${host}data-track/cardDataTrack/queryCardBusType?channelId=${channelId}&channelPageId=${channelPageId}`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    getBusIdByBusType(channelPageId, busType) {
        const url = `${host}data-track/cardDataTrack/queryBusIdByBusType?channelPageId=${channelPageId}&busType=${busType}`
        return postJSON(url).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },
    getTableData(data) {
        const url = `${host}data-track/cardDataTrack/queryCardTrackDataByBusType`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    },

    getChartData(data) {
        const url = `${host}data-track/activity/findHourPVList`
        return postJSON(url, data).then(
            response => {
                return Promise.resolve(response.data || response)
            },
            response => {
                return Promise.reject(response.data || response)
            }
        )
    }
}
