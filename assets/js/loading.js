

// Afficher l'écran de chargement
document.getElementById("loading-screen").style.display = "flex";

// Cacher l'écran de chargement après 3 secondes
setTimeout(function() {

    
    // Cacher l'écran de chargement progressivement
    var loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = 0;
    setTimeout(function() {
      loadingScreen.style.display = "none";
    }, 250);

        // Réactiver le scroll vertical
    document.body.style.overflow = "auto";

  }, 500);




  