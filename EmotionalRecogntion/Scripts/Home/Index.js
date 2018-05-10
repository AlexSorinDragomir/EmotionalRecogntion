var config = {
    loaderDivId: 'loaderDiv',
    analyzePhotoBtnId: 'analyzePhotoBtn',
    showImageFromUrlBtnId: 'showImageFromUrlBtn',
    chooseImageBtnId: 'chooseImageBtn',
    imageUrlId: 'imageUrl',
    uploadedimageId: 'uploadedimage',
    customDisabledBtnClass: 'customDisabledBtn',
    inputImageId: 'inputImage',
    emotionSectionId: 'emotionSection',
    uploadImageErrorId: 'uploadImageError',
    errorUploadImageMessageId: 'errorUploadImageMessage', 
    imageCanvasId: 'imageCanvas',
    personDetailsSectionId: 'detailsSection',
    getMoreInfoAboutPersonsBtnId: 'getMoreInfoAboutPersonsBtn',
    openWebcamBtnId: 'openWebcamBtn',
    videoId: 'video',
    stopWebcamBtnId: 'stopWebcamBtn',
    takeSnapshotBtnId: "takeSnapshotBtn"
}

var blob;

var showWebcamRelatedButtons = function () {
    document.getElementById(config.takeSnapshotBtnId).hidden = false;
    document.getElementById(config.stopWebcamBtnId).hidden = false
}

var hideWebcamRelatedButtons = function () {
    document.getElementById(config.takeSnapshotBtnId).hidden = true;
    document.getElementById(config.stopWebcamBtnId).hidden = true
}

var setCanvasDimensions = function () {
    var uploadedImage = document.getElementById(config.uploadedimageId);
    var canvas = document.getElementById(config.imageCanvasId);
    var ctx = canvas.getContext("2d");
    canvas.style.bottom = uploadedImage.height + "px";
    ctx.canvas.width = uploadedImage.width;
    ctx.canvas.height = uploadedImage.height;
    //ctx.rect(150, 75, 74, 74);
    ctx.rect(121, 35, 21, 21);
    ctx.stroke();
    document.getElementById(config.uploadedimageId).style.height = uploadedImage.height + "px !important";
    canvas.hidden = false;

    //$('#' + config.uploadedimageId).faceDetection({
    //    complete: function (faces) {
    //        console.log(faces);
    //    }
    //});
}

var showLoader = function () {
    document.getElementById(config.loaderDivId).hidden = false;
    document.getElementById(config.analyzePhotoBtnId).disabled = true;
    document.getElementById(config.showImageFromUrlBtnId).disabled = true;
    document.getElementById(config.chooseImageBtnId).disabled = true;
    document.getElementById(config.analyzePhotoBtnId).classList.add(config.customDisabledBtnClass);
    document.getElementById(config.showImageFromUrlBtnId).classList.add(config.customDisabledBtnClass);
    document.getElementById(config.chooseImageBtnId).classList.add(config.customDisabledBtnClass);
    document.getElementById(config.imageUrlId).disabled = true;
    var getMoreInfoAboutPersonsBtn = document.getElementById(config.getMoreInfoAboutPersonsBtnId);
    if (getMoreInfoAboutPersonsBtn !== null && getMoreInfoAboutPersonsBtn !== undefined) {
        getMoreInfoAboutPersonsBtn.disabled = true;
        getMoreInfoAboutPersonsBtn.classList.add(config.customDisabledBtnClass);
    }
    document.getElementById(config.takeSnapshotBtnId).disabled = true;
    document.getElementById(config.takeSnapshotBtnId).classList.add(config.customDisabledBtnClass);
    document.getElementById(config.openWebcamBtnId).disabled = true;
    document.getElementById(config.openWebcamBtnId).classList.add(config.customDisabledBtnClass);
    document.getElementById(config.stopWebcamBtnId).disabled = true;
    document.getElementById(config.stopWebcamBtnId).classList.add(config.customDisabledBtnClass);
}

var hideLoader = function () {
    document.getElementById(config.loaderDivId).hidden = true;
    document.getElementById(config.analyzePhotoBtnId).disabled = false;
    document.getElementById(config.showImageFromUrlBtnId).disabled = false;
    document.getElementById(config.chooseImageBtnId).disabled = false;
    document.getElementById(config.analyzePhotoBtnId).classList.remove(config.customDisabledBtnClass);
    document.getElementById(config.showImageFromUrlBtnId).classList.remove(config.customDisabledBtnClass);
    document.getElementById(config.chooseImageBtnId).classList.remove(config.customDisabledBtnClass);
    document.getElementById(config.imageUrlId).disabled = false;
    var getMoreInfoAboutPersonsBtn = document.getElementById(config.getMoreInfoAboutPersonsBtnId);
    if (getMoreInfoAboutPersonsBtn !== null && getMoreInfoAboutPersonsBtn !== undefined) {
        getMoreInfoAboutPersonsBtn.disabled = false;
        getMoreInfoAboutPersonsBtn.classList.remove(config.customDisabledBtnClass);
    }
    document.getElementById(config.takeSnapshotBtnId).disabled = false;
    document.getElementById(config.takeSnapshotBtnId).classList.remove(config.customDisabledBtnClass);
    document.getElementById(config.openWebcamBtnId).disabled = false;
    document.getElementById(config.openWebcamBtnId).classList.remove(config.customDisabledBtnClass);
    document.getElementById(config.stopWebcamBtnId).disabled = false;
    document.getElementById(config.stopWebcamBtnId).classList.remove(config.customDisabledBtnClass);
}

var analyzePhoto = function () {
    showLoader();
    var imageUrlAddress = document.getElementById(config.imageUrlId).value;
    if (imageUrlAddress == "") {
        var file = document.getElementById(config.inputImageId).files[0];
        if (blob !== null && blob !== undefined)
            file = blob;
        var formData = new FormData();
        formData.append("uploadedImage", file);
        $.ajax({
            url: "/Image/AnalyzeImage",
            type: 'POST',
            data: formData,
            //dataType: 'json',
            contentType: false,
            processData: false,
            success: function (result) {
                document.getElementById(config.emotionSectionId).innerHTML = result;
                document.getElementById(config.emotionSectionId).hidden = false;
                hideLoader();
            },
            error: function (e) {
                document.getElementById(config.emotionSectionId).innerHTML = e.pr;
                document.getElementById(config.emotionSectionId).hidden = false;
                console.log(e);
                hideLoader();
            }
        });
    }
    else {
        $.ajax({
            url: "/Image/AnalyzeImageFromUrl",
            type: 'POST',
            data: { imageUrlAddress },
            success: function (result) {
                document.getElementById(config.emotionSectionId).innerHTML = result;
                document.getElementById(config.emotionSectionId).hidden = false;
                hideLoader();
            },
            error: function (e) {
                document.getElementById(config.emotionSectionId).innerHTML = e;
                document.getElementById(config.emotionSectionId).hidden = false;
                console.log(e);
                hideLoader();
            }
        });
    }
};

$('#' + config.chooseImageBtnId).on('click', function () {
    $('#' + config.inputImageId).click();
});

var uploadImageError = function (event) {
    console.log(config.uploadImageErrorId);
    document.getElementById(config.errorUploadImageMessageId).hidden = false;
    document.getElementById(config.analyzePhotoBtnId).hidden = true;
    // document.getElementById(config.imageCanvasId).hidden = true;
};

var uploadImageSuccess = function (event) {
    document.getElementById(config.analyzePhotoBtnId).hidden = false;
    document.getElementById(config.chooseImageBtnId).innerText = 'Change Image';
    document.getElementById(config.errorUploadImageMessageId).hidden = true;
}

$('#' + config.showImageFromUrlBtnId).on('click', function () {
    var imageUrl = document.getElementById(config.imageUrlId).value;
    $("#" + config.uploadedimageId).attr("src", imageUrl);
    document.getElementById(config.emotionSectionId).hidden = true;
    document.getElementById(config.personDetailsSectionId).hidden = true;
    blob = null;
    // setCanvasDimensions();
});

var imageUrlChange = function (event) {
    var imageUrl = document.getElementById(config.imageUrlId).value;
    if (imageUrl.length != 0) {
        var previewBtn = document.getElementById(config.showImageFromUrlBtnId);
        previewBtn.hidden = false;
        if (event.keyCode == 13) {
            previewBtn.click();
        }
    }
    else {
        document.getElementById(config.showImageFromUrlBtnId).hidden = true;
    }
};

var loadImage = function (event) {
    var uploadedimage = document.getElementById(config.uploadedimageId);
    uploadedimage.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById(config.imageUrlId).value = "";
    document.getElementById(config.showImageFromUrlBtnId).hidden = true;
    document.getElementById(config.emotionSectionId).hidden = true; 
    document.getElementById(config.personDetailsSectionId).hidden = true;
    blob = null;
    // setCanvasDimensions();
};

var getMoreInfoAboutPersons = function () {
    showLoader();
    $.ajax({
        url: "/Image/GetMoreDetails",
        type: 'GET',
        success: function (result) {
            document.getElementById(config.personDetailsSectionId).innerHTML = result;
            document.getElementById(config.personDetailsSectionId).hidden = false;  
            hideLoader();
        },
        error: function (e) {
            document.getElementById(config.personDetailsSectionId).innerHTML = e;
            document.getElementById(config.personDetailsSectionId).hidden = false;
            console.log(e);
            hideLoader();
        }
    });
}

$('#' + config.openWebcamBtnId).on('click', function () {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
            function (stream) {
                var video = document.querySelector(config.videoId);
                showWebcamRelatedButtons();
                video.hidden = false;
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                console.log("The following error occurred: " + err.name);
                showSnackBar("Error while opening Webcam!");
                hideWebcamRelatedButtons();
            }
        );
    } else {
        console.log("getUserMedia not supported");
        showSnackBar("getUserMedia not supported by your browser!");
        hideWebcamRelatedButtons();
    }
});

var closeWebcam = function () {
    var videoElem = document.getElementById(config.videoId);
    videoElem.hidden = true;
    hideWebcamRelatedButtons();
    let stream = videoElem.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });

    videoElem.srcObject = null;
};

var snapshot = function () {
    var videoElem = document.getElementById(config.videoId);
    let stream = videoElem.srcObject;
    let track = stream.getVideoTracks()[0];
    let imageCapture = new ImageCapture(track);
    showSnackBar("Successfully captured image!")

    var scale = 0.7;
    var canvas = document.createElement("canvas");
    canvas.width = videoElem.videoWidth * scale;
    canvas.height = videoElem.videoHeight * scale;
    canvas.getContext('2d')
        .drawImage(videoElem, 0, 0, canvas.width, canvas.height);

    var input = document.getElementById(config.inputImageId);
    input.src = canvas.toDataURL();
    var img = document.getElementById(config.uploadedimageId);
    img.src = input.src;
    img.hidden = false;

    blob = dataURItoBlob(img.src);
}

var showSnackBar = function (message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

var dataURItoBlob = function (dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}