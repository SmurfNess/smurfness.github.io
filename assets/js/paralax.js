window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY; // Obtenir la position de défilement verticale
    var parallaxLayers = document.getElementsByClassName('parallax-layer');
    
    for (var i = 0; i < parallaxLayers.length; i++) {
      var layer = parallaxLayers[i];
      var depth = parseFloat(layer.style.transform.split(' ')[0].slice(11)); // Obtenir la profondeur de chaque couche
      
      layer.style.transform = 'translateZ(' + (-depth * scrollPosition) + 'px) scale(' + (1 + depth) + ')'; // Appliquer l'effet parallaxe en ajustant la profondeur et l'échelle en fonction de la position de défilement
    }
  });
  