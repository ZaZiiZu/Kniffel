/* eslint-env jquery */
$(document).ready(function () {
    var player_amount = 1;
    var classes = {
        blockAll: 'kniffel sheet players',
        block1: function () {
            return this.blockAll + " " + 'block1 clickable';
        },
        block2: function () {
            return this.blockAll + " " + 'block2 auto';
        },
        block3: function () {
            return this.blockAll + " " + 'block3 clickable';
        },
    };
    var sheet = [{
        name: "-",
        classBlock: classes.blockAll + ' header',
        methode: 'none',
        line: 'tl0',
    }, {
        name: "Einer",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl1',
    }, {
        name: "Zweier",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl2',
    }, {
        name: "Dreier",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl3',
    }, {
        name: "Vierer",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl4',
    }, {
        name: "Fünfer",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl5',
    }, {
        name: "Sechser",
        classBlock: classes.block1(),
        methode: 'matching',
        line: 'tl6',
    }, {
        name: "Summe oben",
        classBlock: classes.block2(),
        methode: 'recalc_sum_upper',
        line: 'tl7',
    }, {
        name: "Bonus bei 63 oder mehr",
        classBlock: classes.block2(),
        methode: 'recalc_bonus_upper',
        line: 'tl8',
    }, {
        name: "gesamt oberer Teil",
        classBlock: classes.block2(),
        methode: 'recalc_upper_total',
        line: 'tl9',
    }, {
        name: "Dreierpasch",
        classBlock: classes.block3(),
        methode: 'dreierPasch',
        line: 'tl10',
    }, {
        name: "Viererpasch",
        classBlock: classes.block3(),
        methode: 'viererPasch',
        line: 'tl11',
    }, {
        name: "Full-House",
        classBlock: classes.block3(),
        methode: 'fullHouse',
        line: 'tl12',
    }, {
        name: "Kleine Straße",
        classBlock: classes.block3(),
        methode: 'kleineStraße',
        line: 'tl13',
    }, {
        name: "Große Straße",
        classBlock: classes.block3(),
        methode: 'großeStraße',
        line: 'tl14',
    }, {
        name: "Kniffel",
        classBlock: classes.block3(),
        methode: 'Kniffel',
        line: 'tl15',
    }, {
        name: "Chance",
        classBlock: classes.block3(),
        methode: 'Chance',
        line: 'tl16',
    }, {
        name: "gesamt unterer Teil",
        classBlock: classes.block2(),
        methode: 'recalc_sum_lower',
        line: 'tl17',
    }, {
        name: "gesamt oberer Teil",
        classBlock: classes.block2(),
        methode: 'recalc_upper_total',
        line: 'tl18',
    }, {
        name: "Endsumme",
        classBlock: classes.block2(),
        methode: 'recalc_lower_total',
        line: 'tl19',
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

        for (i = 1; i < sheet.length; i++) {
            var newColumns = "<td class='" + sheet[i].classBlock + " categories'" + "id='" + sheet[i].line + "_" + j + "'>" + sheet[i].name + "</td>";
            for (j = 1; j <= player_amount; j++) {
                newColumns += "<td class='" + sheet[i].classBlock + " columns'" + "id='" + sheet[i].line + "_" + j + "'>0</td>";
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
            sum_upper = recalc.sum_upper();
            recalc.bonus_upper(sum_upper);
            sum_upper = recalc.upper_total();
            sum_lower = recalc.sum_lower();
            sum_upper = recalc.lower_total();
        }
    }

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

    i = 0;
    var numDices = 5;
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
        checkEnd();
    });

    var thisObject;
    $("body").on('click', '.columns.active.clickable', function () {
        thisObject = $(this);
        var endFlag = fixSelf();
        newTurn(endFlag);
    });

    function fixSelf() {
        $(thisObject).removeClass('active').addClass('fixed');
        
        var x = $(".columns.clickable").not('.fixed').length;
        console.log ('clicks open: ', x);

        $('.players.active').removeClass('active');
        return x == 0 ? 1 : 0;
    }

    function newTurn(endFlag) {
        endFlag ;

        $('#button_roll').prop('disabled', false);
        remaining_rolls = 3 + 1;
        remainingRolls();
        $('.dice').addClass('dice-available').text('-');
        fill();
        sheet_recalc();

    }


    function roll() {
        $('td.players.columns').not('.fixed').addClass('active');
        numDices = $('.dice').length;
        if (numDices) {
            for (i = 1; i <= numDices; i++) {
                k = Math.floor(Math.random() * 6) + 1;
                $('#roll' + i + '.dice-available').html(k);
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
    i = 0;
    j = 0;

    function fill() {
        var x;
        string = $('.dice').text();
        string = string.replace(/[-]/g, '');
        rollsArray = getArray(string);
        console.log(rollsArray);

        for (i = 1; i <= 6; i++) {

            var funcName = sheet[i].methode
            var func = allFunctions[funcName]
            var x  = func(rollsArray, i);

            $("#"+sheet[i].line+"_1").not('.fixed').text(x);

        }

        var block3_length = ('.block3').length;

        for (var i = 10; i < block3_length + 10; i++) {

            var funcName = sheet[i].methode
            var func = allFunctions[funcName]
            var x  = func(rollsArray, i);
            $("#"+sheet[i].line+"_1").not('.fixed').text(x);

        }
    }

    function checkEnd() {

    }

    function getArray(string) {
        rollsArray = string.split('').sort();
        for (i = 0; i < rollsArray.length; i++) {
            rollsArray[i] = parseInt(rollsArray[i]);
        }
        return rollsArray;
    }

    var allFunctions = {
        matching: function (asdf, i) {
            asdf ? rollsArray = asdf : 0;
            var z = 0;
            switch (sheet[i].name) {
                case 'Einer': z=1; break;
                case 'Zweier': z=2; break;
                case 'Dreier': z=3; break;
                case 'Vierer': z=4; break;
                case 'Fünfer': z=5; break;
                case 'Sechser': z=6; break;
                default: z=0;
            }
            var x = arraySum(rollsArray.filter(function (j) {
                return j == z;}))
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
            for (i = 0; i < 2; i++) {
                if (/[1-6]/g.test(rollsArray)&&
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
            if (/[1-6]/g.test(rollsArray)&&
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
            if (rollsArray[0] === rollsArray[1] - 1 &&
                rollsArray[0] === rollsArray[2] - 2 &&
                rollsArray[0] === rollsArray[3] - 3) {
                return 25;
            }
            return 0;

        },
        großeStraße: function (asdf) {
            asdf ? rollsArray = asdf : rollsArray;
            console.log('grStr: ', rollsArray);
            var rollsArray = removeDuplicate(rollsArray);
            console.log('grStr: ', rollsArray);
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
            return 0;
        },

    };
    var recalc = {
        sum_upper: function () {
            sum_upper = 0;
            let found = $('.block1');
            for (i = 0; i < found.length; i++) {
                sum_upper += parseInt($('#' + found[i].id + '').html()) || 0;
            }
            $("#tl" + ($('.block1.categories').length + 1) + "_" + j).html(sum_upper);
            return sum_upper;
        },
        bonus_upper: function (sum_upper) {
            sum_upper >= 63 ? bonus_upper = 35 : bonus_upper = 0;
            $("#tl8" + "_" + j).html(bonus_upper);

        },
        upper_total: function () {
            sum_upper = parseInt($("#tl8" + "_" + j).html()) + parseInt($("#tl7" + "_" + j).html());
            $("#tl9" + "_" + j).text(sum_upper);
            $("#tl18" + "_" + j).text(sum_upper);
            return sum_upper;

        },
        sum_lower: function () {
            sum_lower = 0;
            i = 10;
            k = 17;
            console.log(i, k);
            for (i; i < k; i++) {
                sum_lower += parseInt($("#tl" + i + "_" + j + "").html()) || 0;
            }
            $("#tl" + (parseInt(i)) + "_" + j).html(sum_lower);
            return sum_lower;

        },
        lower_total: function () {
            i = sheet.length - 1;
            sum_total = sum_lower + sum_upper;
            $("#tl" + (parseInt(i)) + "_" + j).html(sum_total);
            return sum_total;

        }

    };

    // test();

    function test(){
    var testForeign = [1,2,3,'-',5] ;
    var testNone = [1, 2, 2, 3, 5];
    var test3er1 =[1,2,2,4,5]
    var test3er2 =[1,2,2,2,5];
    var test4er1 =[1,2,2,2,5];
    var test4er2 =[1,2,2,2,2];
    var testFH1=[1,2,2,2,5];
    var testFH2=[1,1,2,2,2];
    var testkS1=[1,2,3,5,5];
    var testkS2=[1,2,2,3,4];
    var testgS1=[1,2,3,4,5];
    var testgS2=[2,3,4,5,6];
    var testK1=[1, 2, 2, 2, 2];
    var testK2=[2, 2, 2, 2, 2];
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

    // copy paste aus'm netz
    function arraySum(array) {
        if (!array.length) {
            return 0;
        }
        const add = (a, b) => parseInt(a) + parseInt(b);
        const sum = array.reduce(add);
        return sum;
    }

    function removeDuplicate(arr) {
        let unique_array = Array.from(new Set(arr));
        return unique_array;
    }



});