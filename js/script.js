
function spin() {
  const boxes = document.querySelectorAll('.choice-box');
  const weaponBoxes = document.querySelectorAll('.weapon-box');
  // Reihenfolge: zuerst das letzte, dann das erste, dann das mittlere Bild
  const spinOrder = [2, 0, 1];
  const spinDuration = [];
  spinOrder.forEach((_, i) => spinDuration[i] = 1200 + i * 600);
  const intervalTime = 60;
  let intervals = [];

  // Animation für Legenden
  boxes.forEach((box, idx) => {
    intervals[idx] = setInterval(() => {
      const legend = legends[Math.floor(Math.random() * legends.length)];
      const img = box.querySelector('img.choice-img');
      const name = box.querySelector('p.choice-name');
      img.src = legend.img;
      img.alt = legend.name;
      name.textContent = legend.name;
    }, intervalTime);
  });

  // Animation für Waffen
  let weaponIntervals = [];
  weaponBoxes.forEach((wBox, idx) => {
    weaponIntervals[idx] = setInterval(() => {
      const weapon = weapons[Math.floor(Math.random() * weapons.length)];
      const img = wBox.querySelector('img');
      const name = wBox.querySelector('p');
      img.src = weapon.img;
      img.alt = weapon.name;
      name.textContent = weapon.name;
    }, intervalTime);
  });

  // Final Legenden auswählen
  const legendsCopy = legends.slice();
  for (let i = legendsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [legendsCopy[i], legendsCopy[j]] = [legendsCopy[j], legendsCopy[i]];
  }
  const selected = legendsCopy.slice(0, 3);

  // Final Waffen auswählen (2 verschiedene)
  const weaponsCopy = weapons.slice();
  for (let i = weaponsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weaponsCopy[i], weaponsCopy[j]] = [weaponsCopy[j], weaponsCopy[i]];
  }
  const selectedWeapons = weaponsCopy.slice(0, 2);

  // Boxen in Reihenfolge stoppen
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

  // Waffen-Animation stoppen und finale Waffen setzen
  weaponBoxes.forEach((wBox, idx) => {
    setTimeout(() => {
      clearInterval(weaponIntervals[idx]);
      const weapon = selectedWeapons[idx];
      const img = wBox.querySelector('img');
      const name = wBox.querySelector('p');
      img.src = weapon.img;
      img.alt = weapon.name;
      name.textContent = weapon.name;
    }, 1800 + idx * 400);
  });
}