import Vue from 'vue';
import VueRouter from 'vue-router';
import operationManagement from './OperationManagement';
import marketManagement from './marketManagement';
import redPacketManagement from './redPacketManagement';


const appMain = (resolve) => {
    require(['../page/home.vue'], resolve);
};
const routes = [{
        path: '/',
        component: appMain,
        meta: {
            title: '首页',
        },
    },
].concat(
    operationManagement,
    marketManagement,
    redPacketManagement
);

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes,
});
