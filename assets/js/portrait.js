document.getElementById('slider').addEventListener('input', function() {
    // Récupérer la valeur du slider
    var sliderValue = parseInt(this.value);
  
    // Masquer toutes les images de la galerie
    var images = document.getElementsByClassName('gallery')[0].getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
    }
  
    // Afficher l'image correspondant à la valeur du slider
    document.getElementById('image' + sliderValue).style.display = 'block';
  });
  