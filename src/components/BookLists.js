import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=fiction');
        console.log(response)
        console.log(response.data.items)
        setBooks(response.data.items);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map(book => (
        <div key={book.id}>
          <BookCard description={book.volumeInfo.description} img={book.volumeInfo.imageLinks.thumbnail} 
            title={book.volumeInfo.title} author={book.volumeInfo.authors ?? []}/>
        </div>
      ))}
    </div>
  );
};

export default BooksList;