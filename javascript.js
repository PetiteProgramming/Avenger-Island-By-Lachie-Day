// --- Flag controls ---
const flag = document.getElementById('flag-avenger-island');
const waveBtn = document.getElementById('flagWaveBtn');
const dlBtn = document.getElementById('flagDownloadBtn');
let waving = false;

if (flag && waveBtn) {
  waveBtn.addEventListener('click', () => {
    waving = !waving;
    const art = flag.querySelector('#flag-art');
    if (waving) {
      art.setAttribute('filter', 'url(#wavy)');
      waveBtn.textContent = '⏹ Stop Wave';
    } else {
      art.removeAttribute('filter');
      waveBtn.textContent = '🏳️‍🌈 Wave';
    }
  });
}

if (flag && dlBtn) {
  dlBtn.addEventListener('click', () => {
    // Clone the SVG so we're not mutating the on-page one
    const clone = flag.cloneNode(true);
    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Export at 5× scale for a crisp PNG
      canvas.width = 1500; // 300 * 5
      canvas.height = 1000; // 200 * 5
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const a = document.createElement('a');
      a.download = 'avenger-island-flag.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = url;
  });
}
