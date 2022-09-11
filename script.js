console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
var time=document.getElementsByClassName('timestamp');

let songs = [
    {songName: "Kho Gaye Hum Kahan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Filhall", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Bewaffa", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Teri Aankhon Mein", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Juddaiyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mehendi Wale Haath", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Lambiyaan si Judaiyaan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sawan Mein Lag Gayi Aag", filePath: "songs/9.mp3", coverPath: "covers/8.jpg"},
    {songName: "Care Ni Karda", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Saiyaan Ji", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
 
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
var i=0;
function nextsong(e,songIndex)
{

    console.log("nextsong chalao");
    console.log(e.target.classList);
    e.target.classList.add('fa-play-circle');
    var id=e.target.id;
    console.log(songIndex);
    songIndex=(songIndex+1)%10;
    console.log(songIndex);
    audioElement.src = `songs/${songIndex+1}.mp3`;
    console.log(audioElement.src)
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    document.getElementById(`${id+1}`).classList.remove('fa-play-circle');
    document.getElementById(`${id+1}`).classList.add('fa-pause-circle');



    // audioElement.play();

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,index)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        audioElement.onended=function()
        {
            nextsong(e,songIndex);
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
