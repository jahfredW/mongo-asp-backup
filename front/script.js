// Sélection des éléments du DOM
const btnFiltre = document.querySelector('.balise');
const filtreOpen = document.querySelector('.filtreOpen');
const templateListe = document.getElementById('template');
const templateFiltre = document.getElementById('templateFiltre');
const liste = document.querySelector('.listeSalle');
const barreRecherche = document.querySelector('.barreRecherche');
const filtreForm = document.querySelector('#filtreForm');
let tabStyle = [];
let listeSalles;
let map = L.map('map').setView([46, 2], 5);
let markersLayer = L.layerGroup().addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Écouteurs d'événements
filtreForm.addEventListener('change', filterSalles);
barreRecherche.addEventListener('input', filterSalles);
btnFiltre.addEventListener('click', fermetureStyleFlitre);
// Connexion à l'API pour charger les différents styles de musique
fetch('https://localhost:44314/api/Styles')
    .then(res => res.json())
    .then(styles => {
        styles.styles.forEach(style => {
            // Créer un élément de formulaire pour chaque style
            creerElementFormulaireAvecStyle(style);
        });
    })
    .catch(error => console.error('Erreur de fetch pour les styles :', error));

// Connexion à l'API pour charger les données des salles et création des templates
fetch('https://localhost:44314/api/Salles')
    .then(res => res.json())
    .then(salles => {
        // Créer les éléments de salle à partir des données récupérées
        creerElementSalles(salles);
        createAllPointsInMap(salles);
        listeSalles = document.querySelectorAll('.salle');
        for (let i = 0; i < listeSalles.length; i++) {

            listeSalles[i].addEventListener('click', (e) => {
                localStorage.setItem('id', listeSalles[i].querySelector('#idSalle').textContent)
                document.location.href = "http://127.0.0.1:5500/salle.html";
            });
        }

    })
    .catch(error => console.error('Erreur de fetch pour les salles :', error));

// Fonction de filtrage des salles
function filterSalles() {
    recupererStyleFlitre();
    fetch('https://localhost:44314/api/Salles')
        .then(res => res.json())
        .then(salles => {
            // Appliquer le filtrage sur les salles
            let test = filtre(salles);
            effacerMarqueurs();
            createAllPointsInMap(test);
            listeSalles = document.querySelectorAll('.salle');
            for (let i = 0; i < listeSalles.length; i++) {

                listeSalles[i].addEventListener('click', (e) => {
                    localStorage.setItem('id', listeSalles[i].querySelector('#idSalle').textContent)
                    document.location.href = "http://127.0.0.1:5500/salle.html";
                });
            }
        })
        .catch(error => console.error('Erreur de fetch pour les salles :', error));
}

// Fonction de filtrage des salles avec les critères de recherche et de style
function filtre(salles) {
    const filtreNom = barreRecherche.value.toLowerCase();

    const filteredResults = salles.filter(
        item => (item.nom.toLowerCase().includes(filtreNom) || item.adresse.ville.toLowerCase().includes(filtreNom) || String(item.capacite).includes(filtreNom)) &&
            tabStyle.every(style => item.styles.includes(style))
    );

    // Suppression des éléments existants dans la liste
    const listeSalle = document.querySelectorAll('.salle');
    listeSalle.forEach(element => {
        element.remove();
    });

    // Création et ajout des nouveaux éléments
    creerElementSalles(filteredResults);
    return filteredResults;
}

// Fonction de création et ajout des éléments au DOM à partir des données des salles
function creerElementSalles(salles) {
    salles.forEach(salle => {
        var clone = document.importNode(templateListe.content, true);
        var nomSalle = clone.querySelector('h3');
        var villeSalle = clone.querySelector('#ville');
        var capaciteSalle = clone.querySelector('#capacite');
        var idSalle = clone.querySelector('#idSalle');
        // Mise à jour des données de la salle dans le template
        nomSalle.textContent = salle.nom;
        villeSalle.textContent = salle.adresse.ville;
        capaciteSalle.textContent = salle.capacite;
        idSalle.textContent = salle.id;
        // Ajout du clone à la liste
        liste.appendChild(clone);
    });
}

// Fonction de création d'élément de formulaire pour chaque style
function creerElementFormulaireAvecStyle(style) {
    // Clonage du modèle pour chaque style
    var clone = document.importNode(templateFiltre.content, true);
    var inputStyle = clone.querySelector('input');
    var labelStyle = clone.querySelector('label');

    // Mise à jour des attributs et du texte avec les données du style
    inputStyle.name = style;
    inputStyle.value = style;
    inputStyle.dataset.style = style;
    labelStyle.textContent = style;

    // Ajout de l'élément <input> au label
    labelStyle.appendChild(inputStyle);

    // Ajout du clone au formulaire
    filtreForm.appendChild(clone);
}

// Fonction de récupération des styles sélectionnés dans le formulaire
function recupererStyleFlitre() {
    let tabStyleInput = filtreForm.querySelectorAll('[data-style]');
    tabStyle = [];
    tabStyleInput.forEach(element => {
        if (element.checked) {
            tabStyle.push(element.attributes.value.value);
        }
    });
}

// Fonction de gestion de la fermeture du filtre
function fermetureStyleFlitre() {
    if (btnFiltre.textContent == '<') {
        filtreOpen.style.display = 'none';
        btnFiltre.textContent = '>';
    } else {
        filtreOpen.style.display = '';
        btnFiltre.textContent = '<';
    }
}


function createAllPointsInMap(salles) {
    salles.forEach(salle => {
        let salleCoordinates = [salle.adresse.localisation.coordinates[0], salle.adresse.localisation.coordinates[1]];
        L.marker(salleCoordinates).addTo(markersLayer);
    });
}

function effacerMarqueurs() {
    if (markersLayer) {
        markersLayer.clearLayers();
    }
}
