const checkbox = document.getElementById('statusCheckbox');
const indicatorOn = document.getElementById('indicatorOn');
const indicatorOff = document.getElementById('indicatorOff');
const highlightSlider = document.getElementById('highlightSlider');

// Función para actualizar la UI según el estado
function updateUI(isActive) {
  checkbox.checked = isActive;

  if (isActive) {
    indicatorOn.classList.remove('inactive');
    indicatorOn.classList.add('active');
    indicatorOff.classList.remove('active');
    indicatorOff.classList.add('inactive');
  } else {
    indicatorOn.classList.remove('active');
    indicatorOn.classList.add('inactive');
    indicatorOff.classList.remove('inactive');
    indicatorOff.classList.add('active');
  }
}

// Cargar estado inicial al abrir el popup
chrome.storage.local.get(['active', 'highlightOpacity'], (result) => {
  const active = !!result.active;
  updateUI(active);

  // Slider: default 100 si no hay valor guardado
  const opacity = result.highlightOpacity !== undefined ? result.highlightOpacity : 100;
  highlightSlider.value = opacity;
});

// Escuchar cambios en el switch deslizante
checkbox.addEventListener('change', () => {
  const newState = checkbox.checked;

  chrome.storage.local.set({ active: newState }, () => {
    updateUI(newState);

    // Recargar la pestaña actual para aplicar/quitar los resaltados
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});

// Escuchar cambios en el slider de resaltado visual
highlightSlider.addEventListener('input', () => {
  const opacity = parseInt(highlightSlider.value, 10);

  chrome.storage.local.set({ highlightOpacity: opacity }, () => {
    // Recargar la pestaña actual para aplicar la nueva intensidad
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});