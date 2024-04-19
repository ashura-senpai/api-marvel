function getEvolucaoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('evolucao');
  }
  
  function updatePageTitleAndHeader() {
    const evolucao = getEvolucaoFromURL();
    if (evolucao) {
      document.title = `Página do ${evolucao}`;
      const h3Title = document.querySelector('#htres');
      if (h3Title) {
        h3Title.textContent = `Informações sobre ${evolucao}`;
      }
    }
  }  
  
  function fetchPokemonData() {
    const evolucao = getEvolucaoFromURL();
    if (evolucao) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${evolucao}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const sprites = data.sprites;
          const spriteUrls = Object.values(sprites).filter(sprite => typeof sprite === 'string');
          
          const pokemonImage = document.createElement('img');
          pokemonImage.src = spriteUrls[2];
          pokemonImage.alt = evolucao;
          pokemonImage.setAttribute('aria-label', `Imagem de ${evolucao}`);
  
          pokemonImage.addEventListener('click', () => {
            const nextIndex = (spriteUrls.indexOf(pokemonImage.src) + 1) % spriteUrls.length;
            pokemonImage.src = spriteUrls[nextIndex];
          });
  
          const pokemonImageSection = document.querySelector('#pokemon-image');
          if (pokemonImageSection) {
            pokemonImageSection.appendChild(pokemonImage);
          }
        })
        .catch(error => console.error('Erro ao obter imagem do Pokémon:', error));
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
    fetchPokemonData();
    updateVisitCounter();
    updateFooter();
  }
  
  window.onload = main;  