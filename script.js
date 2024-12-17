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
    document.getElementById('step1').classList.add('active');
    }

/*ACTIVITES*/
function toggleActivity(card, activity) {
    card.classList.toggle('selected');
    if (card.classList.contains('selected')) {
        selectedActivities.push(activity);
    } else {
        selectedActivities = selectedActivities.filter(a => a !== activity);
    }
}

function goToStep1() {
    if (selectedActivities.length === 0) {
        alert('Veuillez sélectionner au moins une activité!');
        return;
    }

    document.getElementById('step1').classList.remove('active');
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

    // Afficher la date
    document.getElementById('selectedDate').textContent = date;
    document.getElementById('hiddenDate').value = date;

    // Afficher les activités sélectionnées
    const activities = selectedActivities.join(', ');
    document.getElementById('selectedActivities').textContent = activities;

    // Afficher les restaurants sélectionnés uniquement s'ils existent
    if (selectedRestaurants.length > 0) {
        document.getElementById('selectedRestaurants').textContent = selectedRestaurants.join(', ');
        document.getElementById('hiddenRestaurants').value = selectedRestaurants.join(', ');
    } else {
        document.getElementById('selectedRestaurants').textContent = 'Aucun restaurant sélectionné';
        document.getElementById('hiddenRestaurants').value = '';
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
