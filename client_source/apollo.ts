import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

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

export default apolloProvider;
