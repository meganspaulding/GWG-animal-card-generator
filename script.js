// =====================================================================
// 
//      VARIABLES
// 
// =====================================================================

var closeModal = $("#addCardClose");
var addCardModal = $("#cardMakePanel");
var disableBackground = $("#disable-background");
var addCardBtn = $("#add-card-btn");
var addCardTopBtn = $('#add-card-top');
var editingCard = false;

// =====================================================================
// 
//      MODAL BEHAVIOR
// 
// =====================================================================

//clear modal
function resetModal() {
  var cardMakePanel = document.getElementById('cardMakePanel'),
      animalImage = document.getElementById('profile'),
      listFacts = document.getElementsByClassName('title'),
      habitat = document.getElementById('habitat'),
      animalGroup = document.getElementById('animalGroup'),
      desc = document.getElementById('description');
    
  for (let f = 0; f < listFacts.length; f++) {
    let inputValue = listFacts[f].getElementsByTagName('input')[0];
    inputValue.value = ''
  }
  
  cardMakePanel.className = 'new-card-modal';
  animalImage.src = 'http://www.dimakroma.com/nophoto.gif';
  habitat.value = animalGroup.value = desc.value = '';
  editingCard = false;
}

function toggleCardModal () {
  addCardModal.toggleClass("visible");
  disableBackground.toggleClass("visible");
  
  //reset modal when closed
  if (!addCardModal[0].classList.contains('visible')) resetModal();
}

// Closing Modal
closeModal.click(toggleCardModal);

// Add Card Button
addCardBtn.click(toggleCardModal);

addCardTopBtn.click(toggleCardModal);

//style card moduel as the user changes habitats
$('#habitat').change(function () {
    addCardModal[0].className = 'new-card-modal ' + this.options[habitat.selectedIndex].value.replace(' ', '') + 'Theme';
});

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

function reEditCard (cardEl, cardInfo) {
  var cardMakePanel = document.getElementById('cardMakePanel'),
      animalImage = document.getElementById('profile'),
      listFacts = document.getElementsByClassName('title');
    
  toggleCardModal();
  
  animalImage.src = cardInfo.animalImage;
  
  for (let f = 0; f < listFacts.length; f++) {
    let inputValue = listFacts[f].getElementsByTagName('input')[0];
    inputValue.value = cardInfo.facts[f][1]
  }
  
  for (let d = 0; d < cardInfo.details.length; d++) {
    let el = document.getElementsByName(cardInfo.details[d][0])[0];
    el.value = cardInfo.details[d][1];
    
    if (cardInfo.details[d][0] == 'Habitat') {
      cardMakePanel.className = 'new-card-modal ' + cardInfo.details[d][1] + 'Theme';
    }
  }

  editingCard = cardEl;
}

//build basic HTML structure of card
function buildCardHTML () {
  var container = document.createElement('div'),
      cardHeader = document.createElement('header'),
      cardTools = document.createElement('div'),
      editCard = document.createElement('span'),
      deleteCard = document.createElement('span'),
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
  cardTools.className = 'cardTools';
  animalImage.className = 'cardImage';
  cardAnimalText.className = 'cardAnimalText';
  animialFacts.className = 'animialFacts';
  animalDetails.className = 'animalDetails';
  
  //set text
  animalName.textContent = 'Aniaml name'
  editCard.textContent = 'mode_edit';
  deleteCard.textContent = 'delete';
      
  //set image attributes
  animalImage.src = 'http://www.dimakroma.com/nophoto.gif';
  animalImage.alt = 'animal-image';
    
  cardTools.appendChild(editCard);
  cardTools.appendChild(deleteCard);
  cardHeader.appendChild(animalName);
  cardHeader.appendChild(cardTools);
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
    animalImage : animalImage,
    editCard : editCard,
    deleteCard : deleteCard
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
    cardInfo.facts.push([inputValue.name, inputValue.value]);
  }
      
  cardInfo.animalImage = animalImageSrc;
  cardInfo.details.push(['Habitat', habitat.options[habitat.selectedIndex].value]);
  cardInfo.details.push(['Animal Group', animalGroup.options[animalGroup.selectedIndex].value]);
  cardInfo.details.push(['Description', desc.value]);
    
  return cardInfo;
}

function fillOutCard (cardHTML, cardInfo) {
  cardHTML.animalImage.src = cardInfo.animalImage;
  //append animal facts
  for (let i = 0; i < cardInfo.facts.length; i++) {
    if (cardInfo.facts[i][0] === 'Animal Name') {
        cardHTML.animalName.textContent = cardInfo.facts[i][1];
    } else {
      let li = document.createElement('li'),
          factLabel = document.createElement('span');
        
      factLabel.className = 'fact-label ' + cardInfo.facts[i][0];
      factLabel.textContent = cardInfo.facts[i][0] + ': ' + cardInfo.facts[i][1];
      li.appendChild(factLabel);
      cardHTML.animialFacts.appendChild(li);
    }
  }
  
  //append animal details
  for (let i = 0; i < cardInfo.details.length; i++) {
    let section = document.createElement('section'),
        detailLabel = document.createElement('h3'),
        info = document.createElement('p');
    
    if (cardInfo.details[i][0] == 'Habitat') {
        cardHTML.container.className += ' ' + cardInfo.details[i][1].replace(' ', '') + 'Theme';
    }
      
    detailLabel.textContent = cardInfo.details[i][0];
    info.textContent = cardInfo.details[i][1];
    
    section.className = cardInfo.details[i][0];
    section.appendChild(detailLabel);
    section.appendChild(info);
    cardHTML.animalDetails.appendChild(section);
  }
  
  cardHTML.deleteCard.addEventListener('click', function () {
    document.getElementById('cardHolder').removeChild(cardHTML.container);
  });
  
  cardHTML.editCard.addEventListener('click', function () {
    reEditCard(cardHTML.container, cardInfo);
  });
    
  return cardHTML
}

function newCard() {
  var newCard = fillOutCard(buildCardHTML(), getCardInfo()),
      cardHolder = document.getElementById('cardHolder');
      
  if (editingCard) {
      cardHolder.removeChild(editingCard);
  }

  cardHolder.insertBefore(newCard.container, addCardBtn[0]);
  toggleCardModal();
}