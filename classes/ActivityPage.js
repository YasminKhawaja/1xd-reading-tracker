export default class ActivityPage {
  constructor(library) {
    this.library = library;
    this.allBooks = this.library.getBooks();
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.init();
  }

  init() {
    const activeBtn = document.querySelector(".month-buttons button.active");
    if (activeBtn) {
      const [month, year] = activeBtn.textContent.split(" ");
      this.showBooksForMonth(month, year);
    }

    document.querySelectorAll(".month-buttons button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".month-buttons button")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const [month, year] = btn.textContent.split(" ");
        this.showBooksForMonth(month, year);
      });
    });
  }

  showBooksForMonth(monthShort, year) {
    const maandIndex = this.months.indexOf(monthShort) + 1;

    const boeken = this.allBooks.filter((book) => {
      return book.logs?.some((log) => {
        const logDate = new Date(log.date);
        return (
          logDate.getFullYear() === parseInt(year) &&
          logDate.getMonth() + 1 === maandIndex
        );
      });
    });

    const bookList = document.querySelector(".book-list");
    bookList.innerHTML = "";

    boeken.forEach((book) => {
      const laatsteLog = book.logs?.[0];
      const logPage = laatsteLog ? laatsteLog.page : 0;

      const div = document.createElement("div");
      div.classList.add("book-item");
      div.innerHTML = `
          <h3>${book.name}</h3>
          <p>Read ${logPage} out of ${book.totalPages} pages</p>
        `;

      const link = document.createElement("a");
      link.href = `tracker.html?id=${book.id}`;
      link.classList.add("book-item-link");
      link.appendChild(div);

      bookList.appendChild(link);
    });
  }
}
