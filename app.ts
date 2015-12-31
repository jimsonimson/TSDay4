"use strict";

namespace app.classes {
    export abstract class Vehicle {
        constructor (
            public horsepower: number,
            public numSeated: number,
            public manufacturer: string
        ) {};
    }

    export class Car extends Vehicle {
        constructor (
            horsepower: number,
            numSeated: number,
            manufacturer: string,
            public category: string
        ) {
            super(horsepower, numSeated, manufacturer);
        }
    }

    export class Motorcycle extends Vehicle {
        constructor(
            horsepower: number,
            numSeated: number,
            manufacturer:string,
            public looksCool: boolean
        ) {
            super(horsepower, numSeated, manufacturer);
        }
    }

    export class Boat extends Vehicle {
        constructor(
            horsepower: number,
            numSeated: number,
            manufacturer:string,
            public numEngines: number
        ) {
            super(horsepower, numSeated, manufacturer);
        }
    }
}

namespace app {
    // seed our array with a vehicle of each type
    let boat = new app.classes.Boat(200, 5, "Wellcraft", 1);
    let car = new app.classes.Car(600, 2, "Ford", "Sports Car");
    let motorcycle = new app.classes.Motorcycle(500, 1, "Yamaha", true);
    export let vehicles: app.classes.Vehicle[] = [boat, car, motorcycle];

    function displayVehicles() {
        let elemString = '';
        vehicles.forEach((item) => elemString += `
        <div class="col-sm-12">
            <div class ="well">
                <h1>${item.constructor.toString().match(/\w+/g)[1]}</h1>
                <h3>horsepower: ${item.horsepower}</h3>
                <h3>number of seats: ${item.numSeated}</h3>
                <h3>manufacturer: ${item.manufacturer}</h3>
            </div>
        </div>
        `);
        document.getElementById('vehicle-results').innerHTML = elemString
    }

    export function selectType(select: HTMLSelectElement) {
        // alert((<HTMLInputElement>document.getElementById('inputType')).value); //tests if its working
        let placeholder: string;
        if (select.value === "Car") placeholder = "Category...";
        if (select.value === "Boat") placeholder = "NUmber of Engines...";
        if (select.value === "Motorcycle") placeholder = "Does it look cool? (yes or no)";
        document.getElementById('secondaryPropInput').innerHTML = `<input class="form-control" type="text" id="inputSecondary" placeholder="${placeholder}"/>`
    }

    export function createVehicle(event: Event) {
        event.preventDefault();
        console.log("Create Vehicle");
    }

    //call functions
    displayVehicles();
} //end of app namespace
