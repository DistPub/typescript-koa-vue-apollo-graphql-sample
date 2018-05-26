import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import Axios from 'axios';
import * as KoaServe from 'koa-static';
import * as KoaMount from 'koa-mount';
import * as path from 'path';

const app = new Koa();
const router = new KoaRouter();

// The GraphQL schema in string form
const typeDefines = `
type Query {
    posts(page: Int, limit: Int): [Post] @cacheControl(maxAge: 60),
    users(page: Int, limit: Int): [User] @cacheControl(maxAge: 60),
    post(id: Int): Post @cacheControl(maxAge: 60),
    user(id: Int): User @cacheControl(maxAge: 60),
}
type Post {
    userId: Int, 
    user: User @cacheControl(maxAge: 60), 
    id: Int, 
    title: String, 
    body: String,
}
type User {
    id: Int, 
    name: String, 
    username: String, 
    email: String, 
    posts: [Post] @cacheControl(maxAge: 60),
}
`;

// The resolvers
const resolvers = {
    Query: {
        posts: async (_, { page, limit }) => {
            console.log('request posts');
            return (await Axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)).data;
        },
        users: async (root, { page, limit }) => {
            console.log('request users');
            return (await Axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)).data;
        },
        post: async (_, { id }) => {
            console.log('request post');
            return (await Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/`)).data;
        },
        user: async (_, { id }) => {
            console.log('request user');
            return (await Axios.get(`https://jsonplaceholder.typicode.com/users/${id}/`)).data;
        },
    },
    Post: {
        user: async post => {
            console.log('request users by post');
            let data = (await Axios.get(`https://jsonplaceholder.typicode.com/users?id=${post.userId}`)).data;
            if (data.length) {
                return data[0];
            } else {
                return null;
            }
        }
    },
    User: {
        posts: async user => {
            console.log('request posts by user');
            return (await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)).data;
        }
    },
};

// Put together a schema
const myGraphQLSchema = makeExecutableSchema({
    typeDefs: typeDefines,
    resolvers,
});

router.post('/graphql', graphqlKoa({
    schema: myGraphQLSchema,
    cacheControl: true,
}));
router.get('/graphql', graphqlKoa({
    schema: myGraphQLSchema,
    cacheControl: true,
}));
router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql'
}));

app.use(KoaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(KoaMount('/', KoaServe(path.resolve(__dirname, '../client_dist'))));

export default app;
