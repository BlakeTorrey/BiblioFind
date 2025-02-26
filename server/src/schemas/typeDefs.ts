const typeDefs = `
    type Book {
        _id: ID!
        authors: [String]!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]!
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query {
        user(username: String!): User
        me: User
    }

    type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    deleteBook(bookId: ID!): User
    }

    input BookInput {
        authors: [String]!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
`;

export default typeDefs;