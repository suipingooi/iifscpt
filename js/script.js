console.log("Skater Development Profiling System");
$(document).ready(function () {
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

    var skaterListContent = $("#skaterListContent");
    for (var i = 0; i < response.length; i++) {
        var skater_name = response[i].skater_name;
        var skate_level = response[i].skate_level;
        var f_score = response[i].flexibility_score;
        var ps_score = response[i].power_strength_score;
        var abc_score = response[i].agility_balance_coordination_score;
        var skaterCard = `
                <div class="card" style="width:15rem;">
                    <div class="card-body">    
                        <a href="#" class="update" id="${skater_name}" data-toggle="modal" data-target="#modal" data-name="${skater_name}" data-fscore="${f_score}" data-psscore="${ps_score}" data-abcscore="${abc_score}">${skater_name}</a>
                        <p>${skate_level}</p>
                    </div>
                </div>
                <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div class="modal-body">
                            <p id="fscore">Flexibility Score</p>
                            <p id="psscore">Power & Strength Score</p>
                            <p id="abcscore">Agility, Balance & Coordination Score</p>
                        </div>
                        <canvas id="modalChart"></canvas>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>`;
        skaterListContent.append(skaterCard);
    }

    $('#modal').on('show.bs.modal', function (event) {
        var a = $(event.relatedTarget); 
        var modalSkaterName = a.data('name');
        var modalFScore = a.data('fscore');
        var modalPSScore = a.data('psscore');
        var modalABCScore = a.data('abcscore');
        var ctx = $("#modalChart")
        var modal = $(this);
        modal.find('.modal-title').text(modalSkaterName);
        modal.find('.modal-body #fscore').text(modalFScore + " : Flexibility");
        modal.find('.modal-body #psscore').text(modalPSScore + " : Power & Strength");
        modal.find('.modal-body #abcscore').text(modalABCScore + " : Agility, Balance & Coordination");
        var modalChart = new Chart(ctx, {
            // The type of chart we want to create
            type: "radar",
        
            // The data for our dataset
            data: {
                labels: ["Agility, Balance & Coordination", "Flexibility", "Power & Strength"],
                datasets: [{
                    label: modalSkaterName,
                    backgroundColor: "#26B3F1",
                    borderColor: "#26B3F1",
                    data: [modalABCScore, modalFScore, modalPSScore]
                }]
            },
            options: {}
        });
    });
    console.log(response); 
});

//SDP Scoresheet Form
//adding new skater card and fitness data
$("#btnSubmit").on("click", function (e) {
    e.preventDefault();
    if ((($("#skater_family").val() === "") && ($("#skater_given").val() === "")) || (($("#age").val() === ""))) {
        alert("required fields are empty");
    }
    else {
        alert("Submission is Successful");
}

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

    var flexibilityScore = 0;
    //function to evaluate flexibility
    function evaluateFlexibility() {
    var skaterAge = parseInt($("#age").val());
    var legLengthR = parseInt($("#right_leg_length").val());
    var legLengthL = parseInt($("#left_leg_length").val());
    var maxSplit = parseInt($("#right_leg_length").val()) + parseInt($("#left_leg_length").val());
    var hypotenuse = Math.sqrt((legLengthL*legLengthL)+(legLengthR*legLengthR));
        //standingSpiral
    var standingSpiral = parseInt($("#standing_spiral_score").val());
        if (standingSpiral === maxSplit) {
          flexibilityScore += 5;
            }
            else if (standingSpiral >= hypotenuse) {
                flexibilityScore += 4;
            }
            else if (standingSpiral >= 0.75*hypotenuse) {
                flexibilityScore += 3;
            }
            else if (standingSpiral >= 0.5*hypotenuse) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore += 1;
            }
        //lumbarExtension
    var lumbarExtension = parseInt($("#lumbar_extension_score").val());
        if (lumbarExtension <= 10) {
                flexibilityScore += 5;
            }
            else if (lumbarExtension  <=15) {
                flexibilityScore += 4;
            }
            else if (lumbarExtension  <=30) {
                flexibilityScore += 3;
            }
            else if (lumbarExtension  <=50) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore += 1;
            }
        //frontSplit
    var averageSplit = ((frontSplitL + frontSplitR)/2);
        if (averageSplit === maxSplit) {
                flexibilityScore += 5;
            }
            else if (averageSplit >= 0.75*maxSplit) {
                flexibilityScore += 4;
            }
            else if (averageSplit >= 0.5*maxSplit) {
                flexibilityScore += 3;
            }
            else if (averageSplit >= 0.25*maxSplit) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore += 1;
            }
        //seatedReach
    var seatedReach = parseInt($("#seated_reach_score").val());
        if (skaterAge === 15 || skaterAge === 19) {
            if (seatedReach > 45) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 43) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 39) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 35) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge >= 16 && skaterAge < 19) {
            if (seatedReach > 46) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 44) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 40) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 36) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge === 14) {
            if (seatedReach > 43) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 41) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 38) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 34) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge === 13) {
            if (seatedReach > 41) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 39) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 36) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 32) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge === 12) {
            if (seatedReach > 39) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 37) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 34) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 30) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (seatedReach > 37) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 35) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 32) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 28) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge === 10) {
            if (seatedReach > 35) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 33) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 30) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 26) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
        else if (skaterAge <= 9) {
            if (seatedReach > 33) {
                flexibilityScore += 5;
            }
            else if (seatedReach >= 31) {
                flexibilityScore += 4;
            }
            else if (seatedReach >= 28) {
                flexibilityScore += 3;
            }
            else if (seatedReach >= 24) {
                flexibilityScore += 2;
            }
            else {
                flexibilityScore +=1;
            }
        }
    return flexibilityScore;
    } 
    
    var ABCScore = 0;
    //function to evaluate agility, balance and coordination (ABC)
    function evaluateABC() {  
    var skaterAge = parseInt($("#age").val());

        //spiralBalance
    var spiralBalance = parseInt($("#spiral_balance_score").val());
        if (spiralBalance >= 100) {
        ABCScore += 5;
        }
        else if (spiralBalance >= 60) {
            ABCScore += 4;
        }
        else if (spiralBalance >= 45) {
            ABCScore += 3;
        }
        else if (spiralBalance >= 30) {
            ABCScore += 2;
        }
        else {
            ABCScore += 1;
        }
        //sidePlank
    var sidePlank = parseInt($("#side_plank_score").val());    
        if (sidePlank >= 100) {
        ABCScore += 5;
        }
        else if (sidePlank >= 60) {
            ABCScore += 4;
        }
        else if (sidePlank >= 45) {
            ABCScore += 3;
        }
        else if (sidePlank >= 30) {
            ABCScore += 2;
        }
        else {
            ABCScore += 1;
        }
        //hexJump
    var hexJump = parseInt($("#hex_jump_score").val());
        if (skaterAge >= 16 && skaterAge <= 19) {
            if (hexJump < 11.3) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.3) {
                ABCScore += 4;
            }
            else if (hexJump >= 11.6) {
                ABCScore += 3;
            }
            else if (hexJump >= 11.9 && hexJump <= 12.2) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 15) {
            if (hexJump < 11.3) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.3) {
                ABCScore += 4;
            }
            else if (hexJump >= 11.7) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.1 && hexJump <= 12.5) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 14) {
            if (hexJump < 11.3) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.3) {
                ABCScore += 4;
            }
            else if (hexJump >= 11.7) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.3 && hexJump <= 12.8) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 13 || skaterAge === 12) {
            if (hexJump < 11.5) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.5) {
                ABCScore += 4;
            }
            else if (hexJump >= 12.0) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.4 && hexJump <= 12.7) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (hexJump < 11.6) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.6) {
                ABCScore += 4;
            }
            else if (hexJump >= 12.2) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.6 && hexJump <= 12.9) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 10) {
            if (hexJump < 11.7) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.7) {
                ABCScore += 4;
            }
            else if (hexJump >= 12.3) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.8 && hexJump <= 13.2) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge <=9) {
            if (hexJump < 11.8) {
                ABCScore += 5;
            }
            else if (hexJump >= 11.8) {
                ABCScore += 4;
            }
            else if (hexJump >= 12.4) {
                ABCScore += 3;
            }
            else if (hexJump >= 12.9 && hexJump <= 13.3) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        //benKneeVUp
    var bentKneeVUp = parseInt($("#bent_knee_v_up_score").val());
        if (skaterAge === 18 || skaterAge === 19) {
            if (bentKneeVUp > 15) {
                ABCScore += 5;
            }
            else if (bentKneeVUp === 15) {
                ABCScore += 4;
            }
            else if (bentKneeVUp === 14) {
                ABCScore += 3;
            }
            else if (bentKneeVUp === 13) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 17) {
            if (bentKneeVUp > 15) {
                ABCScore += 5;
            }
            else if (bentKneeVUp === 15) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 13) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 11) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }   
        else if (skaterAge === 15 || skaterAge === 16) {
            if (bentKneeVUp > 15) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 14) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 12) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 10) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 13 || skaterAge === 14) {
            if (bentKneeVUp > 15) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 14) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 11) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 9) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 12) {
            if (bentKneeVUp > 15) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 13) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 11) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 8) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (bentKneeVUp > 14) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 12) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 10) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 8) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge === 10) {
            if (bentKneeVUp > 14) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 13) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 10) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 7) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
        else if (skaterAge <= 9) {
            if (bentKneeVUp > 13) {
                ABCScore += 5;
            }
            else if (bentKneeVUp >= 12) {
                ABCScore += 4;
            }
            else if (bentKneeVUp >= 10) {
                ABCScore += 3;
            }
            else if (bentKneeVUp >= 7) {
                ABCScore += 2;
            }
            else {
                ABCScore +=1;
            }
        }
    return ABCScore;
    }
    
    var PSScore = 0;
    //function to evaluate power & strength
    function evaluatePowerStrength() {
    var skaterAge = parseInt($("#age").val());
        //singleLegBound
    var singleLegBoundL = parseInt($("#single_leg_bound_left_score").val());
    var singleLegBoundR = parseInt($("#single_leg_bound_right_score").val());
    var averageBound = (singleLegBoundL + singleLegBoundR)/2;
        if (skaterAge === 19) {
            if (averageBound > 97) {
                PSScore += 5;
            }
            else if (averageBound >= 93) {
                PSScore += 4;
            }
            else if (averageBound >= 87) {
                PSScore += 3;
            }
            else if (averageBound >= 83) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 18) {
            if (averageBound > 96) {
                PSScore += 5;
            }
            else if (averageBound >= 92) {
                PSScore += 4;
            }
            else if (averageBound >= 87) {
                PSScore += 3;
            }
            else if (averageBound >= 83) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 17) {
            if (averageBound > 94) {
                PSScore += 5;
            }
            else if (averageBound >= 91) {
                PSScore += 4;
            }
            else if (averageBound >= 86) {
                PSScore += 3;
            }
            else if (averageBound >= 81) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 16) {
            if (averageBound > 93) {
                PSScore += 5;
            }
            else if (averageBound >= 89) {
                PSScore += 4;
            }
            else if (averageBound >= 85) {
                PSScore += 3;
            }
            else if (averageBound >= 79) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 15) {
            if (averageBound > 91) {
                PSScore += 5;
            }
            else if (averageBound >= 87) {
                PSScore += 4;
            }
            else if (averageBound >= 83) {
                PSScore += 3;
            }
            else if (averageBound >= 78) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 14) {
            if (averageBound > 88) {
                PSScore += 5;
            }
            else if (averageBound >= 85) {
                PSScore += 4;
            }
            else if (averageBound >= 80) {
                PSScore += 3;
            }
            else if (averageBound >= 76) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 13) {
            if (averageBound > 85) {
                PSScore += 5;
            }
            else if (averageBound >= 81) {
                PSScore += 4;
            }
            else if (averageBound >= 77) {
                PSScore += 3;
            }
            else if (averageBound >= 71) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 12) {
            if (averageBound > 83) {
                PSScore += 5;
            }
            else if (averageBound >= 80) {
                PSScore += 4;
            }
            else if (averageBound >= 75) {
                PSScore += 3;
            }
            else if (averageBound >= 70) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (averageBound > 82) {
                PSScore += 5;
            }
            else if (averageBound >= 78) {
                PSScore += 4;
            }
            else if (averageBound >= 74) {
                PSScore += 3;
            }
            else if (averageBound >= 68) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 10) {
            if (averageBound > 80) {
                PSScore += 5;
            }
            else if (averageBound >= 76) {
                PSScore += 4;
            }
            else if (averageBound >= 72) {
                PSScore += 3;
            }
            else if (averageBound >= 67) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge <= 9) {
            if (averageBound > 79) {
                PSScore += 5;
            }
            else if (averageBound >= 74) {
                PSScore += 4;
            }
            else if (averageBound >= 70) {
                PSScore += 3;
            }
            else if (averageBound >= 65) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        //tuckJump
    var tuckJump = parseInt($("#tuck_jump_score").val());
        if (skaterAge >= 17 && skaterAge <= 19) {
            if (tuckJump > 15) {
                PSScore += 5;
            }
            else if (tuckJump === 15) {
                PSScore += 4;
            }
            else if (tuckJump >= 13) {
                PSScore += 3;
            }
            else if (tuckJump >= 11) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 16 || skaterAge === 15) {
            if (tuckJump > 15) {
                PSScore += 5;
            }
            else if (tuckJump >= 14) {
                PSScore += 4;
            }
            else if (tuckJump >= 12) {
                PSScore += 3;
            }
            else if (tuckJump >= 10) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 14 || skaterAge === 13) {
            if (tuckJump > 15) {
                PSScore += 5;
            }
            else if (tuckJump >= 14) {
                PSScore += 4;
            }
            else if (tuckJump >= 11) {
                PSScore += 3;
            }
            else if (tuckJump >= 9) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 12) {
            if (tuckJump > 15) {
                PSScore += 5;
            }
            else if (tuckJump >= 13) {
                PSScore += 4;
            }
            else if (tuckJump >= 11) {
                PSScore += 3;
            }
            else if (tuckJump >= 8) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (tuckJump > 14) {
                PSScore += 5;
            }
            else if (tuckJump >= 12) {
                PSScore += 4;
            }
            else if (tuckJump >= 10) {
                PSScore += 3;
            }
            else if (tuckJump >= 8) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 10) {
            if (tuckJump > 14) {
                PSScore += 5;
            }
            else if (tuckJump >= 13) {
                PSScore += 4;
            }
            else if (tuckJump >= 10) {
                PSScore += 3;
            }
            else if (tuckJump >= 7) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge <= 9) {
            if (tuckJump > 13) {
                PSScore += 5;
            }
            else if (tuckJump >= 12) {
                PSScore += 4;
            }
            else if (tuckJump >= 10) {
                PSScore += 3;
            }
            else if (tuckJump >= 7) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        //verticalJump
    var verticalJump = parseInt($("#vertical_jump_score").val());
        if (verticalJump >= 50) {
            PSScore += 5;
        }
        else if (verticalJump >= 40) {
            PSScore += 4;
        }
        else if (verticalJump >= 30) {
            PSScore += 3;
        }
        else if (verticalJump >= 20) {
            PSScore += 2;
        }
        else {
            PSScore += 1;
        }
        //pushUp
    var pushUp = parseInt($("#push_up_score").val());
        if (skaterAge === 19 || skaterAge === 18) {
            if (pushUp > 14) {
                PSScore += 5;
            }
            else if (pushUp >= 13) {
                PSScore += 4;
            }
            else if (pushUp >= 10) {
                PSScore += 3;
            }
            else if (pushUp >= 7) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 17 || skaterAge === 16) {
            if (pushUp > 14) {
                PSScore += 5;
            }
            else if (pushUp >= 12) {
                PSScore += 4;
            }
            else if (pushUp >= 9) {
                PSScore += 3;
            }
            else if (pushUp >= 6) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge >= 13 && skaterAge <= 15) {
            if (pushUp > 13) {
                PSScore += 5;
            }
            else if (pushUp >= 12) {
                PSScore += 4;
            }
            else if (pushUp >= 9) {
                PSScore += 3;
            }
            else if (pushUp >= 6) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 12) {
            if (pushUp > 12) {
                PSScore += 5;
            }
            else if (pushUp >= 10) {
                PSScore += 4;
            }
            else if (pushUp >= 8) {
                PSScore += 3;
            }
            else if (pushUp >= 6) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge === 11) {
            if (pushUp > 12) {
                PSScore += 5;
            }
            else if (pushUp >= 11) {
                PSScore += 4;
            }
            else if (pushUp >= 8) {
                PSScore += 3;
            }
            else if (pushUp >= 5) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
        else if (skaterAge <= 10) {
            if (pushUp > 10) {
                PSScore += 5;
            }
            else if (pushUp >= 9) {
                PSScore += 4;
            }
            else if (pushUp >= 6) {
                PSScore += 3;
            }
            else if (pushUp >= 4) {
                PSScore += 2;
            }
            else {
                PSScore +=1;
            }
        }
    return PSScore;
    }

    PSScore = evaluatePowerStrength();
    ABCScore = evaluateABC();
    flexibilityScore = evaluateFlexibility();
    
    //data to be sent to the restdb 
    var jsondata = {
        "skater_name": skaterName,
        "skate_level": skateLevel,
        "age": skaterAge,
        "height": skaterHeight,
        "right_leg_length": legLengthR,
        "left_leg_length": legLengthL,
        // power & strength
        "power_strength_score": PSScore,
        "single_leg_bound_left_score": singleLegBoundL,
        "single_leg_bound_right_score": singleLegBoundR,
        "vertical_jump_score": verticalJump,
        "push_up_score": pushUp,
        "tuck_jump_score": tuckJump,
        // agility, balance & coordination
        "agility_balance_coordination_score": ABCScore,
        "hex_jump_score": hexJump,
        "side_plank_score": sidePlank,
        "spiral_balance_score": spiralBalance,
        "bent_knee_v_up_score": bentKneeVUp,
        // flexibility
        "flexibility_score": flexibilityScore,
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

// form reset
$("#studentform")[0].reset();

    //addition of new skater data to skater list
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateSkaterList();
    });

});

//function to update skater list on index page
function updateSkaterList() {
    
    $.ajax(settings).done(function (response) {

        var skaterListContent = $("#skaterListContent");
        skaterListContent.html();
        
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
            skaterListContent.append(skaterCard);
            skaterListContent.reverse();
        }
        //add card
        console.log(response);
    });
    // reloading index page after data submission
    location.href="index.html";
}

});

