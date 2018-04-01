// =====================================================================
// 
//      VARIABLES
// 
// =====================================================================

var closeModal = $("#addCardClose");
var addCardModal = $("#cardMakePanel");
var disableBackground = $("#disable-background");
var addCardBtn = $("#add-card-btn");

// =====================================================================
// 
//      MODAL BEHAVIOR
// 
// =====================================================================

function toggleCardModal () {
  addCardModal.toggleClass("visible");
  disableBackground.toggleClass("visible");
}

// Closing Modal
closeModal.click(toggleCardModal);

// Add Card Button
addCardBtn.click(toggleCardModal);

// =====================================================================
// 
//      MODAL INPUT FUNCTIONALITY
// 
// =====================================================================


// 
//  Image Upload Display
// 

function readURL() {
    var input = this,
        reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile').src = e.target.result;
        };
            
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('image').addEventListener('change', readURL);

// =====================================================================
// 
//      BUILD NEW CARD
// 
// =====================================================================

//build basic HTML structure of card
function buildCardHTML (cardInfo) {
  var container = document.createElement('div'),
      cardHeader = document.createElement('header'),
      animalName = document.createElement('h2'),
      cardBody = document.createElement('div'),
      imageContainer = document.createElement('picture'),
      animalImage = document.createElement('img'),
      cardAnimalText = document.createElement('div'),
      animialFacts = document.createElement('ul'),
      animalDetails = document.createElement('div');
        
  
  //set classes      
  container.className = 'completedCard';
  cardHeader.className = 'cardHeader';
  animalImage.className = 'cardImage';
  cardAnimalText.className = 'cardAnimalText';
  animialFacts.className = 'animialFacts';
  animalDetails.className = 'animalDetails';
  
  //set text
  animalName.textContent = 'Aniaml name'
  
  //set image attributes
  animalImage.src = 'http://www.dimakroma.com/nophoto.gif';
  animalImage.alt = 'animal-image';
    
  cardHeader.appendChild(animalName);
  container.appendChild(cardHeader);
  imageContainer.appendChild(animalImage);
  container.appendChild(imageContainer);
  cardBody.appendChild(imageContainer);
  cardAnimalText.appendChild(animialFacts);
  cardAnimalText.appendChild(animalDetails);
  cardBody.appendChild(cardAnimalText);
  
  container.appendChild(cardBody);
    
  return {
    container : container,
    animialFacts : animialFacts,
    animalDetails : animalDetails,
    animalName : animalName,
    animalImage : animalImage
  };
}

function getCardInfo () {
  var cardMakePanel = document.getElementById('cardMakePanel'),
      animalImageSrc = document.getElementById('profile').src,
      listFacts = document.getElementsByClassName('title'),
      habitat = document.getElementById('habitat'),
      animalGroup = document.getElementById('animalGroup'),
      desc = document.getElementById('description'),
      cardInfo = {
        animalName : null,
        animalImage : null,
        facts : [],
        details : []
      };
  
  for (let f = 0; f < listFacts.length; f++) {
    let inputValue = listFacts[f].getElementsByTagName('input')[0];
    if (inputValue.name == 'Animal Name') {
      cardInfo.animalName = inputValue.value
    } else {
      cardInfo.facts.push([inputValue.name, inputValue.value]); 
    }
  }
  
  cardInfo.animalImage = animalImageSrc;
  cardInfo.details.push(['Habitat', habitat.options[habitat.selectedIndex].value]);
  cardInfo.details.push(['Animal Group', animalGroup.options[animalGroup.selectedIndex].value]);
  cardInfo.details.push(['Description', desc.value]);
  
  return cardInfo;
}

function fillOutCard (cardHTML, cardInfo) {
  cardHTML.animalName.textContent = cardInfo.animalName;
  cardHTML.animalImage.src = cardInfo.animalImage;
  //append animal facts
  for (let i = 0; i < cardInfo.facts.length; i++) {
    let li = document.createElement('li'),
        factLabel = document.createElement('span');
    
    factLabel.className = 'facet-label';
    factLabel.textContent = cardInfo.facts[i][0] + ': ' + cardInfo.facts[i][1];
    li.appendChild(factLabel);
    cardHTML.animialFacts.appendChild(li);
  }
  
  //append animal details
  for (let i = 0; i < cardInfo.details.length; i++) {
    let section = document.createElement('section'),
        detailLabel = document.createElement('h3'),
        info = document.createElement('p');
    
    detailLabel.textContent = cardInfo.details[i][0];
    info.textContent = cardInfo.details[i][1];
    
    section.appendChild(detailLabel);
    section.appendChild(info);
    cardHTML.animalDetails.appendChild(section);
  }
  
  return cardHTML
}

function newCard() {
  var newCard = fillOutCard(buildCardHTML(), getCardInfo());
      
  
  document.getElementById('cardHolder').insertBefore(newCard.container, addCardBtn[0]);
  toggleCardModal();
}