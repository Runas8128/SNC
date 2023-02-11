let keyCombo = [];
const targetCombo = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
];

document.addEventListener('keydown', e => {
  keyCombo.push(e.key);
  console.log(`add ${e.key}: keyCombo = ${keyCombo}`);
  const tar = targetCombo.slice(0, keyCombo.length);
  if (JSON.stringify(keyCombo) !== JSON.stringify(tar)) {
    console.log(keyCombo, tar);
    keyCombo = [];
  }
  if (JSON.stringify(keyCombo) === JSON.stringify(targetCombo)) {
    location.href = '/credit';
  }
});