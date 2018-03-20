//this code is for the image uploading
document.getElementById('image').addEventListener('change', function () {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile').src = e.target.result;
        }
            
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('addCard').addEventListener('click', function () {
    document.getElementById('cardMakeOverlay').style.display = 'block';
})