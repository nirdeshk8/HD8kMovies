// --- 0. TRACKING SYSTEM (UTM Reader) ---
const urlParams = new URLSearchParams(window.location.search);
const currentID = urlParams.get('id');
const utmSource = urlParams.get('utm_source'); 

if (utmSource) {
    console.log(`🚀 User Aaya Hai: ${utmSource.toUpperCase()} se`);
    if(typeof gtag !== 'undefined') {
        gtag('event', 'traffic_source', {
            'event_category': 'marketing',
            'event_label': utmSource
        });
    }
}

// --- HOME PAGE LOGIC ---
const grid = document.getElementById('movie-grid');
if (grid) {
    const moviesArray = Object.keys(movieDB).map(key => ({ id: key, ...movieDB[key] }));

    function renderMovies(list) {
        if (list.length === 0) {
            grid.innerHTML = '<h3 class="text-white text-center col-span-full">No movies found</h3>';
            return;
        }
        grid.innerHTML = list.map(m => `
            <div class="movie-card bg-[#111] border border-zinc-800 rounded overflow-hidden cursor-pointer hover:border-cyan-400 transition group"
                 onclick="window.location.href='movie.html?id=${m.id}'">
                <div class="relative overflow-hidden">
                    <span class="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded z-10">${m.info.quality.split('|')[0]}</span>
                    <img src="${m.poster}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
                </div>
                <div class="p-3">
                    <h3 class="text-white text-xs font-bold truncate group-hover:text-cyan-400">${m.title}</h3>
                    <button class="w-full mt-2 bg-zinc-800 text-cyan-400 border border-zinc-700 text-[10px] py-2 rounded font-bold uppercase hover:bg-cyan-500 hover:text-black transition">
                        Download
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderMovies(moviesArray);

    const searchInput = document.getElementById('live-search');
    const resultsBox = document.getElementById('search-results');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            let val = e.target.value.toLowerCase();
            if(val.length > 2) {
                let matches = moviesArray.filter(m => m.title.toLowerCase().includes(val));
                resultsBox.innerHTML = matches.map(m => `
                    <div onclick="window.location.href='movie.html?id=${m.id}'" class="p-3 border-b border-zinc-800 hover:bg-zinc-800 cursor-pointer flex gap-3 items-center">
                        <img src="${m.poster}" class="w-8 h-10 object-cover rounded">
                        <span class="text-xs font-bold text-zinc-300">${m.title}</span>
                    </div>
                `).join('');
                resultsBox.classList.remove('hidden');
            } else {
                resultsBox.classList.add('hidden');
            }
        });
    }

    window.filterCategory = function(category) {
        if (category === 'All') {
            renderMovies(moviesArray);
        } else {
            const filtered = moviesArray.filter(m => 
                m.tags.includes(category) || 
                m.title.toLowerCase().includes(category.toLowerCase()) ||
                m.info.lang.includes(category)
            );
            renderMovies(filtered);
        }
    };
}

// --- MOVIE DETAIL PAGE LOGIC ---
const detailTitle = document.getElementById('d-title');
if (detailTitle && currentID) {
    const movie = movieDB[currentID];

    if (movie) {
        document.title = movie.title;
        document.getElementById('d-title').innerText = movie.title;
        document.getElementById('d-poster').src = movie.poster;
        document.getElementById('d-director').innerText = movie.info.director;
        document.getElementById('d-cast').innerText = movie.info.cast;
        document.getElementById('d-lang').innerText = movie.info.lang;
        document.getElementById('d-quality').innerText = movie.info.quality;
        document.getElementById('d-plot').innerText = movie.plot;

        const linkBox = document.getElementById('link-list');
        let linksHTML = '';
        for (const [quality, link] of Object.entries(movie.links)) {
            if(link) {
                linksHTML += `
                <div onclick="openLink('${quality}', '${link}')" class="flex justify-between items-center bg-[#111] border-l-4 border-[#333] p-3 mb-2 hover:bg-[#1a1a1a] hover:border-cyan-400 cursor-pointer transition">
                    <span class="font-bold text-white uppercase">${quality.replace('_', ' ')}</span>
                    <div class="flex items-center gap-3">
                        <span class="text-[10px] text-zinc-500">Click to Download</span>
                        <i class="fa fa-download text-cyan-400"></i>
                    </div>
                </div>`;
            }
        }
        linkBox.innerHTML = linksHTML;
    }
}

window.startGeneration = function() {
    const btn = document.getElementById('gen-btn');
    const list = document.getElementById('link-list');
    btn.innerHTML = 'Checking Servers...';
    setTimeout(() => {
        btn.style.display = 'none';
        list.classList.remove('hidden');
    }, 1000);
};

window.openLink = function(quality, url) {
    const modal = document.getElementById('counter-modal');
    modal.classList.remove('hidden');
    let time = 10;
    const txt = document.getElementById('countdown-text');
    const timer = setInterval(() => {
        time--;
        txt.innerText = time;
        if(time <= 0) {
            clearInterval(timer);
            txt.innerText = "🚀";
            setTimeout(() => {
                modal.classList.add('hidden');
                window.open(url, '_blank');
            }, 500);
        }
    }, 1000);
};