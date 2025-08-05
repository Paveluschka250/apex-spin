function spin() {
  // Hole alle choice-boxen
  const boxes = document.querySelectorAll('.choice-box');
  // Erstelle eine Kopie der Legenden
  const legendsCopy = legends.slice();
  // Mische die Legenden zufällig
  for (let i = legendsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [legendsCopy[i], legendsCopy[j]] = [legendsCopy[j], legendsCopy[i]];
  }
  // Nimm die ersten 3 Legenden
  const selected = legendsCopy.slice(0, 3);
  // Aktualisiere die choice-boxen
  boxes.forEach((box, idx) => {
    const legend = selected[idx];
    const img = box.querySelector('img.choice-img');
    const name = box.querySelector('p.choice-name');
    if (legend && img && name) {
      img.src = legend.img;
      img.alt = legend.name;
      name.textContent = legend.name;
    }
  });
}