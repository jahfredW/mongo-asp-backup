
const btnFiltre = document.querySelector('.balise');
const filtreOpen = document.querySelector('.filtreOpen');
const templateListe = document.getElementById('template');
const liste = document.querySelector('.listeSalle');
const barreRecherche = document.querySelector('.barreRecherche');
const filtreForm = document.querySelector('#filtreForm');
    let tabStyle = [];

function createAndAppendElements(salles) {
    salles.forEach(salle => {
        var clone = document.importNode(templateListe.content, true);

        var nomSalle = clone.querySelector('h3');
        var villeSalle = clone.querySelector('#ville');
        var capaciteSalle = clone.querySelector('#capacite');

        nomSalle.textContent = salle.nom;
        villeSalle.textContent = salle.adresse.ville;
        capaciteSalle.textContent = salle.capacite;

        liste.appendChild(clone);
    });
}


filtreForm.addEventListener('change', filterSalles);
barreRecherche.addEventListener('input', filterSalles);
function filterSalles() {

    recupererStyleFlitre();
    fetch('https://localhost:44314/api/Salles')
        .then(res => res.json())
        .then(salles => {
            const filtreNom = barreRecherche.value.toLowerCase();
            console.log(salles);

            const filteredResults = salles.filter(item => (item.nom.toLowerCase().includes(filtreNom)
            || item.adresse.ville.toLowerCase().includes(filtreNom) || String(item.capacite).includes(filtreNom))
            && tabStyle.every(style => item.styles.includes(style)));

            const listeSalle = document.querySelectorAll('.salle');

            listeSalle.forEach(element => {
                element.remove();
            });
            createAndAppendElements(filteredResults);

        })
        .catch(error => console.error('Erreur de fetch :', error));
}


function recupererStyleFlitre(){
    let tabStyleInput = filtreForm.querySelectorAll('[data-style]');
    tabStyle = [];
    tabStyleInput.forEach(element => {
        if (element.checked){
            tabStyle.push(element.attributes.value.value) ;
        }
    });

}

fetch('https://localhost:44314/api/Salles')
    .then(res => res.json())
    .then(salles => {
        createAndAppendElements(salles);
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

