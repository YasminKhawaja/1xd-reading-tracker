// import Library from "./classes/Library.js";
// import Tracker from "./classes/Tracker.js";
// import LogEntry from "./classes/LogEntry.js";

// // Haal boek-ID uit URL
// const params = new URLSearchParams(window.location.search);
// const bookId = params.get("id");

// const library = new Library(); // dezelfde class als op index.html
// const allBooks = library.getBooks();
// const bookData = allBooks.find((b) => b.id === bookId);

// let selectedDate = null;

// if (!bookData) {
//   alert("Boek niet gevonden");
//   window.location.href = "index.html";
// } else {
//   const tracker = new Tracker(bookData, library);
//   tracker.updateUI();

//   // Klikbare kalenderdagen voor logging
//   document.querySelectorAll(".days div").forEach((day) => {
//     day.addEventListener("click", () => {
//       const selectedDay = day.textContent;
//       const month = document.querySelectorAll(".month-selector select")[0]
//         .value;
//       const year = document.querySelectorAll(".month-selector select")[1].value;

//       const date = `${year}-${String(monthIndex(month)).padStart(
//         2,
//         "0"
//       )}-${String(selectedDay).padStart(2, "0")}`;

//       selectedDate = date;

//       // Open custom modal
//       document.getElementById("logModal").classList.remove("hidden");
//       document.getElementById("pageInput").value = "";
//     });
//   });
// }

// // bevestigknop in de pop-up
// document.getElementById("confirmLog").addEventListener("click", () => {
//   const page = document.getElementById("pageInput").value;
//   if (page && selectedDate) {
//     const entry = new LogEntry(selectedDate, page);
//     bookData.logs.unshift(entry);
//     bookData.pagesRead = Math.max(bookData.pagesRead, entry.page);
//     library.saveBooks();

//     const tracker = new Tracker(bookData, library);
//     tracker.updateUI();

//     document.getElementById("logModal").classList.add("hidden");
//   }
// });

// // sluitknop (X)
// document.querySelector(".close-button").addEventListener("click", () => {
//   document.getElementById("logModal").classList.add("hidden");
// });

// // maandnaam om te zetten naar cijfer
// function monthIndex(monthShort) {
//   const maanden = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "Mei",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   return maanden.indexOf(monthShort) + 1;
// }

import Library from "./classes/Library.js";
import Tracker from "./classes/Tracker.js";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const library = new Library();
const bookData = library.getBooks().find((b) => b.id === bookId);

const tracker = new Tracker(bookData, library);
tracker.init(); // ⚠️ Belangrijk! Niet 'updateUI()' maar 'init()'

if (!bookData) {
  alert("Boek niet gevonden");
  window.location.href = "index.html";
} else {
  const tracker = new Tracker(bookData, library);
  tracker.init(); // de tracker class regelt alles
}
