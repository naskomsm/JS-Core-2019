function solve(name,age,weight,height){
    let object= {
        name: `${name}`,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: 0,
        status: ``
    };

    // BMI calculations
    let heightInMeters = height / 100;
    let BaseMassIndex =  weight / (heightInMeters * heightInMeters);
    object.BMI = Math.round(BaseMassIndex);

    // status
    if(BaseMassIndex < 18.5){
        object.status = 'underweight';
    }
    else if(BaseMassIndex > 18.5 && BaseMassIndex < 25){
        object.status = 'normal';
    }
    else if(BaseMassIndex > 25 && BaseMassIndex < 30){
        object.status = 'overweight';
    }
    else if(BaseMassIndex >= 30){
        object.status = 'obese';
        object['recommendation'] = 'admission required';
    }

    return object;
}

console.log(solve('Atanad', 18, 81, 188));