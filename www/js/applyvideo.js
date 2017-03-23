/*
 * VIDEO FUNCTIONS
 * 
 */

function captureAVideo(highquality, frontcamera, duration) {
    window.plugins.videocaptureplus.captureVideo(
            AcaptureESuccess,
            AcaptureEError,
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

function AcaptureESuccess(mediaFiles) {
    var videoName = 'apply_'+localStorage.getItem("jobID")+'_'+localStorage.getItem('userID');
    $('#videoEtakingbtn').text('Retake');
    var i, len;

    for (i = 0, len = mediaFiles.length; i < len; i++) {
        var mediaFile = mediaFiles[i];
        mediaFile.getFormatData(AgetFormatEDataSuccess, AgetFormatEDataError);

        //if (device.platform == 'Android') {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                var tempURL = fileSystem.root.toURL();
                var videoPath = mediaFile.fullPath.substring(0, 5) + "//" + mediaFile.fullPath.substring(5, mediaFile.fullPath.length);
                var thumbFile = tempURL + videoName + '.jpg';
                window.PKVideoThumbnail.createThumbnail(videoPath, thumbFile, function (s) {
                    AsendVideoEThumbnail(mediaFile.fullPath, thumbFile, videoName);
                }, function (e) {
                });
            });
        // } else if (device.platform == 'iOS') {
        //     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        //         var tempURL = cordova.file.tempDirectory;
        //         var videoPath = "file://" + mediaFile.fullPath;
        //         var thumbFile = tempURL + videoName + '.jpg';
        //         window.PKVideoThumbnail.createThumbnail(videoPath, thumbFile, function (s) {
        //             EsendVideoEThumbnail(videoPath, thumbFile, videoName);
        //         }, function (e) {
        //         });
        //     });
        // }
    }
}

function AsendVideoEThumbnail(videoPath, thumbSrc, vidThumbName) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = vidThumbName;
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    //$('#videoEthumbnail').hide();
    //$('#videoEtakingbtn').hide();
    $('#videoEthumbnail').attr('src', ' ');
    //if (device.platform == 'Android') {
        // upload the file to the server
        ft.upload(thumbSrc, encodeURI("http://www.primefield.co/jobsearch/uploadthumbnail.php?imgid=" + vidThumbName), function (resp) {
            
            $('#videoEthumbnail').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg');
            $('#videoEthumbnail').show();
            
            AsendEVideo(videoPath, vidThumbName);
        }, function (error) {
        }, options);
    // } else if (device.platform == 'iOS') {
    //     // upload the file to the server
    //     ft.upload(thumbSrc, encodeURI("http://www.primefield.co/jobsearch/uploadthumbnail.php?imgid=" + vidThumbName), function (resp) {
    //          $('#videoEthumbnail').attr('src', 'http://www.primefield.co/jobsearch/videos/' + vidThumbName + '.jpg');
    //         $('#videoEthumbnail').show();
    //         EsendEVideo(videoPath, vidThumbName);
    //     }, function (error) {
    //     }, options);
    // }
}

function AgetFormatEDataSuccess(mediaFileData) {
    //document.getElementById('video_meta_container').innerHTML = mediaFileData.duration + ' seconds, ' + mediaFileData.width + ' x ' + mediaFileData.height;
}

function AcaptureEError(error) {
    // code 3 = cancel by user
    //alert('Returncode: ' + JSON.stringify(error.code));
}

function AgetFormatEDataError(error) {
    alert('A Format Data Error occurred during getFormatData: ' + error.code);
}

function AsendEVideo(videoSrc, videoName) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.mimeType = "video/3gp";
    var ft = new FileTransfer();

    //if (device.platform == 'Android') {
        // upload the file to the server
        
         //$('#videothumbnail').attr('src', 'img/dummy.png');
        ft.upload(videoSrc, encodeURI("http://www.primefield.co/jobsearch/uploadvideo.php?videoid=" + videoName), function (resp) {
           //$('#videotakingbtn').hide();
            //$('#videothumbnail').removeAttr('src');
          
            $('#videoEthumbnail').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');

            //$('#videodiv').append('<img onclick="openFile(\'http://www.primefield.co/jobsearch/videos/'+ videoName + '.3gp\');"  src="http://www.primefield.co/jobsearch/videos/' + videoName + '.jpg" alt=""/>');

        }, function (error) {

        }, options);
    // } else if (device.platform == 'iOS') {
    //     // upload the file to the server
      
    //     ft.upload(videoSrc, encodeURI("http://www.primefield.co/jobsearch/uploadvideo.php?videoid=" + videoName), function (resp) {
             
         
            
    //         $('#videoEthumbnail').attr('onclick', 'openFile(\'http://www.primefield.co/jobsearch/videos/' + videoName + '.3gp\')');

    //         //$('#videodiv').append('<img onclick="openFile(\'http://www.primefield.co/jobsearch/videos/'+ videoName + '.3gp\');"  src="http://www.primefield.co/jobsearch/videos/' + videoName + '.jpg" alt=""/>');


    //     }, function (error) {
    //     }, options);
    // }
}


// function openEFile(src) {
//     cordova.plugins.disusered.open(src, function () {
//         console.log('open success');
//     }, function () {
//         console.log('open failed');
//     });
// }