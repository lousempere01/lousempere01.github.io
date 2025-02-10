// By Lou SEMPERE

// RADAR CHART
function initRadarChart() {
    const ctx = document.getElementById("radarChart").getContext("2d");

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
    return index % 2 === 0 ? "circle" : "rect";
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
    return v < 10 ? 5 : v < 25 ? 7 : v < 50 ? 9 : v < 75 ? 11 : 15;
}

const data = {
    labels: [
        "HTML",
        "CSS",
        "Bootstrap",
        "JavaScript",
        "React",
        "Angular",
        "Swift",
        "R",
        "Python",
        "SQL",
        "Java",
        "Smalltalk",
    ],
    datasets: [
        {
            label: "Mes compétences",
            data: [80, 80, 70, 60, 40, 40, 20, 50, 60, 75, 60, 50], // Valeurs de compétences
            backgroundColor: "rgba(150, 205, 227, 0.2)",
            borderColor: "rgb(79, 211, 223)",
            borderWidth: 1,
        },
    ],
};

const config = {
    type: "radar",
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
                    },
                },
            },
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
            },
        },
    },
};

// Fonction pour afficher ou masquer le radar chart
function toggleChart(chartType) {
    const radarSection = document.getElementById("radar");
    const progressSection = document.getElementById("competences");

    if (chartType === "radar") {
        radarSection.style.display = "block";
        progressSection.style.display = "none";
        initRadarChart(); // Initialise le radar chart
    } else {
        radarSection.style.display = "none";
        progressSection.style.display = "block";
    }
}

// L'appel initial pour afficher les progress bars par défaut
toggleChart("progress");

// EMAIL JS
// Initialisation du SDK EmailJS
(function () {
    emailjs.init("7CJmmri8Va1zI95M7");
})();

// Gestionnaire d'évenement pour le formulaire de contact
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // empêche le rechargement de la page

        const serviceID = "service_qf7npwb";
        const templateID = "contact_form";

        emailjs.sendForm(serviceID, templateID, this).then(
            () => {
                alert("Votre message a été envoyé avec succès !");
                this.reset(); // Réinitialise le formulaire
            },
            (err) => {
                alert(
                    "Une erreur est survenue lors de l'envoi de votre message : " +
                    JSON.stringify(err)
                );
            }
        );
    });
});

// LEAFLET
// Initialisation de la carte
var map = L.map("map").setView([48.8566, 2.3522], 5); // Coordonnées de Paris avec un zoom de 5

// Ajout d'une couche de tuiles OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Ajout de marqueurs pour chaque lieu visité
var lieux = [
    { nom: "Djerba, Tunisie", coordonnees: [33.8, 10.9] },
    { nom: "Martinique", coordonnees: [14.6667, -61.0] },
    { nom: "La Réunion", coordonnees: [-21.1151, 55.5364] },
    { nom: "Marie-Galante, Guadeloupe", coordonnees: [15.9333, -61.2667] },
    { nom: "Majorque, Espagne", coordonnees: [39.6953, 3.0176] },
    { nom: "Minorque, Espagne", coordonnees: [39.9496, 4.1103] },
    { nom: "Crète, Grèce", coordonnees: [35.2401, 24.8093] },
    { nom: "Lanzarote, Espagne", coordonnees: [29.0469, -13.5899] },
    { nom: "Lisbonne, Portugal", coordonnees: [38.7167, -9.1333] },
    { nom: "Barcelone, Espagne", coordonnees: [41.3888, 2.159] },
    { nom: "Londres, Royaume-Uni", coordonnees: [51.5074, -0.1278] },
    { nom: "Venise, Italie", coordonnees: [45.434, 12.3388] },
    { nom: "Rome, Italie", coordonnees: [41.9028, 12.4964] },
    { nom: "Marrakech, Maroc", coordonnees: [31.6295, -7.9811] }
];

lieux.forEach(function (lieu) {
    L.marker(lieu.coordonnees).addTo(map).bindPopup(lieu.nom);
});

// Fonction pour redimensionner la carte lorsque la modale est affichée
$("#mapModal").on("shown.bs.modal", function () {
    setTimeout(function () {
        map.invalidateSize();
    }, 10);
});

// SLICK
// Assurez-vous que le DOM est complètement chargé avant d'appliquer Slick
document.addEventListener("DOMContentLoaded", function () {
    // Initialisation de Slick.js
    $("#projectCarousel").slick({
        infinite: true, // Pour que le carrousel recommence depuis le début une fois arrivé à la fin
        slidesToShow: 4, // Affiche 4 projets en même temps
        slidesToScroll: 1, // Défile un projet à la fois
        autoplay: true, // Active le défilement automatique
        autoplaySpeed: 3000, // Temps de pause entre chaque slide (en ms)
        arrows: true, // Affiche les flèches pour la navigation
        dots: true, // Affiche des points de navigation sous le carrousel
        responsive: [
            {
                breakpoint: 1024, // Lorsque la largeur de l'écran est inférieure à 1024px
                settings: {
                    slidesToShow: 3, // Affiche 3 projets
                },
            },
            {
                breakpoint: 768, // Lorsque la largeur de l'écran est inférieure à 768px
                settings: {
                    slidesToShow: 2, // Affiche 2 projets
                },
            },
            {
                breakpoint: 480, // Lorsque la largeur de l'écran est inférieure à 480px
                settings: {
                    slidesToShow: 1, // Affiche 1 projet
                },
            },
        ],
    });
});