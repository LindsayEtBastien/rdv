/*WELCOME*/
let selectedActivities = [];
function goToActivities() {
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('step0').classList.add('active');
}

/*DATE*/
function goToStep0() {
    const date = document.getElementById('date').value;
    if (!date) {
        alert('Veuillez sélectionner une date!');
        return;
    }

    document.getElementById('step0').classList.remove('active');
    document.getElementById('step1_1').classList.add('active');
    }

/*ACTIVITES*/
let selectedMainActivities = [];
let selectedSecondaryActivities = [];

// Fonction pour sélectionner/désélectionner des activités
function toggleActivity(card, activity, type) {
    card.classList.toggle('selected');

    if (type === 'main') { // Gestion des activités principales
        if (card.classList.contains('selected')) {
            selectedMainActivities.push(activity);
        } else {
            selectedMainActivities = selectedMainActivities.filter(a => a !== activity);
        }
    } else if (type === 'secondary') { // Gestion des activités secondaires
        if (card.classList.contains('selected')) {
            selectedSecondaryActivities.push(activity);
        } else {
            selectedSecondaryActivities = selectedSecondaryActivities.filter(a => a !== activity);
        }
    }
}

// Fonction pour ajouter une activité personnalisée
function addCustomActivity(type) {
    const inputId = type === 'main' ? 'customMainActivity' : 'customSecondaryActivity';
    const input = document.getElementById(inputId);
    const activity = input.value.trim();

    if (activity) {
        if (type === 'main') {
            selectedMainActivities.push(activity);
        } else {
            selectedSecondaryActivities.push(activity);
        }
        input.value = ''; // Réinitialiser l'input
        alert(`Activité ajoutée : ${activity}`);
    }
}

// Valider les activités principales et passer à l'étape secondaire
function goToStep1_2() {
    if (selectedMainActivities.length === 0) {
        alert('Veuillez sélectionner au moins une activité!');
        return;
    }

    document.getElementById('step1_1').classList.remove('active');
    document.getElementById('step1_2').classList.add('active');
}

// Valider les activités secondaires et passer à l'étape suivante
function goToStep2() {
    if (selectedSecondaryActivities.length === 0) {
        alert('Veuillez sélectionner au moins une activité!');
        return;
    }

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

    document.getElementById('selectedDate').textContent = date;

    // Afficher les activités principales et secondaires
    document.getElementById('selectedMainActivities').textContent = selectedMainActivities.join(', ');
    document.getElementById('selectedSecondaryActivities').textContent = selectedSecondaryActivities.join(', ');

    // Afficher les restaurants sélectionnés (si existants)
    if (selectedRestaurants.length > 0) {
        document.getElementById('selectedRestaurants').textContent = selectedRestaurants.join(', ');
    } else {
        document.getElementById('selectedRestaurants').textContent = 'Aucun restaurant sélectionné';
    }
}

/* SUBMIT FORMULAIRE */
async function submitForm() {
    const date = document.getElementById('hiddenDate').value;
    const restaurants = document.getElementById('hiddenRestaurants').value;
    const activities = document.getElementById('selectedActivities').textContent;

    if (!date || !activities) {
        alert('Données manquantes. Veuillez compléter toutes les étapes.');
        return;
    }

    const formData = new FormData();
    formData.append('date', date);
    formData.append('activities', activities);
    formData.append('restaurants', restaurants);
    formData.append('_subject', 'Nouvelle soumission de date!');

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
