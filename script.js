// Master Movie Data (Expandable)
const movies = [
    { title: "Mercy (2026) WEB-DL [Hindi DD5.1] 4K 1080p HEVC", quality: "4K | HEVC", img: "https://via.placeholder.com/300x450" },
    { title: "28 Years Later (2026) [Hindi & English] 1080p", quality: "1080p | Dual", img: "https://via.placeholder.com/300x450" },
    { title: "WWE WrestleMania 42 (2026) HQ WEB-DL", quality: "720p | WWE", img: "https://via.placeholder.com/300x450" },
    { title: "Vanaveera (2026) WEB-DL [Hindi DD5.1] 720p", quality: "720p | South", img: "https://via.placeholder.com/300x450" }
];

// 1. Live Search Algorithm
const searchInput = document.getElementById('live-search');
const resultsBox = document.getElementById('search-results');

searchInput.addEventListener('input', (e) => {
    let val = e.target.value.toLowerCase();
    if(val.length > 2) {
        let matches = movies.filter(m => m.title.toLowerCase().includes(val));
        resultsBox.innerHTML = matches.map(m => `
            <div class="p-3 border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer flex gap-3 items-center">
                <img src="${m.img}" class="w-8 h-10">
                <span class="text-xs">${m.title}</span>
            </div>
        `).join('');
        resultsBox.classList.remove('hidden');
    } else {
        resultsBox.classList.add('hidden');
    }
});

// 2. Movie Injection Algorithm (Lazy Loading Ready)
const grid = document.getElementById('movie-grid');
function loadMovies() {
    grid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="quality-badge">${movie.quality}</div>
            <img src="${movie.img}" class="w-full h-56 object-cover bg-zinc-800">
            <div class="p-3">
                <h3 class="text-[11px] font-bold leading-tight h-8 overflow-hidden">${movie.title}</h3>
                <button class="w-full mt-3 bg-cyan-500 text-black text-[10px] py-1 rounded font-extrabold uppercase hover:bg-white transition-all">Download</button>
            </div>
        </div>
    `).join('');
}

loadMovies();

// 3. Meta-style Crash Protection
window.onerror = () => true;