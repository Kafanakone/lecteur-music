// recuperation des id html
var prevMusic = document.getElementById('prev-music');
var playMusic = document.getElementById("play-music");
var nextMusic = document.getElementById("next-music");
var stopMusic = document.getElementById("stop-music");
var vol1 = document.getElementById("vol1");
var vol2 = document.getElementById("vol2");
var vol3 = document.getElementById("vol3");
var vol4 = document.getElementById("vol4");
var Music = document.getElementById("music");
var cover = document.getElementById("couverture");
var playnew = document.getElementById("play-new-music");
var delMusic = document.getElementById("exit-music");
var chanson = document.getElementById("audio");
var containerProgress = document.getElementById("progress-music-container");
var Progressbar = document.getElementById("progress-music-bar");
// var playNewMusic = document.getElementById("play-new-music");

// Variables
var playlist = ['ed-sheeran-perfect', 'celine-dion-parler-a-mon-pere', 'Celine_Dion_Je_ne_vous_oublie_pas',
                    'Céline_Dion_Pour que tu m aimes  encore', 'celine_Dion_Sil_suffisait_daimer', 'Bella_Ciao']; // les artistes
var idArstiste = 0; // identifiant de l'artiste
var artiste = playlist[idArstiste]; // l'artiste
var MusicArreter = false;
// execution fonctions

ChargementDonnées(artiste); // Charger les données de l'artiste
console.log(chanson.src); // à effacer juste un test pour voir si la musique chanson charge
console.log(cover.src); // à effacer juste un test pour voir si la musique chanson charge
// LecturePause();

// Listes des evernements
playMusic.addEventListener('click', LecturePause); // Jouer la musique avec le btn play
chanson.addEventListener('ended', function(){ // Lire la musique suivante si celle en cours terminée 
    MusicNext();
})
prevMusic.addEventListener('click', MusicPrev); // Jouer la musique precedente avec le btn prev
nextMusic.addEventListener('click', MusicNext); // Jouer la musique Suivante avec le btn next
stopMusic.addEventListener('click', MusicStop); // Arrêter la musique avec le btn stop
chanson.addEventListener('timeupdate', BarreProgress); // Remplissage de la barre en fonction d temps ecoule (auto)
containerProgress.addEventListener('click', AvancerLecture) // avancer la lecture du song et de la barre en fonction du click
// Reglages du volumes
vol1.addEventListener('click', function(){ // Volume à 1
    chanson.volume = 0.25;
    vol1.style.backgroundColor = '#fff';
    vol2.style.backgroundColor = 'rgb(56, 56, 56)'; 
    vol3.style.backgroundColor = 'rgb(56, 56, 56)';
    vol4.style.backgroundColor = 'rgb(56, 56, 56)';

});

vol2.addEventListener('click', function(){ // Volume à 2
    chanson.volume = 0.5;
    vol1.style.backgroundColor = '#fff';
    vol2.style.backgroundColor = '#fff'; 
    vol3.style.backgroundColor = 'rgb(56, 56, 56)';
    vol4.style.backgroundColor = 'rgb(56, 56, 56)';
});

vol3.addEventListener('click', function(){ // Volume à 3
    chanson.volume = 0.75;
    vol1.style.backgroundColor = '#fff';
    vol2.style.backgroundColor = '#fff'; 
    vol3.style.backgroundColor = '#fff';
    vol4.style.backgroundColor = 'rgb(56, 56, 56)'
});

vol4.addEventListener('click', function(){ // Volume à 4
    chanson.volume = 1;
    vol1.style.backgroundColor = '#fff';
    vol2.style.backgroundColor = '#fff'; 
    vol3.style.backgroundColor = '#fff';
    vol4.style.backgroundColor = '#fff';
});

// Listes des fonctions

// Fonction pour chargementes des données de la chansons et l'img de l'artiste (ChargementDonnées)
function ChargementDonnées(DonnéesArtiste){
    chanson.src = `music/${DonnéesArtiste}.mp3`;
    cover.src = `img/${DonnéesArtiste}.jpg`;
}

// Fonction pour verifier l'etat du lecteur (Lecture/Pause)
function LecturePause(){
    var EtatLecteur = playMusic.classList.contains('EnLecture');
    console.log(EtatLecteur);
    if (EtatLecteur) {
        Pause();
    }else{
        Lecture(artiste);
    }

}

// Fonction pour mettre la musique en mode lecture
function Lecture(artiste){
    if (MusicArreter == true) { // si la musique avait été arrêter, on recharger les données de l'artiste 
        ChargementDonnées(artiste);
    }
    chanson.play();
    playMusic.classList.add('EnLecture');
    cover.classList.add('rotation');
    playMusic.classList.remove('bi-play-fill');
    playMusic.classList.add('bi-pause-fill');
    
    // function pour changer le bg de la musique en cours
    function changebgplaylist(Musiqueisplaying){
        var MusicFini = document.querySelectorAll('.m-encours'); // rechercher toutes les classes  m-encours
        var MusicEnCours = document.getElementsByClassName(`${Musiqueisplaying}`); //il me renvoi un tableau
        if (MusicFini != false) {
            for (let i = 0; i < MusicFini.length; i++) {
                const idMusicFini = MusicFini[i];
                idMusicFini.classList.remove('m-encours');
            }
        }
            MusicEnCours[0].classList.add('m-encours'); // je selectionne l'element qu'il trouve en premier (c'est le suel qu'il va trouver même) 
            console.log(MusicEnCours[0]);
       
    }
    changebgplaylist(artiste)

}
// Fonction pour mettre la musique en pause
function Pause(){
    chanson.pause();
    playMusic.classList.remove('EnLecture');
    cover.classList.remove('rotation');
    playMusic.classList.add('bi-play-fill');
    playMusic.classList.remove('fa-pause');

}

// Fonction pour arrêter la musique 
function MusicStop(){
    MusicArreter = true;
    chanson.pause();
    chanson.currentTime = 0;
    playMusic.classList.remove('EnLecture');
    cover.classList.remove('rotation');
    playMusic.classList.add('bi-play-fill');
    playMusic.classList.remove('fa-pause');
    cover.src = "img/dark-bg.png";

}

// fonction pour lire la musique precedente
function MusicPrev(){
    Pause();
    idArstiste--;
    if (idArstiste < 0) {
        idArstiste = playlist.length -1;
    }
    ChargementDonnées(playlist[idArstiste]);
    Lecture(playlist[idArstiste]);

}

// fonction pour lire la musique suivante
function MusicNext(){
    Pause();
    idArstiste++;
    if (idArstiste > playlist.length -1) {
        idArstiste = 0;
    }
    ChargementDonnées(playlist[idArstiste]);
    Lecture(playlist[idArstiste])

}

// Fonction pour charger la barre de progression
function BarreProgress(e){
    const {duration, currentTime} = e.target; 
    var PourcentageChargement = (currentTime/duration)*100;
    Progressbar.style.width = `${PourcentageChargement}%`;
}
function AvancerLecture(e){
    let DuréeMusic = this.clientWidth;
    let LieuCliquer = e.offsetX;
    chanson.currentTime = (LieuCliquer/DuréeMusic)*chanson.duration
}

// Fonctions Pour jouer une nouvelle musique venant de la playlist
function Newmusic(t){
    var searchNewMusic = playlist.indexOf(t);
    artiste = playlist[searchNewMusic];
    MusicStop();
    ChargementDonnées(artiste);
    Lecture(artiste)
    console.log(artiste);
}

//Fonctions pour supprimer une musique dans la playlist
function supMusic(x){
    if (playlist.length === 1) {
        alert("Champion, tu es gamé hein!! C'est la seule Musique dans la playlist, n'est ne peut pas être supprimer")
    }else{
        MusicStop();
    var searchNewMusic = playlist.indexOf(x);
    playlist.splice(searchNewMusic, 1);
    var ElementSup = document.querySelector(`.${x}`);
    ElementSup.classList.add('supprimer');
    artiste = playlist[idArstiste]; 
    ChargementDonnées(artiste);
    Lecture(artiste)
    }
    

}

// Création du slider artiste
var DivSlider = ["Ed Sheeran", "Céline Dion", "Bella Ciao"];
var NumId = 0;
var SousNum;
var clef = 0;
function suivant(ClikID) {
    playlist =[]
    NumId = NumId + ClikID;
    SousNum = NumId - ClikID;
    document.getElementById(DivSlider[SousNum]).style.display = "none";
    if (NumId < 0) {
        NumId = DivSlider.length -1;
    }
    if (NumId > DivSlider.length -1) {
        NumId = 0;
    }
    MusicStop()

    document.getElementById(DivSlider[NumId]).style.display = "unset";
    console.log(DivSlider[NumId]);

    if (DivSlider[NumId] == "Ed Sheeran") {
        playlist =['ed-sheeran-perfect'];
        ChargementDonnées(playlist[0])
        Lecture(playlist[0]);
    }

    else if (DivSlider[NumId] == "Céline Dion") {
        playlist = ['celine-dion-parler-a-mon-pere', 'Celine_Dion_Je_ne_vous_oublie_pas',
        'Céline_Dion_Pour que tu m aimes  encore', 'celine_Dion_Sil_suffisait_daimer'];
        ChargementDonnées(playlist[0]);
        Lecture(playlist[0]);


    }

    else if (DivSlider[NumId] == "Bella Ciao") {
        playlist = ['Bella_Ciao'];
        ChargementDonnées(playlist[0]);
        Lecture(playlist[0]);

    }
}

function Auchargemendelapage() {
    document.getElementById(DivSlider[1]).style.display = "none";
    document.getElementById(DivSlider[2]).style.display = "none";
}