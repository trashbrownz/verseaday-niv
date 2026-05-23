const API_KEY = "qowP1PQAzWM3qUgC6Wcxt";

const BIBLE_ID = "78a9f6124f344018-01";

const books = {
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22
};

async function newVerse() {

  const bookNames = Object.keys(books);

  const randomBook =
    bookNames[
      Math.floor(Math.random() * bookNames.length)
    ];

  const maxChapter = books[randomBook];

  const randomChapter =
    Math.floor(Math.random() * maxChapter) + 1;

  const randomVerse =
    Math.floor(Math.random() * 20) + 1;

  const reference =
    `${randomBook} ${randomChapter}:${randomVerse}`;

  try {

    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${encodeURIComponent(reference)}`,
      {
        headers: {
          "api-key": API_KEY
        }
      }
    );

    const data = await response.json();

    console.log(data);

    if (!data.data) {
      newVerse();
      return;
    }

    document.getElementById("reference").innerText =
      reference;

    document.getElementById("verse-text").innerHTML =
      data.data.content.replace(/<[^>]*>/g, '');

  } catch (error) {

    console.error(error);

    document.getElementById("reference").innerText =
      "Error";

    document.getElementById("verse-text").innerText =
      "Could not load verse.";
  }
}

const today = new Date();

document.getElementById("date").innerText =
  today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

newVerse();
