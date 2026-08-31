const info = document.querySelector('.info');
const fenetre = document.getElementById("fenetre"); // champ résultat

// paramètres globaux
let enableGraph = true;
let enableSound = true;

// Ajouter une valeur dans la fenêtre
function val(resultat) {
  fenetre.value += resultat;
  playSound("click");
}

// Calculer l'expression
function calcul() {
  try {
    fenetre.value = eval(fenetre.value);
    info.innerText = "";
    playSound("success");
  } catch {
    info.innerText = "Expression invalide";
    playSound("error");
  }
}

// Effacer tout
function suppr() {
  fenetre.value = "";
  info.innerText = "";
}

// Effacer un caractère
function backspace() {
  fenetre.value = fenetre.value.slice(0, -1);
}

// Fonctions scientifiques
function sinus() { if (fenetre.value) fenetre.value = Math.sin(parseFloat(fenetre.value)); }
function cosinus() { if (fenetre.value) fenetre.value = Math.cos(parseFloat(fenetre.value)); }
function tangente() { if (fenetre.value) fenetre.value = Math.tan(parseFloat(fenetre.value)); }
function racine() { if (fenetre.value) fenetre.value = Math.sqrt(parseFloat(fenetre.value)); }
function logarithme() { if (fenetre.value) fenetre.value = Math.log(parseFloat(fenetre.value)); }
function puissance2() { if (fenetre.value) fenetre.value = Math.pow(parseFloat(fenetre.value), 2); }
function inverse() { if (fenetre.value) fenetre.value = 1 / parseFloat(fenetre.value); }
function pourcentage() { if (fenetre.value) fenetre.value = parseFloat(fenetre.value) / 100; }

// 🎤 Mode vocal
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "fr-FR";
  recognition.onresult = e => fenetre.value = e.results[0][0].transcript;
  recognition.start();
}

// 📈 Tracé de courbes
function plotFunction(label, func, color) {
  if (!enableGraph) return; // paramètre désactivé
  const ctx = document.getElementById('graph').getContext('2d');
  const dataX = [], dataY = [];
  for (let x = 0; x <= 360; x += 10) {
    dataX.push(x);
    dataY.push(func(x));
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataX,
      datasets: [{ label, data: dataY, borderColor: color, fill: false }]
    }
  });
}
function plotSin() { plotFunction("sin(x)", x => Math.sin(x * Math.PI / 180), "orange"); }
function plotCos() { plotFunction("cos(x)", x => Math.cos(x * Math.PI / 180), "blue"); }
function plotTan() { plotFunction("tan(x)", x => Math.tan(x * Math.PI / 180), "green"); }

// 🔊 Effets audio
function playSound(type) {
  if (!enableSound) return; // paramètre désactivé
  let audio;
  if (type === "click") audio = new Audio("click.mp3");
  else if (type === "success") audio = new Audio("success.mp3");
  else if (type === "error") audio = new Audio("error.mp3");
  if (audio) audio.play();
}
