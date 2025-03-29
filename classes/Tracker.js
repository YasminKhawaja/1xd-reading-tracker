export default class Tracker {
  constructor(book, library) {
    this.book = book;
    this.library = library;
    this.selectedDate = null;
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
  }

  init() {
    this.updateUI();
    this.setUpDayClicks();
    this.setUpModalEvents();
  }

  // 🧠 Hulp: maandnaam → cijfer
  monthIndex(monthShort) {
    return this.months.indexOf(monthShort) + 1;
  }

  // 📅 Setup click op kalenderdagen
  setUpDayClicks() {
    document.querySelectorAll(".days div").forEach((day) => {
      day.addEventListener("click", () => {
        const selectedDay = day.textContent.padStart(2, "0");
        const month = document.querySelectorAll(".month-selector select")[0]
          .value;
        const year = document.querySelectorAll(".month-selector select")[1]
          .value;
        const date = `${year}-${String(this.monthIndex(month)).padStart(
          2,
          "0"
        )}-${selectedDay}`;

        this.selectedDate = date;
        document.getElementById("logModal").classList.remove("hidden");
        document.getElementById("pageInput").value = "";
      });
    });
  }

  // 🔘 Setup pop-up bevestigen/sluiten
  //   setUpModalEvents() {
  //     document.getElementById("confirmLog").addEventListener("click", () => {
  //       const page = document.getElementById("pageInput").value;
  //       if (page && this.selectedDate) {
  //         const entry = { date: this.selectedDate, page: parseInt(page) };
  //         this.book.logs.unshift(entry);
  //         this.book.pagesRead = Math.max(this.book.pagesRead, entry.page);
  //         this.library.saveBooks();
  //         this.updateUI();
  //         document.getElementById("logModal").classList.add("hidden");
  //       }
  //     });

  //     document.querySelector(".close-button").addEventListener("click", () => {
  //       document.getElementById("logModal").classList.add("hidden");
  //     });
  //   }

  setUpModalEvents() {
    // 👉 Knop vervangen zodat oude eventlisteners verdwijnen
    const oldBtn = document.getElementById("confirmLog");
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    // ✅ Nieuwe click listener toevoegen (enkel 1 keer)
    newBtn.addEventListener("click", () => {
      const page = document.getElementById("pageInput").value;
      if (page && this.selectedDate) {
        const entry = { date: this.selectedDate, page: parseInt(page) };
        this.book.logs.unshift(entry);
        this.book.pagesRead = Math.max(this.book.pagesRead, entry.page);
        this.library.saveBooks();
        this.updateUI();
        document.getElementById("logModal").classList.add("hidden");
      }
    });

    // ❌ Sluitknop (werkt wel nog gewoon)
    document.querySelector(".close-button").addEventListener("click", () => {
      document.getElementById("logModal").classList.add("hidden");
    });
  }

  // 🖥️ Alles updaten op scherm
  updateUI() {
    // Titel + auteur
    document.querySelector(".book-info h2").textContent = this.book.name;
    document.querySelector(".book-info .author").textContent = this.book.author;

    // Cover (als die leeg is, toon een standaardfoto)
    const coverImg = document.querySelector(".book-cover img");
    if (this.book.cover) {
      coverImg.src = this.book.cover;
    } else {
      coverImg.src = "https://via.placeholder.com/150x220?text=No+Cover";
    }

    // Voortgang + percentage
    document.querySelector(
      ".page-read"
    ).textContent = `${this.book.pagesRead}/${this.book.totalPages}`;
    const percentage = Math.round(
      (this.book.pagesRead / this.book.totalPages) * 100
    );
    document.querySelector(".page-percentage").textContent = `${percentage}%`;
    document.querySelector(".progress").style.width = `${percentage}%`;

    // 📅 Dagen kleuren als gelezen
    const month = document.querySelectorAll(".month-selector select")[0].value;
    const year = document.querySelectorAll(".month-selector select")[1].value;

    document.querySelectorAll(".days div").forEach((day) => {
      const dayNumber = day.textContent.padStart(2, "0");
      const dateStr = `${year}-${String(this.monthIndex(month)).padStart(
        2,
        "0"
      )}-${dayNumber}`;

      const isLogged = this.book.logs.some((log) => log.date === dateStr);
      if (isLogged) {
        day.classList.add("active");
      } else {
        day.classList.remove("active");
      }
    });

    // 📋 Logs tonen
    const logContainer = document.querySelector(".daily-logs");
    const list = this.book.logs
      .map((log) => {
        const date = new Date(log.date);
        const dateString = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        return `
          <div class="log-item">
            <div class="log-text">
              <p>${this.book.name}</p>
              <p class="date">${dateString}</p>
            </div>
            <p class="page">Page ${log.page}</p>
          </div>`;
      })
      .join("");

    logContainer.innerHTML = "<h2>My daily logs</h2>" + list;

    this.setUpDayClicks();
  }
}
