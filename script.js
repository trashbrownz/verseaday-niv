const API_KEY = "c_k2y-KilAceVwJogkFMA";
const BIBLE_ID = "78a9f6124f344018-01";

/*
  Bible book codes required by API.Bible
*/
const books = {
  MAT: 28,
  MRK: 16,
  LUK: 24,
  JHN: 21,
  ACT: 28,
  ROM: 16,
  "1CO": 16,
  "2CO": 13,
  GAL: 6,
  EPH: 6,
  PHP: 4,
  COL: 4,
  "1TH": 5,
  "2TH": 3,
  "1TI": 6,
  "2TI": 4,
  TIT: 3,
  PHM: 1,
  HEB: 13,
  JAS: 5,
  "1PE": 5,
  "2PE": 3,
  "1JN": 5,
  "2JN": 1,
  "3JN": 1,
  JUD: 1,
  REV: 22
};

async function newVerse() {

  const bookNames = Object.keys(books);

  const randomBook =
    bookNames[Math.floor(Math.random() * bookNames.length)];

  const maxChapter = books[randomBook];

  const randomChapter =
    Math.floor(Math.random() * maxChapter) + 1;

  // simple verse guess (API will retry if invalid)
  const randomVerse =
    Math.floor(Math.random() * 20) + 1;

  // IMPORTANT: API expects DOT format like ROM.8.28
  const verseId = `${randomBook}.${randomChapter}.${randomVerse}`;

  try {

    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/${verseId}`,
      {
        headers: {
          "api-key": API_KEY
        }
      }
    );

    const data = await response.json();

    // If invalid verse, try again
    if (!data.data) {
      newVerse();
      return;
    }

    document.getElementById("reference").innerText =
      data.data.reference;

    document.getElementById("verse-text").innerHTML =
      data.data.content.replace(/<[^>]*>/g, '');

  } catch (error) {

    console.error(error);

    document.getElementById("reference").innerText = "Error";

    document.getElementById("verse-text").innerText =
      "Could not load verse.";
  }
}

/* Date display */
const today = new Date();

document.getElementById("date").innerText =
  today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

/* First load */
newVerse();
