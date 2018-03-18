function myFunction() {
    document.getElementById("frm1").submit();
}

//this code is for the image uploading
$("#image").change(function(){
        readURL(this);
   
    });

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#profile').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }