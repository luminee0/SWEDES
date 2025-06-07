
let currentSongIndex = 0;
const songs = [
    'assets/song1.mp3',
    'assets/song2.mp3',
    'assets/song3.mp3'
];

function playSong(song,image,title) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioSource.src = song;
    audioPlayer.load();
    audioPlayer.play();
    const songImage = document.getElementById('songImage');
    songImage.src = image;
    const titleElement = document.getElementById('songTitle');
    titleElement.textContent = title;

    songImage.style.transform = 'scale(0.95)';
    setTimeout(() => {
        songImage.style.transform = 'scale(1)';
    }, 200);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex], '', 'Next Song');
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex], '', 'Previous Song');
}

function volumeUp() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.volume < 1) {
        audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
        showVolumeIndicator(Math.round(audioPlayer.volume * 100));
    }
}

function volumeDown() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
        showVolumeIndicator(Math.round(audioPlayer.volume * 100));
    }
}

function showVolumeIndicator(volume) {
    //temp vol indicator
    const indicator = document.createElement('div');
    indicator.textContent = `Volume: ${volume}%`;
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(65, 105, 225, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        font-weight: 500;
        z-index: 1000;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-bar ul li a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    //smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    //keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const audioPlayer = document.getElementById('audioPlayer');
        if (!audioPlayer) return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (audioPlayer.paused) {
                    audioPlayer.play().catch(console.error);
                } else {
                    audioPlayer.pause();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                volumeUp();
                break;
            case 'ArrowDown':
                e.preventDefault();
                volumeDown();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSong();
                break;
        }
    });
});

//loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});

document.addEventListener('DOMContentLoaded', async function() {
    const msg = document.querySelector("#msg");
    console.log("called");

    try {
        const response = await fetch("http://localhost:3000/student");
        const text = await response.text();
        console.log(text);
        msg.textContent = text; // Update the msg text with the response
    } catch (error) {
        console.error('Error fetching data:', error);
        msg.textContent = 'Error fetching data'; // Optional: Display an error message
    }
});

