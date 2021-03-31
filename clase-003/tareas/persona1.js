//functions
calculateInsurancePerc = function(pYear){
    var retValue = 0;
    switch (true) {
        case (pYear<=1975):
            retValue = 0;
            break;
        case (pYear>1975 && pYear <= 1995):
            retValue = 0.5;
            break;
        case (pYear>1995 && pYear <= 2005):
            retValue = 0.9;
            break
        case (pYear>2005):
            retValue = 1.5;
            break;
    }
    return retValue;
}

//main

var cars = [];

cars.push({brand:'Fiat',model:'600',year:1975,value:70000,insurance:0});
cars.push({brand:'Volkswagen',model:'Gol',year:2006,value:240000,insurance:0});
cars.push({brand:'Volkswagen',model:'Fox',year:2012,value:380000,insurance:0});
cars.push({brand:'Renault',model:'Clio',year:1998,value:14000,insurance:0});
cars.push({brand:'Renault',model:'9',year:1989,value:124500,insurance:0});
cars.push({brand:'Ford',model:'Fiesta',year:1998,value:130000,insurance:0});
cars.push({brand:'Ford',model:'Ka',year:2001,value:220000,insurance:0});
cars.push({brand:'Chevrolet',model:'Serie 2 INMACULADO',year:1979,value:360000,insurance:0});

var totalInsurances = 0;

cars.forEach(function(car) {
    car.insurance = car.value * calculateInsurancePerc(car.year) / 100;
    totalInsurances += car.insurance;
    console.log(`El vehiculo ${car.brand} ${car.model} pagará $${car.insurance}`); 
});

console.log(`Total a pagar $${totalInsurances}`);
