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
    detailsSectionId: 'detailsSection',
    getMoreInfoAboutPersonsId: 'getMoreInfoAboutPersons'
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
}

var analyzePhoto = function () {
    showLoader();
    var imageUrlAddress = document.getElementById(config.imageUrlId).value;
    if (imageUrlAddress == "") {
        var file = document.getElementById(config.inputImageId).files[0];
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
                document.getElementById(config.emotionSectionId).innerHTML = e;
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
    // setCanvasDimensions();
};

var getMoreInfoAboutPersons = function () {
    $.ajax({
        url: "/Image/GetMoreDetails",
        type: 'GET',
        success: function (result) {
            document.getElementById(config.detailsSectionId).innerHTML = result;
            document.getElementById(config.detailsSectionId).hidden = false;
            document.getElementById(config.getMoreInfoAboutPersons).disabled = true;
            hideLoader();
        },
        error: function (e) {
            document.getElementById(config.detailsSectionId).innerHTML = e;
            document.getElementById(config.detailsSectionId).hidden = false;
            console.log(e);
            hideLoader();
        }
    });
}