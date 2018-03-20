var temporaryCardInfo = {
    image : null,
    basicInfo : {
        'Animal Name' : 'Cow',
        'Scientific Name' : 'Cow1',
        'Average Length' : 'Cow2',
        'Average Lifespan' : 'Cow3',
        Habitat : 'Cow4'   
    }
}

//build basic HTML structure of card
function buildCardHTML (cardInfo) {
    var container = document.createElement('div'),
        cardTitle = document.createElement('h2'),
        cardImage = new Image(),
        animalInfo = document.createElement('div');
        
    container.className = 'card';
    
    cardTitle.textContent = 'New Card';
    
    cardImage.height = '200';
    cardImage.width = '200';
    cardImage.className = 'cardProfile';
    cardImage.src = 'http://www.dimakroma.com/nophoto.gif';
    cardImage.alt = 'animal-image';
        
    container.appendChild(cardTitle);
    container.appendChild(cardImage);
    container.appendChild(cardImage);
    container.appendChild(animalInfo);
    
    return {
        container : container,
        animalInfo : animalInfo
    };
}


/*
fillout card with animal info and append to cardHolder

takes object as paramter, breaks cardInfo.basicInfo into its "keys" and loops thru the object
appends values under cardInfo.basicInfo onto the card

{
    image : cardImage,
    basicInfo : {
        infoName : infoValue,
        infoName : infoValue,
        infoName : infoValue,
    }
}

*/

function fillOutCard (cardInfo) {
    var newCard = buildCardHTML(),
        animalInfoKeys = Object.keys(cardInfo.basicInfo),
        infoBlock,
        infoName,
        infoValue,
        i;
    
    for (i = 0; i < animalInfoKeys.length; i++) {
        infoBlock = document.createElement('div');
        
        infoName = document.createElement('span');
        infoName.style.fontWeight = 'bold';
        infoName.textContent = animalInfoKeys[i] + ': ';
        
        infoValue = document.createElement('span');
        infoValue.textContent = cardInfo.basicInfo[animalInfoKeys[i]]
        
        infoBlock.appendChild(infoName);
        infoBlock.appendChild(infoValue);
        newCard.animalInfo.appendChild(infoBlock);
    }
    
    document.getElementById('cardHolder').prepend(newCard.container);
}

function newCard() {
    fillOutCard(temporaryCardInfo);
    document.getElementById('cardMakeOverlay').style.display = 'none';
}