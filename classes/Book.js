// export default class Book {
//   constructor(name, author, pages) {
//     this.name = name;
//     this.author = author;
//     this.pages = pages;
//   }
// }

export default class Book {
  constructor(name, author, pages) {
    this.id = Date.now().toString(); // Unieke ID
    this.name = name;
    this.author = author;
    this.totalPages = parseInt(pages);
    this.pagesRead = 0;
    this.isReading = true;
    // Later: this.cover = ""; // bv. URL naar afbeelding
  }
}
