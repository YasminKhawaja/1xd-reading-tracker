// import Books from "./classes/Book.js";
// let allBooks = [];
// let name = document.querySelector("#name");
// let author = document.querySelector("#author");
// let pages = document.querySelector("#pages");

// let btn = document.querySelector(".add-button");
// btn.addEventListener("click", (e) => {
//   //   console.log(name.value);
//   //   console.log(author.value);
//   //   console.log(pages.value);

//   if (name.value != 0 || author.value != 0 || pages.value != 0) {
//     const book = new Books(name.value, author.value, pages.value);
//     // console.log(book);

//     allBooks.push(book);
//     localStorage.setItem("books", JSON.stringify(allBooks));
//     console.log(allBooks);
//     name.value = "";
//     author.value = "";
//     pages.value = "";
//   }
// });

// allBooks = loadBooks();
// console.log(allBooks);

// function loadBooks() {
//   let saveBooks = JSON.parse(localStorage.getItem("books")) || [];
//   return saveBooks;
// }

import Book from "./classes/Book.js";

// Stap 1: Boek-array en DOM-selecties
let allBooks = loadBooks(); // Laad boeken bij start
const name = document.querySelector("#name");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const btn = document.querySelector(".add-button");
const readingListSection = document.querySelector(".reading-list");

// Stap 2: Voeg boek toe bij klik
btn.addEventListener("click", () => {
  if (name.value && author.value && pages.value) {
    const newBook = new Book(name.value, author.value, pages.value);
    allBooks.push(newBook);
    saveBooks();
    renderBooks(); // Toon nieuwe boek in UI

    // Velden leegmaken
    name.value = "";
    author.value = "";
    pages.value = "";
  }
});

// Stap 3: Sla boeken op in LocalStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(allBooks));
}

// Stap 4: Laad boeken uit LocalStorage
function loadBooks() {
  let saved = localStorage.getItem("books");
  return saved ? JSON.parse(saved) : [];
}

// Stap 5: Toon boeken op het scherm
function renderBooks() {
  // Verwijder eerst bestaande weergave
  const oldItems = document.querySelectorAll(".book-item-link.dynamic");
  oldItems.forEach((item) => item.remove());

  allBooks.reverse().forEach((book) => {
    const link = document.createElement("a");
    link.href = `tracker.html?id=${book.id}`;
    link.className = "book-item-link dynamic"; // 'dynamic' zodat we later kunnen wissen

    const item = document.createElement("div");
    item.className = "book-item";

    const info = document.createElement("div");
    info.className = "book-info";

    const title = document.createElement("h3");
    title.textContent = book.name;

    const author = document.createElement("p");
    author.className = "author";
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.className = "pages";
    pages.textContent = `${book.totalPages} pages`;

    info.appendChild(title);
    info.appendChild(author);
    item.appendChild(info);
    item.appendChild(pages);
    link.appendChild(item);
    readingListSection.appendChild(link);
  });
}

// Bij laden van de pagina ook de boeken tonen
renderBooks();
