$(function() {
    $("#btnSave").click(function() {
        html2canvas($(".calendar"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                //document.body.appendChild(canvas);

                // Convert and download as image
                Canvas2Image.saveAsPNG(canvas);

                //Canvas2Image.converToPNG(canvas);
                $("#img-out").append(canvas);
                // Clean up
                //document.body.removeChild(canvas);

                //For Image URL:
                // $("canvas").append("</canvas>");
                // var canvas1 = document.getElementsByTagName("canvas");
                // var imgURL = canvas1.toDataURL();

                // Converts canvas to an image

                    // var image = new Image();
                    // image.src = canvas.toDataURL("image/png");




            }
        });
    });
});
