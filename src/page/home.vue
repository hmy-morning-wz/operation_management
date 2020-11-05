<template>
    <div class="wrapper">
        <div>
            <el-row class="tac" v-if="show">
                <el-col :span="4">
                    <el-menu default-active="2" class="el-menu-vertical-demo">
                        <el-submenu  v-for="(item,indx) in menulist" :key="indx" :index="indx +''">
                            <template slot="title"><i class="el-icon-message"></i>{{item.template}}</template>
                            <router-link :to="subitem.linkto"  v-for="(subitem,subindx) in item.menuitem" :key="subindx">
                                    <el-menu-item   :index="indx+'-'+subindx" >
                                        <i class="el-icon-message"></i>{{subitem.name}}
                                    </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            menulist: [
                { template: '运营平台', menuitem: [
                    { linkto: '/cardEditor', name: '卡详情编辑' },
                    { linkto: '/couponList', name: '优惠卷管理' },
                    { linkto: '/redPacketList', name: '红包券管理' },
                    ]
                },
            ]
        };
    },
    created() {
        if (process.env.ENV === 'dev') {
            this.show = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}
</style>
