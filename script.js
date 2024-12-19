/*WELCOME*/
let selectedActivities = [];
function goToActivities() {
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('step0').classList.add('active');
}

/*DATE*/
function goToStep0() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!date || !time) {
        alert('Sélectionne une date et une heure.');
        return;
    }
    //stock dans des champs cachés
    document.getElementById('hiddenDate').value = date;
    document.getElementById('hiddenTime').value = time;

    document.getElementById('step0').classList.remove('active');
    document.getElementById('step1_1').classList.add('active');
    }

/*ACTIVITES*/
let selectedMainActivities = [];
let selectedSecondaryActivities = [];

// Fonction pour sélectionner/désélectionner des activités
function toggleActivity(card, activity, type) {
    // Sélectionner le conteneur correspondant (main ou secondary)
    const container = type === 'main' ? document.getElementById('mainActivityCards') 
                                      : document.getElementById('secondaryActivityCards');

    // Désélectionner toutes les autres cartes de la même section
    container.querySelectorAll('.card').forEach(c => {
        c.classList.remove('selected');
    });

    // Vider les tableaux des activités déjà sélectionnées dans la section
    if (type === 'main') {
        selectedMainActivities = [];
    } else if (type === 'secondary') {
        selectedSecondaryActivities = [];
    }

    // Ajouter la nouvelle activité sélectionnée
    card.classList.add('selected');
    if (type === 'main') {
        selectedMainActivities.push(activity);
    } else if (type === 'secondary') {
        selectedSecondaryActivities.push(activity);
    }
}

//CARTES CINEMA
let selectedCinemaOption = null;
function selectCinemaOption(button, option) {
    // Désélectionner tous les boutons dans la carte Cinéma
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Sélectionner le bouton cliqué
    button.classList.add('selected');

    // Stocker l'option sélectionnée
    selectedCinemaOption = option;
}


// Fonction pour ajouter une activité personnalisée
function addCustomActivity(type) {
    const inputField = type === 'main' ? document.getElementById('customMainActivity') : document.getElementById('customSecondaryActivity');
    const activity = inputField.value.trim();

    if (activity !== "") {
        if (type === 'main') {
            selectedMainActivities.push(activity);
            alert(`Activité principale "${activity}" ajoutée`);
            goToStep1_2(); // Aller à l'étape suivante
        } else if (type === 'secondary') {
            selectedSecondaryActivities.push(activity);
            alert(`Activité secondaire "${activity}" ajoutée`);
            goToStep2(); // Aller à l'étape suivante
        }
        inputField.value = ""; // Réinitialise l'input
    } else {
        alert("Veuillez entrer une activité.");
    }
}


// Valider les activités principales et passer à l'étape secondaire
function goToStep1_2() {
    if (selectedMainActivities.length === 0) {
        alert('Veuillez sélectionner au moins une activité principale!');
        return;
    }
    if (selectedMainActivities.includes('Cinéma') && !selectedCinemaOption) {
        alert('Veuillez sélectionner une option pour le cinéma.');
        return;
    }
    // Retourner en haut de la page
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Défilement fluide
    });

    document.getElementById('step1_1').classList.remove('active');
    document.getElementById('step1_2').classList.add('active');
}

// Valider les activités secondaires et passer à l'étape suivante
function goToStep2() {
    if (selectedSecondaryActivities.length === 0) {
        alert('Veuillez sélectionner au moins une activité secondaire!');
        return;
    }
    if (selectedSecondaryActivities.includes('Cinéma') && !selectedCinemaOption) {
        alert('Veuillez sélectionner une option pour le cinéma.');
        return;
    }
    // Retourner en haut de la page
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Défilement fluide
    });
    
    document.getElementById('step1_2').classList.remove('active');
    document.getElementById('manger').classList.add('active');
}

/*Manger*/
function goToRestaurant() {
    document.getElementById('manger').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

/*RESTAURANTS*/
let selectedRestaurants = [];
function toggleSelection(card, restaurant) {
    card.classList.toggle('selected');
    if (card.classList.contains('selected')) {
        selectedRestaurants.push(restaurant);
    } else {
        selectedRestaurants = selectedRestaurants.filter(r => r !== restaurant);
    }
}

/* CONFIRMATION */
function goToConfirmation() {
    if (selectedRestaurants.length === 0) {
        alert('Veuillez sélectionner au moins un restaurant!');
        return;
    }

    afficherConfirmation(); // Appelle une fonction commune pour afficher les données
    document.getElementById('step2').classList.remove('active');
    document.getElementById('confirmation').classList.add('active');
}

function goToConfirmationSansResto() {
    afficherConfirmation(); // Affiche la confirmation sans forcer la sélection des restaurants
    document.getElementById('manger').classList.remove('active');
    document.getElementById('confirmation').classList.add('active');
}

function afficherConfirmation() {
    const date = document.getElementById('date').value;
    const dateElement = document.getElementById('selectedDate');
    const mainElement = document.getElementById('selectedMainActivities');
    const secondaryElement = document.getElementById('selectedSecondaryActivities');
    const restaurantElement = document.getElementById('selectedRestaurants');

    document.getElementById('selectedDate').textContent = date;

    // Afficher la date uniquement si l'élément existe
    if (dateElement) {
        dateElement.textContent = date || "Aucune date sélectionnée";
    }

    // Activité principale
    if (mainElement) {
        mainElement.textContent = selectedMainActivities.length > 0
            ? selectedMainActivities.join(', ')
            : "Aucune activité principale sélectionnée";
    }

    // Activité secondaire
    if (secondaryElement) {
        secondaryElement.textContent = selectedSecondaryActivities.length > 0
            ? selectedSecondaryActivities.join(', ')
            : "Aucune activité secondaire sélectionnée";
    }

    // Restaurants
    if (restaurantElement) {
        restaurantElement.textContent = selectedRestaurants.length > 0
            ? selectedRestaurants.join(', ')
            : "Aucun restaurant sélectionné";
    }
}

/* SUBMIT FORMULAIRE */
async function submitForm() {
    const date = document.getElementById('hiddenDate').value;
    const time = document.getElementById('hiddenTime').value;
    const restaurants = document.getElementById('hiddenRestaurants').value;
    const activities = document.getElementById('selectedActivities').textContent;

    const cinemaOption = selectedCinemaOption ? `Cinéma (${selectedCinemaOption})` : 'Cinéma (aucune option sélectionnée)';


    if (!date || !time || !activities) {
        alert('Des données sont manquantes. Rafraichit et complète toutes les étapes.');
        return;
    }

    const formData = new FormData();
    formData.append('date', `${date} à partir de ${time}`);
    formData.append('activities', activities.includes('Cinéma') ? `${activities}, ${cinemaOption}` : activities);
    formData.append('restaurants', restaurants);
    formData.append('_subject', 'Rencard avec Lily');

    try {
        const response = await fetch('https://formspree.io/f/mzzbqwjb', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            document.getElementById('finalDate').textContent = date;
            document.getElementById('finalRestaurants').textContent = restaurants || 'Aucun restaurant sélectionné';
            document.getElementById('finalActivities').textContent = activities.includes('Cinéma') ? `${activities}, ${cinemaOption}` : activities;
            
            document.getElementById('confirmation').classList.remove('active');
            document.getElementById('thankYou').classList.add('active');
        } else {
            alert('Échec de l\'envoi de votre soumission. Veuillez réessayer plus tard.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
}
