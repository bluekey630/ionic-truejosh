var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Now safe to use device APIs
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function getPhoto() {
    //alert('p called');
    navigator.camera.getPicture(onImageRetrieve, onImageOrPhotoFail, {quality: 50,
        correctOrientation: true,
        destinationType: destinationType.FILE_URI});
}

function getImage(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onImageRetrieve, onImageOrPhotoFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        sourceType: source});
}

function onImageRetrieve(imageURI) {
    $('#p-img').attr('src', '');
    $('#company-img').attr('src', '');
    var pass = function (r) {
        //alert('hi');
        clearCache();
        window.plugins.SpinnerDialog.hide();
        $('#p-img').attr('src', 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime());
        
        $('#company-img').attr('src', 'http://www.primefield.co/jobsearch/pictureurl/' + localStorage.getItem("userID") + '.jpg?timestamp='+new Date().getTime());


    }

    var fail = function (error) {
        //alert(JSON.stringify(error));
        clearCache();

    }

    window.plugins.SpinnerDialog.show({
        overlay: false,    // defaults to true
        fullscreen: true  // defaults to false
    });

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://www.primefield.co/jobsearch/uploadimage.php?userid=" + localStorage.getItem("userID")), pass, fail, options);


    //socket.emit('user image', "data:image/jpeg;base64," + imageData, thisClientID, currentGroupID);
}

// REUSABLE PHOTO FUNCTION
function onImageOrPhotoFail(message) {
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

/*
 * VIDEO FUNCTIONS
 * 
 */

function captureVideo(highquality, frontcamera, duration) {

    window.plugins.videocaptureplus.captureVideo(
            captureSuccess,
            captureError,
            {
                limit: 1,
                duration: duration,
                highquality: highquality,
                frontcamera: frontcamera,
                // you'll want to sniff the useragent/device and pass the best overlay based on that.. assuming iphone here
                portraitOverlay: 'www/img/cameraoverlays/overlay-iPhone-portrait.png',
                landscapeOverlay: 'www/img/cameraoverlays/overlay-iPhone-landscape.png'
            }
    );
}

function captureSuccess(mediaFiles) {
    //alert('s');
    window.plugins.SpinnerDialog.show({
        overlay: false,    // defaults to true
        fullscreen: true  // defaults to false
    });
    var videoName = localStorage.getItem("userID");
    $('#videoEtakingbtn').text('Retake');
    $('#postjobvideo').show();
    var i, len;

    for (i = 0, len = mediaFiles.length; i < len; i++) {
        var mediaFile = mediaFiles[i];
        //mediaFile.getFormatData(getFormatDataSuccess, getFormatDataError);
        //alert(device.platform);
        //if (device.platform == 'Android') {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                var tempURL = fileSystem.root.toURL();
                var videoPath = mediaFile.fullPath.substring(0, 5) + "//" + mediaFile.fullPath.substring(5, mediaFile.fullPath.length);
                var thumbFile = tempURL + videoName + '.jpg';
                window.PKVideoThumbnail.createThumbnail(videoPath, thumbFile, function (s) {
                    sendVideoThumbnail(mediaFile.fullPath, thumbFile, videoName);
                }, function (e) {
                    //alert(JSON.stringify(e))
                });
            });
        // } else if (device.platform == 'iOS') {
        //     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        //         var tempURL = cordova.file.tempDirectory;
        //         var videoPath = "file://" + mediaFile.fullPath;
        //         var thumbFile = tempURL + videoName + '.jpg';
        //         window.PKVideoThumbnail.createThumbnail(videoPath, thumbFile, function (s) {
        //             sendVideoThumbnail(videoPath, thumbFile, videoName);
        //         }, function (e) {
        //         });
        //     });
        // }
    }
}

function sendVideoThumbnail(videoPath, thumbSrc, vidThumbName) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = vidThumbName;
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    
    $('#videothumbnail').hide();
    $('#videotakingbtn').hide();
    $('#videothumbnail').attr('src', '');
    //if (device.platform == 'Android') {
        // upload the file to the server
        ft.upload(thumbSrc, encodeURI("http://www.primefield.co/jobsearch/uploadthumbnail.php?imgid=" + vidThumbName), function (resp) {
            $('#videothumbnail').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg?timestamp='+new Date().getTime());
            $('#videothumbnail').show();
            $('#previewbtn').show();
            $('#postJobRedo').css("margin-left","5px");
            $('#p-video').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg?timestamp='+new Date().getTime());
            //alert(JSON.stringify(resp));
            sendVideo(videoPath, vidThumbName);
        }, function (error) {
            //alert(JSON.stringify(error))
        }, options);
    // } else if (device.platform == 'iOS') {
    //     // upload the file to the server
    //     ft.upload(thumbSrc, encodeURI("http://www.primefield.co/jobsearch/uploadthumbnail.php?imgid=" + vidThumbName), function (resp) {
    //         $('#videothumbnail').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg');
    //         $('#videothumbnail').show();
    //         $('#p-video').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg');
    //         sendVideo(videoPath, vidThumbName);
    //     }, function (error) {
    //     }, options);
    // }
}

// function getFormatDataSuccess(mediaFileData) {
//     //document.getElementById('video_meta_container').innerHTML = mediaFileData.duration + ' seconds, ' + mediaFileData.width + ' x ' + mediaFileData.height;
// }

function captureError(error) {
    // code 3 = cancel by user
    //alert('Returncode: ' + JSON.stringify(error.code));
    $('#postjobvideo').hide();
    $('#videoEtakingbtn').text('Camera');
}

// function getFormatDataError(error) {
//     alert('A Format Data Error occurred during getFormatData: ' + error.code);
// }

function sendVideo2(videoSrc, videoName) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.mimeType = "video/3gp";
    var ft = new FileTransfer();
    

   // if (device.platform == 'Android') {
        // upload the file to the server
        
         //$('#videothumbnail').attr('src', 'img/dummy.png');
        ft.upload(videoSrc, encodeURI("http://www.primefield.co/jobsearch/uploadvideo.php?videoid=" + videoName), function (resp) {
           //alert(JSON.stringify(resp))
           //$('#videotakingbtn').hide();
            //$('#videothumbnail').removeAttr('src');
          
            $('#videothumbnail').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');
            $('#p-video').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');
            //$('#videodiv').append('<img onclick="openFile(\'http://www.primefield.co/jobsearch/videos/'+ videoName + '.3gp\');"  src="http://www.primefield.co/jobsearch/videos/' + videoName + '.jpg" alt=""/>');
            window.plugins.SpinnerDialog.hide();
        }, function (error) {
            //alert(JSON.stringify(error))
        }, options);
    // } else if (device.platform == 'iOS') {
    //     // upload the file to the server
      
    //     ft.upload(videoSrc, encodeURI("http://www.primefield.co/jobsearch/uploadvideo.php?videoid=" + videoName), function (resp) {
             
         
    //         $('#p-video').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');
    //         $('#videothumbnail').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');

    //         //$('#videodiv').append('<img onclick="openFile(\'http://www.primefield.co/jobsearch/videos/'+ videoName + '.3gp\');"  src="http://www.primefield.co/jobsearch/videos/' + videoName + '.jpg" alt=""/>');


    //     }, function (error) {
    //     }, options);
    // }
}

function sendVideo(videoSrc, videoName) {
    //AWS.config.accessKeyId = 'AKIAI5T7VESQDIZAHZOA';
    //AWS.config.secretAccessKey = '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';
	AWS.config.region = 'ap-southeast-1';
	var videoPath 	= 	videoSrc.substring(0, 5) + "//" + videoSrc.substring(5, videoSrc.length);		
	window.resolveLocalFileSystemURL(videoPath, function(fileEntry) {
	
		fileEntry.file(function(file) {
			var reader = new FileReader();

			reader.onloadend = function(e) {
				
				var bucket = new AWS.S3({params: {Bucket: 'video1.123/videos'}});			
				
				var params = {Key: videoName+'.3gp', ContentType : 'video/3gp', Body: this.result};
				
				bucket.upload(params, function (data, err) 
				{
					console.log("Upload Successful.");
					console.log(data);
					
					$('#videothumbnail').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/videos' + videoName + '.3gp\')');
					$('#p-video').attr('onclick', 'openFile(\'https://s3-ap-southeast-1.amazonaws.com/video1.123/videos' + videoName + '.3gp\')');
					window.plugins.SpinnerDialog.hide();
				});	
				
			}
			reader.readAsArrayBuffer(file);
		});

	}, function(e) {
		console.log("FileSystem Error");
		console.dir(e);
	});
}

function openFile(src) {
    
	var fileName	=	src.substring(src.lastIndexOf("/")+1);
	
	var awsS3Path = 'https://s3-ap-southeast-1.amazonaws.com/video1.123/videos/' + fileName;
	// Just play a video
    window.plugins.streamingMedia.playVideo(awsS3Path);
    // VideoPlayer.play(src, function () {
    //     console.log('open success');
    // }, function () {
    //     console.log('open failed');
    // });
}
