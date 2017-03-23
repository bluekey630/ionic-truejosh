var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Now safe to use device APIs
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    cameraDirection: Camera.Direction.FRONT;
}

function getCPhoto() {
    navigator.camera.getPicture(myImage, OnImageOrPhotoFail, {quality: 50,
        correctOrientation: true,
        destinationType: destinationType.FILE_URI});
}

function getCImage(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(myImage, onImageOrPhotoFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        sourceType: source});
}

function myImage(imageURI) {
//alert('1');
    var cpass = function (r) {
        //alert('hi');
        clearCache();
        $('#p-img').attr('src', '');
        $('#p-img').attr('src', 'http://www.primefield.co/jobsearch/companyImage/com_'+localStorage.getItem("userID") + '.jpg');
        $('#company-img').attr('src', '');
        $('#company-img').attr('src', 'http://www.primefield.co/jobsearch/companyImage/com_'+localStorage.getItem("userID") + '.jpg');


    }

    var cfail = function (error) {
        //alert(JSON.stringify(error));
        clearCache();

    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://www.primefield.co/jobsearch/uploadcompanyimage.php?imgid=com_"+localStorage.getItem("userID")), cpass, cfail, options);


    //socket.emit('user image', "data:image/jpeg;base64," + imageData, thisClientID, currentGroupID);
}

// REUSABLE PHOTO FUNCTION
function OnImageOrPhotoFail(message) {
    //alert('Failed because: ' + message);
}

function clearCache() {
    navigator.camera.cleanup();
}

function backsignout() {
    if (localStorage.getItem("setupvialinkedin") == "true") {
        localStorage.setItem("setupvialinkedin", "false");
        localStorage.clear();
        location.replace('signin.html');
        //IN.User.logout(callbackFunction, callbackScope);
    }
    else {
        localStorage.clear();
        location.replace('signin.html');
    }

}