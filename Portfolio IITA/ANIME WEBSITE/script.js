  const staticAnimeList = [
  {
    title: "Attack on Titan",
    genre: "Fantasy",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
  },
  {
    title: "Naruto",
    genre: "Action",
    image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
  },
  {
    title: "One Piece",
    genre: "Adventure",
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
  },
  {
    title: "Death Note",
    genre: "Thriller",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
  },
];

let watchlist = [];
const searchCache = new Map();

function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function setTheme(theme) {
  const body = document.body;
  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
}

function renderEmpty(el, message) {
  el.innerHTML = `<div class="empty">${message}</div>`;
}

function inWatchlist(idOrTitle) {
  return watchlist.some((a) => (a.id ? a.id === idOrTitle : a.title === idOrTitle));
}

function displayAnime(animeList) {
  const container = document.getElementById("anime-container");
  container.innerHTML = `<h2>Anime Results</h2>`;

  if (!animeList || animeList.length === 0) {
    const emptyWrap = document.createElement("div");
    emptyWrap.className = "empty";
    emptyWrap.textContent = "No anime found. Try a different search.";
    container.appendChild(emptyWrap);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "grid";

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("anime-card");

    const h3 = document.createElement("h3");
    h3.textContent = anime.title;

    const img = document.createElement("img");
    img.src = anime.image;
    img.alt = anime.title;
    img.loading = "lazy";

    const p = document.createElement("p");
    p.innerHTML = `<strong>Genre:</strong> ${anime.genre || "Unknown"}`;

    const row = document.createElement("div");
    row.className = "row";

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Details";
    detailsBtn.addEventListener("click", () => openModal(anime));

    const addBtn = document.createElement("button");
    const key = anime.id || anime.title;
    const already = inWatchlist(key);
    addBtn.textContent = already ? "In Watchlist" : "Add to Watchlist";
    addBtn.disabled = already;
    addBtn.addEventListener("click", () => addToWatchlist(anime.title, anime.genre, anime.image, anime.id));

    row.append(detailsBtn, addBtn);
    card.append(h3, img, p, row);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function searchAnime() {
  const query = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("anime-container");
  container.innerHTML = `<h2>Anime Results</h2><div class="muted">Loading...</div>`;

  if (!query) {
    displayAnime(staticAnimeList);
    return;
  }

  if (searchCache.has(query)) {
    displayAnime(searchCache.get(query));
    return;
  }

  fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw=true&order_by=score&sort=desc`)
    .then((res) => res.json())
    .then((data) => {
      const results = (data.data || []).slice(0, 12).map((anime) => ({
        id: anime.mal_id,
        title: anime.title,
        genre: anime.genres && anime.genres.length ? anime.genres[0].name : "Unknown",
        image: anime.images?.jpg?.image_url || anime.images?.webp?.image_url || "",
        synopsis: anime.synopsis || "",
        score: typeof anime.score === "number" ? anime.score : null,
        episodes: anime.episodes || null,
        url: anime.url || "",
      }));

      searchCache.set(query, results);
      displayAnime(results);
    })
    .catch((err) => {
      console.error("Error:", err);
      renderEmpty(container, "Could not load results. Please try again.");
    });
}

function addToWatchlist(title, genre, image, id) {
  if (watchlist.some((anime) => (id ? anime.id === id : anime.title === title))) {
    alert("Already in watchlist!");
    return;
  }

  watchlist.push({ id, title, genre, image });
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  displayWatchlist();
  // Re-render results to update "In Watchlist" states
  const query = document.getElementById("searchInput").value.trim();
  if (!query) displayAnime(staticAnimeList);
}

function displayWatchlist() {
  const container = document.getElementById("watchlist-items");
  container.innerHTML = "";

  if (!watchlist.length) {
    container.innerHTML = `<div class="empty">Your watchlist is empty. Add some anime!</div>`;
    return;
  }

  watchlist.forEach((anime, index) => {
    const card = document.createElement("div");
    card.classList.add("anime-card");

    const h3 = document.createElement("h3");
    h3.textContent = anime.title;

    const img = document.createElement("img");
    img.src = anime.image;
    img.alt = anime.title;
    img.loading = "lazy";

    const p = document.createElement("p");
    p.innerHTML = `<strong>Genre:</strong> ${anime.genre}`;

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", () => removeFromWatchlist(index));

    const row = document.createElement("div");
    row.className = "row";
    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "Details";
    detailsBtn.addEventListener("click", () => openModal(anime));
    row.append(detailsBtn, btn);

    card.append(h3, img, p, row);
    container.appendChild(card);
  });
}

function removeFromWatchlist(index) {
  watchlist.splice(index, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  displayWatchlist();
}

let searchInput, searchBtn;
const quizQuestions = [
  {
    question: "Who is the main character of Naruto?",
    options: [
      "Naruto Uzumaki",
      "Sasuke Uchiha",
      "Sakura Haruno",
      "Kakashi Hatake",
    ],
    answer: "Naruto Uzumaki",
  },
  {
    question: "Which anime features the character Monkey D. Luffy?",
    options: ["Bleach", "Dragon Ball", "One Piece", "Fairy Tail"],
    answer: "One Piece",
  },
  {
    question: "In Attack on Titan, what is Eren’s titan called?",
    options: ["Armored Titan", "Colossal Titan", "Attack Titan", "Beast Titan"],
    answer: "Attack Titan",
  },
  {
    question: "Who owns the Death Note in Death Note?",
    options: ["Light Yagami", "L", "Ryuk", "Near"],
    answer: "Light Yagami",
  },
  {
    question: "What is the name of the school in My Hero Academia?",
    options: ["UA High", "Tokyo High", "Hero Academy", "Shonen School"],
    answer: "UA High",
  },
  {
    question: "Which anime features a notebook that kills people?",
    options: ["Death Note", "Naruto", "Bleach", "One Piece"],
    answer: "Death Note",
  },
  {
    question: "Who is the main protagonist in Demon Slayer?",
    options: [
      "Tanjiro Kamado",
      "Inosuke Hashibira",
      "Zenitsu Agatsuma",
      "Nezuko Kamado",
    ],
    answer: "Tanjiro Kamado",
  },
  {
    question: "What is the name of the pirate crew in One Piece?",
    options: [
      "Straw Hat Pirates",
      "Red Hair Pirates",
      "Whitebeard Pirates",
      "Blackbeard Pirates",
    ],
    answer: "Straw Hat Pirates",
  },
  {
    question: "Which anime features the character Goku?",
    options: ["Dragon Ball", "Naruto", "Bleach", "One Piece"],
    answer: "Dragon Ball",
  },
  {
    question: "Who is the main antagonist in Fullmetal Alchemist?",
    options: ["Father", "Envy", "Lust", "Greed"],
    answer: "Father",
  },
  {
    question: "What is the name of the city in Tokyo Ghoul?",
    options: ["Tokyo", "Osaka", "Kyoto", "Nagoya"],
    answer: "Tokyo",
  },
  {
    question: "Who is the main character in Sword Art Online?",
    options: ["Kirito", "Asuna", "Sinon", "Leafa"],
    answer: "Kirito",
  },
  {
    question: "Which anime features the Holy Grail War?",
    options: ["Fate/Stay Night", "Attack on Titan", "Naruto", "Bleach"],
    answer: "Fate/Stay Night",
  },
  {
    question: "Who is the main character in Bleach?",
    options: [
      "Ichigo Kurosaki",
      "Rukia Kuchiki",
      "Renji Abarai",
      "Uryu Ishida",
    ],
    answer: "Ichigo Kurosaki",
  },
  {
    question: "What is the name of the demon in Demon Slayer?",
    options: ["Muzan Kibutsuji", "Akaza", "Daki", "Gyutaro"],
    answer: "Muzan Kibutsuji",
  },
  {
    question: "Which anime features the Survey Corps?",
    options: ["Attack on Titan", "One Piece", "Naruto", "Bleach"],
    answer: "Attack on Titan",
  },
  {
    question: "Who is the main character in Hunter x Hunter?",
    options: ["Gon Freecss", "Killua Zoldyck", "Kurapika", "Leorio"],
    answer: "Gon Freecss",
  },
  {
    question: "Which anime features alchemy as a central theme?",
    options: ["Fullmetal Alchemist", "Naruto", "Bleach", "Dragon Ball"],
    answer: "Fullmetal Alchemist",
  },
  {
    question: "Who is the author of JoJo’s Bizarre Adventure?",
    options: ["Hirohiko Araki", "Eiichiro Oda", "Akira Toriyama", "Tite Kubo"],
    answer: "Hirohiko Araki",
  },
  {
    question: "Which anime features a deadly virtual reality MMO?",
    options: ["Sword Art Online", "Log Horizon", ".hack//Sign", "All of the above"],
    answer: "All of the above",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const questionData = quizQuestions[currentQuestionIndex];

  quizContainer.innerHTML = `
    <h3>${questionData.question}</h3>
    ${questionData.options
      .map((option, i) => `<button class="option" data-option="${option}">${option}</button>`)
      .join("")}
  `;

  const buttons = Array.from(quizContainer.querySelectorAll(".option"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => handleOptionClick(btn, buttons));
  });
}

function handleOptionClick(clickedBtn, allButtons) {
  const selected = clickedBtn.getAttribute("data-option");
  const correct = quizQuestions[currentQuestionIndex].answer;
  const scoreEl = document.getElementById("quiz-score");

  allButtons.forEach((b) => (b.disabled = true));

  if (selected === correct) {
    clickedBtn.classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex >= quizQuestions.length) {
        alert(`🎉 Quiz finished! Final Score: ${score}/${quizQuestions.length}`);
        currentQuestionIndex = 0;
        score = 0;
        scoreEl.textContent = `Score: 0`;
      }
      displayQuestion();
    }, 600);
  } else {
    clickedBtn.classList.add("incorrect");
    const correctBtn = allButtons.find((b) => b.getAttribute("data-option") === correct);
    if (correctBtn) correctBtn.classList.add("correct");
    // stay on the same question until user clicks correct or moves on via other means (optional)
  }
}

 
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = document.body.classList.contains("dark") ? "light" : "dark";
      setTheme(next);
    });
  }
 
  try {
    watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  } catch (_) {
    watchlist = [];
  }
 
  searchInput = document.getElementById("searchInput");
  searchBtn = document.getElementById("searchBtn");
  if (searchBtn) searchBtn.addEventListener("click", searchAnime);
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchBtn?.click();
      }
    });
    const debounced = debounce(searchAnime, 400);
    searchInput.addEventListener("input", debounced);
  }
 
  displayAnime(staticAnimeList);
  displayWatchlist();
  displayQuestion();
  displayReviews();
});
let reviews = JSON.parse(localStorage.getItem("animeReviews")) || [];
function displayReviews() {
  const container = document.getElementById("reviews-container");
  container.innerHTML = "";

  reviews
    .slice(-5)
    .reverse()
    .forEach((review) => {
      const div = document.createElement("div");
      div.classList.add("anime-card");
      div.innerHTML = `
      <h3>${review.anime}</h3>
      <p><strong>Rating:</strong> ⭐ ${review.rating}/10</p>
      <p>${review.text}</p>
      <small>Posted on ${review.date}</small>
    `;
      container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const anime = document.getElementById("review-anime").value;
    const rating = document.getElementById("review-rating").value;
    const text = document.getElementById("review-text").value;

    const newReview = {
      anime,
      rating,
      text,
      date: new Date().toLocaleString(),
    };

    reviews.push(newReview);
    localStorage.setItem("animeReviews", JSON.stringify(reviews));

    form.reset();
    displayReviews();
  });
});

function openModal(anime) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");
  if (!modal || !body) return;

  const genres = anime.genres ? anime.genres : anime.genre ? [anime.genre] : [];
  body.innerHTML = `
    <h2 id="modal-title">${anime.title}</h2>
    <img src="${anime.image}" alt="${anime.title}" loading="lazy" />
    ${anime.score != null ? `<p><strong>Score:</strong> ${anime.score}</p>` : ""}
    ${anime.episodes != null ? `<p><strong>Episodes:</strong> ${anime.episodes}</p>` : ""}
    ${genres.length ? `<p><strong>Genres:</strong> ${genres.join(', ')}</p>` : ""}
    ${anime.synopsis ? `<p>${anime.synopsis}</p>` : ""}
    ${anime.url ? `<p><a href="${anime.url}" target="_blank" rel="noopener">View on MyAnimeList</a></p>` : ""}
  `;

  modal.classList.remove("hidden");

  const closeBtn = document.getElementById("modal-close");
  const backdrop = modal.querySelector("[data-close]");
  const close = () => modal.classList.add("hidden");
  if (closeBtn) closeBtn.onclick = close;
  if (backdrop) backdrop.onclick = close;
}

