
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
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
}

function volumeUp() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.volume < 1) {
        audioPlayer.volume += 0.1;
    }
}

function volumeDown() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.volume > 0) {
        audioPlayer.volume -= 0.1;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-bar ul li a');

    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
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

