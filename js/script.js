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
        var age = response[i].age;
        var f_score = response[i].flexibility_score;
        var f_fsl = response[i].front_split_left_score;
        var f_fsr = response[i].front_split_right_score;
        var f_ss = response[i].standing_spiral_score;
        var f_sr = response[i].seated_reach_score;
        var f_le = response[i].lumbar_extension_score;
        var ps_score = response[i].power_strength_score;
        var ps_vj = response[i].vertical_jump_score;
        var ps_pu = response[i].push_up_score;
        var ps_tj = response[i].tuck_jump_score;
        var ps_slbl = response[i].single_leg_bound_left_score;
        var ps_slbr = response[i].single_leg_bound_right_score;
        var abc_score = response[i].agility_balance_coordination_score;
        var abc_hj = response[i].hex_jump_score;
        var abc_sp = response[i].side_plank_score;
        var abc_sb = response[i].spiral_balance_score;
        var abc_bkvu = response[i].bent_knee_v_up_score;
        var skaterCard = `
                <div class="card" style="width:15rem;">
                    <div class="card-body">    
                        <a href="#" class="update" id="${skater_name}" data-toggle="modal" data-target="#dataModal" 
                            data-age="${age}" 
                            data-level="${skate_level}" 
                            data-name="${skater_name}" 
                            data-fscore="${f_score}" 
                            data-f-fsl="${f_fsl}"
                            data-f-fsr="${f_fsr}"
                            data-f-ss="${f_ss}"
                            data-f-sr="${f_sr}"
                            data-f-le="${f_le}"
                            data-psscore="${ps_score}" 
                            data-ps-vj="${ps_vj}"
                            data-ps-pu="${ps_pu}"
                            data-ps-tj="${ps_tj}"
                            data-ps-slbl="${ps_slbl}"
                            data-ps-slbr="${ps_slbr}"
                            data-abcscore="${abc_score}"
                            data-abc-hj="${abc_hj}"
                            data-abc-sb="${abc_sb}"
                            data-abc-sp="${abc_sp}"
                            data-abc-bkvu="${abc_bkvu}"
                            >${skater_name}
                        </a>
                        <p>${skate_level}</p>
                    </div>
                </div>
                <div class="modal fade" id="dataModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalLabel"></h5>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    <canvas id="modalChart"></canvas>
                                    <div class="row">
                                        <p id="fscore"></p>
                                    </div>
                                    <div class="row">
                                        <div class="col modalcol" id="fss"></div>
                                        <div class="col modalcol" id="fsr"></div>
                                        <div class="col modalcol" id="fle"></div>
                                        <div class="col modalcol" id="ffs"></div>
                                    </div>
                                    <div class="row">
                                        <p id="psscore"></p>
                                    </div>
                                    <div class="row">
                                        <div class="col modalcol" id="psvj"></div>
                                        <div class="col modalcol" id="pstj"></div>
                                        <div class="col modalcol" id="pspu"></div>
                                        <div class="col modalcol" id="psslb"></div>
                                    </div>
                                    <div class="row">
                                        <p id="abcscore"></p>
                                    </div>
                                    <div class="row">
                                        <div class="col modalcol" id="abchj"></div>
                                        <div class="col modalcol" id="abcsp"></div>
                                        <div class="col modalcol" id="abcsb"></div>
                                        <div class="col modalcol" id="abcbkvu"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        skaterListContent.append(skaterCard);
    }

    $("#dataModal").on("show.bs.modal", function (event) {
        var a = $(event.relatedTarget); 
        var modalSkaterName = a.data("name");
        var modalLevel = a.data("level");
        var modalAge = a.data("age");
        var modalFScore = a.data("fscore");
        var modalFfsl = a.data("f-fsl");
        var modalFfsr = a.data("f-fsr");
        var modalFss = a.data("f-ss");
        var modalFsr = a.data("f-sr");
        var modalFle = a.data("f-le");
        var modalPSScore = a.data("psscore");
        var modalPSvj = a.data("ps-vj");
        var modalPStj = a.data("ps-tj");
        var modalPSpu = a.data("ps-pu");
        var modalPSslbl = a.data("ps-slbl");
        var modalPSslbr = a.data("ps-slbr");
        var modalABCScore = a.data("abcscore");
        var modalABChj = a.data("abc-hj");
        var modalABCsp = a.data("abc-sp");
        var modalABCsb = a.data("abc-sb");
        var modalABCbkvu = a.data("abc-bkvu");
        var modal = $(this);
        modal.find('.modal-title').text(modalSkaterName + " (AGE " + modalAge + ") " + modalLevel);
        modal.find('.modal-body #fscore').text("(" + modalFScore + ") Flexibility");
        modal.find('.modal-body #fss').text("Standing Spiral " + modalFss + "cm");
        modal.find('.modal-body #fsr').text("Seated Reach " + modalFsr + "cm");
        modal.find('.modal-body #ffs').text("Front Split " + modalFfsl + "cm(L) " + modalFfsr + "cm(R)");
        modal.find('.modal-body #fle').text("Lumbar Extension " + modalFle + "cm");
        modal.find('.modal-body #psscore').text("(" + modalPSScore + ") Power & Strength");
        modal.find('.modal-body #psvj').text("Vertical Jump " + modalPSvj + "cm");
        modal.find('.modal-body #pstj').text("Tuck Jump " + modalPStj + "count(30s)");
        modal.find('.modal-body #pspu').text("Push Up " + modalPSpu + "count(30s)");
        modal.find('.modal-body #psslb').text("Single Leg Bound " + modalPSslbl + "cm(L) " + modalPSslbr + "cm(R)");
        modal.find('.modal-body #abcscore').text("(" + modalABCScore + ") Agility, Balance & Coordination");
        modal.find('.modal-body #abchj').text("Hexagon Jump " + modalABChj + "sec");
        modal.find('.modal-body #abcsp').text("Side Plank Hold " + modalABCsp + "sec");
        modal.find('.modal-body #abcsb').text("Spiral Balance " + modalABCsb + "sec");
        modal.find('.modal-body #abcbkvu').text("Bent Knee V-Up " + modalABCbkvu + "count(30s)");
        var ctx = $("#modalChart");
        var modalChart = new Chart(ctx, {
            type: "radar",
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
    // if name, height n leg length are empty
    if ((($("#skater_family").val()) === "") || (($("#skater_given").val()) === "") || (($("#right_leg_length").val()) === "") || (($("#left_leg_length").val()) === "") || (($("#height").val()) === "")) {
        $('#alertModal').modal('show');
        return false;
        }
    //if age is not between 7 and 19
    else if (($("#age").val() < 7) || ($("#age").val() >19)) {
        $('#alertModal').modal('show');
        return false;
    }
    //if power & strength fields are empty
    else if ((($("#single_leg_bound_left_score").val()) === "") || (($("#single_leg_bound_right_score").val()) === "") || (($("#vertical_jump_score").val()) === "") || (($("#push_up_score").val()) === "") || (($("#tuck_jump_score").val()) === "")) {
        $('#alertModal').modal('show');
        return false;
    }
    //if aglity, balance & coordination fields are empty
    else if ((($("#hex_jump_score").val()) === "") || (($("#side_plank_score").val()) === "") || (($("#spiral_balance_score").val()) === "") || (($("#bent_knee_v_up_score").val()) === "")) {
        $('#alertModal').modal('show');
        return false;
    }
    //if flexibility fields are empty
    else if ((($("#front_split_left_score").val()) ==="") || (($("#front_split_right_score").val()) === "") || (($("#standing_spiral_score").val()) === "") || (($("#seated_reach_score").val()) === "") || (($("#lumbar_extension_score")) === "")) {
        $('#alertModal').modal('show');
        return false;
    }  
    else {
        $('#successModal').modal('show');
    }
    
    //data variables for evaluation  
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
//eof buttonclick submit   

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

