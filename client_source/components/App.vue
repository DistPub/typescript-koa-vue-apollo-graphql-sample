<template>
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
        <h1>Element UI</h1>
        <el-button type="primary" @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloComponent from './Hello.vue';
import { Button, Dialog } from 'element-ui';

export default Vue.extend({
    name: 'app',
    data() {
        return { name: 'World', visible: false };
    },
    components: {
        HelloComponent,
        elButton: Button,
        elDialog: Dialog,
    }
});
</script>

<style lang="scss">
/* 改变主题色变量 */
$--color-primary: #41b882;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
</style>
