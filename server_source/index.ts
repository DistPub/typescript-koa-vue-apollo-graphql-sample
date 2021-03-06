import app from './app';
import { ApolloEngine } from 'apollo-engine';

const engine = new ApolloEngine({
    reporting: {
        disabled: true,
    },
});
engine.listen({
    port: 3000,
    koaApp: app,
});
