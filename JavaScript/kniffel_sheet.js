$(document).ready(function () {
    var player_amount = 4;
    var block_upper = ["Einer", "Zweier", "Dreier", "Vierer", "Fünfer", "Sechser"];
    var block_upper_sum = ["Summe oben", "Bonus bei 63 oder mehr", "Gesamter oberer Teil"];
    var block_lower = ["Dreierpasch", "Viererpasch", "Full House", "Kleine Straße", "Große Straße", "Kniffel", "Chance"];
    var block_lower_sum = ["Summe unten", "Summe oben", "Gesamtsumme"];
    var block_all = [];
    var i = 0, j=0, k=0;
    var sum_upper = 0, 
        sum_lower = 0;
        bonus_upper = 0;
        sum_total = 0; 
    (function generate_sheet() {

        block_all = block_all.concat(block_upper, block_upper_sum, block_lower, block_lower_sum);
        var newLine = "";

        $(".kniffel_sheet").append("<table class='table table-striped table-dark'>");
        for (i = 0, j = 0; i < block_all.length; i++) {
            $(".kniffel_sheet").append("<tr>");
            $(".kniffel_sheet").append("<td class='kniffel sheet categories id='" + i + "_" + j + "'>" + block_all[i] + "</td");
            for (j = 0; j < player_amount; j++) {
                newLine = "<td class='kniffel sheet players' id='" + i + "_" + (1 + j) + "'>";
                newLine += "0";
                newLine += "</td>";
                $(".kniffel_sheet").append(newLine);
            }
            $(".kniffel_sheet").append("</tr>");
        }
        $(".kniffel_sheet").append("</table>");
    })();


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
        for (i = 0; i < block_upper.length; i++) {
            sum_upper += parseInt($("#" + i + "_" + j).html());
        }
        $("#" + (parseInt(i)) + "_" + j).html(sum_upper);
        return sum_upper;

    }

    function recalc_bonus_upper(sum_upper) {
        sum_upper >= 63 ? bonus_upper = 35 : bonus_upper = 0;
        $("#" + (1 + parseInt(i)) + "_" + j).html(bonus_upper);
    }

    function recalc_upper_total() {
        sum_upper = parseInt($("#" + (parseInt(i)) + "_" + j).html()) + parseInt($("#" + (parseInt(i) + 1) + "_" + j).html());
        $("#" + (block_upper.length+2) + "_" + j).text(sum_upper);
        $("#" + (block_upper.length+block_upper_sum.length+block_lower.length+1) + "_" + j).text(sum_upper)
        return sum_upper;
    }

    function recalc_sum_lower() {
        sum_lower = 0;
        i = block_upper.length + block_lower_sum.length;
        k = block_upper.length + block_lower_sum.length+block_lower.length;
        for (i ; i < k; i++) {
            sum_lower += parseInt($("#" + i + "_" + j).html());
        }
        $("#" + (parseInt(i)) + "_" + j).html(sum_lower);
        
        return sum_lower;
    }
    
    function recalc_lower_total(){
        i = block_all.length-1;
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


});