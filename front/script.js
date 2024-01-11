
  const btnFiltre = document.querySelector('.balise');
  const filtreOpen = document.querySelector('.filtreOpen');
  const templateListe = document.getElementById('template');
  const liste = document.querySelector('.listeSalle');
  const barreRecherche = document.querySelector('.barreRecherche');

  function createAndAppendElements(users) {
      users.forEach(user => {
          var clone = document.importNode(templateListe.content, true);
          var nomSalle = clone.querySelector('h3');
          var villeSalle = clone.querySelector('#ville');
          var capaciteSalle = clone.querySelector('#capacite');
          nomSalle.textContent = user.name;
          villeSalle.textContent = user.address.city;
          capaciteSalle.textContent = user.id;
          liste.appendChild(clone);
      });
  }
  function filterSalles() {
    const filtreNom = barreRecherche.value.toLowerCase();

    Array.from(liste.children).forEach(salle => {
        const nomSalle = salle.querySelector('h3').textContent.toLowerCase();
        const villeSalle = salle.querySelector('#ville').textContent.toLowerCase();
        const capaciteSalle = salle.querySelector('#capacite').textContent.toLowerCase();

        const correspondNom = nomSalle.includes(filtreNom) || filtreNom === '';
        const correspondVille = villeSalle.includes(filtreNom) || filtreNom === '';
        const correspondCapacite = capaciteSalle.includes(filtreNom) || filtreNom === '';

        salle.style.display = correspondNom || correspondVille || correspondCapacite ? 'block' : 'none';
    });
}
fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(users => {
    createAndAppendElements(users);
    barreRecherche.addEventListener('input', filterSalles);

})
.catch(error => console.error('Erreur de fetch :', error));

  btnFiltre.addEventListener('click', function () {
      if (btnFiltre.textContent == '<') {
          filtreOpen.style.display = 'none';
          btnFiltre.textContent = '>';
      } else {
          filtreOpen.style.display = '';
          btnFiltre.textContent = '<';
      }
  });

