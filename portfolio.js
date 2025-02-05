// Fonction pour initialiser le radar chart
function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const data = {
        labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'SQL'], // Les compétences à afficher
        datasets: [{
            label: 'Mes compétences',
            data: [80, 80, 70, 50, 60, 75], // Les valeurs de compétences
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderColor: 'rgba(63, 81, 181, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        scale: {
            ticks: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

// Fonction pour afficher ou masquer le radar chart
function toggleChart(chartType) {
    const radarSection = document.getElementById('radar');
    const progressSection = document.getElementById('competences');

    if (chartType === 'radar') {
        radarSection.style.display = 'block';
        progressSection.style.display = 'none';
        initRadarChart(); // Initialise le radar chart
    } else {
        radarSection.style.display = 'none';
        progressSection.style.display = 'block';
    }
}

// L'appel initial pour afficher les progress bars par défaut
toggleChart('progress');
