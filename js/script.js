console.log("hi");
$(document).ready(function(){
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://skatersdevelopment-e504.restdb.io/rest/students",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5fdd6af7ff9d670638140729",
      "cache-control": "no-cache"
    }
};
//restdb api response
$.ajax(settings).done(function (response) {

    var studentListContent = $("#studentListContent");
    for (var i = 0; i < response.length; i++) {
        var skater_name = response[i].skater_name;
        var skate_level = response[i].skate_level;
        var skaterCard = `
                <div class="card" style="width:15rem;">
                    <div class="card-body">    
                        <a href="skaterprofile.html" class="update" id="${skater_name}">${skater_name}</a>
                        <p>${skate_level}</p>
                    </div>
                </div>`;
        studentListContent.append(skaterCard);
    }
    console.log(response);
});

//create event listener whenever user clicks on student hyperlink
// $(".update").on("click", function(e){
//     e.preventDefault();
//     console.log("skaterName" + $(this).attr("skaterName"));
// });

//adding new skater
$("#btnSubmit").on("click", function (e) {
    e.preventDefault();
    if ((($("#skater_family").val() === "") && ($("#skater_given").val() === "")) || (($("#age").val() === ""))) {
        alert("required fields are empty");
    }
    else {
        alert("Submission Successful")
};

    $("#skater_family").val($("#skater_family").val().toUpperCase());
    var skateLevel = $("#skate_level").val();
    var skaterName = `${$("#skater_family").val()} ${$("#skater_given").val()}`;
    var skaterAge = $("#age").val();
    var skaterHeight = $("#height").val();
    var legLengthR = $("#right_leg_length").val();
    var legLengthL = $("#left_leg_length").val();
    var singleLegBoundL = $("#single_leg_bound_left_score").val();
    var singleLegBoundR = $("#single_leg_bound_right_score").val();
    var verticalJump = $("#vertical_jump_score").val();
    var pushUp = $("#push_up_score").val();
    var tuckJump = $("#tuck_jump_score").val();
    var hexJump = $("#hex_jump_score").val();
    var sidePlank = $("#side_plank_score").val();
    var spiralBalance = $("#spiral_balance_score").val();
    var bentKneeVUp = $("#bent_knee_v_up_score").val();
    var frontSplitL = $("#front_split_left_score").val();
    var frontSplitR = $("#front_split_right_score").val();
    var standingSpiral = $("#standing_spiral_score").val();
    var seatedReach = $("#seated_reach_score").val();
    var lumbarExtension = $("#lumbar_extension_score").val();


    //data to be sent to the restdb 

    var jsondata = {
        "skater_name": skaterName,
        "skate_level": skateLevel,
        "age": skaterAge,
        "height": skaterHeight,
        "right_leg_length": legLengthR,
        "left_leg_length": legLengthL,
        // power & strenght
        "single_leg_bound_left_score": singleLegBoundL,
        "single_leg_bound_right_score": singleLegBoundR,
        "vertical_jump_score": verticalJump,
        "push_up_score": pushUp,
        "tuck_jump_score": tuckJump,
        // agility, balance & coordination
        "hex_jump_score": hexJump,
        "side_plank_score": sidePlank,
        "spiral_balance_score": spiralBalance,
        "bent_knee_v_up_score": bentKneeVUp,
        // flexibility
        "front_split_left_score": frontSplitL,
        "front_split_right_score": frontSplitR,
        "standing_spiral_score": standingSpiral,
        "seated_reach_score": seatedReach,
        "lumbar_extension_score": lumbarExtension,

    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skatersdevelopment-e504.restdb.io/rest/students",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5fdd6af7ff9d670638140729",
            "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
};   

$("#studentform")[0].reset();

    //this done is the creation of new information
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateStudentList();
    });

});

function updateStudentList() {
    //function to update card list
    $.ajax(settings).done(function (response) {

        var studentListContent = $("#studentListContent");
        studentListContent.html();
        
        for (var i = 0; i < response.length; i++) {
            var skater_name = response[i].skater_name;
            var skate_level = response[i].skate_level;
            var skaterCard = `
                <div class="card" style="width:15rem;">
                    <div class="card-body">    
                        <a href="#" class="update" id="${skater_name}">${skater_name}</a>
                        <p>${skate_level}</p>
                    </div>
                </div>`;
            studentListContent.append(skaterCard);
        }
        //add card
        console.log(response);
    });
    location.href="index.html";
};

});

function evaluateFlexibility() {
    // function to compile flexibility score
    $.ajax(settings).done(function (response) {

    var maxStandingSpiral = ($("#right_leg_length").val()) + ($("#left_leg_length").val());
    var hypotenuse = Math.SQRT1_2(($("#right_leg_length").val())*2 + ($("#left_leg_length").val())*2);
    
    if (($("#standing_spiral_score").val()) === maxStandingSpiral) {
        flexibilityScore += 5;
    }
    else if (($("#standing_spiral_score").val()) >= 1.75*hypotenuse) {
        flexibilityScore += 4;
    }
    else if (($("#standing_spiral_score").val()) >= 1.5*hypotenuse) {
        flexibilityScore += 3;
    }
    else if (($("#standing_spiral_score").val()) >= 1.25*hypotenuse) {
        flexibilityScore += 2;
    }
    else {
        flexibilityScore += 1;
    }
    console.log(response);
    return flexibilityScore;

});
}