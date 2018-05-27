import Vue from 'vue';
import apolloProvider from './apollo';
import App from './components/App.vue';

let app = new Vue({
    el: '#app',
    provide: apolloProvider.provide(),
    render: createElement => createElement(App),
});
export default app;
