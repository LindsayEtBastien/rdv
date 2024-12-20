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

// Fonction pour sélectionner ou désélectionner une carte
function toggleActivity(card, activity, type) {
    const container = type === 'main' ? document.getElementById('mainActivityCards') 
                                      : document.getElementById('secondaryActivityCards');

    // Si la carte est déjà sélectionnée, la désélectionner
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        if (activity === 'Cinéma') resetCinemaOptions(type);
        if (type === 'main') selectedMainActivities = [];
        else selectedSecondaryActivities = [];
        return;
    }

    // Désélectionner toutes les autres cartes de la même section
    container.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));

    // Réinitialiser les options cinéma si on choisit une autre activité
    if (activity !== 'Cinéma') resetCinemaOptions(type);

    // Sélectionner la carte cliquée
    card.classList.add('selected');
    if (type === 'main') selectedMainActivities = [activity];
    else selectedSecondaryActivities = [activity];
}

// Fonction pour sélectionner une option cinéma
function selectCinemaOption(event, button, option, type) {
    event.stopPropagation(); // Empêche le clic de se propager à la carte

    // Récupérer la carte cinéma correspondante
    const cinemaCard = document.querySelector(
        type === 'main' ? '.card-cinema-main' : '.card-cinema-secondary'
    );

    if (!cinemaCard) {
        console.error(`Carte cinéma introuvable pour le type : ${type}`);
        return;
    }

    // Sélectionner automatiquement la carte cinéma si elle ne l'est pas déjà
    if (!cinemaCard.classList.contains('selected')) {
        toggleActivity(cinemaCard, 'Cinéma', type);
    }

    // Désélectionner toutes les options dans cette carte
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Sélectionner l'option cliquée
    button.classList.add('selected');
    selectedCinemaOption = { option, type };
    console.log(`Option Cinéma sélectionnée (${type}) : ${option}`);
}


// Réinitialiser les options cinéma
function resetCinemaOptions(type) {
    console.log(`Réinitialisation des options cinéma (${type}).`);
    const cinemaButtons = document.querySelectorAll(
        type === 'main' ? '.card-cinema-main .card-cinema-options button' 
                        : '.card-cinema-secondary .card-cinema-options button'
    );
    cinemaButtons.forEach(button => button.classList.remove('selected'));

    selectedCinemaOption = null;

    // Désélectionner la carte cinéma correspondante
    const cinemaCard = document.querySelector(
        type === 'main' ? '.card-cinema-main' : '.card-cinema-secondary'
    );
    if (cinemaCard) cinemaCard.classList.remove('selected');
}


//CARTES INPUT
// Ajouter une activité personnalisée
function addCustomActivity(button, type) {
    const inputField = button.parentElement.querySelector('input');
    if (!inputField) {
        console.error('Champ personnalisé introuvable.');
        return;
    }

    const activity = inputField.value.trim();
    if (activity === "") {
        alert("Veuillez entrer une activité.");
        return;
    }

    // Ajouter une activité personnalisée
    if (type === 'main') {
        selectedMainActivities = [activity];
        resetCinemaOptions('main'); // Réinitialiser cinéma si une activité personnalisée est ajoutée
    } else {
        selectedSecondaryActivities = [activity];
        resetCinemaOptions('secondary'); // Réinitialiser cinéma si une activité personnalisée est ajoutée
    }

    inputField.value = ""; // Réinitialiser le champ
    alert(`Activité "${activity}" ajoutée ). Tu peux cliquer sur le bouton "Suivant".`);
    console.log(`Activité personnalisée ajoutée (${type}) : ${activity}`);
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

/*MANGER*/
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
function goToComment() {
    if (selectedRestaurants.length === 0) {
        alert('Veuillez sélectionner au moins un restaurant!');
        return;
    }

    document.getElementById('step2').classList.remove('active');
    document.getElementById('commentSection').classList.add('active');
}

function goToConfirmationSansResto() {
    document.getElementById('manger').classList.remove('active');
    document.getElementById('commentSection').classList.add('active');
}

function afficherConfirmation() {
    const comment = document.getElementById('userComment').value.trim();

    // Stocker le commentaire dans une variable ou élément caché pour l'envoi par e-mail
    if (comment) {
        document.getElementById('hiddenComment').value = comment;
        alert("Ton commentaire est sauvegardé !");
    } else {
        alert("Pas de commentaire ajouté. Suivant !");
    }

    // Afficher la confirmation
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
        const cinemaOptionText = selectedCinemaOption ? ` (${selectedCinemaOption.option})` : '';
        const mainActivitiesText = selectedMainActivities.length > 0
            ? selectedMainActivities.map(activity =>
                activity === 'Cinéma' ? `Cinéma${cinemaOptionText}` : activity
              ).join(', ')
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
        document.getElementById('hiddenSecondaryActivities').value = secondaryActivitiesText;
    }

    // Restaurants
    if (restaurantElement) {
        const restaurantList = selectedRestaurants && selectedRestaurants.length > 0
            ? selectedRestaurants.join(', ')
            : "Aucun restaurant sélectionné";

        restaurantElement.textContent = restaurantList;
        document.getElementById('hiddenRestaurants').value = restaurantList;
    }

    console.log('Confirmation affichée :', {
        date,
        time,
        mainActivities: selectedMainActivities,
        cinemaOption: selectedCinemaOption,
        secondaryActivities: selectedSecondaryActivities,
        restaurants: selectedRestaurants
    });

    // Changer les sections actives
    const commentSection = document.getElementById('commentSection');
    const confirmationSection = document.getElementById('confirmation');
    if (commentSection) commentSection.classList.remove('active');
    if (confirmationSection) confirmationSection.classList.add('active');
}


//SUBMIT FORMULAIRE MAIL
async function submitForm() {
    const date = document.getElementById('hiddenDate').value;
    const time = document.getElementById('hiddenTime').value;
    const restaurants = document.getElementById('hiddenRestaurants').value;
    const comment = document.getElementById('hiddenComment').value;

    // Activité principale avec option cinéma (si applicable)
    const cinemaOptionText = selectedCinemaOption ? ` (${selectedCinemaOption.option})` : '';
    const mainActivities = selectedMainActivities.map(activity =>
        activity === 'Cinéma' ? `Cinéma${cinemaOptionText}` : activity
    ).join(', ');

    // Activité secondaire
    const secondaryActivities = selectedSecondaryActivities.join(', ');

    if (!date || !time || !mainActivities) {
        alert('Des données sont manquantes. Veuillez vérifier que toutes les étapes ont été complétées.');
        return;
    }

    const formData = new FormData();
    formData.append('date', `${date} à partir de ${time}`);
    formData.append('main_activities', mainActivities || 'Aucune activité principale sélectionnée');
    formData.append('secondary_activities', secondaryActivities || 'Aucune activité secondaire sélectionnée');
    formData.append('restaurants', restaurants || 'Aucun restaurant sélectionné');
    formData.append('comment', comment || 'Aucun commentaire');
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
            // Mettre à jour la section "thankYou" avec la date et l'heure sélectionnées
            const selectedDateElement = document.getElementById('selectedDate');
            if (selectedDateElement) {
                selectedDateElement.textContent = `${date} à ${time}`;
            }

            // Afficher la section "thankYou"
            document.getElementById('confirmation').classList.remove('active');
            const thankYouSection = document.getElementById('thankYou');
            if (thankYouSection) {
                thankYouSection.classList.add('active');
            } else {
                alert('Votre demande a été envoyée avec succès. Merci !');
            }
        } else {
            alert('Échec de l\'envoi. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}


