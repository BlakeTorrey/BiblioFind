import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../utils/queries'; 
import { DELETE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME, {
    skip: !Auth.loggedIn(),
    fetchPolicy: 'network-only'
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache, { data: { deleteBook } }) {
      const { me } = cache.readQuery({ query: GET_ME }) as any;
      cache.writeQuery({
        query: GET_ME,
        data: {
          me: {
            ...me,
            savedBooks: me.savedBooks.filter(
              (book: any) => book.bookId !== deleteBook.bookId
            ),
          },
        },
      });
    },
  });

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook({ variables: { bookId } });
      removeBookId(bookId); // Remove from localStorage upon successful deletion
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  console.log('SavedBooks data:', data);
  if (error) console.error('SavedBooks error:', error);

  if (loading) return <h2>LOADING...</h2>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {data?.me?.username ? (
            <h1>Viewing {data.me.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {data?.me?.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${
                data.me.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data?.me?.savedBooks.map((book: any) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
