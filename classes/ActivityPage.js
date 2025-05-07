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
    this.generateMonthButtons();
    this.selectCurrentMonth();
  }

  // ✅ Genereer knoppen vanaf Jan van dit jaar t.e.m. huidige maand
  generateMonthButtons() {
    const monthContainer = document.querySelector(".month-buttons");
    monthContainer.innerHTML = "";

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1); // Jan dit jaar
    const end = new Date(now.getFullYear(), now.getMonth(), 1);

    const loopDate = new Date(start);
    const monthsToGenerate = [];

    while (loopDate <= end) {
      const monthName = this.months[loopDate.getMonth()];
      const year = loopDate.getFullYear();
      monthsToGenerate.push(`${monthName} ${year}`);
      loopDate.setMonth(loopDate.getMonth() + 1);
    }

    monthsToGenerate.forEach((label) => {
      const btn = document.createElement("button");
      btn.textContent = label;

      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".month-buttons button")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const [month, year] = label.split(" ");
        this.showBooksForMonth(month, year);
      });

      monthContainer.appendChild(btn);
    });
  }

  // ✅ Automatisch huidige maand selecteren bij opstart
  selectCurrentMonth() {
    const now = new Date();
    const currentLabel = `${this.months[now.getMonth()]} ${now.getFullYear()}`;

    const buttons = document.querySelectorAll(".month-buttons button");
    buttons.forEach((btn) => {
      if (btn.textContent === currentLabel) {
        btn.classList.add("active");
        const [month, year] = currentLabel.split(" ");
        this.showBooksForMonth(month, year);

        btn.scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    });
  }

  // ✅ Toon boeken van de geselecteerde maand
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

    if (boeken.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "No books logged this month";
      msg.style.color = "#bdbdbd";
      msg.style.fontSize = "0.95em";
      msg.style.textAlign = "center";
      bookList.appendChild(msg);
      return;
    }

    boeken.forEach((book) => {
      const logVanDieMaand = book.logs.find((log) => {
        const logDate = new Date(log.date);
        return (
          logDate.getFullYear() === parseInt(year) &&
          logDate.getMonth() + 1 === maandIndex
        );
      });

      const logPage = logVanDieMaand ? logVanDieMaand.page : 0;

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
