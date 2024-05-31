import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Header from "./Header";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=fiction"
        );
        console.log(response);
        console.log(response.data.items);
        setBooks(response.data.items);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.volumeInfo.title.toLowerCase().includes(query) ||
        (book.volumeInfo.authors &&
          book.volumeInfo.authors.some((author) =>
            author.toLowerCase().includes(query)
          ))
    );
    setFilteredBooks(filtered);
    setSearchQuery(query);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const dragBook = filteredBooks[dragIndex];
    const updatedBooks = [...filteredBooks];
    updatedBooks.splice(dragIndex, 1);
    updatedBooks.splice(hoverIndex, 0, dragBook);
    setFilteredBooks(updatedBooks);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <Header />
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Book..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10">
        {filteredBooks.map((book,index) => (
          <div key={book.id}>
            <BookCard
              key={book.id}
              index={index}
              id={book.id}
              description={book.volumeInfo.description}
              img={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors ?? []}
              moveCard={moveCard}
            />
          </div>
        ))}
      </div>
    </div>
    </DndProvider>
  );
};

export default BooksList;
