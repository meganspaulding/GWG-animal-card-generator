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

// Closing Modal

closeModal.click(function () {
    addCardModal.toggleClass("visible");
    disableBackground.toggleClass("visible");
});

// Add Card Button
addCardBtn.click(function () {
    addCardModal.toggleClass("visible");
    disableBackground.toggleClass("visible");
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