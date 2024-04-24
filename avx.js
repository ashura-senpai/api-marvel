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

async function fetchCharacterData() {
  const personagem = getPersonagemFromURL();
  if (personagem) {
      try {
          const response = await fetch(`http://localhost:3000/herois?name=${personagem}`);
          const data = await response.json();
          const character = data[0]; //Assumindo que o endpoint /herois?name={nome} retorna uma lista com um único personagem

          const characterImage = character.thumbnail; //Ajuste conforme a estrutura do seu retorno
          const characterImg = document.createElement('img');
          characterImg.src = characterImage;
          characterImg.alt = personagem;
          characterImg.setAttribute('aria-label', `Imagem de ${personagem}`);

          const characterImageSection = document.querySelector('#character-image');
          if (characterImageSection) {
              characterImageSection.appendChild(characterImg);
          }
      } catch (error) {
          console.error('Erro ao obter imagem do personagem:', error);
      }
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

function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

function main() {
  updatePageTitleAndHeader();
  fetchCharacterData();
  updateVisitCounter();
  updateFooter();
}

window.onload = main;