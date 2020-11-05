/**
 * add by fangjunchao
 */

const integral = (resolve) => {
    require(['@/page/marketManagement/integralManagement/integral.vue'], resolve);
};
const goodsList = (resolve) => {
    require(['@/page/marketManagement/goodsManagement/goodsList.vue'], resolve);
};
const addGoods = (resolve) => {
    require(['@/page/marketManagement/goodsManagement/add-goods.vue'], resolve);
};
const editGoods = (resolve) => {
    require(['@/page/marketManagement/goodsManagement/edit-good.vue'], resolve);
};
const orderList = (resolve) => {
    require(['@/page/marketManagement/goodsManagement/orderList.vue'], resolve);
};
export default  [
		{
			path: '/integral',
			component: integral,
            meta: ['积分流水'],
		},{
			path: '/goodsList',
			component: goodsList,
            meta: ['商品列表'],
		},{
			path: '/addGoods',
			component: addGoods,
            meta: ['新增商品'],
		},{
			path: '/orderList',
			component: orderList,
            meta: ['订单列表'],
		},{
			path: '/editGoods',
			component: editGoods,
            meta: ['编辑商品'],
		}
]
