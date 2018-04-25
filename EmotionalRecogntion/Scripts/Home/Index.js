var analyzePhoto = function () {
    var imageUrlAddress = document.getElementById('imageUrl').value
    if (imageUrlAddress == "") {
        var file = document.getElementById("inputImage").files[0];
        console.log(file);
        var uploadedImage = new FormData();
        console.log(file);
        uploadedImage.append("files", file);
        for (var p of uploadedImage) {
            console.log(p);
        }
        $.ajax({
            url: "/Image/AnalyzeImage",
            type: 'POST',
            data: { uploadedImage },
            cache: false,
            processData: false,
            success: function (result) {
                document.getElementById("emotionSection").innerHTML = result;
                document.getElementById("emotionSection").hidden = false;
            },
            error: function (e) {
                document.getElementById("emotionSection").innerHTML = e;
                document.getElementById("emotionSection").hidden = false;
                console.log(e);
            }
        });
    }
    else {
        $.ajax({
            url: "/Image/AnalyzeImageFromUrl",
            type: 'POST',
            data: { imageUrlAddress },
            success: function (result) {
                document.getElementById("emotionSection").innerHTML = result;
                document.getElementById("emotionSection").hidden = false;
            },
            error: function (e) {
                document.getElementById("emotionSection").innerHTML = e;
                document.getElementById("emotionSection").hidden = false;
                console.log(e);
            }
        });
    }

    //first - working
    //var imageUrlAddress = document.getElementById('imageUrl').value
    //if (imageUrlAddress == "") {
    //    $("#uploadedImageId").submit();
    //}
    //else {
    //    var url = '@Url.Action("AnalyzeImageFromUrl", "Image")';
    //    $.ajax({
    //        url: "/Image/AnalyzeImageFromUrl",
    //        //url: url,
    //        type: 'POST',
    //        data: { "imageUrlAddress": imageUrlAddress },
    //        //dataType: 'text',
    //        cache: false,
    //        processData: false,
    //        success: function (result) {
    //            document.getElementById("emotionSection").innerHTML = result;
    //            document.getElementById("emotionSection").hidden = false;
    //        },
    //        error: function (e) {
    //            document.getElementById("emotionSection").innerHTML = e;
    //            document.getElementById("emotionSection").hidden = false;
    //            console.log(e);
    //        }
    //    });
    //}

    // second - not working
    //var url = '@Url.Action("AnalyzeImage", "Image", new {enctype = "multipart/form-data"})';
    //var file = document.getElementById("inputImage").files[0];
    //var uploadedImage = new FormData();
    //console.log(file);
    //uploadedImage.append("files", file);
    //for (var p of uploadedImage) {
    //    console.log(p);
    //}

    //$.ajax({
    //    url: url,
    //    type: 'POST',
    //    //dataType: 'json',
    //    data: uploadedImage,
    //    cache: false,
    //    processData: false,
    //    success: function (result) {
    //        $('#emotionSection').html(result);
    //        $('#emotionSection').show();
    //    },
    //    error: function (e) {
    //        $('#emotionSection').html(e);
    //        $('#emotionSection').show();
    //        console.log(e);
    //    }
    //});

    // third - not working
    //$('#uploadedImageId').submit(function (e) {
    //    var formData = new FormData(this);
    //    debugger;
    //    $.ajax({
    //    url: '@Url.Action("AnalyzeImage", "Image", new {enctype = "multipart/form-data"})',
    //        type: "POST",
    //        dataType: "json",
    //        data: formData,
    //        contentType: false,
    //        processData: false,
    //        success: function (result) {
    //            console.log("success");
    //        },
    //        error: function (result) {
    //            console.log("error");
    //        }
    //    });
    //    e.preventDefault();
    //});

    //$('#uploadedImageId').ajaxForm({
    //    beforeSend: function () {
                    
    //    },
    //    success: function () {
    //        console.log("s");
    //    },
    //    complete: function (xhr) {
    //        console.log("f");
    //    }
    //});
};

$('#chooseImageBtn').on('click', function () {
    $('#inputImage').click();
});

var uploadImageError = function (event) {
    console.log("uploadImageError");
    document.getElementById('errorUploadImageMessage').hidden = false;
    document.getElementById('analyzePhotoBtn').hidden = true;
};

var uploadImageSuccess = function (event) {
    document.getElementById('analyzePhotoBtn').hidden = false;
    document.getElementById('chooseImageBtn').innerText = 'Change Image';
    document.getElementById('errorUploadImageMessage').hidden = true;
}

$('#showImageFromUrlBtn').on('click', function () {
    var imageUrl = document.getElementById('imageUrl').value;
    $("#uploadedimage").attr("src", imageUrl);
});

var imageUrlChange = function (event) {
    var imageUrl = document.getElementById('imageUrl').value;
    if (imageUrl.length != 0) {
        document.getElementById('showImageFromUrlBtn').hidden = false;
    }
    else {
        document.getElementById('showImageFromUrlBtn').hidden = true;
    }
};

var loadImage = function (event) {
    var uploadedimage = document.getElementById('uploadedimage');
    uploadedimage.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('imageUrl').value = "";
    document.getElementById('showImageFromUrlBtn').hidden = true;
};