// export default class Books {
//   constructor(name, author, pages) {
//     this.name = name;
//     this.author = author;
//     this.pages = pages;
//   }
// }

export default class Book {
  constructor(title, author, pages) {
    this.id = Date.now().toString(); // Unieke ID voor elk boek
    this.title = title;
    this.author = author;
    this.totalPages = parseInt(pages);
    this.pagesRead = 0; // Nieuwe property voor gelezen pagina's
    this.isReading = true; // Status van het boek
  }

  updateProgress(pages) {
    this.pagesRead = Math.min(pages, this.totalPages);
  }
}
