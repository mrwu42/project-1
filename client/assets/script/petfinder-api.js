$("#submit").on("click" ,function(){
    $("#searches").empty();
    // var type = $(this).data("type");
    var queryURL = "https://api.petfinder.com/v2/animals/?api_key=bnv76pNp5oYUTHyOOjC3mFdaUW6RpjkqEjoLt9m1XOqrQXKHw2";
    $.ajax({
        url:queryURL,
        method:"GET", 
        headers:{

            "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJibnY3NnBOcDVvWVVUSHlPT2pDM21GZGFVVzZScGprcUVqb0x0OW0xWE9xclFYS0h3MiIsImp0aSI6IjNkYjM3OGYzNjNiYjZjMTlhMGQyMTg0YmUxMGI5MTM1YmNlNjEzMzNhZjg3YzkxYTZkNDFjYzM0NDg4MTZkNzU3NWU3Zjk3MGU5ZmMzMGYzIiwiaWF0IjoxNTk3MTE4MTU4LCJuYmYiOjE1OTcxMTgxNTgsImV4cCI6MTU5NzEyMTc1OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Sr6RthsYSi-46Cvzz-pEWj2pDmxc29KyvmhnTmiGAVtSmryt4TC73fFOJa6tcIfn8FjbXhxejZiDFD1S1QHoDzhkq-t4Ncr26eyZZ1H5nxbSsVYF1Sax79wnefc0wbaYeGzxinWhMoiMYCEMhExuwN893hyFHdMq-rXdogp0eTTDUcG_YaS1K9o88S8BRvH1wok7P7_dAnfjSMwuK9tr_45RISlI6xgDLG9oh05jL9kbSs2Irrqv49W-wVCTBjpDcUHSuQa9Q8l8uXNL7eUvySluMmoRZQL3ZpgM1u1h_esIAKsgyxTXa724WBzEAp53U1U9IY1ZjnHHMCOMUTgCTA" 

             

        }

        
    })
        .done(function(response){
         console.log(response);
         var addresses = [];
         var usrState = document.getElementById("inputState").value;
         var usrCity = document.getElementById("inputCity").value;
         var usrLocation = usrCity + ", " + usrState;
         if(usrCity === "" || usrState === "Choose...") {
            $("#show").hide();
            $("#hide").hide();
            $("#form").show();
            alert("You must provide a city and state");
            return false;
         } 
         console.log(usrLocation);
         for(var i=0; i<response.animals.length; i++){
                var searchDiv = $("<div>");
                searchDiv.attr("class", "animal");
                var image = $("<img>");
                var photo = "";
                if(response.animals[i].photos[0] == undefined) {
                    photo = "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/261/10460/Wedding-Set-Rubber-Duck-Ad-Line-3__62602.1569352978.jpg?c=2&imbypass=on";
                    image.attr("class", "rubber-ducky pet-image");
                } else {
                    photo = response.animals[i].photos[0].medium;
                    image.attr("class", "pet-image");
                }
                image.attr("src", photo);

                //console.log(response.animals[i].url);
                var address = response.animals[i].contact.address
                let fullAddress;
                if(address.address1 == null) {
                    fullAddress = address.city + ", " + address.state;
                } else {
                    fullAddress = address.address1 + ", " + address.city + ", " + address.state;
                }
                addresses.push(fullAddress);

                var petName = response.animals[i].name;
                var nameHeading = $("<h2>");
                nameHeading.text(petName);

                var pFinderLink = $("<a>");
                pFinderLink.attr("href", response.animals[i].url);
                pFinderLink.attr("target", "_blank");
                pFinderLink.text("See more information on petfinder.com");

                var directionsLink = $("<a>");
                var directionsLinkTxt = "./directions.html?petAddress=" + encodeURI(fullAddress) + "&usrLocation=" + encodeURI(usrLocation);
                directionsLink.attr("href", directionsLinkTxt);
                var directionsButton = $("<button>");
                directionsButton.attr("class", "btn btn-primary directions-btn");
                //directionsButton.attr("data-link", directionsLink);
                directionsButton.text("Come see me!");
                directionsLink.append(directionsButton);


                searchDiv.append(nameHeading, image, pFinderLink, directionsLink);
                $("#searches").append(searchDiv);
        }
        console.log(addresses);
    })

})