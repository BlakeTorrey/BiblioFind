import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;


export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput!) {
  saveBook(book: $book) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;


export const DELETE_BOOK = gql`
mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    savedBooks {
      bookId
      title
      authors
    }
  }
}
`;

