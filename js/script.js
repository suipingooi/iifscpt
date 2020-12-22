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
}

//response here means all the api information that is sent back
$.ajax(settings).done(function (response) {

    var studentListContent = $("#studentListContent");
    //students data
    for (var i = 0; i < response.length; i++) {
        var skater_name = response[i].skater_name;
        var skate_level = response[i].skate_level;
        var flexibility_score = response[i].flexibility_score;
        var studentDetails = `
            <tr>
            <td><a href="#" class="update" id="${skater_name}">${skater_name}</a></td>
            <td>${skate_level}</td>
            <td>${flexibility_score}</td>
            </tr>`;
        studentListContent.append(studentDetails);
    }
    //add rows to the table
    console.log(response);
});

//create event listener whenever user clicks on student hyperlink
$(".update").on("click",function(e){
    e.preventDefault();
    console.log("skaterName" + $(this).attr("skaterName"));
});

//add a new student

$("#btnSubmit").on("click", function (e) {
    e.preventDefault();
    //if empty show error
    if ($("#skate_level").val() === "") {
        //show error
    }
    
    var skateLevel = $("#skate_level").val();
    var skaterName = `${$("#skater_family").val()}_${$("#skater_given").val()}`;
    var skaterAge = $("#age").val();
    var skaterHeight = $("#height").val();
    var legLengthR = $("right_leg_length").val();
    var legLengthL = $("left_leg_length").val();
    var singleLegBoundL = $("#single_leg_bound_left_score").val();
    var singleLegBoundR = $("#ssingle_leg_bound_right_score").val();
    var verticalJump = $("#vertical_jump_score").val();
    var pushUp = $("#push_up_score").val();
    var tuckJump = $("#tuck_jump_score").val();
    var hexJump = $("#hex_jump_score").val();
    var sidePlank = $("#side_plank_score").val();
    var spiralBalance = $("#spiral_balance_score").val();
    var bentKneeVUp = $("#bent_knee_v_up_score").val();
    var frontSplitL = $("#front_split_left_score").val();
    var frontSplitR = $("#front_split_right_score").val();
    var standingSpiral = $("standing_spiral_score").val();
    var seatedReach = $("seated_reach_score").val();
    var lumbarExtension = $("lumbar_extension_score").val();

    //data to be sent to the restdb 

    var jsondata = {
        "skater_name": skaterName,
        "skate_level": skateLevel,
        "age": skaterAge,
        "height": skaterHeight,
        "right_leg_length": legLengthR,
        "left_leg_length": legLengthL,
        "single_leg_bound_left_score": singleLegBoundL,
        "single_leg_bound_right_score": singleLegBoundR,
        "vertical_jump_score": verticalJump,
        "push_up_score": pushUp,
        "tuck_jump_score": tuckJump,
        "hex_jump_score": hexJump,
        "side_plank_score": sidePlank,
        "spiral_balance_score": spiralBalance,
        "bent_knee_v_up_score": bentKneeVUp,
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
}

function evaluatePowerStrength() {
    
}

    //this done is the creation of new information
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateTable();
    });
});

function updateTable() {
    //function to update table again
    $.ajax(settings).done(function (response) {

        var studentListContent = $("#studentListContent");
        studentListContent.html();
        //student_name 
        //student_location
        //student_id
        for (var i = 0; i < response.length; i++) {
            var skater_name = response[i].skater_name;
            var skate_level = response[i].skate_level;
            var studentDetails = `
            <tr>
            <td>${skater_name}</td>
            <td>${skate_level}</td>
            </tr>`;
            studentListContent.append(studentDetails);
        }
        //add rows to the table
        console.log(response);
    });
}



});