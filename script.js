let selectedRestaurants = [];

        function goToStep2() {
            const date = document.getElementById('date').value;
            if (!date) {
                alert('Veuillez sélectionner une date!');
                return;
            }

            document.getElementById('step1').classList.remove('active');
            document.getElementById('step2').classList.add('active');
        }

        function toggleSelection(card, restaurant) {
            card.classList.toggle('selected');
            if (card.classList.contains('selected')) {
                selectedRestaurants.push(restaurant);
            } else {
                selectedRestaurants = selectedRestaurants.filter(r => r !== restaurant);
            }
        }

        function goToConfirmation() {
            if (selectedRestaurants.length === 0) {
                alert('Veuillez sélectionner au moins un restaurant!');
                return;
            }

            const date = document.getElementById('date').value;

            document.getElementById('selectedDate').textContent = date;
            document.getElementById('selectedRestaurants').textContent = selectedRestaurants.join(', ');
            document.getElementById('hiddenDate').value = date;
            document.getElementById('hiddenRestaurants').value = selectedRestaurants.join(', ');

            document.getElementById('step2').classList.remove('active');
            document.getElementById('confirmation').classList.add('active');
        }

        async function submitForm() {
            const date = document.getElementById('hiddenDate').value;
            const restaurants = document.getElementById('hiddenRestaurants').value;

            if (!date || !restaurants) {
                alert('Données manquantes. Veuillez compléter toutes les étapes.');
                return;
            }

            const formData = new FormData();
            formData.append('date', date);
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
                    document.getElementById('finalRestaurants').textContent = restaurants;

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