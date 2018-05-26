import app from './app';
import { ApolloEngine } from 'apollo-engine';
import * as middleware from 'koa-webpack';

app.use(middleware({}));
const engine = new ApolloEngine({
    reporting: {
        disabled: true,
    },
});
engine.listen({
    port: 3000,
    koaApp: app,
});
