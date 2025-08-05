
function spin() {
  const boxes = document.querySelectorAll('.choice-box');
  // Reihenfolge: zuerst das letzte, dann das erste, dann das mittlere Bild
  // Index: 2 (letztes), 0 (erstes), 1 (mittleres)
  const spinOrder = [2, 0, 1];
  const spinDuration = [];
  spinOrder.forEach((_, i) => spinDuration[i] = 1200 + i * 600);
  const intervalTime = 60; // ms, wie schnell die Bilder wechseln
  let intervals = [];
  let finished = 0;

  // Für jede Box eine Animation starten
  boxes.forEach((box, idx) => {
    let count = 0;
    intervals[idx] = setInterval(() => {
      // Zufällige Legende für Animation
      const legend = legends[Math.floor(Math.random() * legends.length)];
      const img = box.querySelector('img.choice-img');
      const name = box.querySelector('p.choice-name');
      img.src = legend.img;
      img.alt = legend.name;
      name.textContent = legend.name;
      count++;
    }, intervalTime);
  });

  // Nach Ablauf der Zeit für jede Box das finale Bild setzen
  // Die finalen Legenden werden vorher zufällig und eindeutig gewählt
  const legendsCopy = legends.slice();
  for (let i = legendsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [legendsCopy[i], legendsCopy[j]] = [legendsCopy[j], legendsCopy[i]];
  }
  const selected = legendsCopy.slice(0, 3);

  // Die Boxen in der gewünschten Reihenfolge stoppen
  spinOrder.forEach((boxIdx, i) => {
    setTimeout(() => {
      clearInterval(intervals[boxIdx]);
      const legend = selected[boxIdx];
      const box = boxes[boxIdx];
      const img = box.querySelector('img.choice-img');
      const name = box.querySelector('p.choice-name');
      img.src = legend.img;
      img.alt = legend.name;
      name.textContent = legend.name;
    }, spinDuration[i]);
  });
}