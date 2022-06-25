$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            for(let i=0;i<input.files.length;i++)
            {
               // console.log("temp ",input.files)
               // console.log("temp length", input.files.length)
                var reader = new FileReader();
                console.log("temp2 ",reader)
                reader.onload = function (e) {
                    // $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                    // $('#imagePreview').hide();
                    // $('#imagePreview').fadeIn(650);

                   // $("#imagePreview").append('<div id="myid" style="display:block; float:left;width:'+width+'px; height:'+height+'px; margin-top:'+positionY+'px;margin-left:'+positionX+'px;border:1px dashed #CCCCCC;"></div>');
                    $("#imagePreview").append('<div id="myid" style="padding:5px"><img src='+e.target.result+' height="230px" width="230px" > </div>');

                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    
    // Predict
    $('#btn-predict').click(function () {
       var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (mydata) {
                // Get and display the result
                // console.log('maan ',mydata);
                $('.loader').hide();
                $('#result').fadeIn(600);
                // $('#result').text(' Result:  ' + mydata[2]);
                $.each(mydata, function(key,value)
                {
                    $('#result').append("<h5>"+value+"</h5>")
                   
                })

                console.log('Success!');
            },
        });
    });

});