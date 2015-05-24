function obj(id){
    return document.getElementById(id);
}
function getNumericValue(id){
    var val = obj(id).value;
    if(val == "") {val = NaN;}
    return Number(val);
}
function setValue(id, val){
    if(isNaN(val)) {val = "";}
    return obj(id).value = val;
}

function calculateAmounts(){
    var FirstLoan = getNumericValue("FirstLoan");
    var SecondLoan = getNumericValue("SecondLoan");
    var Appraisal = getNumericValue("Appraisal");
    var LTV = getNumericValue("LTV");
    var CLTV = getNumericValue("CLTV");

    // Convert to decimal, Round to 2 decimal places
    // Note that the result may be off by 0.01 due to precision errors
    //      ...which I am totally OK with for now.
    LTV = Math.round(LTV*100)/10000;
    CLTV = Math.round(CLTV*100)/10000;

    // Just regular rounding here
    FirstLoan = Math.round(FirstLoan);
    SecondLoan = Math.round(SecondLoan);
    Appraisal = Math.round(Appraisal);

    if(!isNaN(FirstLoan) && !isNaN(Appraisal)){
        LTV = FirstLoan / Appraisal;
    }

    if(!isNaN(FirstLoan) && !isNaN(LTV)){
        Appraisal = FirstLoan / LTV;
    }

    if(!isNaN(FirstLoan) && !isNaN(Appraisal)){
        FirstLoan = Appraisal * LTV;
    }

    if(!isNaN(FirstLoan) && !isNaN(SecondLoan) && !isNaN(Appraisal)){
        CLTV = (FirstLoan + SecondLoan) / Appraisal;
    }

    if(!isNaN(CLTV) && !isNaN(FirstLoan) && !isNaN(Appraisal)){
        SecondLoan = Appraisal * CLTV - FirstLoan;
    }

    if(!isNaN(FirstLoan) && !isNaN(SecondLoan) && !isNaN(CLTV)){
        Appraisal = (FirstLoan + SecondLoan) / CLTV;
    }

    if(!isNaN(Appraisal) && !isNaN(SecondLoan) && !isNaN(CLTV)){
        FirstLoan = Appraisal * CLTV - SecondLoan;
    }

    // Convert to percent, round to 2 decimal places
    // Note that the result may be off by 0.01 due to precision errors
    //      ...which I am totally OK with for now.
    LTV = Math.round(LTV*10000)/100;
    CLTV = Math.round(CLTV*10000)/100;

    // Just regular rounding here
    FirstLoan = Math.round(FirstLoan);
    SecondLoan = Math.round(SecondLoan);
    Appraisal = Math.round(Appraisal);

    setValue("FirstLoan",FirstLoan);
    setValue("SecondLoan",SecondLoan);
    setValue("Appraisal",Appraisal);
    setValue("LTV",LTV);
    setValue("CLTV",CLTV);
}

function clearAmounts(){
    setValue("FirstLoan","");
    setValue("SecondLoan","");
    setValue("Appraisal","");
    setValue("LTV","");
    setValue("CLTV","");
}

// once the page buttons exist
document.addEventListener('DOMContentLoaded', function(){
    obj("btn-calculate").onclick = calculateAmounts;
    obj("btn-clear").onclick = clearAmounts;
    obj("FirstLoan").onblur = calculateAmounts;
    obj("SecondLoan").onblur = calculateAmounts;
    obj("Appraisal").onblur = calculateAmounts;
    obj("LTV").onblur = calculateAmounts;
    obj("CLTV").onblur = calculateAmounts;
});
