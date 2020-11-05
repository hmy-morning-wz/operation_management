/**
 * add by fangjunchao
 */
const cardDetail = (resolve) => {
    require(['@/page/OperationManagement/cardDetail.vue'], resolve);
};
const cardEditor = (resolve) => {
    require(['@/page/OperationManagement/cardEditor.vue'], resolve);
};
const basicSet = (resolve) => {
    require(['@/page/OperationManagement/basicSet.vue'], resolve);
};
const activityList = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/activityList.vue'], resolve);
};
const activityAudit = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/activityAudit.vue'], resolve);
};
const auditList = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/auditList.vue'], resolve);
};
const addActivity = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/addActivity.vue'], resolve);
};
const viewDetail = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/viewDetail.vue'], resolve);
};
const editor = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/editor.vue'], resolve);
};
const activityAffect = (resolve) => {
    require(['@/page/OperationManagement/marketing-data/activityAffect.vue'], resolve);
};
const operatingData = (resolve) => {
    require(['@/page/OperationManagement/marketing-data/operatingData.vue'], resolve);
};
const busWelfare = (resolve) => {
    require(['@/page/OperationManagement/marketing-data/busWelfare.vue'], resolve);
};
const smallProgram = (resolve) => {
    require(['@/page/OperationManagement/small-program/smallProgram.vue'], resolve);
};
const dataReport = (resolve) => {
    require(['@/page/OperationManagement/dataReport/dataReport.vue'], resolve);
};
const dataReport2nd = (resolve) => {
    require(['@/page/OperationManagement/dataReport/dataReport2nd.vue'], resolve);
};
const dataReport3rd = (resolve) => {
    require(['@/page/OperationManagement/dataReport/dataReport3rd.vue'], resolve);
};
const dataReport4rd = (resolve) => {
    require(['@/page/OperationManagement/dataReport/dataReport4rd.vue'], resolve);
};
const userPortrait = (resolve) => {
    require(['@/page/OperationManagement/dataReport/userPortrait.vue'], resolve);
};
const orderList= (resolve) => {
    require(['@/page/OperationManagement/dataReport/orderList.vue'], resolve);
};
const addCoupon = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/add-coupon.vue'], resolve);
};
const addTemplateCoupon = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/add-template-coupon.vue'], resolve);
};
const couponList = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/coupon-list.vue'], resolve);
};
const templateList = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/template-list.vue'], resolve);
};
const templatDetail = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/template-detail.vue'], resolve);
};
const detailCoupon = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/detail-coupon.vue'], resolve);
};
const detailApliCoupon = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/apli-detail-coupon.vue'], resolve);
};
const apliTemplateCoupon = (resolve) => {
    require(['@/page/OperationManagement/couponManagement/apliTemplate-detail-coupon.vue'], resolve);
};
const reportList= (resolve) => {
  require(['@/page/OperationManagement/dataReport/reportList.vue'], resolve);
};
export default  [
		{
			path: '',
			component: cardEditor,
            meta: ['支付宝卡编辑'],
		},{
            path: '/cardDetail',
            component: cardDetail,
            meta: ['支付宝详情页面'],
        },{
            path: '/cardEditor',
            component: cardEditor,
            meta: ['支付宝编辑页面'],
        },{
            path: '/basicSet',
            component: basicSet,
            meta: ['基础功能管理'],
        },{
            path: '/activityList',
            component: activityList,
            meta: ['活动列表'],
        },{
            path: '/activityAudit',
            component: activityAudit,
            meta: ['活动审核'],
        },{
            path: '/auditList',
            component: auditList,
            meta: ['审核列表'],
        },{
            path: '/activityAffect',
            component: activityAffect,
            meta: ['活动效果'],
        },{
            path: '/operatingData',
            component: operatingData,
            meta: ['运营数据'],
        },{
            path: '/addActivity',
            component: addActivity,
            meta: ['新建活动'],
        },{
            path: '/viewDetail',
            component: viewDetail,
            meta: ['查看页面'],
        },{
            path: '/editor',
            component: editor,
            meta: ['编辑页面'],
        },{
            path: '/busWelfare',
            component: busWelfare,
            meta: ['乘车福利'],
        },{
            path: '/smallProgram',
            component: smallProgram,
            meta: ['小程序卡详情设置'],
        },{
            path: '/dataReport',
            component: dataReport,
            meta: ['用户基础交易'],
        },{
            path: '/dataReport2nd',
            component: dataReport2nd,
            meta: ['扫码业务分析'],
        },{
            path: '/dataReport3rd',
            component: dataReport3rd,
            meta: ['每日增活用户'],
        },{
            path: '/dataReport4rd',
            component: dataReport4rd,
            meta: ['扫码人群占比'],
        },{
            path: '/userPortrait',
            component: userPortrait,
            meta: ['基础用户画像'],
        },{
            path: '/orderList',
            component: orderList,
            meta: ['活动订单报表'],
        },{
            path: '/addCoupon',
            component: addCoupon,
            meta: ['新增优惠券'],
        },{
            path: '/addTemplateCoupon',
            component: addTemplateCoupon,
            meta: ['新增支付宝模版券'],
        },{
            path: '/templateList',
            component: templateList,
            meta: ['模版券列表'],
        },{
            path: '/templatDetail',
            component: templatDetail,
            meta: ['模版券详情'],
        },{
            path: '/apliTemplateCoupon',
            component: apliTemplateCoupon,
            meta: ['支付宝模版券详情'],
        },{
            path: '/couponList',
            component: couponList,
            meta: ['优惠券列表'],
        },{
            path: '/detailCoupon',
            component: detailCoupon,
            meta: ['优惠券详情页面'],
        },{
            path: '/detailApliCoupon',
            component: detailApliCoupon,
            meta: ['支付宝详情页面'],
        },{
          path: '/reportList',
          component: reportList,
          meta: ['数据报表页面'],
      }
]
