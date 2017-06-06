import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { mongo } from './conectors';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs, resolvers });
mongo;

export { schema };

