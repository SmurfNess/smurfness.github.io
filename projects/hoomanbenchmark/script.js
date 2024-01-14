let compteur = 0;
let totalBoutons = 4;
let boutonAttendu = 1;
let attempt =0;
let soundValue=1;

function reset() {
  compteur = 0;
  attempt = 0;
  document.getElementById("compteur").textContent = compteur;
  totalBoutons = 4;
  boutonAttendu = 1;
}

function tryAgain() {
  boutonAttendu = 1;
}


function reinitialiserBoutonAttendu() {
  boutonAttendu = 1;
}

function genererGrille() {
    const grilleContainer = document.getElementById("grille-container");
  grilleContainer.innerHTML = "";
  currentNoteIndex = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const caseElement = document.createElement("div");
      caseElement.classList.add("case");
      grilleContainer.appendChild(caseElement);
    }
  }

  let boutonsAjoutes = 0;
  while (boutonsAjoutes < totalBoutons) {
    const randomRow = Math.floor(Math.random() * 8);
    const randomCol = Math.floor(Math.random() * 8);
    const caseElement = grilleContainer.children[randomRow * 8 + randomCol];

    if (!caseElement.querySelector(".numero-bouton")) {
      const boutonElement = document.createElement("button");

      boutonElement.classList.add("numero-bouton");
      boutonElement.style.width = "100px";
      boutonElement.style.height = "100px";
      boutonElement.textContent = boutonsAjoutes + 1;

      boutonElement.addEventListener("click", function () {
        if (parseInt(this.textContent) === boutonAttendu) {
          playMelody();
          compteur++;
          document.getElementById("compteur").textContent = compteur;

          this.remove();
          boutonsAjoutes--;

          boutonAttendu++;

          if (boutonsAjoutes === 0) {
            totalBoutons++;
            document.getElementById("numbersSuccess").textContent = totalBoutons;
            document.getElementById("attemptDisplaySuccess").innerText = attempt + " of 3";
            reinitialiserBoutonAttendu();
            ajouterBoutonSupplementaire();
          }

          // Modifier la classe pour tous les boutons après le clic du bouton 1
          if (parseInt(this.textContent) === 1) {
            const tousLesBoutons = document.querySelectorAll(".numero-bouton");
            tousLesBoutons.forEach(bouton => {
              bouton.classList.add("bouton-1-clique");
            });
          }
        } else {
          rendreBoutonsInutilisables();
          playBeep();
        }
      });

      caseElement.appendChild(boutonElement);
      boutonsAjoutes++;
    }
  }
}

function ajouterBoutonSupplementaire() {
  var grilleContainer = document.getElementById("cache-succes");
  grilleContainer.style.display = "block";
}

function rendreBoutonsInutilisables() {
  document.getElementById("numbersFail").textContent = totalBoutons;
  const boutons = document.querySelectorAll(".numero-bouton");
  boutons.forEach((bouton) => {
    bouton.disabled = true;
    bouton.classList.add("bouton-inutilisable");
  });
  attempt++;
  document.getElementById("attempt").textContent = attempt;
  document.getElementById("attemptDisplayFail").innerText = attempt + " of 3";
  revealCacheFail();
}

function hiddenCacheStart() {
  var grilleContainer = document.getElementById("cache-start");
  grilleContainer.style.display = "none";
  var grilleContainer = document.getElementById("cache-fail");
  grilleContainer.style.display = "none";
  var grilleContainer = document.getElementById("gameOverCache");
  grilleContainer.style.display = "none"; 
  var grilleContainer = document.getElementById("cache-succes");
  grilleContainer.style.display = "none";
}

function revealCacheFail(){
  if( attempt <= 3){
  var grilleContainer = document.getElementById("cache-fail");
  grilleContainer.style.display = "block";
  }
  if (attempt > 3) {
    var gameOverContainer = document.getElementById("gameOverCache");
    gameOverContainer.style.display = "block";
    attempt = 0;
    document.getElementById("finalScore").textContent = compteur;
  }
}




       // Définition des fréquences des notes (ajustées pour être encore plus graves)
       const FREQUENCIES = {
        'C': 130.81,
        'D': 146.83,
        'E': 164.81,
        'F': 174.61,
        'G': 196.00,
        'A': 220.00,
        'B': 246.94
    };

    // Liste des notes à jouer
    const MELODY = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    // Variable pour suivre la position actuelle dans la séquence de notes
    let currentNoteIndex = 0;

    // Fonction pour jouer une note avec une enveloppe sonore
    function playNote(note) {
      if (soundValue === 1) {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
  
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(FREQUENCIES[note], audioContext.currentTime);
  
          // Définir l'enveloppe sonore
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.2); // Montée rapide à 0.1
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3); // Descente lente
  
          // Connecter l'oscillateur au nœud de gain et le nœud de gain à la destination audio
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
  
          // Démarrer l'oscillateur
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);  // Arrêter la note après 0.5 seconde
      }
  }
  

    // Fonction pour jouer la mélodie
    function playMelody() {
        // Utiliser une promesse pour gérer l'asynchronisme
        function playNoteWithDelay(note, delay) {
            return new Promise(resolve => {
                setTimeout(() => {
                    playNote(note);
                    resolve();
                }, delay);
            });
        }

        // Jouer la note actuelle
        playNoteWithDelay(MELODY[currentNoteIndex], 0);

        // Mettre à jour l'indice pour la prochaine note
        currentNoteIndex = (currentNoteIndex + 1) % MELODY.length;
    }
    function playBeep() {
      if (soundValue === 1) {
          // Créer un contexte audio
          var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
          // Créer un oscillateur (générateur de son)
          var oscillator = audioContext.createOscillator();
  
          // Créer un nœud de gain pour régler le volume
          var gainNode = audioContext.createGain();
  
          // Définir le type d'onde (sinus pour un son pur)
          oscillator.type = 'sine';
  
          // Définir la fréquence (ajustez la valeur pour obtenir le bip grave désiré)
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Exemple de fréquence 100 Hz
  
          // Connecter l'oscillateur au nœud de gain
          oscillator.connect(gainNode);
  
          // Connecter le nœud de gain au contexte audio
          gainNode.connect(audioContext.destination);
  
          // Régler le volume à 50% (ajustez la valeur selon vos besoins)
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  
          // Démarrer l'oscillateur
          oscillator.start();
  
          // Arrêter l'oscillateur après un court délai (par exemple, 500 ms)
          oscillator.stop(audioContext.currentTime + 0.3);
      }
  }

  function toggleSound() {
    var imgSound = document.getElementById("sound");

    if (soundValue === 0) {
        imgSound.src = "volume.webp";
        soundValue = 1;
    } else if (soundValue === 1) {
        imgSound.src = "volume-mute.webp";
        soundValue = 0;
    }
}

  
const style = document.createElement("style");
style.textContent = `
  .taller{
    margin : 2vh 0 2vh 0;
    background-color: dodgerblue;
    height:96vh;
    width:100vw;
  }

  .logo {
    position: relative;
    display:inline-block;
    width: 200px;
    height: 200px;
    background-color: transparent;
    transform: scale(0.8); 
}

.white-square {
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    position: absolute;
    margin:10px;
    border-radius:12px;
}

.top-left {
    top: 0;
    left: 0;
}

.top-right {
    top: 0;
    right: 0;
}

.bottom-left {
    bottom: 0;
    left: 0;
}

.bottom-right {
    bottom: 0;
    right: 0;
}

.white-square.bottom-right:after {
  content: "";
  width: 55px; /* Taille du carré bleu */
  height: 55px; /* Taille du carré bleu */
  background-color: dodgerblue; /* Couleur bleue */
  position: absolute;
  top: 50%; /* Centrer verticalement */
  left: 50%; /* Centrer horizontalement */
  transform: translate(-50%, -50%); /* Ajuster pour centrer complètement */
}


  #sound{
    opacity:0.5;
  }

  #sound:hover{
    opacity:1;
  }
  
  #cache-succes{
    display:none;
  }

  #cache-fail{
    display:none;
  }


  button:hover{
    border: solid 5px rgba(255, 255, 255, 0.5);
  }

.boutons{
  padding: 5px 20px 5px 20px;
  background-color:gold;
  border: 5px gold solid;
  border-radius: 3px;
  color: black;
  font-size: 25px;
  font-weight: bold;"
}

#tryAgainButton{
  background-color:rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px 25px 10px 25px;
}

  .boutons:hover{
    background-color:white;
  }


  #gameOverCache{
    display:none;
    }

  #grille-container {
    padding:15px;
    display: grid;
    grid-template-columns: repeat(8, 100px);
    grid-template-rows: repeat(8, 100px);
    gap: 5px;
  }

  .case {
    width: 100px;
    height: 100px;
    background-color: transparent;
    border: 1px transparent gray;
    position: relative;
  }

  .numero-bouton {
    width: 100px;
    height: 100px;
    background-color: transparent;
    color: white;
    border-radius :5px;
    border: solid 5px rgba(255, 255, 255, 0.25);
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
     user-select: none;
  }

  .bouton-1-clique {
    background-color: white;
    border: solid 5px white; 
  }

  .bouton-inutilisable {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }

  #compteur {
    font-size: 18px;
    margin-right: 10px;
  }
`;

document.head.appendChild(style);
