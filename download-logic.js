let timeLeft = 10;
const progressBar = document.getElementById('progress-bar');
const countdownText = document.getElementById('countdown-text');
const totalOffset = 364.4;

let timer = setInterval(() => {
    timeLeft--;
    countdownText.innerText = timeLeft;
    
    // Circle filling algorithm
    let offset = totalOffset - ( (10 - timeLeft) / 10 * totalOffset);
    progressBar.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('status-msg').innerText = "Link is Ready!";
        document.getElementById('final-download').classList.remove('hidden');
        countdownText.innerText = "✓";
    }
}, 1000);

// 2-Step Ad Logic
function handleAdStep() {
    // Step 1: Trigger Pop-under Ad
    window.open("https://your-ad-link-here.com", "_blank");
    
    // Step 2: Show final link after 1 second delay
    setTimeout(() => {
        alert("Verification Successful! Starting 8K Download...");
        window.location.href = "https://your-movie-file-link.com";
    }, 1000);
}