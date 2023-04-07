// Initialisation de Paper.js
paper.setup('canvaspolygon');

// Définition du polygone personnalisé
var path = new paper.Path({
  segments: [
    [100, 100],
    [200, 50],
    [300, 150],
    [200, 200]
  ],
  closed: true
});

// Chargement de l'image
var raster = new paper.Raster('image');

// Masquage de l'image avec le polygone personnalisé
raster.onLoad = function() {
  raster.fitBounds(paper.view.bounds);
  raster = raster.toRaster({
    mask: path
  });
};
    