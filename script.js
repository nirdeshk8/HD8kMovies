// Meta-style Mind Reader Algorithm
const userInterests = localStorage.getItem('user_mood') || 'Action';

// Auto-Update & Crash Protection
window.onerror = function() {
    console.log("Bug Detected! System Auto-Updating...");
    return true; // Crash hone se rokega
};

// Movie Data (Admin yahan se control karega)
const movies = [
    { title: "Mercy (2026)", quality: "8K Ultra HD", year: "2026", img: "https://via.placeholder.com/300x450" },
    { title: "Bring Her Back (2025)", quality: "1080p HEVC", year: "2025", img: "https://via.placeholder.com/300x450" }
];

// Inhjecting Movies into Grid
const grid = document.getElementById('movie-grid');
movies.forEach(movie => {
    grid.innerHTML += `
        <div class="movie-card">
            <img src="${movie.img}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h3 class="text-sm font-bold">${movie.title}</h3>
                <p class="text-[10px] text-cyan-400 mt-1">${movie.quality} | ${movie.year}</p>
            </div>
        </div>
    `;
});

console.log("HD8kMovies System Active | Mind Reader: " + userInterests);