/* eslint-env jquery */ // settings for ESLint
$(document).ready(function () {

    /* 
        ------------------------------------------------------------------------------------------------------------
                        some objects and variables:
        ------------------------------------------------------------------------------------------------------------
    */

    var player_amount = 1; // 1 for now, multiplayer will be added later
    var currentPlayer = 0;
    var numDices = 5;
    var remaining_rolls = 3;

    var classes = {
        blockAll: 'kniffel sheet players ',
        block1: function () {
            return this.blockAll + " " + 'block1 clickable ';
        },
        block2: function () {
            return this.blockAll + " " + 'block2 auto ';
        },
        block3: function () {
            return this.blockAll + " " + 'block3 clickable ';
        },
    }

    var sheet = [{
            name: "-",
            classBlock: classes.blockAll + ' header',
            methode: 'none',
            line: 'tl0',
        },
        {
            name: "Einer",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl1',
            sums: '1'
        },
        {
            name: "Zweier",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl2',
            sums: '2'
        },
        {
            name: "Dreier",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl3',
            sums: '3'
        },
        {
            name: "Vierer",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl4',
            sums: '4'
        },
        {
            name: "Fünfer",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl5',
            sums: '5'
        },
        {
            name: "Sechser",
            classBlock: classes.block1(),
            methode: 'matching',
            line: 'tl6',
            sums: '6'
        },
        {
            name: "Summe oben",
            classBlock: classes.block2() + 'sum_upper',
            methode: 'sum_sums',
            line: 'tl7',
            sums: '.block1.fixed',
        },
        {
            name: "Bonus bei 63 oder mehr",
            classBlock: classes.block2() + 'bonus_upper',
            methode: 'bonus_oben',
            line: 'tl8',
        },
        {
            name: "gesamt oberer Teil",
            classBlock: classes.block2() + 'total_upper0',
            methode: 'sum_sums',
            line: 'tl9',
            sums: '.sum_upper, .bonus_upper',
        },
        {
            name: "Dreierpasch",
            classBlock: classes.block3(),
            methode: 'dreierPasch',
            line: 'tl10',
        },
        {
            name: "Viererpasch",
            classBlock: classes.block3(),
            methode: 'viererPasch',
            line: 'tl11',
        },
        {
            name: "Full-House",
            classBlock: classes.block3(),
            methode: 'fullHouse',
            line: 'tl12',
        },
        {
            name: "Kleine Straße",
            classBlock: classes.block3(),
            methode: 'kleineStraße',
            line: 'tl13',
        },
        {
            name: "Große Straße",
            classBlock: classes.block3(),
            methode: 'großeStraße',
            line: 'tl14',
        },
        {
            name: "Kniffel",
            classBlock: classes.block3(),
            methode: 'Kniffel',
            line: 'tl15',
        },
        {
            name: "Chance",
            classBlock: classes.block3(),
            methode: 'Chance',
            line: 'tl16',
        },
        {
            name: "gesamt unterer Teil",
            classBlock: classes.block2() + 'total_lower',
            methode: 'sum_sums',
            line: 'tl17',
            sums: '.block3.fixed',
        },
        {
            name: "gesamt oberer Teil",
            classBlock: classes.block2() + 'total_upper',
            methode: 'sum_sums',
            line: 'tl18',
            sums: '.sum_upper, .bonus_upper',
        },
        {
            name: "Endsumme",
            classBlock: classes.block2() + 'total_total',
            methode: 'sum_sums',
            line: 'tl19',
            sums: '.total_upper, .total_lower',
        },
    ]

    /* 
        ------------------------------------------------------------------------------------------------------------
                        browser interactions, all those mouse-clicks
        ------------------------------------------------------------------------------------------------------------
    */

    /* When 'new game' button is discovered and clicked, make new game...duuh */
    $("body").on('click', '#button_sheet_newGame, #button_sheet_reset', function () {
        newGame();
    })

    /*  When 'roll' button is clicked:
        - roll dices, 
        - refresh remainingRolls-counter 
        - mark click-able cells
        - and fill the sheet */
    $('#button_roll').click(function () {
        roll();
        remainingRolls();
        $(".player" + currentPlayer).not('fixed').addClass('active');
        fill();
    })

    /*  Click on a valid/active cell.
        - cells give their information to function fixSelf and run it.
        - fixSelf returns flag whether all cells are filled so the game can be finished.
        - newTurn initiates new turn and/or end game. */

    $("body").on('click', '.columns.active.clickable.currentPlayer', function () {
        var endFlag = fixSelf($(this));
        newTurn(endFlag);
    })

    /*  Click on not-fixed dice to fix */
    $('body').on('click', '.dice:not(:contains("-"))', function () {
        let thisObject = $(this);
        $(thisObject).toggleClass('dice-available');
    })


    /* 
        ------------------------------------------------------------------------------------------------------------
                        the main functions
        ------------------------------------------------------------------------------------------------------------
    */

    /*  Fixes a cell so its' value get thrown into calculations later.
        - Also, checks whether any moves are left (active cells) 
        - and returns a flag for potential end of the game */
    function fixSelf(thisObject) {

        $(thisObject).removeClass('active').addClass('fixed');
        $('.players.active').removeClass('active');

        var x = $(".columns.clickable").not('.fixed').length;
        return x == 0 ? 1 : 0;
    }

    /*  Ends last and initializes new turn:
        - ends game if(!) last turn was literally "last" turn
        - activates roll-button
        - resets roll-counter
        - resets dice to default '-'
        - recalculates the sheet */
    function newTurn(endFlag) {
        endFlag == 1 ? finishedGame() : 0;

        $('#button_roll').prop('disabled', false);
        remaining_rolls = 3 + 1;
        remainingRolls();
        $('.dice').addClass('dice-available').text('-');
        endFlag == 2 ? 0 : fill(); // at flag==2, fill() will be skipped. flag==2 occurs after newGame(), so fill() doesn't produce bugs with currentPlayer being 0.
        $('.currentPlayer').removeClass('currentPlayer').removeClass('active');
        currentPlayer = (currentPlayer % player_amount) + 1; //modulo-operation to cycle between several players
    }

    /*  Ends last and initializes new game:
        - removes old table (easier then cleaning it)
        - generates new table
        - initializes new turn, see newTurn()
        - hides the win-Box */
    function newGame() {
        player_amount = $('#player_count').val(); // get new player-count from the form-element
        currentPlayer = 0; //resets to 0, it increments to 1 during newTurn(). 
        console.log('newGame: ', player_amount, 'player(s)');
        $('#table1').remove();
        generate_sheet();
        $('.kniffel_win').hide();
        newTurn(2);
    }
    
    // no easy/obvious way to get rid of this global variable for now
    var rollsArray = [];

    /*  Rolls the dices:
            - rolls dices and writes the numbers down */
    function roll() {
        numDices = $('.dice').length;
        if (numDices) {
            for (var i = 1; i <= numDices; i++) {
                let k = Math.floor(Math.random() * 6) + 1;
                $('#roll' + i + '.dice-available').html(charDice(k)).data('dice_value', k);
                rollsArray[i-1] = k;
            }
        }



        if ($('#dice_sort:checked').length) {
            var string = $('.dice').data('dice_value').replace(/[-]/g, '');
            rollsArray = getArray(string);
            for (var i = 1; i <= numDices; i++) {
                $('#roll' + i + '.dice-available').html(charDice(k)).data('dice_value', k);
            }
        }
    }

    /*  keeps track of rolls, deactivates roll-Button when it's time */
    function remainingRolls() {
        remaining_rolls--;
        $('#remaining_rolls').text(remaining_rolls);
        if (remaining_rolls <= 0) {
            $('#button_roll').prop('disabled', true);
        }
    }


    /*  That's where the magic happens:
        - puts dice-rolls into a usable Array
        - goes through the sheet-object and runs individual methods for all the lines
        - while in loop, fills the sheet with those calculated numbers */
    function fill() {

        var x;
        /*
        var string = $('.dice').data('dice_value');
        console.log(string);
        string = string.replace(/[-]/g, '');
        rollsArray = getArray(string); 
        */
        console.log(rollsArray);

        for (var i = 0; i < sheet.length; i++) {
            $("#" + sheet[i].line + "_" + currentPlayer).addClass('currentPlayer');
            var x = allFunctions[sheet[i].methode](rollsArray, i) || 0;
            $("#" + sheet[i].line + "_" + currentPlayer).not('.fixed').text(x);
        }
    }

    /*  generates the sheet:
        - similar as above: generates table based on sheet-Object
        - creates the table "in air", and appends to a specific div when it's generated */
    function generate_sheet() {
        var j = 0;
        var idle = Math.max(4 - player_amount, 0);

        var table = $('<table>').attr('id', 'table1').addClass('table1');
        for (var i = 1; i < sheet.length; i++) {
            var newColumns = "<td class='" + sheet[i].classBlock + " categories'" + "id='" + sheet[i].line + "_" + j + "'>" + sheet[i].name + "</td>";
            for (j = 1; j <= player_amount; j++) {
                newColumns += "<td class='" + sheet[i].classBlock + " columns player" + j + "'" + "id='" + sheet[i].line + "_" + j + "'>0</td>";
            }
            if (idle) {
                for (j = 0; j < idle; j++) {
                    newColumns += "<td class='" + sheet[i].classBlock + " idle'" + "id='" + sheet[i].line + "_idle" + j + "'></td>";
                }
            }
            var row = $('<tr>').addClass('rowClasses').append(newColumns);
            $(table).append(row);
        }
        $(".kniffel_sheet").append(table);
        j = 1;
    }

    /* Object with functions for all methods for all lines */
    var allFunctions = {
        matching: function (asdf, i) {
            asdf ? rollsArray = asdf : 0;
            var x = arraySum(rollsArray.filter(function (jk) {
                return jk == sheet[i].sums;
            }))
            return x;

        },
        dreierPasch: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            for (var i = 0; i < 3; i++) {
                if (
                    rollsArray[i] === rollsArray[i + 1] &&
                    rollsArray[i] === rollsArray[i + 2]) {
                    return arraySum(rollsArray);
                }
            }
            return 0;
        },
        viererPasch: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            for (var i = 0; i < 2; i++) {
                if (/[1-6]/g.test(rollsArray) &&
                    rollsArray[i] === rollsArray[i + 1] &&
                    rollsArray[i] === rollsArray[i + 2] &&
                    rollsArray[i] === rollsArray[i + 3]) {
                    return arraySum(rollsArray);
                }
            }
            return 0;

        },
        fullHouse: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            if (/[1-6]/g.test(rollsArray) &&
                rollsArray[0] === rollsArray[1] &&
                rollsArray[3] === rollsArray[4] &&
                (rollsArray[0] === rollsArray[2] || rollsArray[4] === rollsArray[2])) {
                return 25;
            }
            return 0;

        },
        kleineStraße: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            var rollsArray = removeDuplicate(rollsArray);
            for (var i = 0; i < 2; i++) {
                if (rollsArray[i] === rollsArray[i + 1] - 1 &&
                    rollsArray[i] === rollsArray[i + 2] - 2 &&
                    rollsArray[i] === rollsArray[i + 3] - 3) {
                    return 30;
                }
            }
            return 0;

        },
        großeStraße: function (asdf) {
            asdf ? rollsArray = asdf : rollsArray;
            var rollsArray = removeDuplicate(rollsArray);
            if (rollsArray[0] === rollsArray[1] - 1 &&
                rollsArray[0] === rollsArray[2] - 2 &&
                rollsArray[0] === rollsArray[3] - 3 &&
                rollsArray[0] === rollsArray[4] - 4) {
                return 40;
            }
            return 0;

        },
        Kniffel: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            if (/[1-6]/g.test(rollsArray) &&
                rollsArray[0] === rollsArray[1] &&
                rollsArray[0] === rollsArray[2] &&
                rollsArray[0] === rollsArray[3] &&
                rollsArray[0] === rollsArray[4]) {
                return 50;
            }
            return 0;
        },
        Chance: function (asdf) {
            asdf ? rollsArray = asdf : 0;
            return arraySum(rollsArray) || 0;
        },
        none: function () {
            return;
        },
        sum_sums: function (asdf, i) {
            let sum_current = 0;
            let found = $(sheet[i].sums);
            for (var i = 0; i < found.length; i++) {
                sum_current += parseInt($('#' + found[i].id + '.currentPlayer').html()) || 0;
            }
            return sum_current;
        },
        bonus_oben: function () {
            let bonus_var = 0;
            $('#tl7_' + currentPlayer).text() >= 63 ? bonus_var = 35 : 0
            return bonus_var;
        },
    }

    /* 
    ------------------------------------------------------
        some helping functions
    ------------------------------------------------------ 
    */
    function finishedGame() {
        $('div.container.kniffel_win').show();
        var winningTextString = '';
        for (var i = 1; i <= player_amount+1 && i <= 4; i++) {
            winningTextString += 'Player' + i + ' scored: ' + $('#tl19_' + i + '').html() + '<br>';
        }
        $('#winningText').html(winningTextString);

    }
    function charDice(asdf) {
        console.log(asdf);
        if (Number.isInteger(asdf)) {
            switch (asdf) {
                case 1:
                    asdf = '\u2680';
                    break;
                case 2:
                    asdf = '\u2681';
                    break;
                case 3:
                    asdf = '\u2682';
                    break;
                case 4:
                    asdf = '\u2683';
                    break;
                case 5:
                    asdf = '\u2684';
                    break;
                case 6:
                    asdf = '\u2685';
                    break;
                default:
                    asdf = '-';

            }
        } else {
            switch (asdf) {
                case '\u2680':
                    asdf = 1;
                    break;
                case '\u2681':
                    asdf = 2;
                    break;
                case '\u2682':
                    asdf = 3;
                    break;
                case '\u2683':
                    asdf = 4;
                    break;
                case '\u2684':
                    asdf = 5;
                    break;
                case '\u2685':
                    asdf = 6;
                    break;
                default:
                    asdf = '-';


            }

        }
        return asdf;
    }

    function getArray(string) {
        rollsArray = string.split('').sort();
        for (var i = 0; i < rollsArray.length; i++) {
            rollsArray[i] = parseInt(rollsArray[i]);
        }
        return rollsArray;
    }
    // copy paste aus'm netz
    function arraySum(array) {
        if (!array.length) {
            return 0;
        }
        const add = (a, b) => parseInt(a) + parseInt(b);
        const sum = array.reduce(add);
        return sum;
    }

    // copy paste aus'm netz
    function removeDuplicate(arr) {
        let unique_array = Array.from(new Set(arr));
        return unique_array;
    }

    /* 
    ------------------------------------------------------
        initializing the game for first time
        - including newTurn()
    ------------------------------------------------------ 
    */

    newGame();




    /* 
    ------------------------------------------------------
    storeroom/graveyard for testing-"tools" i'm too lazy to rewrite if i ever need them again
    ------------------------------------------------------ 
    */

    /*
        var test = 1;
        test==1 ? test_sheet() : 0;

        function test_sheet() {
            var testForeign = [1, 2, 3, '-', 5];
            var testNone = [1, 2, 2, 3, 5];
            var test3er1 = [1, 2, 2, 4, 5]
            var test3er2 = [1, 2, 2, 2, 5];
            var test4er1 = [1, 2, 2, 2, 5];
            var test4er2 = [1, 2, 2, 2, 2];
            var testFH1 = [1, 2, 2, 2, 5];
            var testFH2 = [1, 1, 2, 2, 2];
            var testkS1 = [1, 3, 4, 5, 6];
            var testkS2 = [1, 2, 2, 3, 4];
            var testgS1 = [1, 2, 3, 4, 5];
            var testgS2 = [2, 3, 4, 5, 6];
            var testK1 = [1, 2, 2, 2, 2];
            var testK2 = [2, 2, 2, 2, 2];
            console.log('TESTS-START');
            console.log('3erPasch testForeign', testForeign, allFunctions.dreierPasch(testForeign));
            console.log('3erPasch testNone', testNone, allFunctions.dreierPasch(testNone));
            console.log('3erPasch test3er1', test3er1, allFunctions.dreierPasch(test3er1));
            console.log('3erPasch test3er2', test3er2, allFunctions.dreierPasch(test3er2));
            console.log('4erPasch testForeign', testForeign, allFunctions.viererPasch(testForeign));
            console.log('4erPasch testNone', testNone, allFunctions.viererPasch(testNone));
            console.log('4erPasch test4er1', test4er1, allFunctions.viererPasch(test4er1));
            console.log('4erPasch test4er2', test4er2, allFunctions.viererPasch(test4er2));
            console.log('Full-House testForeign', testForeign, allFunctions.fullHouse(testForeign));
            console.log('Full-House testNone', testNone, allFunctions.fullHouse(testNone));
            console.log('Full-House testFH1', testFH1, allFunctions.fullHouse(testFH1));
            console.log('Full-House testFH2', testFH2, allFunctions.fullHouse(testFH2));
            console.log('kleineStraße testForeign', testForeign, allFunctions.kleineStraße(testForeign));
            console.log('kleineStraße testNone', testNone, allFunctions.kleineStraße(testNone));
            console.log('kleineStraße testkS1', testkS1, allFunctions.kleineStraße(testkS1));
            console.log('kleineStraße testkS2', testkS2, allFunctions.kleineStraße(testkS2));
            console.log('großeStraße testForeign', testForeign, allFunctions.großeStraße(testForeign));
            console.log('großeStraße testNone', testNone, allFunctions.großeStraße(testNone));
            console.log('großeStraße testgS1', testgS1, allFunctions.großeStraße(testgS1));
            console.log('großeStraße testgS2', testgS2, allFunctions.großeStraße(testgS2));
            console.log('Kniffel testForeign', testForeign, allFunctions.Kniffel(testForeign));
            console.log('Kniffel testNone', testNone, allFunctions.Kniffel(testNone));
            console.log('Kniffel testK1', testK1, allFunctions.Kniffel(testK1));
            console.log('Kniffel testK2', testK2, allFunctions.Kniffel(testK2));
            console.log('TESTS-ENDE');

        }
    */

    /*
        $('#button_sheet_initialize').click(function () {
            sheet_fill();
        });

        function sheet_fill() {
            for (i = 0; i < player_amount; i++) {
                $("#tl1_" + (1 + i)).html(Math.round(Math.random() * 5) * 1);
                $("#tl2_" + (1 + i)).html(Math.round(Math.random() * 5) * 2);
                $("#tl3_" + (1 + i)).html(Math.round(Math.random() * 5) * 3);
                $("#tl4_" + (1 + i)).html(Math.round(Math.random() * 5) * 4);
                $("#tl5_" + (1 + i)).html(Math.round(Math.random() * 5) * 5);
                $("#tl6_" + (1 + i)).html(Math.round(Math.random() * 5) * 6);
                $("#tl7_" + (1 + i)).html(0);
                $("#tl7_" + (1 + i)).addClass('font-weight-bold');
                $("#tl8_" + (1 + i)).html(0);
                $("#tl8_" + (1 + i)).addClass('font-weight-bold');
                $("#tl9_" + (1 + i)).html(0);
                $("#tl9_" + (1 + i)).addClass('font-weight-bold');
                $("#tl10_" + (1 + i)).html(Math.round(Math.random() * 3) * 6 + Math.round(Math.random() * 6) + Math.round(Math.random() * 6));
                $("#tl11_" + (1 + i)).html(Math.round(Math.random() * 4) * 6 + Math.round(Math.random() * 6));
                $("#tl12_" + (1 + i)).html(Math.round(Math.random() * 1) * 25);
                $("#tl13_" + (1 + i)).html(Math.round(Math.random() * 1) * 30);
                $("#tl14_" + (1 + i)).html(Math.round(Math.random() * 1) * 40);
                $("#tl15_" + (1 + i)).html(Math.round(Math.random() * 1) * 50);
                $("#tl16_" + (1 + i)).html(Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6));
                $("#tl17_" + (1 + i)).html(0);
                $("#tl17_" + (1 + i)).addClass('font-weight-bold');
                $("#tl18_" + (1 + i)).html(0);
                $("#tl18_" + (1 + i)).addClass('font-weight-bold');
                $("#tl19_" + (1 + i)).html(0);
                $("#tl19_" + (1 + i)).addClass('font-weight-bold');
            }

        }
    */



})