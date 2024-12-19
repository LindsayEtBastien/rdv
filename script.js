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
let selectedCinemaOption = null;

// Fonction pour sélectionner/désélectionner des activités
function toggleActivity(card, activity, type) {
    // Sélectionner le conteneur correspondant (main ou secondary)
    const container = type === 'main' ? document.getElementById('mainActivityCards') 
                                      : document.getElementById('secondaryActivityCards');

    // Désélectionner toutes les autres cartes de la même section
    container.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));

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

        // Si l'activité sélectionnée n'est pas "Cinéma", réinitialiser les options cinéma
        if (activity !== 'Cinéma') {
            resetCinemaOptions();
        } 
    } else if (type === 'secondary') {
        selectedSecondaryActivities.push(activity);
    }
}

// Fonction pour gérer les options cinéma
function selectCinemaOption(event, button, option) {
    event.stopPropagation(); // Empêche l'événement de se propager au conteneur parent

    // Vérifier si la carte cinéma est bien sélectionnée
    const cinemaCard = document.querySelector('.card-cinema');
    if (!cinemaCard || !cinemaCard.classList.contains('selected')) {
        alert('Veuillez d\'abord sélectionner la carte Cinéma.');
        return;
    }

    // Désélectionner tous les boutons dans la carte cinéma
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Sélectionner le bouton cliqué
    button.classList.add('selected');

    // Stocker l'option sélectionnée
    selectedCinemaOption = option;
}

// Réinitialiser les options cinéma
function resetCinemaOptions() {
    const cinemaButtons = document.querySelectorAll('.card-cinema-options button');
    cinemaButtons.forEach(button => button.classList.remove('selected'));
    selectedCinemaOption = null;
}


//CARTES INPUT
function addCustomActivity(button, type) {
    // Trouve le champ d'entrée dans le même parent que le bouton
    const inputField = button.parentElement.querySelector('input');
    if (!inputField) {
        console.error('Impossible de trouver le champ d\'entrée.');
        return;
    }

    const activity = inputField.value.trim();

    if (activity !== "") {
        if (type === 'main') {
            selectedMainActivities.push(activity);
            alert(`Activité principale "${activity}" ajoutée.`);
            goToStep1_2(); // Aller à l'étape suivante
        } else if (type === 'secondary') {
            selectedSecondaryActivities.push(activity);
            alert(`Activité secondaire "${activity}" ajoutée.`);
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

// Fonction pour ajouter un restaurant personnalisé
function addCustomRestaurant() {
    const input = document.getElementById('customRestaurant');
    const customRestaurant = input.value.trim(); // Récupérer et nettoyer la valeur entrée

    if (!customRestaurant) {
        alert('Veuillez écrire un nom de restaurant avant d\'envoyer.');
        return;
    }

    // Ajouter le restaurant personnalisé à la liste des restaurants
    selectedRestaurants.push(customRestaurant);

    // Réinitialiser l'entrée utilisateur
    input.value = '';

    // Mettre à jour l'affichage des restaurants sélectionnés
    updateSelectedRestaurants();

    alert(`${customRestaurant}" a été ajouté à votre liste.`);
}

// Fonction pour mettre à jour l'affichage des restaurants sélectionnés
function updateSelectedRestaurants() {
    const restaurantElement = document.getElementById('selectedRestaurants');
    if (restaurantElement) {
        restaurantElement.textContent = selectedRestaurants.length > 0
            ? selectedRestaurants.join(', ')
            : "Aucun restaurant sélectionné";
    }

    // Mettre également à jour le champ caché pour l'envoi du formulaire
    const hiddenRestaurants = document.getElementById('hiddenRestaurants');
    if (hiddenRestaurants) {
        hiddenRestaurants.value = selectedRestaurants.join(', ');
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


//AFFICHER CONFIRMATION AVANT ENVOI
function afficherConfirmation() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const dateElement = document.getElementById('selectedDate');
    const mainElement = document.getElementById('selectedMainActivities');
    const secondaryElement = document.getElementById('selectedSecondaryActivities');
    const restaurantElement = document.getElementById('selectedRestaurants');

    // Afficher la date
    if (dateElement) {
        dateElement.textContent = date ? `${date} à partir de ${time}` : "Aucune date sélectionnée";
        document.getElementById('hiddenDate').value = date;
        document.getElementById('hiddenTime').value = time;
    }

    // Activité principale
    if (mainElement) {
        const cinemaOption = selectedCinemaOption ? ` (${selectedCinemaOption})` : '';
        const mainActivitiesText = selectedMainActivities.length > 0
            ? selectedMainActivities.map(activity => (activity === 'Cinéma' ? `Cinéma${cinemaOption}` : activity)).join(', ')
            : "Aucune activité principale sélectionnée";

        mainElement.textContent = mainActivitiesText;
        document.getElementById('hiddenActivities').value = mainActivitiesText;
    }

    // Activité secondaire
    if (secondaryElement) {
        const secondaryActivitiesText = selectedSecondaryActivities.length > 0
            ? selectedSecondaryActivities.join(', ')
            : "Aucune activité secondaire sélectionnée";

        secondaryElement.textContent = secondaryActivitiesText;
    }

    // Restaurants
    if (restaurantElement) {
        const restaurantList = selectedRestaurants && selectedRestaurants.length > 0
            ? selectedRestaurants.join(', ')
            : "Aucun restaurant sélectionné";

        restaurantElement.textContent = restaurantList;
        document.getElementById('hiddenRestaurants').value = restaurantList;
    }
}

//SUBMIT FORMULAIRE MAIL
async function submitForm() {
    const date = document.getElementById('hiddenDate').value;
    const time = document.getElementById('hiddenTime').value;
    const restaurants = document.getElementById('hiddenRestaurants').value;

    // Gestion des activités principales et options cinéma
    const mainActivities = selectedMainActivities.map(activity => 
        activity === 'Cinéma' && selectedCinemaOption ? `Cinéma (${selectedCinemaOption})` : activity
    ).join(', '); // Concaténer les activités principales

    // Gestion des activités secondaires
    const secondaryActivities = selectedSecondaryActivities.join(', ');

    // Validation des données
    if (!date || !time || !mainActivities) {
        alert('Des données sont manquantes. Veuillez vérifier que toutes les étapes ont été complétées.');
        return;
    }

    // Formulaire avec des champs distincts
    const formData = new FormData();
    formData.append('date', `${date} à partir de ${time}`);
    formData.append('main_activities', mainActivities || 'Aucune activité principale sélectionnée');
    formData.append('secondary_activities', secondaryActivities || 'Aucune activité secondaire sélectionnée');
    formData.append('restaurants', restaurants || 'Aucun restaurant sélectionné');
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
            document.getElementById('confirmation').classList.remove('active');
            const thankYouSection = document.getElementById('thankYou');
            const thankYouVideo = document.getElementById('thankYouVideo'); // Récupère la vidéo
        
            if (thankYouSection) {
                thankYouSection.classList.add('active');
        
                // Lecture automatique de la vidéo
                if (thankYouVideo) {
                    thankYouVideo.muted = false; // Active le son
                    thankYouVideo.play().catch(error => {
                        console.error('Erreur lors de la lecture de la vidéo :', error);
                    });
                }
            } else {
                alert('Votre demande a été envoyée avec succès. Merci !');
            }
        }
}
