"use strict";

namespace app.classes {
    export abstract class Vehicle {
        /**
         * Constructor for the Vehicle class
         * @param  {number} publichorsepower   [description: Horsepower in the engine]
         * @param  {number} publicnumSeated    [description: How many seats are in the car]
         * @param  {string} publicmanufacturer [description: Who made the car]
         * @return {[type]}                    [description]
         */
        constructor (
            public horsepower: number,
            public numSeated: number,
            public manufacturer: string
        ) {};
    }

    export class Car extends Vehicle {
        /**
         * creates a new instance of the Car class.
         * @param  {number} horsepower     [description: Horsepower in the engine]
         * @param  {number} numSeated      [description: How many seats are in the car]
         * @param  {string} manufacturer   [description: Who made the car]
         * @param  {string} publiccategory [description]
         * @return {[type]}                [description]
         */
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
        /**
         * Creates a new instance of the Motorcycle class.
         * @param  {number}  horsepower      [description: Horsepower]
         * @param  {number}  numSeated       [description]
         * @param  {string}  manufacturer    [description]
         * @param  {boolean} publiclooksCool [description]
         * @return {[type]}                  [description]
         */
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
        /**
         * creates a new instance of the Boat class
         * @param  {number} horsepower       [description:Horsepower in the engine]
         * @param  {number} numSeated        [description: How many seats?]
         * @param  {string} manufacturer     [description: who made it?]
         * @param  {number} publicnumEngines [description: number of engines]
         * @return {[type]}                  [description]
         */
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
        // <h1>${item.constructor.toString().match(/\w+/g)[1]}</h1> should show the class name for the object
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
        document.getElementById('vehicle-results').innerHTML = elemString;
    }

    //select is the select element from the HTML. It comes from passing 'this' into the params on the HTML
    export function selectType(select: HTMLSelectElement) {
        let placeholder: string;
        if (select.value === "Car") placeholder = "Category...";
        if (select.value === "Boat") placeholder = "NUmber of Engines...";
        if (select.value === "Motorcycle") placeholder = "Does it look cool? (yes or no)";
        document.getElementById('secondaryPropInput').innerHTML = `<input class="form-control" type="text" id="inputSecondary" placeholder="${placeholder}"/>`
    }

    export function createVehicle(event: Event) {
        // preventDefault() is preventing the page from refreshing from the form being submitted
        event.preventDefault();
        // get all of the values from the inputs
        let horsepower = $('#inputHP').val();
        let numSeats = $('#inputNumSeats').val();
        let manufacturer = $('#inputManu').val();
        let type = $('#inputType').val();
        let secondary = $('#inputSecondary').val();

        // Create the 'vehicle' object
        let vehicle: app.classes.Vehicle;
        if (type === 'Car') vehicle = new app.classes.Car(horsepower, numSeats, manufacturer, secondary);
        if (type === 'Boat') vehicle = new app.classes.Boat(horsepower, numSeats, manufacturer, secondary);
        if (type === 'Motorcycle') vehicle = new app.classes.Motorcycle(horsepower, numSeats, manufacturer, secondary);

        // add the newly created vehicle to the vehicle array
        vehicles.push(vehicle);

        // redraw all of the vehicles on the page
        displayVehicles();
    }

    //call functions
    displayVehicles();
} //end of app namespace
