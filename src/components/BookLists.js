import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Header from "./Header";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useViewMode from "../hooks/useViewMode";
import ViewModeToggle from "./ViewModeToggle";
import useFetchBooks from "../hooks/useFetchBooks";
import { Book_Collection_API } from "../utils/constants";

const BooksList = () => {
  const { data: books, isLoading, error } = useFetchBooks(Book_Collection_API);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, toggleViewMode] = useViewMode(true); // Using custom hook

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <ViewModeToggle
            isGridView={isGridView}
            toggleViewMode={toggleViewMode}
          />
        </div>
        <div
          className={
            isGridView
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10"
              : "flex flex-col items-center gap-4 ml-10"
          }
        >
          {filteredBooks.map((book, index) => (
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
