import express, { Request } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'node:path';
import { typeDefs, resolvers } from './schemas/index.js';
import connectDB from './config/connection.js';
import { authenticateToken } from './services/auth.js';

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    const db = await connectDB();
    await server.start();
    console.log('Apollo Server started');

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }: { req: Request }) => {
          console.log('Received GraphQL request');
          const user = authenticateToken(req);
          return { user }; 
        },
      })
    );

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startApolloServer();
