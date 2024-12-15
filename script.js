document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const chatBox = document.getElementById('chat-box');
    const inputBox = document.getElementById('input-box');
    let lastSender = null; // Permet de suivre le dernier expéditeur de message

    startButton.addEventListener('click', startConversation);

    function startConversation() {
        // Effacer le bouton de départ
        inputBox.innerHTML = '';

        // Ajouter le premier message
        displayMessage('Bienvenue ! 👋 Avez-vous besoin d\'aide concernant un produit ou une commande ?', 'bot');

        setTimeout(() => {
            displayOptions(['Infos de paiement 💳', 'Expédition 🚚', 'Retour & Réclamations 🔙', 'Guide d\'achat 🔍', 'Statut de commande ✅']);
        }, 1000);
    }

    function displayMessage(text, sender) {
        // Ajouter un indicateur de chargement pour le bot
        if (sender === 'bot') {
            showLoadingIndicator();

            // Délai pour simuler un temps de réponse
            setTimeout(() => {
                removeLoadingIndicator();
                addMessage(text, sender);
            }, 1000); // Ajustez le délai si nécessaire
        } else {
            addMessage(text, sender); // Ajouter directement les messages utilisateur
        }
    }

    function showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot loading';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.textContent = 'Le bot écrit...';
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeLoadingIndicator() {
        const loadingDiv = document.getElementById('loading-indicator');
        if (loadingDiv) {
            chatBox.removeChild(loadingDiv);
        }
    }

    function addMessage(text, sender) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message-container ${sender}`;

        // Ajouter l'icône de profil uniquement si le dernier message ne provient pas du même expéditeur
        if (lastSender !== sender) {
            const profilePic = document.createElement('img');
            profilePic.className = 'profile-pic';
            profilePic.src = sender === 'bot' ? 'imgs/bot.png' : 'imgs/lily_40x40.jpeg'; // Chemin vers les images
            profilePic.alt = sender === 'bot' ? 'Bot' : 'Utilisateur';
            messageContainer.appendChild(profilePic);
            lastSender = sender; // Mettre à jour l'expéditeur
        }

        // Ajouter le texte du message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messageContainer.appendChild(messageDiv);

        // Ajouter le conteneur complet au chat
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function displayOptions(options) {
        inputBox.innerHTML = ''; // Réinitialiser les options AVANT d'en ajouter
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleUserChoice(option));
            inputBox.appendChild(button);
        });
    }

    function handleUserChoice(choice) {
        displayMessage(choice, 'user'); // Afficher le choix de l'utilisateur
        inputBox.innerHTML = ''; // Effacer les boutons AVANT d'afficher une nouvelle réponse

        setTimeout(() => {
            let response;
            if (choice.includes('Paiement')) {
                response = 'Les informations de paiement incluent les cartes VISA, Mastercard et PayPal.';
            } else if (choice.includes('Expédition')) {
                response = 'Nos délais de livraison sont de 3 à 5 jours ouvrés.';
            } else if (choice.includes('Retour')) {
                response = 'Vous pouvez effectuer un retour sous 30 jours après réception.';
            } else if (choice.includes('Guide')) {
                response = 'Le guide d\'achat vous aide à choisir les meilleurs produits pour vos besoins.';
            } else if (choice.includes('Statut')) {
                response = 'Veuillez entrer votre numéro de commande pour suivre votre statut.';
            }

            displayMessage(response, 'bot');

            // Afficher le menu de retour proprement
            setTimeout(() => {
                if (choice.includes('Retourner')) {
                    chatBox.innerHTML = ''; // Nettoyer complètement le chat pour éviter les doublons
                    startConversation();    // Relancer le menu principal
                } else {
                    displayOptions(['Retourner au menu 🔄']); // Afficher l'option de retour
                }
            }, 1000);

        }, 1000);
    }
});
