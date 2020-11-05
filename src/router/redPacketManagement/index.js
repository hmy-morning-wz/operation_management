/**
 * add by fangjunchao
 */

const redPacketList = (resolve) => {
    require(['@/page/redPacketManagement/redPacketList.vue'], resolve);
};

const detailEnvelope = (resolve) => {
    require(['@/page/redPacketManagement/detail-envelope.vue'], resolve);
};

export default  [
		{
			path: '/redPacketList',
			component: redPacketList,
            meta: ['红包列表'],
        },
        {
			path: '/detailEnvelope',
			component: detailEnvelope,
            meta: ['查看详情'],
		},
]
