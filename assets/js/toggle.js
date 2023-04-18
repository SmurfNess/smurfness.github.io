  // Récupérer l'élément de l'image de toggle
  var imgToggle = document.getElementById('img-toggle');
  // Récupérer l'élément de la navbar mobile
  var navbarMobile = document.getElementById('navbar-mobile');

  // Ajouter un gestionnaire d'événements pour le clic sur l'image de toggle
  imgToggle.addEventListener('click', function() {
    // Ajouter ou supprimer la classe 'active' à la navbar mobile
    navbarMobile.classList.toggle('active');
  });