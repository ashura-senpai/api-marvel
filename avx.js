function getPersonagemFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('personagem');
}

function updatePageTitleAndHeader() {
  const personagem = getPersonagemFromURL();
  if (personagem) {
      document.title = `Página do ${personagem}`;
      const h3Title = document.querySelector('#htres');
      if (h3Title) {
          h3Title.textContent = `Informações sobre ${personagem}`;
      }
  }
}

function fetchCharacterData() {
  const personagem = getPersonagemFromURL();
  if (personagem) {
      const apiUrl = `https://gateway.marvel.com/v1/public/characters?name=${personagem}&apikey=YOUR_MARVEL_API_KEY`;
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              const character = data.data.results[0];
              const characterImage = character.thumbnail.path + '.' + character.thumbnail.extension;

              const characterImg = document.createElement('img');
              characterImg.src = characterImage;
              characterImg.alt = personagem;
              characterImg.setAttribute('aria-label', `Imagem de ${personagem}`);

              const characterImageSection = document.querySelector('#character-image');
              if (characterImageSection) {
                  characterImageSection.appendChild(characterImg);
              }
          })
          .catch(error => console.error('Erro ao obter imagem do personagem:', error));
  }
}
  
  function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');
  
    if (!visitData) {
      visitData = { count: 0, lastVisit: '' };
    } else {
      visitData = JSON.parse(visitData);
    }
  
    visitData.count++;
    const currentDate = new Date();
    
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    
    const formattedDate = dateFormatter.format(currentDate);
    visitData.lastVisit = formattedDate;
    localStorage.setItem('visitData', JSON.stringify(visitData));

  }

  function updateFooter() {
    const visitData = JSON.parse(localStorage.getItem('visitData'));
  
    if (visitData) {
      const footerText = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
  
      const paragraph = document.createElement('p');
      paragraph.textContent = footerText;
  
      const footer = document.querySelector('footer');
      footer.appendChild(paragraph);
    }
  }
  
  function main() {
    updatePageTitleAndHeader();
    fetchCharacterData();
    updateVisitCounter();
    updateFooter();
  }
  
  window.onload = main;  