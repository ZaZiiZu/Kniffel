$(document).ready(function () {

    var z = Math.floor(Math.random() * 6) + 1;
    var string1 = "";
    var results = [];
    var i = 0;
    var numDices = 5;
    var object;
    var remaining_rolls = 3;

    /*
        for (var i=0; i<=50; i++){
            console.log('__________', 'roll: '+i, '__________');
            console.log('modulo1', i%1+1);
            console.log('modulo2', i%2+1);
            console.log('modulo3', i%3+1);
            console.log('modulo4', i%4+1);
        }
    */

    $('#button_roll').click(function () {
        roll();
        remainingRolls();
        fill();

    });

    $('#button_nextTurn').click(function () {
        newTurn();
    });

    $("body").on('click', '.players.active', function () {
        thisObject = $(this);
        fixSelf();
        newTurn();
    });

    function fixSelf() {
        $(thisObject).removeClass('active').addClass('fixed');
        $('.players.active').removeClass('active');
    }

    function newTurn() {
        $('#button_roll').prop('disabled', false);
        remaining_rolls = 3 + 1;
        remainingRolls();
        $('.dice').addClass('dice-available').text('-');

    }


    function roll() {
        $('td.players').not('.fixed').addClass('active');
        numDices = $('.dice').length
        if (numDices) {
            for (i = 1; i <= numDices; i++) {
                z = Math.floor(Math.random() * 6) + 1;
                $('#roll' + i + '.dice-available').html(z);
                //console.log(z);

            }
        }
    }

    $('body').on('click', '.dice:not(:contains("-"))', (function () {
        thisObject = $(this);
        (function diceToggle() {
            $(thisObject).toggleClass('dice-available');
        })();
    }));

    function remainingRolls() {
        remaining_rolls--;
        $('#remaining_rolls').text(remaining_rolls);
        if (remaining_rolls <= 0) {
            $('#button_roll').prop('disabled', true);
        }
    }

    var string1 = 0,
        string_result = [0],
        string1re = 0;
    var randomarray = [];
    var rollsArray = [];
    var x = 0;
    i = 0, j = 0;

    function fill() {

        string = $('.dice').text();
        rollsArray = getArray(string);
        console.log(rollsArray);
        /*
                console.log('rolls-array?!: ', rollsArray);
                console.log('sorted-array?!: ', rollsArray.sort());
                string1 = 1;
                string1re = RegExp('['+string1+']', "gi");
                string_result=string.match(string1re);
                string_result ? string_result : string_result=0;
                console.log('array?!: ', string_result);
                console.log('array-sum?!: ', arraySum(string_result));
                console.log('calculating what and total: ', string1, Math.max(0, string_result.length), arraySum(string_result));
        */
        for (i = 1; i <= 6; i++) {
            x = arraySum(rollsArray.filter(function (j) {
                return j == i;
            }));
            $('#' + (i - 1) + '_1').not('.fixed').text(x);
        }

        x = dreierPasch(rollsArray);
        $('#9_1').not('.fixed').text(x);

        x = viererPasch(rollsArray);
        $('#10_1').not('.fixed').text(x);

        x = fullHouse(rollsArray);
        $('#11_1').not('.fixed').text(x);

        x = kleineStraße(rollsArray);
        $('#12_1').not('.fixed').text(x);

        x = großeStraße(rollsArray);
        $('#13_1').not('.fixed').text(x);

        x = Kniffel(rollsArray);
        $('#14_1').not('.fixed').text(x);


    }

    function getArray(string) {
        rollsArray = string.split('').sort();
        for (i = 0; i < rollsArray.length; i++) {
            rollsArray[i] = parseInt(rollsArray[i]);
        }
        return rollsArray;
    }

    function commit() {

    }

    function arraySum(array) {
        if (!array.length) {
            return 0
        }
        const add = (a, b) => parseInt(a) + parseInt(b)
        const sum = array.reduce(add)
        return sum;
    }

    function dreierPasch(array) {
        for (i = 0; i < 3; i++) {
            if (array[i] == array[i + 1] && array[i] == array[i + 2]) {
                return arraySum(array);
            }
        }
        return 0;
    }
    function viererPasch(array) {
        for (i = 0; i < 2; i++) {
            if (array[i] == array[i + 1] && array[i] == array[i + 2] && array[i] == array[i + 3]) {
                return arraySum(array);
            }
        }
        return 0;
    }

    function fullHouse(array) {
        if(array[0]==array[1]&&array[3]==array[4]&&(array[0]==array[2]||array[4]==array[2])) {
            return 25;
        }
    }

    function kleineStraße(array) {
        if(array[0]==array[1]-1&&array[0]==array[2]-2&&array[0]==array[3]-3) {
            return 30;
        }
    }

    function großeStraße(array) {
        if(array[0]==array[1]-1&&array[0]==array[2]-2&&array[0]==array[3]-3&&array[0]==array[4]-4) {
            return 40;
        }
    }

    function Kniffel(array) {
        if(array[0]==array[1]&&array[0]==array[2]&&array[0]==array[3]&&array[0]==array[4]) {
            return 50;
        }
    }



});