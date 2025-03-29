import Book from "./Book.js";

export default class BookCollection {
  constructor() {
    this.books = this.loadFromStorage();
  }

  addBook(title, author, pages) {
    const newBook = new Book(title, author, pages);
    this.books.push(newBook);
    this.saveToStorage();
    return newBook;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  loadFromStorage() {
    const stored = JSON.parse(localStorage.getItem("books")) || [];
    return stored.map(
      (book) =>
        new Book(
          book.title,
          book.author,
          book.totalPages,
          book.pagesRead,
          book.id
        )
    );
  }

  getReadingList() {
    return this.books.filter((book) => book.isReading);
  }
}
