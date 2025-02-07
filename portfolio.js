function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');

    // Création du radar chart avec Chart.js
    new Chart(ctx, config);
}

// Couleur de ligne par dataset
function getLineColor(ctx) {
    return Utils.color(ctx.datasetIndex);
}

// Alterner les styles des points
function alternatePointStyles(ctx) {
    const index = ctx.dataIndex;
    return index % 2 === 0 ? 'circle' : 'rect';
}
// Modifier l’opacité des éléments : Diminue l’opacité de la couleur de ligne.
function makeHalfAsOpaque(ctx) {
    return Utils.transparentize(getLineColor(ctx));
}
// Modifier l’opacité des éléments : Rend la couleur 20% opaque (ajoute de la transparence).
function make20PercentOpaque(ctx) {
    return Utils.transparentize(getLineColor(ctx), 0.8);
}
// Ajuster le rayon des points en fonction des valeurs
function adjustRadiusBasedOnData(ctx) {
    const v = ctx.parsed.y;
    return v < 10 ? 5
        : v < 25 ? 7
            : v < 50 ? 9
                : v < 75 ? 11
                    : 15;
}

const data = {
    labels: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Angular', 'Swift', 'R', 'Python', 'SQL', 'Java', 'Smalltalk'],
    datasets: [{
        label: "Mes compétences",
        data: [80, 80, 70, 60, 40, 40, 20, 50, 60, 75, 60, 50], // Valeurs de compétences
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1
    }]
};

const config = {
    type: 'radar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true, // Active l'affichage des tooltips
                callbacks: {
                    label: function (context) {
                        const label = context.chart.data.labels[context.dataIndex]; // Récupère le nom de la compétence
                        const value = context.raw; // Récupère la valeur associée
                        return `${value}`; // Affiche "Nom de la compétence: Valeur"
                    }
                }
            }
        },
        elements: {
            line: {
                backgroundColor: make20PercentOpaque,
                borderColor: getLineColor,
            },
            point: {
                backgroundColor: getLineColor,
                hoverBackgroundColor: makeHalfAsOpaque,
                radius: adjustRadiusBasedOnData,
                pointStyle: alternatePointStyles,
                hoverRadius: 15,
            }
        }
    }
};


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