$(document).ready(function () {
    var player_amount = 1;
    var block_upper = ["Einer", "Zweier", "Dreier", "Vierer", "Fünfer", "Sechser"];
    var block_upper_sum = ["Summe oben", "Bonus bei 63 oder mehr", "Gesamter oberer Teil"];
    var block_lower = ["Dreierpasch", "Viererpasch", "Full House", "Kleine Straße", "Große Straße", "Kniffel", "Chance"];
    var block_lower_sum = ["Summe unten", "Summe oben", "Gesamtsumme"];

    var classes = {
        blockAll: 'kniffel sheet players',
        block1: function () {
            return this.blockAll + " " + 'block1 clickable'
        },
        block2: function () {
            return this.blockAll + " " + 'block2 auto'
        },
        block3: function () {
            return this.blockAll + " " + 'block3 clickable'
        },
    };
    var sheet = [{
        name: "Einer",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_1er',
    }, {
        name: "Zweier",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_2er',
    }, {
        name: "Dreier",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_3er',
    }, {
        name: "Vierer",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_4er',
    }, {
        name: "Fünfer",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_5er',
    }, {
        name: "Sechser",
        classBlock: classes.block1(),
        methode: 1,
        id: 'id_6er',
    }, {
        name: "Summe oben",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_sumTop',
    }, {
        name: "Bonus bei 63 oder mehr",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_bonusTop',
    }, {
        name: "gesamt oberer Teil",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_totalTop',
    }, {
        name: "Dreierpasch",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_3erPasch',
    }, {
        name: "Viererpasch",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_4erPasch',
    }, {
        name: "Full-House",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_fullHouse',
    }, {
        name: "Kleine Straße",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_kleineStr',
    }, {
        name: "Große Straße",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_großeStr',
    }, {
        name: "Kniffel",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_kniffel',
    }, {
        name: "Chance",
        classBlock: classes.block3(),
        methode: 1,
        id: 'id_chance',
    }, {
        name: "gesamt unterer Teil",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_totalBottom',
    }, {
        name: "gesamt oberer Teil",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_totalTop2',
    }, {
        name: "Endsumme",
        classBlock: classes.block2(),
        methode: 1,
        id: 'id_totalAll',
    }];


    var i = 0,
        j = 0,
        k = 0;
    var sum_upper = 0,
        sum_lower = 0,
        bonus_upper = 0,
        sum_total = 0;

    generate_sheet();

    function generate_sheet() {

        var table = $('<table>').addClass('table1');

        for (i = 0; i < sheet.length; i++) {
            var newColumns = "<td class='" + sheet[i].classBlock + " categories'" + "id='" + sheet[i].id + "'>" + sheet[i].name + "</td>";
            for (j = 1; j <= player_amount; j++) {
                newColumns += "<td class='" + sheet[i].classBlock + " columns'" + "id='" + i + "_" + j + "'>0</td>";
            }
            var row = $('<tr>').addClass('rowClasses').append(newColumns);
            $(table).append(row);
        }
        $(".kniffel_sheet").append(table);
    }


    $('#button_sheet_initialize').click(function () {
        sheet_fill();
    });

    $('#button_sheet_recalc').click(function () {
        sheet_recalc();
    });

    function sheet_recalc() {
        for (j = 1; j <= player_amount; j++) {
            sum_upper = recalc_sum_upper();
            recalc_bonus_upper(sum_upper);
            sum_upper = recalc_upper_total();
            sum_lower = recalc_sum_lower();
            sum_upper = recalc_lower_total();
        }
    }

    function recalc_sum_upper() {
        sum_upper = 0;
        var found = $('.block1.fixed');
        for (i=0; i<found.length; i++){
            sum_upper += parseInt($('#'+found[i].id+'').html()) || 0;
            console.log(sum_upper);
        }
        $("#" + ($('.block1.categories').length) + "_" + j).html(sum_upper);
        return sum_upper;
    }

    function recalc_bonus_upper(sum_upper) {
        sum_upper >= 63 ? bonus_upper = 35 : bonus_upper = 0;
        $("#" + (1 + parseInt(i)) + "_" + j).html(bonus_upper);
    }

    function recalc_upper_total() {
        sum_upper = parseInt($("#" + (parseInt(i)) + "_" + j).html()) + parseInt($("#" + (parseInt(i) + 1) + "_" + j).html());
        $("#" + (block_upper.length + 2) + "_" + j).text(sum_upper);
        $("#" + (block_upper.length + block_upper_sum.length + block_lower.length + 1) + "_" + j).text(sum_upper)
        return sum_upper;
    }

    function recalc_sum_lower() {
        sum_lower = 0;
        i = block_upper.length + block_lower_sum.length;
        k = block_upper.length + block_lower_sum.length + block_lower.length;
        for (i; i < k; i++) {
            sum_lower += parseInt($("#" + i + "_" + j + ".fixed").html()) || 0;
        }
        $("#" + (parseInt(i)) + "_" + j).html(sum_lower);
        return sum_lower;
    }

    function recalc_lower_total() {
        i = sheet.length - 1;
        sum_total = sum_lower + sum_upper;
        $("#" + (parseInt(i)) + "_" + j).html(sum_total);
        return sum_total;
    }


    function sheet_fill() {
        for (i = 0; i < player_amount; i++) {
            $("#0_" + (1 + i)).html(Math.round(Math.random() * 5) * 1);
            $("#1_" + (1 + i)).html(Math.round(Math.random() * 5) * 2);
            $("#2_" + (1 + i)).html(Math.round(Math.random() * 5) * 3);
            $("#3_" + (1 + i)).html(Math.round(Math.random() * 5) * 4);
            $("#4_" + (1 + i)).html(Math.round(Math.random() * 5) * 5);
            $("#5_" + (1 + i)).html(Math.round(Math.random() * 5) * 6);
            $("#6_" + (1 + i)).html(0);
            $("#6_" + (1 + i)).addClass('font-weight-bold');
            $("#7_" + (1 + i)).html(0);
            $("#7_" + (1 + i)).addClass('font-weight-bold');
            $("#8_" + (1 + i)).html(0);
            $("#8_" + (1 + i)).addClass('font-weight-bold');
            $("#9_" + (1 + i)).html(Math.round(Math.random() * 3) * 6 + Math.round(Math.random() * 6) + Math.round(Math.random() * 6));
            $("#10_" + (1 + i)).html(Math.round(Math.random() * 4) * 6 + Math.round(Math.random() * 6));
            $("#11_" + (1 + i)).html(Math.round(Math.random() * 1) * 25);
            $("#12_" + (1 + i)).html(Math.round(Math.random() * 1) * 30);
            $("#13_" + (1 + i)).html(Math.round(Math.random() * 1) * 40);
            $("#14_" + (1 + i)).html(Math.round(Math.random() * 1) * 50);
            $("#15_" + (1 + i)).html(Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6) + Math.round(Math.random() * 6));
            $("#16_" + (1 + i)).html(0);
            $("#16_" + (1 + i)).addClass('font-weight-bold');
            $("#17_" + (1 + i)).html(0);
            $("#17_" + (1 + i)).addClass('font-weight-bold');
            $("#18_" + (1 + i)).html(0);
            $("#18_" + (1 + i)).addClass('font-weight-bold');
        }

    }

    var z = Math.floor(Math.random() * 6) + 1;
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
    /*
        $('#button_nextTurn').click(function () {
            newTurn();
        });
    */

    $('#button_roll').click(function () {
        roll();
        remainingRolls();
        fill();
    });

    $("body").on('click', '.players.active.clickable', function () {
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
        fill();
        sheet_recalc();

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

    var string = '';
    var rollsArray = [];
    var x = 0;
    i = 0, j = 0;

    function fill() {
        string = $('.dice').text();
        string = string.replace(/[-]/g, '');
        rollsArray = getArray(string);
        console.log(rollsArray);
        //     summiert gleiche zahlen innerhalb des arrays und 
        //     fügt die in die richtige zeile ein
        for (i = 1; i <= 6; i++) {
            x = arraySum(rollsArray.filter(function (j) {
                return j === i;
            }));
            $('#' + (i - 1) + '_1').not('.fixed').text(x);
        }

        x = lowerFunctions.dreierPasch(rollsArray);
        $('#9_1').not('.fixed').text(x);

        x = lowerFunctions.viererPasch(rollsArray);
        $('#10_1').not('.fixed').text(x);

        x = lowerFunctions.fullHouse(rollsArray);
        $('#11_1').not('.fixed').text(x);

        x = lowerFunctions.kleineStraße(rollsArray);
        $('#12_1').not('.fixed').text(x);

        x = lowerFunctions.großeStraße(rollsArray);
        $('#13_1').not('.fixed').text(x);

        x = lowerFunctions.Kniffel(rollsArray);
        $('#14_1').not('.fixed').text(x);

        x = lowerFunctions.Chance(rollsArray);
        $('#15_1').not('.fixed').text(x);



    }

    function getArray(string) {
        rollsArray = string.split('').sort();
        for (i = 0; i < rollsArray.length; i++) {
            rollsArray[i] = parseInt(rollsArray[i]);
        }
        return rollsArray;
    }


    var lowerFunctions = {
        dreierPasch: function (array) {
            for (i = 0; i < 3; i++) {
                if (/[1-6]/.test(array[i]) &&
                    array[i] === array[i + 1] &&
                    array[i] === array[i + 2]) {
                    return arraySum(array);
                }
            }
            return 0;


        },
        viererPasch: function (array) {
            for (i = 0; i < 2; i++) {
                if (/[1-6]/.test(array[i]) &&
                    array[i] === array[i + 1] &&
                    array[i] === array[i + 2] &&
                    array[i] === array[i + 3]) {
                    return arraySum(array);
                }
            }
            return 0;

        },
        fullHouse: function (array) {
            if (/[1-6]/.test(array[i]) &&
                array[0] === array[1] &&
                array[3] === array[4] &&
                (array[0] === array[2] || array[4] === array[2])) {
                return 25;
            }

        },
        kleineStraße: function (array) {
            if (/[1-6]/.test(array[i]) &&
                array[0] === array[1] &&
                array[3] === array[4] &&
                (array[0] === array[2] || array[4] === array[2])) {
                return 25;
            }

        },
        großeStraße: function (array) {
            array = removeDuplicate(array);
            if (array[0] === array[1] - 1 &&
                array[0] === array[2] - 2 &&
                array[0] === array[3] - 3 &&
                array[0] === array[4] - 4) {
                return 40;
            }

        },
        Kniffel: function (array) {
            array = removeDuplicate(array);
            if (/[1-6]/.test(array[i]) &&
                array[0] === array[1] &&
                array[0] === array[2] &&
                array[0] === array[3] &&
                array[0] === array[4]) {
                return 50;
            }
        },
        Chance: function (array) {
            return arraySum(array) || 0;
        },

    }

    function arraySum(array) {
        if (!array.length) {
            return 0
        }
        const add = (a, b) => parseInt(a) + parseInt(b)
        const sum = array.reduce(add)
        return sum;
    }

    // copy paste aus'm netz
    var unique_array = [];

    function removeDuplicate(arr) {
        let unique_array = Array.from(new Set(arr))
        return unique_array
    }



});