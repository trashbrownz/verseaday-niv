const API_KEY = "c_k2y-KilAceVwJogkFMA";
const BIBLE_ID = "78a9f6124f344018-01";

/* New Testament books in API format */
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

function getRandomVerseId() {
  const bookKeys = Object.keys(books);

  const book = bookKeys[Math.floor(Math.random() * bookKeys.length)];
  const chapter = Math.floor(Math.random() * books[book]) + 1;
  const verse = Math.floor(Math.random() * 25) + 1;

  // API.Bible format
  return `${book}.${chapter}.${verse}`;
}

async function newVerse() {
  const verseId = getRandomVerseId();

  try {
    const res = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/${verseId}`,
      {
        headers: {
          "api-key": API_KEY
        }
      }
    );

    const data = await res.json();

    console.log("API response:", data);

    if (!res.ok || !data.data) {
      // retry silently if invalid verse
      return newVerse();
    }

    document.getElementById("reference").innerText =
      data.data.reference;

    document.getElementById("verse-text").innerHTML =
      data.data.content.replace(/<[^>]*>/g, "");

  } catch (err) {
    console.error(err);

    document.getElementById("reference").innerText = "Error";
    document.getElementById("verse-text").innerText =
      "Could not load verse.";
  }
}

/* Date */
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
