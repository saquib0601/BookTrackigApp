import React, { useEffect, useState, useCallback } from "react";
import BookCard from "./BookCard";
import Header from "./Header";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useViewMode from "../hooks/useViewMode";
import ViewModeToggle from "./ViewModeToggle";
import useFetchBooks from "../hooks/useFetchBooks";
import { Book_Collection_API } from "../utils/constants";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

const BooksList = () => {
  const { data: books, isLoading, error } = useFetchBooks(Book_Collection_API);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, toggleViewMode] = useViewMode(true); // Using custom hook

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  // Using useCallback to memoize functions and prevent them from being re-created on every render.
  const handleSearch = useCallback((e) => {
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
  }, [books]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragBook = filteredBooks[dragIndex];
    const updatedBooks = [...filteredBooks];
    updatedBooks.splice(dragIndex, 1);
    updatedBooks.splice(hoverIndex, 0, dragBook);
    setFilteredBooks(updatedBooks);
  }, [filteredBooks]);

  const loadingComponent = useLoading(isLoading);
  const errorComponent = useError(error);

  if (loadingComponent) return loadingComponent;
  if (errorComponent) return errorComponent;

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
