import Books from "./Books.js";
let allBooks = [];
let name = document.querySelector("#name");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");

let btn = document.querySelector(".add-button");
btn.addEventListener("click", (e) => {
  //   console.log(name.value);
  //   console.log(author.value);
  //   console.log(pages.value);

  if (name.value != 0 || author.value != 0 || pages.value != 0) {
    const book = new Books(name.value, author.value, pages.value);
    // console.log(book);

    allBooks.push(book);
    localStorage.setItem("books", JSON.stringify(allBooks));
    console.log(allBooks);
    name.value = "";
    author.value = "";
    pages.value = "";
  }
});

allBooks = loadBooks();
console.log(allBooks);

function loadBooks() {
  let saveBooks = JSON.parse(localStorage.getItem("books")) || [];
  return saveBooks;
}
