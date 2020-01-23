// - UI allowing users to feed the animals a pre-determined meal from a select menu
// - UI allowing users to remove an animal
// - A “feed” where all actions are printed to the page (formerly printed to the console).  Actions are: animal fed,
// animal sleep, animal created, animal removed.  Clear the feed (start fresh, don’t append to it) every time
// feedAnimals() is called.
// - A separate UML diagram showing your objects and their relationships
// - Add bootstrap or w3.css styling to your page
//   You’ll need to make edits to your classes in order to write statements to the page rather than to the console.

//REMEMBER TO UPLOAD TO GITHUB AFTER FINAL EXAM SO YOU CAN WORK AT HOME

//Features for HTML:
    //Title <h1>

    //ADDING CREATURES
    //Header for section <h3>
    //Div for just in case you need to explain something (could be deleted later) -- CLASS: byTheWay
        //mention that only certain species can be let in right now
    //Button for adding a new creature -- CLASS: actionButton
        //Text field for name [only visible once button is pressed]
        //Drop-down menu for species [only visible once button is pressed]

    //FEEDING CREATURES
    //Header for section <h3>
    //Div for just in case you need to explain something (could be deleted later) -- CLASS: byTheWay
    //Drop-down menu with meals
    //Button for feeding creatures the meal above -- CLASS: actionButton

    //LISTING CREATURES
    //Header for section <h3>
    //Div for just in case you need to explain something (could be deleted later) -- CLASS: byTheWay
    //Button for listing creatures -- CLASS: actionButton
        //Table showing creatures by name and animal type

    //RELEASING CREATURES
    //Header for section <h3>
    //Div for just in case you need to explain something (could be deleted later) -- CLASS: byTheWay
    //Drop-down menu with current list of creatures
    //Button to release above creatures -- CLASS: actionButton

var creaturePopulation = 0;
var allCreatures = [];
var tracker = 0;

$(document).ready(function() {
    $(".onAdd").hide();
    $("#showOnAdd").click(function() {
        $(".onAdd").show();
    });
    $("#addingButton").click(function() {
        $(".onAdd").hide();
    });

    run();
});

function run() {
    var pickett = new Bowtruckle("Pickett");
    var cecily = new Erumpent("Cecily");
    var pip = new Niffler("Pip");
    var billy = new Billywig("Billy");
    var frank = new Thunderbird("Frank");
    var daniel = new Demiguise("Daniel");

    allCreatures = [pickett, cecily, pip, billy, frank, daniel];
    listCreatures();
    tracker = 6;
}

function listCreatures() {
    var nameSpecies = creatureListArrays();
    var names = nameSpecies[0];
    var species = nameSpecies[1];

    for (var i = 0; i < allCreatures.length; i++) {
        var currentName = names[i];
        var currentSpecies = species[i];
        if (tracker == i || tracker < 6) {
            $("#creatureTable").append("<tr><td class='tableContent'>" + currentName + "</td><td class='tableContent'>" + currentSpecies + "</td></tr>");
        }
    }

    for (var w = 0; w < names.length; w++) {
        if (tracker == w || tracker < 6) {
            $("#currentCreatureDrop").append("<option id = " + names[w] + ">" + names[w] + "</option>");
        }
    }

}

function addCreature() {
    var speciesValue = Number($("#addCreatureMenu").val());
    var newName = $("#nameIt").val();
    if (checkName(newName) == false) {
        alert("It seems we've already got a creature who answers to that name. Could you choose another, please?");
    } else {
        var creature;
        switch (speciesValue) {
            case 1:
                creature = new Bowtruckle(newName);
                break;
            case 2:
                creature = new Erumpent(newName);
                break;
            case 3:
                creature = new Niffler(newName);
                break;
            case 4:
                creature = new Billywig(newName);
                break;
            case 5:
                creature = new Thunderbird(newName);
                break;
            case 6:
                creature = new Demiguise(newName);
                break;
            default:
                alert("Something's gone wrong -- can you try that again?");
        }
        allCreatures[creaturePopulation - 1] = creature;
        listCreatures();
        tracker++;
    }
}

function feedCreatures() {
    // feedAnimals() - a function which uses jQuery .val() to grab the food value (a string) from the page and feed it to
    // each animal.  Results write out in the log.
}

function creatureListArrays() {
    var names = [];
    var types = [];
    for (var i = 0; i < allCreatures.length; i++) {
        names[i] = allCreatures[i].name;
        types[i] = allCreatures[i].constructor.name;
    }

    return [names, types];
}

function releaseCreature(id) {
    var creatureName = $("#currentCreatureDrop").val();
    for (var i = 0; i < allCreatures.length; i++) {
        if(allCreatures[i].name == creatureName) {
            allCreatures.splice(i, i + 1);
        }
    }
    console.log(allCreatures);
    var register = tracker;
    tracker = 0;
    $("#creatureTable").empty();
    $("#currentCreatureDrop").empty();
    $("#creatureTable").append("<tr><th>Creature Name</th><th>Creature Species</th></tr>");
    listCreatures();
    tracker = register;
    //can't add creatures after releasing -- fix this
}

function checkName(name) {
    var confirmation = true;
    if (name.length < 1) {
        confirmation = false;
    }

    var logged = (creatureListArrays())[0];
    for (var i = 0; i < logged.length; i++) {
        if (name == logged[i]) {
            confirmation = false;
        }
    }
    return confirmation;
}

class Magizoologist {
    constructor(name) {
        this.name = name;
    }

    feedCreatures(creatures, food) {
        console.log(this.name + " is feeding " + food + " to " + creatures.length + " of " + Creature.getPopulation() + " total creatures");
        for (var i = 0; i < creatures.length; i++) {
            creatures[i].eat(food);
        }
    }
}

class Creature {

    constructor(name,favoriteFood) {
        this.name = name;
        this.favoriteFood = favoriteFood;
        creaturePopulation++;
    }

    sleep() {
        console.log(this.name + " sleeps for 8 hours");
    }

    eat(food) {
        console.log(this.name + " eats " + food);
        if (food == this.favoriteFood) {
            console.log("YUM!!! " + this.name + " wants more " + food);
        } else {
            this.sleep();
        }
    }

    static getPopulation() {
        return creaturePopulation;
    }
}

class Bowtruckle extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits:
    //Sleeping habits:
}

class Erumpent extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits:
    //Sleeping habits:
}

class Niffler extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits:
    //Sleeping habits:
}

class Billywig extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits: Stings if not good food
    //Sleeping habits:
}

class Thunderbird extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits:
    //Sleeping habits:
}

class Demiguise extends Creature {
    constructor(name) {
        super(name, "");
    }
    //Eating habits:
    //Sleeping habits: Turns invisible
}