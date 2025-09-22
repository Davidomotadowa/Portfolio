// // Hardcoded anime list
// const animeData = [
//   { title: "Naruto", genre: "action" },
//   { title: "One Piece", genre: "action" },
//   { title: "Your Name", genre: "romance" },
//   { title: "Toradora!", genre: "romance" },
//   { title: "Konosuba", genre: "comedy" },
//   { title: "One Punch Man", genre: "comedy" },
//   { title: "Fullmetal Alchemist", genre: "fantasy" },
//   { title: "Attack on Titan", genre: "fantasy" },
//   { title: "Akame ga Kill!", genre: "action" },
//   { title: "Samurai Champloo", genre: "action" },
//   { title: "Rurouni Kenshin", genre: "action" },
//   { title: "Trigun", genre: "sci-fi" },
//   { title: "Baccano!", genre: "mystery" },
//   { title: "Durarara!!", genre: "mystery" },
//   { title: "Hellsing Ultimate", genre: "horror" },
//   { title: "Elfen Lied", genre: "horror" },
//   { title: "Black Lagoon", genre: "action" },
//   { title: "Great Teacher Onizuka", genre: "comedy" },
//   { title: "Ouran High School Host Club", genre: "romance" },
//   { title: "Lovely★Complex", genre: "romance" },
//   { title: "K-On!", genre: "slice of life" },
//   { title: "Nichijou", genre: "comedy" },
//   { title: "Daily Lives of High School Boys", genre: "comedy" },
//   { title: "Azumanga Daioh", genre: "slice of life" },
//   { title: "Lucky Star", genre: "slice of life" },
//   { title: "School Rumble", genre: "comedy" },
//   { title: "Fruits Basket", genre: "romance" },
//   { title: "Skip Beat!", genre: "romance" },
//   { title: "Boys Over Flowers", genre: "romance" },
//   { title: "The World God Only Knows", genre: "romance" },
//   { title: "Highschool of the Dead", genre: "horror" },
//   { title: "Zombieland Saga", genre: "comedy" },
//   { title: "Akira", genre: "sci-fi" },
//   { title: "Paprika", genre: "psychological" },
//   { title: "Perfect Blue", genre: "thriller" },
//   { title: "The Girl Who Leapt Through Time", genre: "romance" },
//   { title: "Wolf Children", genre: "drama" },
//   { title: "The Boy and the Beast", genre: "fantasy" },
//   { title: "Spirited Away", genre: "fantasy" },
//   { title: "Howl’s Moving Castle", genre: "fantasy" },
//   { title: "Princess Mononoke", genre: "fantasy" },
//   { title: "My Neighbor Totoro", genre: "slice of life" },
//   { title: "Kiki’s Delivery Service", genre: "fantasy" },
//   { title: "Ponyo", genre: "fantasy" },
//   { title: "Castle in the Sky", genre: "fantasy" },
//   { title: "Nausicaä of the Valley of the Wind", genre: "fantasy" },
//   { title: "Whisper of the Heart", genre: "romance" },
//   { title: "The Wind Rises", genre: "drama" },
//   { title: "Grave of the Fireflies", genre: "drama" },
//   { title: "5 Centimeters per Second", genre: "romance" },
//   { title: "Garden of Words", genre: "romance" },
//   { title: "Weathering With You", genre: "romance" },
//   { title: "Children Who Chase Lost Voices", genre: "fantasy" },
//   { title: "The Place Promised in Our Early Days", genre: "drama" },
//   { title: "Bubble", genre: "romance" },
//   { title: "Belle", genre: "fantasy" },
//   { title: "Josee, the Tiger and the Fish", genre: "romance" },
//   { title: "I Want to Eat Your Pancreas", genre: "drama" },
// ];

// const animeList = document.getElementById("animeList");
// const watchlistDiv = document.getElementById("watchlist");
// const searchInput = document.getElementById("search");
// const genreFilter = document.getElementById("genreFilter");

// // Load watchlist from localStorage
// let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// function displayAnime(list) {
//   animeList.innerHTML = "";
//   list.forEach((anime) => {
//     const card = document.createElement("div");
//     card.classList.add("anime-card");
//     card.innerHTML = `
//       <span>${anime.title} (${anime.genre})</span>
//       <button onclick="addToWatchlist('${anime.title}')">+ Watchlist</button>
//     `;
//     animeList.appendChild(card);
//   });
// }

// function displayWatchlist() {
//   watchlistDiv.innerHTML = "";
//   watchlist.forEach((anime) => {
//     const card = document.createElement("div");
//     card.classList.add("anime-card");
//     card.innerHTML = `
//       <span>${anime}</span>
//       <button onclick="removeFromWatchlist('${anime}')">Remove</button>
//     `;
//     watchlistDiv.appendChild(card);
//   });
// }

// function addToWatchlist(title) {
//   if (!watchlist.includes(title)) {
//     watchlist.push(title);
//     localStorage.setItem("watchlist", JSON.stringify(watchlist));
//     displayWatchlist();
//   }
// }

// function removeFromWatchlist(title) {
//   watchlist = watchlist.filter((anime) => anime !== title);
//   localStorage.setItem("watchlist", JSON.stringify(watchlist));
//   displayWatchlist();
// }

// // Filters
// searchInput.addEventListener("input", () => {
//   const searchTerm = searchInput.value.toLowerCase();
//   const filtered = animeData.filter((a) =>
//     a.title.toLowerCase().includes(searchTerm)
//   );
//   displayAnime(filtered);
// });

// genreFilter.addEventListener("change", () => {
//   const genre = genreFilter.value;
//   const filtered =
//     genre === "all" ? animeData : animeData.filter((a) => a.genre === genre);
//   displayAnime(filtered);
// });

// // Initial display
// displayAnime(animeData);
// displayWatchlist();

// fetch("https://api.jikan.moe/v4/anime?q=naruto")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // See the full response in console
//     const animeList = data.data; // actual anime array

//     // Display first 5 results on page
//     const container = document.getElementById("anime-container");
//     animeList.slice(0, 5).forEach((anime) => {
//       const div = document.createElement("div");
//       div.innerHTML = `
//         <h3>${anime.title}</h3>
//         <img src="${anime.images.jpg.image_url}" width="150" />
//         <p>Episodes: ${anime.episodes || "?"}</p>
//         <p>Score: ${anime.score || "N/A"}</p>
//       `;
//       container.appendChild(div);
//     });
//   })
//   .catch((err) => console.error(err));









// 






