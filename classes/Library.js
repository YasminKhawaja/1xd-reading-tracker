// import Book from "./Book.js";

// export default class BookCollection {
//   constructor() {
//     this.books = this.loadFromStorage();
//   }

//   addBook(title, author, pages) {
//     const newBook = new Book(title, author, pages);
//     this.books.push(newBook);
//     this.saveToStorage();
//     return newBook;
//   }

//   removeBook(id) {
//     this.books = this.books.filter((book) => book.id !== id);
//     this.saveToStorage();
//   }

//   saveToStorage() {
//     localStorage.setItem("books", JSON.stringify(this.books));
//   }

//   loadFromStorage() {
//     const stored = JSON.parse(localStorage.getItem("books")) || [];
//     return stored.map(
//       (book) =>
//         new Book(
//           book.title,
//           book.author,
//           book.totalPages,
//           book.pagesRead,
//           book.id
//         )
//     );
//   }

//   getReadingList() {
//     return this.books.filter((book) => book.isReading);
//   }
// }

export default class Library {
  constructor(containerSelector) {
    this.books = this.loadBooks();
    this.container = document.querySelector(containerSelector);
  }

  loadBooks() {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  }

  saveBooks() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  addBook(book) {
    this.books.unshift(book); // Nieuwste boek bovenaan
    this.saveBooks();
    this.renderBooks(); // Automatisch vernieuwen

    console.log(book);
  }

  getBooks() {
    return this.books;
  }

  // Teken boeken in de HTML
  renderBooks() {
    // Verwijder oude elementen
    this.container
      .querySelectorAll(".book-item-link.dynamic")
      .forEach((el) => el.remove());

    this.books.forEach((book) => {
      const link = document.createElement("a");
      link.href = `tracker.html?id=${book.id}`;
      link.className = "book-item-link dynamic";

      const item = document.createElement("div");
      item.className = "book-item";

      // if (book.cover) {
      //   const img = document.createElement("img");
      //   img.src = book.cover;
      //   img.alt = "Cover";
      //   img.style.width = "40px";
      //   img.style.height = "60px";
      //   img.style.objectFit = "cover";
      //   img.style.borderRadius = "8px";
      //   img.style.marginRight = "12px";
      //   item.prepend(img);
      // }

      const showCovers = false;
      if (showCovers && book.cover) {
        // voeg image toe
      }

      const info = document.createElement("div");
      info.className = "book-info";

      const title = document.createElement("h3");
      title.textContent = book.name;

      const authorEl = document.createElement("p");
      authorEl.className = "author";
      authorEl.textContent = book.author;

      const pages = document.createElement("p");
      pages.className = "pages";
      pages.textContent = `${book.totalPages} pages`;

      info.appendChild(title);
      info.appendChild(authorEl);
      item.appendChild(info);
      item.appendChild(pages);
      link.appendChild(item);
      this.container.appendChild(link);
    });
  }
}
