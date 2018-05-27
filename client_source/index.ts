import './index.scss';

import Vue from 'vue';
import HelloComponent from './components/Hello.vue';
import { Button, Dialog } from 'element-ui';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
    uri: '/graphql',
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production',
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

Vue.use(VueApollo);

let app = new Vue({
    el: '#app',
    template: `
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
    `,
    data: { name: 'World', visible: false },
    provide: apolloProvider.provide(),
    components: {
        HelloComponent,
        elButton: Button,
        elDialog: Dialog,
    }
});
export default app;
