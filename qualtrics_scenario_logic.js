Qualtrics.SurveyEngine.addOnload(function() {
    /*****************************************
     * 1) Define arrays of possible values
     *****************************************/
    var prices        = [0, 0.06, 0.12, 0.3, 0.45];     // $/kWh
    var SoCs          = [25, 40, 55, 70];           // %
    var stopDurations = [15, 30, 60, 120, 240];
    var chargerTypes  = [11, 50];                   // kW
    var distances     = ["5 km (3 miles)", "15 km (9.3 miles)", "35 km (21.7 miles)", "100 km (62 miles)"];

    /*****************************************
     * 2) Function to retrieve or generate values
     *****************************************/
    function getOrGenerateEmbeddedData(key, array) {
        var value = Qualtrics.SurveyEngine.getEmbeddedData(key);
        if (value === null || value === "") {
            value = array[Math.floor(Math.random() * array.length)];
            Qualtrics.SurveyEngine.setEmbeddedData(key, value);
        }
        return value;
    }

    /*****************************************
     * 3) Retrieve or assign persistent randomized values
     *****************************************/
    var price        = getOrGenerateEmbeddedData("Scenario9_Price", prices);
    var soc          = getOrGenerateEmbeddedData("Scenario9_SoC", SoCs);
    var distance     = getOrGenerateEmbeddedData("Scenario9_Distance", distances);
    var stopDuration = getOrGenerateEmbeddedData("Scenario9_StopDuration", stopDurations);
    var chargerPower = getOrGenerateEmbeddedData("Scenario9_ChargerPower", chargerTypes);

    /*****************************************
     * 4) Retrieve battery capacity from QID67
     *****************************************/
    var batteryCapacity = parseFloat("${q://QID67/ChoiceTextEntryValue}");
    
    // Safety check in case blank or non-numeric
    if (isNaN(batteryCapacity) || batteryCapacity <= 0) {
        batteryCapacity = 60; // fallback default
    }

    /*****************************************
     * 5) Compute charging time and cost
     *****************************************/
    var kWhNeeded     = ((100 - soc) / 100) * batteryCapacity;
    var hoursToFull   = kWhNeeded / chargerPower;
    var minutesToFull = Math.round(hoursToFull * 60);

    var actualChargeMinutes = Math.min(minutesToFull, stopDuration);
    var fractionCharged    = (minutesToFull > 0) ? (actualChargeMinutes / minutesToFull) : 0;
    var kWhActuallyCharged = fractionCharged * kWhNeeded;
    var cost               = price * kWhActuallyCharged;
    cost = Math.round(cost);

    function formatMinutes(m) {
        return m < 60 ? m + " minutes" : Math.floor(m / 60) + "h " + (m % 60) + "m";
    }

    function formatStopDuration(d) {
        switch(d) {
            case 15: return "15 minutes";
            case 30: return "30 minutes";
            case 60: return "1 hour";
            case 120: return "2 hours";
            case 240: return "4 hours";
            default: return d + " minutes";
        }
    }

    // Determine charger type description
    var chargerTypeDesc = (chargerPower === 50) ? "fast charger" : "level 2 charger";
      
	var stopDurationString     = formatStopDuration(stopDuration);
    var actualChargeTimeString = formatMinutes(actualChargeMinutes);
    var finalSoC = Math.round(soc + fractionCharged * (100 - soc));
	
    // Create the charging outcome description
    var chargingOutcome;
    if (finalSoC >= 91) {
        chargingOutcome = "You can <strong>fully charge</strong> at a cost of <strong>$" + cost + "</strong>.";
    } else {
        chargingOutcome = "Your battery could reach <strong>" + finalSoC + "%</strong> at a cost of <strong>$" + cost + "</strong>.";
    } 

    /*****************************************
     * 6) Build and insert the scenario text
     *****************************************/
    var scenarioText = 
        "Scenario <strong>9/16</strong><br><br>" + 
        "You're stopping for <strong>" + stopDurationString + "</strong> and a <strong>" + chargerTypeDesc + "</strong> is available.<br><br>" +
        "Your EV is at <strong>" + soc + "%</strong> battery.<br><br>" +
        "You have <strong>" + distance + "</strong> left to drive today.<br><br>" +
        chargingOutcome + "<br><br>" +
        "Would you charge your vehicle in this scenario?";

    document.getElementById("scenario-container").innerHTML = scenarioText;
});
