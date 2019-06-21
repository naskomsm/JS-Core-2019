function solve(jsFund,jsAdv,jsApplications,type){
    let jsFundamentals = 170;
    let jsAdvanced = 180;
    let jsApps = 190;

    let price = 0;

    if(jsFund){
        price += jsFundamentals;

        if(jsAdv){
            price += jsAdvanced - (jsAdvanced / 10);
        }
    }
    if(jsApplications){
        price += jsApps; 
    }
    if(jsFund && jsAdv && jsApplications){
        price += (170+180+190) - ((170 + 180 + 190) / 6);
    }

    if(type == "online"){
        price -= price * 0.06;
    }
    
    console.log(Math.round(price));
}

solve(true, false, false, "online");