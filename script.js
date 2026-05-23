const API_KEY = "c_k2y-KilAceVwJogkFMA";
const BIBLE_ID = "78a9f6124f344018-01";

/* NT books (human-readable format for passages API) */
const books = [
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation"
];

function randomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

async function newVerse() {

  const book = books[Math.floor(Math.random() * books.length)];

  const chapter = randomInt(10); // safe-ish random range
  const verse = randomInt(25);

  const reference = `${book} ${chapter}:${verse}`;

  try {

    const res = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${encodeURIComponent(reference)}`,
      {
        headers: {
          "api-key": API_KEY
        }
      }
    );

    const data = await res.json();

    console.log(data);

    if (!res.ok || !data.data) {
      return newVerse(); // retry invalid verses
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

newVerse();
