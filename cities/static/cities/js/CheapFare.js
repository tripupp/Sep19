//function showFareDiv(t, s,q,t) {
//    alert(1);
//    alert(t +  s +q+t);
//}
var countSrc = true;
var countDest = true;

function showFareDiv(depDate, monthName, srcSector, destSector) {

    if (depDate != null && monthName != null && srcSector != null && destSector != null) {

        document.getElementById('hdnInput').value = depDate + "|" + monthName + "|" + srcSector + "|" + destSector;
        var date = depDate.split('/')[2] + "/" + depDate.split('/')[1] + "/" + depDate.split('/')[0];
        var d = new Date(date);
        var monthnumber = parseInt(d.getMonth()) + 1;
        var year = d.getFullYear();
        document.getElementById('hdnVal').value = srcSector.split('-')[0] + "|" + destSector.split('-')[0] + "|" + monthnumber + "|" + year;

        var currentDate = new Date();
        var Cmonth = parseInt(currentDate.getMonth()) + 1;
        if (monthnumber != Cmonth) {
            $('#prevBtn').css("display", "block");
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "/flights/BindCalender?Source=" + srcSector + "&Dest=" + destSector + "&DepDate=" + depDate,
                async: false,
                success: function (response) {
                    var ListValue = srcSector + "|" + destSector + "|" + depDate;
                    document.getElementById("trRow1").innerHTML = "";
                    document.getElementById("trRow2").innerHTML = "";
                    document.getElementById("trRow3").innerHTML = "";
                    document.getElementById("trRow4").innerHTML = "";
                    document.getElementById("trRow5").innerHTML = "";
                    document.getElementById("trRow6").innerHTML = "";
                    document.getElementById('monthajx').innerHTML = response.current.name + " " + response.current.year;
                    $('#monthajx').css("display", "block");
                    $('#month').css("display", "none");
                    var airClass = "";
                    var cls = "";
                    var color = "";

                    var dt = "";
                    var date = "";
                    response.FstRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = "Rs. " + item.bookMsg;
                            cls = "";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == "0") {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate)
                        {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row1 = ' <td onclick="listPageJs(' + item.Date + ')" class="' + cls + '" ><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow1').append(row1);

                    });
                    response.SndRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = "Rs. " + item.bookMsg;
                            cls = "";
                            //airClass = "l-" + item.AirlineCode;
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row2 = ' <td onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                        $('#trRow2').append(row2);

                    });
                    response.TrdRow.forEach(function (item) {

                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = "Rs. " + item.bookMsg;
                            cls = "";
                            // airClass = "l-" + item.AirlineCode;
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }

                        var row3 = '<td onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow3').append(row3);
                    });
                    response.ForthRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = "Rs. " + item.bookMsg;
                            cls = "";
                            //airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }

                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row4 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:"' + color + '" ">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow4').append(row4);

                    });
                    if (response.FifthRow[0].Date != "0") {
                        response.FifthRow.forEach(function (item) {
                            if (item.Date == "0") {
                                item.Date = "";
                                item.fulDate = "";
                            }
                            if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                                item.bookMsg = "Rs. " + item.bookMsg;
                                cls = "";
                                // airClass = "l-" + item.AirlineCode;
                            }
                            if (item.AirlineCode != "" && item.AirlineCode != null) {
                                airClass = "l-" + item.AirlineCode;
                            }
                            if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                                item.bookMsg = "";
                                // item.fulDate = "";
                                cls = "old-dt";
                                airClass = "";
                            }
                            if (item.cheapest == 1) {
                                color = "green";
                            }
                            if (item.cheapest == 2) {
                                color = "black";
                            }
                            if (item.cheapest == 3) {
                                color = "red";
                            }
                            if (item.fulDate == depDate) {
                                cls = cls + " " + "Cheapestfare";
                            }
                            if (item.fulDate != "" && item.fulDate != null) {
                                dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                                date = new Date(dt);
                                var locale = "en-us";
                                item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                            }
                            var row5 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                            $('#trRow5').append(row5);

                        });
                    }
                    if (response.SixRow[0].Date != "0") {
                        response.SixRow.forEach(function (item) {
                            if (item.Date == "0") {
                                item.Date = "";
                                item.fulDate = "";
                            }
                            if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                                item.bookMsg = "Rs. " + item.bookMsg;
                                cls = "";
                                airClass = "l-" + item.AirlineCode;
                            }
                            if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                                item.bookMsg = "";
                                // item.fulDate = "";
                                var cls = "old-dt";
                                airClass = "";
                            }
                            if (item.cheapest == 1) {
                                color = "green";
                            }
                            if (item.cheapest == 2) {
                                color = "black";
                            }
                            if (item.cheapest == 3) {
                                color = "red";
                            }
                            if (item.fulDate == depDate) {
                                cls = cls + " " + "Cheapestfare";
                            }
                            if (item.fulDate != "" && item.fulDate != null) {
                                dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                                date = new Date(dt);
                                var locale = "en-us";
                                item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                            }
                            var row6 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                            $('#trRow6').append(row6);

                        });
                    }
                    $('#tblCal1').css("display", "none");
                    $('#fracalshw').css("display", "block");
                    $('#tblCal').css("display", "table");
                        $('html,body').animate({
                            scrollTop: $("#tblCal").offset().top
                        },'slow');
                  
                }

            });
        }
        else {
            $('#monthajx').css("display", "none");
            $('#month').css("display", "block");
            $('#tblCal1').css("display", "table");
            $('#tblCal').css("display", "none");
            $('#prevBtn').css("display", "none");
            $('html,body').animate({
                scrollTop: $("#tblCal1").offset().top
            }, 'slow');
        }
    }

}


function Validate() {
    var srcCity = $("#srcCity").val();
    var destCity = $("#destCity").val();
    if ((srcCity == null || srcCity == "") && countSrc != true) {
        alert("Please Enter Valid Departure City")
        return false;
    }
    if ((destCity == null || destCity == "") && countDest != true) {
        alert("Please Enter Valid Destination City")
        return false;
    }
}

function listPageJs(day) {
    var value = document.getElementById('hdnVal').value;
    document.getElementById('FromSector').value = document.getElementById('hdnSourDest').value.split('|')[0];
    document.getElementById('Editbox13').value = document.getElementById('hdnSourDest').value.split('|')[1];
    document.getElementById("ddate").value = day + "/" + value.split('|')[2] + "/" + value.split('|')[3];
    VisitValidatorIndex();
}
function clearSrc() {
    document.getElementById("srcCity").value = "";
    countSrc = false;
}
function clearDest() {
    document.getElementById("destCity").value = "";
    countDest = false;
}

function displayCal(val) {
    var Tdate = new Date();
    var Cmonth = parseInt(Tdate.getMonth() + 1);
    var value = document.getElementById('hdnVal').value + "|" + val;
    $('#prevBtn').css("display", "block");

    var month = parseInt(value.split('|')[2]) + val;
    var year = value.split('|')[3];
    if (month < 1) {
        month = 12;
        year = parseInt(value.split('|')[3]) - 1;
    }
    else if (month > 12) {
        month = 1;
        year = parseInt(value.split('|')[3]) + 1;
    }
    if (month == Cmonth) {
        $('#month').css("display", "block");
        $('#monthajx').css("display", "none");
        $('#prevBtn').css("display", "none");
        $('#tblCal1').css("display", "table");
        $('#tblCal').css("display", "none");
        document.getElementById('hdnVal').value = value.split('|')[0] + "|" + value.split('|')[1] + "|" + month + "|" + year;
        return false;
    }
    document.getElementById('hdnVal').value = value.split('|')[0] + "|" + value.split('|')[1] + "|" + month + "|" + year;


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/flight-schedule/GetCal?value=" + document.getElementById('hdnVal').value,
        async: false,
        success: function (response) {
            document.getElementById("trRow1").innerHTML = "";
            document.getElementById("trRow2").innerHTML = "";
            document.getElementById("trRow3").innerHTML = "";
            document.getElementById("trRow4").innerHTML = "";
            document.getElementById("trRow5").innerHTML = "";
            document.getElementById("trRow6").innerHTML = "";
            $('#tblCal1').css("display", "none");
            document.getElementById('monthajx').innerHTML = response.current.name + " " + response.current.year;
            $('#month').css("display", "none");
            $('#monthajx').css("display", "block");
            var airClass = "";
            var cls = "";
            var color = "";

            var dt = "";
            var date = "";
            response.FstRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = "Rs. " + item.bookMsg;

                    cls = "";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == "0") {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }

                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row1 = ' <td onclick="listPageJs(' + item.Date + ')" class="' + cls + '" ><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow1').append(row1);

            });
            response.SndRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = "Rs. " + item.bookMsg;
                    cls = "";
                    //airClass = "l-" + item.AirlineCode;
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row2 = ' <td onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                $('#trRow2').append(row2);

            });
            response.TrdRow.forEach(function (item) {

                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = "Rs. " + item.bookMsg;
                    cls = "";
                    // airClass = "l-" + item.AirlineCode;
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }

                var row3 = '<td onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow3').append(row3);
            });
            response.ForthRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = "Rs. " + item.bookMsg;
                    cls = "";
                    //airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }

                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row4 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:"' + color + '" ">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow4').append(row4);

            });
            if (response.FifthRow[0].Date != "0") {
                response.FifthRow.forEach(function (item) {
                    if (item.Date == "0") {
                        item.Date = "";
                        item.fulDate = "";
                    }
                    if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                        item.bookMsg = "Rs. " + item.bookMsg;
                        cls = "";
                        // airClass = "l-" + item.AirlineCode;
                    }
                    if (item.AirlineCode != "" && item.AirlineCode != null) {
                        airClass = "l-" + item.AirlineCode;
                    }
                    if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                        item.bookMsg = "";
                        // item.fulDate = "";
                        cls = "old-dt";
                        airClass = "";
                    }
                    if (item.cheapest == 1) {
                        color = "green";
                    }
                    if (item.cheapest == 2) {
                        color = "black";
                    }
                    if (item.cheapest == 3) {
                        color = "red";
                    }
                    if (item.fulDate != "" && item.fulDate != null) {
                        dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                        date = new Date(dt);
                        var locale = "en-us";
                        item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                    }
                    var row5 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                    $('#trRow5').append(row5);

                });
            }
            if (response.SixRow[0].Date != "0") {
                response.SixRow.forEach(function (item) {
                    if (item.Date == "0") {
                        item.Date = "";
                        item.fulDate = "";
                    }
                    if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                        item.bookMsg = "Rs. " + item.bookMsg;
                        cls = "";
                        airClass = "l-" + item.AirlineCode;
                    }
                    if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                        item.bookMsg = "";
                        // item.fulDate = "";
                        var cls = "old-dt";
                        airClass = "";
                    }
                    if (item.cheapest == 1) {
                        color = "green";
                    }
                    if (item.cheapest == 2) {
                        color = "black";
                    }
                    if (item.cheapest == 3) {
                        color = "red";
                    }
                    if (item.fulDate != "" && item.fulDate != null) {
                        dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                        date = new Date(dt);
                        var locale = "en-us";
                        item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                    }
                    var row6 = ' <td  onclick="listPageJs(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                    $('#trRow6').append(row6);

                });
            }
            $('#tblCal').css("display", "table");

        },
        error: function (response) {
        }
    });

}

function Sectorlisting(src, dep, date) {
    var from = "";
    var to = "";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        url: "../autocitysch.txt",
        async: false,
        success: function (response) {
            var json = response.split('",');
            json.forEach(function (a, b) {
                if (a.split('-')[0].replace('"', '').trim() == src.trim()) {
                    from = a.split('|')[0];
                }
                if (a.split('-')[0].replace('"', '').trim() == dep.trim()) {
                    to = a.split('|')[0];
                }
            });
        },
        beforeSend: function (XMLHttpRequest) {
        },
        error: function (xmlHttpRequest, status, err) {
        }
    });
    document.getElementById('FromSector').value = from.replace('"', '');;
    document.getElementById('Editbox13').value = to.replace('"', '');;
    document.getElementById('ddate').value = date;
    VisitValidatorIndex();

}
function showFareDivMob(depDate, monthName, srcSector, destSector) {

    if (depDate != null && monthName != null && srcSector != null && destSector != null) {
        document.getElementById('hdnInput').value = depDate + "|" + monthName + "|" + srcSector + "|" + destSector;
        var date = depDate.split('/')[2] + "/" + depDate.split('/')[1] + "/" + depDate.split('/')[0];
        var d = new Date(date);
        var monthnumber = parseInt(d.getMonth()) + 1;
        var year = d.getFullYear();
        document.getElementById('hdnVal').value = srcSector.split('-')[0] + "|" + destSector.split('-')[0] + "|" + monthnumber + "|" + year;

        var currentDate = new Date();
        var Cmonth = parseInt(currentDate.getMonth()) + 1;
        if (monthnumber != Cmonth) {
            $('#prevBtn').css("display", "block");
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "/flights/BindCalender?Source=" + srcSector + "&Dest=" + destSector + "&DepDate=" + depDate,
                async: false,
                success: function (response) {
                    var ListValue = srcSector + "|" + destSector + "|" + depDate;
                    document.getElementById("trRow1").innerHTML = "";
                    document.getElementById("trRow2").innerHTML = "";
                    document.getElementById("trRow3").innerHTML = "";
                    document.getElementById("trRow4").innerHTML = "";
                    document.getElementById("trRow5").innerHTML = "";
                    document.getElementById("trRow6").innerHTML = "";
                    document.getElementById('monthajx').innerHTML = response.current.name + " " + response.current.year;
                    $('#monthajx').css("display", "block");
                    $('#month').css("display", "none");
                    var airClass = "";
                    var cls = "";
                    var color = "";

                    var dt = "";
                    var date = "";
                    response.FstRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = item.bookMsg;
                            cls = "";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == "0") {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row1 = ' <td onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '" ><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow1').append(row1);

                    });
                    response.SndRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = item.bookMsg;
                            cls = "";
                            //airClass = "l-" + item.AirlineCode;
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row2 = ' <td onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                        $('#trRow2').append(row2);

                    });
                    response.TrdRow.forEach(function (item) {

                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = item.bookMsg;
                            cls = "";
                            // airClass = "l-" + item.AirlineCode;
                        }
                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }

                        var row3 = '<td onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow3').append(row3);
                    });
                    response.ForthRow.forEach(function (item) {
                        if (item.Date == "0") {
                            item.Date = "";
                            item.fulDate = "";
                        }
                        if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                            item.bookMsg = item.bookMsg;
                            cls = "";
                            //airClass = "l-" + item.AirlineCode;
                        }
                        if (item.cheapest == 1) {
                            color = "green";
                        }
                        if (item.cheapest == 2) {
                            color = "black";
                        }
                        if (item.cheapest == 3) {
                            color = "red";
                        }
                        if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                            item.bookMsg = "";
                            //item.fulDate = "";
                            cls = "old-dt";
                            airClass = "";
                        }
                        if (item.fulDate == depDate) {
                            cls = cls + " " + "Cheapestfare";
                        }

                        if (item.AirlineCode != "" && item.AirlineCode != null) {
                            airClass = "l-" + item.AirlineCode;
                        }
                        if (item.fulDate != "" && item.fulDate != null) {
                            dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                            date = new Date(dt);
                            var locale = "en-us";
                            item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                        }
                        var row4 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:"' + color + '" ">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                        $('#trRow4').append(row4);

                    });
                    if (response.FifthRow[0].Date != "0") {
                        response.FifthRow.forEach(function (item) {
                            if (item.Date == "0") {
                                item.Date = "";
                                item.fulDate = "";
                            }
                            if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                                item.bookMsg = item.bookMsg;
                                cls = "";
                                // airClass = "l-" + item.AirlineCode;
                            }
                            if (item.AirlineCode != "" && item.AirlineCode != null) {
                                airClass = "l-" + item.AirlineCode;
                            }
                            if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                                item.bookMsg = "";
                                // item.fulDate = "";
                                cls = "old-dt";
                                airClass = "";
                            }
                            if (item.cheapest == 1) {
                                color = "green";
                            }
                            if (item.cheapest == 2) {
                                color = "black";
                            }
                            if (item.cheapest == 3) {
                                color = "red";
                            }
                            if (item.fulDate == depDate) {
                                cls = cls + " " + "Cheapestfare";
                            }
                            if (item.fulDate != "" && item.fulDate != null) {
                                dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                                date = new Date(dt);
                                var locale = "en-us";
                                item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                            }
                            var row5 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                            $('#trRow5').append(row5);

                        });
                    }
                    if (response.SixRow[0].Date != "0") {
                        response.SixRow.forEach(function (item) {
                            if (item.Date == "0") {
                                item.Date = "";
                                item.fulDate = "";
                            }
                            if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                                item.bookMsg = item.bookMsg;
                                cls = "";
                                airClass = "l-" + item.AirlineCode;
                            }
                            if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                                item.bookMsg = "";
                                // item.fulDate = "";
                                var cls = "old-dt";
                                airClass = "";
                            }
                            if (item.cheapest == 1) {
                                color = "green";
                            }
                            if (item.cheapest == 2) {
                                color = "black";
                            }
                            if (item.cheapest == 3) {
                                color = "red";
                            }
                            if (item.fulDate == depDate) {
                                cls = cls + " " + "Cheapestfare";
                            }
                            if (item.fulDate != "" && item.fulDate != null) {
                                dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                                date = new Date(dt);
                                var locale = "en-us";
                                item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                            }
                            var row6 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                            $('#trRow6').append(row6);

                        });
                    }
                    $('#tblCal1').css("display", "none");
                    $('#fracalshw').css("display", "block");
                    $('#tblCal').css("display", "table");
                    $('html,body').animate({
                        scrollTop: $("#tblCal").offset().top
                    }, 'slow');
                }

            });
        }
        else {
            $('#monthajx').css("display", "none");
            $('#month').css("display", "block");
            $('#tblCal1').css("display", "table");
            $('#tblCal').css("display", "none");
            $('#prevBtn').css("display", "none");
            $('html,body').animate({
                scrollTop: $("#tblCal1").offset().top
            }, 'slow');
        }
    }

}
function displayCalMob(val) {
    var Tdate = new Date();
    var Cmonth = parseInt(Tdate.getMonth() + 1);
    var value = document.getElementById('hdnVal').value + "|" + val;
    $('#prevBtn').css("display", "block");

    var month = parseInt(value.split('|')[2]) + val;
    var year = value.split('|')[3];
    if (month < 1) {
        month = 12;
        year = parseInt(value.split('|')[3]) - 1;
    }
    else if (month > 12) {
        month = 1;
        year = parseInt(value.split('|')[3]) + 1;
    }
    if (month == Cmonth) {
        $('#month').css("display", "block");
        $('#monthajx').css("display", "none");
        $('#prevBtn').css("display", "none");
        $('#tblCal1').css("display", "table");
        $('#tblCal').css("display", "none");
        document.getElementById('hdnVal').value = value.split('|')[0] + "|" + value.split('|')[1] + "|" + month + "|" + year;
        return false;
    }
    document.getElementById('hdnVal').value = value.split('|')[0] + "|" + value.split('|')[1] + "|" + month + "|" + year;


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "/flight-schedule/GetCal?value=" + document.getElementById('hdnVal').value,
        async: false,
        success: function (response) {
            document.getElementById("trRow1").innerHTML = "";
            document.getElementById("trRow2").innerHTML = "";
            document.getElementById("trRow3").innerHTML = "";
            document.getElementById("trRow4").innerHTML = "";
            document.getElementById("trRow5").innerHTML = "";
            document.getElementById("trRow6").innerHTML = "";
            $('#tblCal1').css("display", "none");
            document.getElementById('monthajx').innerHTML = response.current.name + " " + response.current.year;
            $('#month').css("display", "none");
            $('#monthajx').css("display", "block");
            var airClass = "";
            var cls = "";
            var color = "";

            var dt = "";
            var date = "";
            response.FstRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = item.bookMsg;

                    cls = "";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == "0") {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }

                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row1 = ' <td onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '" ><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow1').append(row1);

            });
            response.SndRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = item.bookMsg;
                    cls = "";
                    //airClass = "l-" + item.AirlineCode;
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row2 = ' <td onclick="listPageJsMobMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                $('#trRow2').append(row2);

            });
            response.TrdRow.forEach(function (item) {

                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = item.bookMsg;
                    cls = "";
                    // airClass = "l-" + item.AirlineCode;
                }
                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }

                var row3 = '<td onclick="listPageJsMobMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow3').append(row3);
            });
            response.ForthRow.forEach(function (item) {
                if (item.Date == "0") {
                    item.Date = "";
                    item.fulDate = "";
                }
                if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                    item.bookMsg = item.bookMsg;
                    cls = "";
                    //airClass = "l-" + item.AirlineCode;
                }
                if (item.cheapest == 1) {
                    color = "green";
                }
                if (item.cheapest == 2) {
                    color = "black";
                }
                if (item.cheapest == 3) {
                    color = "red";
                }
                if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                    item.bookMsg = "";
                    //item.fulDate = "";
                    cls = "old-dt";
                    airClass = "";
                }

                if (item.AirlineCode != "" && item.AirlineCode != null) {
                    airClass = "l-" + item.AirlineCode;
                }
                if (item.fulDate != "" && item.fulDate != null) {
                    dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                    date = new Date(dt);
                    var locale = "en-us";
                    item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                }
                var row4 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:"' + color + '" ">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                $('#trRow4').append(row4);

            });
            if (response.FifthRow[0].Date != "0") {
                response.FifthRow.forEach(function (item) {
                    if (item.Date == "0") {
                        item.Date = "";
                        item.fulDate = "";
                    }
                    if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                        item.bookMsg = item.bookMsg;
                        cls = "";
                        // airClass = "l-" + item.AirlineCode;
                    }
                    if (item.AirlineCode != "" && item.AirlineCode != null) {
                        airClass = "l-" + item.AirlineCode;
                    }
                    if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                        item.bookMsg = "";
                        // item.fulDate = "";
                        cls = "old-dt";
                        airClass = "";
                    }
                    if (item.cheapest == 1) {
                        color = "green";
                    }
                    if (item.cheapest == 2) {
                        color = "black";
                    }
                    if (item.cheapest == 3) {
                        color = "red";
                    }
                    if (item.fulDate != "" && item.fulDate != null) {
                        dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                        date = new Date(dt);
                        var locale = "en-us";
                        item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                    }
                    var row5 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '"></i></td> ';
                    $('#trRow5').append(row5);

                });
            }
            if (response.SixRow[0].Date != "0") {
                response.SixRow.forEach(function (item) {
                    if (item.Date == "0") {
                        item.Date = "";
                        item.fulDate = "";
                    }
                    if (item.bookMsg != "" && item.bookMsg != null && item.bookMsg != "0") {
                        item.bookMsg = item.bookMsg;
                        cls = "";
                        airClass = "l-" + item.AirlineCode;
                    }
                    if (item.bookMsg == null || item.bookMsg == "" || item.bookMsg == 0) {
                        item.bookMsg = "";
                        // item.fulDate = "";
                        var cls = "old-dt";
                        airClass = "";
                    }
                    if (item.cheapest == 1) {
                        color = "green";
                    }
                    if (item.cheapest == 2) {
                        color = "black";
                    }
                    if (item.cheapest == 3) {
                        color = "red";
                    }
                    if (item.fulDate != "" && item.fulDate != null) {
                        dt = item.fulDate.split('/')[1] + "/" + item.fulDate.split('/')[0] + "/" + item.fulDate.split('/')[2];
                        date = new Date(dt);
                        var locale = "en-us";
                        item.fulDate = date.toLocaleString(locale, { month: "short" }) + " " + date.getDate();
                    }
                    var row6 = ' <td  onclick="listPageJsMob(' + item.Date + ')" class="' + cls + '"><p class="dte-cl"> ' + item.fulDate + ' </p><p class="fare-cl" style="color:' + color + '">' + item.bookMsg + '</p><i class="' + airClass.toLowerCase() + '" ></i></td> ';
                    $('#trRow6').append(row6);

                });
            }
            $('#tblCal').css("display", "table");

        },
        error: function (response) {
        }
    });

}


function onsectorpresskeyV1New(control) {
    var mobhtml = '';
    var textcity = document.getElementById(control).value;
    if (textcity.length > 2) {
        for (var counta = 0; counta < availableTags.length; counta++) {
            if (mobhtml == '') {
                //mobhtml += '<li style="border-bottom: 1px solid orange; padding: 0 11px 0 0; text-align: right; font-size: 12px;">Top Cities</li>';
                mobhtml += '<li class="act-sr">Popular Cities</li>';
            }
        }
        for (var counta = 0; counta < availableTags.length; counta++) {
            var aCity = availableTags[counta].split(',')[0] + ',' + availableTags[counta].split(',')[1];
            if (aCity.toLowerCase().indexOf(textcity.toLowerCase()) > -1) {
                if (control != 'srcCity_show') {
                    mobhtml += '<li onclick="onValueFromNew(\'destCity\',\'lblDestination\',\'lblDest\',\'' + availableTags[counta].split(',')[0] + ',' + availableTags[counta].split(',')[1] + '\',\'mobTohtmlNew\',\'destCity_show\')"><div class="dest-nm"><span>' + availableTags[counta].split(',')[0].split('-')[1] + '</span> <span class="fnt-sz3">' + availableTags[counta].split(',')[2] + '</span></div><div class="dest-nm2"><span>' + availableTags[counta].split('-')[0] + '</span></div><div class="clr"></div></li>'; //'<li  onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')"><a href="javascript:void(0);" onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')">' + availableTags[counta] + '</a></li>';
                    //mobhtml += '<li  onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')"><a href="javascript:void(0);" onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')">' + availableTags[counta] + '</a></li>';
                }
                else {
                    mobhtml += '<li onclick="onValueFromNew(\'srcCity\',\'lblsource\',\'lblsrc\',\'' + availableTags[counta].split(',')[0] + ',' + availableTags[counta].split(',')[1] + '\',\'mobFromhtmlNew1\',\'srcCity_show\')"><div class="dest-nm"><span>' + availableTags[counta].split(',')[0].split('-')[1] + '</span> <span class="fnt-sz3">' + availableTags[counta].split(',')[2] + '</span></div><div class="dest-nm2"><span>' + availableTags[counta].split('-')[0] + '</span></div><div class="clr"></div></li>'; //'<li  onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')"><a href="javascript:void(0);" onclick="onValueFrom(\'Editbox14\',\'lblArrival\',\'lblArr\',\'' + availableTags[counta] + '\')">' + availableTags[counta] + '</a></li>';
                    //mobhtml += '<li onclick="onValueFrom(\'FromSector1\',\'lblDeparture\',\'lblDepart\',\'' + availableTags[counta] + '\')"><a href="javascript:void(0);" onclick="onValueFrom(\'FromSector1\',\'lblDeparture\',\'lblDepart\',\'' + availableTags[counta] + '\')">' + availableTags[counta] + '</a></li>';
                }
            }
        }
        if (control == 'srcCity_show') {
            document.getElementById("mobFromhtmlNew1").innerHTML = '';
            document.getElementById('mobFromhtmlNew1').style.display = 'block';
            document.getElementById("mobFromhtmlNew1").innerHTML = mobhtml;
        }
        else {
            document.getElementById("mobTohtmlNew").innerHTML = '';
            document.getElementById('mobTohtmlNew').style.display = 'block';
            document.getElementById("mobTohtmlNew").innerHTML = mobhtml;
        }
    }
}

function onValueFromNew(id, divid, prentdiv, val, ul, displayDiv) {
    document.getElementById("hdnautosuggest").value = "0";
    document.getElementById("sector-sec2").style.display = 'none';
    document.getElementById(divid).style.display = "block";
    document.getElementById(prentdiv).style.display = "block";
    document.getElementById("divDepartauto").style.display = "none";
    document.getElementById("divArrauto").style.display = "none";
    document.getElementById("lblDeparture").style.display = "block";
    document.getElementById(id).value = val;
    document.getElementById(divid).innerHTML = val.split('-')[0].toUpperCase();
    document.getElementById(prentdiv).innerHTML = val.split('-')[1].split(',')[0].toUpperCase();
    document.getElementById(displayDiv).value = document.getElementById(prentdiv).innerHTML + "(" + document.getElementById(divid).innerHTML + ")";
    if (!IsCheckDomesticLocal(document.getElementById('FromSector1').value, document.getElementById('Editbox14').value)) {
        document.getElementById('1-First').style.display = 'block';
    } else {
        document.getElementById(ul).style.display = 'none';
    }
}

function listPage(val) {
    if (val != "") {
        document.getElementById('FromSector').value = document.getElementById('hdnSourDest').value.split('|')[0];
        document.getElementById('Editbox13').value = document.getElementById('hdnSourDest').value.split('|')[1];
        document.getElementById('ddate').value = val;
        document.getElementById('optAdult').value = 1;
        document.getElementById('optChild').value = 0;
        document.getElementById('optInfant').value = 0;
        VisitValidatorIndex();

    }
}
function VisitValidatorIndexV1() {
    var departureDate;
    var returnDate;
    var jtype;
    jtype = document.getElementById("JournyType").value;
    if (document.getElementById("radio1").checked) {
        departureDate = $("#ddate").val();
        returnDate = $("#rdate").val();
    }
    else {
        departureDate = $("#ddate").val();
    }
    var from;
    var to;
    var noOfAdults;
    var noOfChild;
    var noOfInfants;
    if ($('#mobile-sec').css('display') == 'block') {
        from = $("#FromSector1").val(); //document.getElementById('FromSector1').value;
        to = $("#Editbox14").val(); //document.getElementById('Editbox14').value;
    }
    else {
        from = $("#FromSector").val(); //document.getElementById('FromSector1').value;
        to = $("#Editbox13").val(); //document.getElementById('Editbox14').value;       
    }
    if (from == "undefined") {
        document.getElementById('FromSector').value = '';
        alert("departure city can't be" + from);
        return false
    }
    if (to == "undefined") {
        document.getElementById('Editbox13').value = '';
        alert("arrival city can't be" + from);
        return false
    }
    //noOfAdults = $("#optAdult").val();
    //noOfChild = $("#optChild").val();
    //noOfInfants = $("#optInfant").val();
    noOfAdults = $("#optAdult").text();
    noOfChild = $("#optChild").text();
    noOfInfants = $("#optInfant").text();

    //noOfAdults = $('#hdnAdultCnt').val();
    //noOfChild = $('#hdnChildCnt').val();
    //noOfInfants = $('#hdnInfantCnt').val();

    var noOfPassenger = parseInt(noOfAdults) + parseInt(noOfChild);
    var validator = true;
    if (validator) {
        if (from.split('-')[0] == to.split('-')[0] && from != "" && to != "" && validator != false) {
            alert("Source and Destination cannot be same");
            validator = false;
        }
        if (from == "" && validator != false) {
            alert("Source cannot be Empty");
            validator = false;
        }
        if (to == "" && validator != false) {
            alert("Destination cannot be Empty");
            validator = false;
        }
        var enterValueValidator;
        enterValueValidator = from.indexOf(",");
        if (enterValueValidator == -1 && validator != false) {
            alert("Source Value entered is not correct");
            validator = false;
        }
        var gamooge = "";
        try {
            //_taq.id+"|"+_taq.sid+"|"+_taq.tid+"|"+
            gamooge = _taq.vid;

        } catch (e) {

        }
        setCookie("VisiterID", gamooge, "365");
        //enterValueValidator = from.indexOf("(");
        //if (enterValueValidator == -1 && validator != false) {
        //    alert("Source Value entered is not correct");
        //    validator = false;
        //}
        //enterValueValidator = from.indexOf(")");
        //if (enterValueValidator == -1 && validator != false) {
        //    alert("Source Value entered is not correct");
        //    validator = false;
        //}
        enterValueValidator = to.indexOf(",");
        if (enterValueValidator == -1 && validator != false) {
            alert("Destination Value entered is not correct");
            validator = false;
        }
        //enterValueValidator = to.indexOf("(");
        //if (enterValueValidator == -1 && validator != false) {
        //    alert("Destination Value entered is not correct");
        //    validator = false;
        //}
        //enterValueValidator = to.indexOf(")");
        //if (enterValueValidator == -1 && validator != false) {
        //    alert("Destination Value entered is not correct");
        //    validator = false;
        //}
        if (departureDate == '' && validator != false) {
            alert("Please specify a Departure Date");
            validator = false;
        }
        if (departureDate == "undefined") {
            alert("departure date can't be" + departureDate);
            validator = false;
        }
        if (returnDate == "undefined") {
            alert("arrival date can't be" + departureDate);
            validator = false;
        }
        if (departureDate == '' && returnDate == '' && $("#radio1").is(':checked') && validator != false) {
            alert("Please specify a Departure Date and Return Date OR change Trip Type to 'One Way'");
            validator = false;
        }
        else if (departureDate == '' && $("#radio1").is(':checked') && validator != false) {
            alert("Please specify a Departure Date OR change Trip Type to 'One Way'");
            validator = false;
        }
        else if (returnDate == '' && $("#radio1").is(':checked') && validator != false) {
            alert("Please specify a Return Date OR change Trip Type to 'One Way'");
            validator = false;
        }

        if (departureDate != '' && returnDate != '' && $("#radio1").is(':checked') && validator != false) {
            var departureSplitter = departureDate.split("/");
            var returnSplitter = returnDate.split("/");
            var returnMonth = returnSplitter[1];
            var returnDay = returnSplitter[0];
            var returnYear = returnSplitter[2];
            var departureMonth = departureSplitter[1];
            var departureDay = departureSplitter[0];
            var departureYear = departureSplitter[2];

            if (departureYear > returnYear) {
                alert("The Return date cannot be before the Departure date");
                validator = false;
            }
            else if (departureYear == returnYear) {
                if (departureMonth > returnMonth) {
                    alert("The Return date cannot be before the Departure date");
                    validator = false;
                }
                else if (departureMonth == returnMonth) {
                    if (departureDay > returnDay) {
                        alert("The Return date cannot be before the Departure date");
                        validator = false;
                    }
                }
            }
        }

        if (noOfPassenger > 9 && validator != false) {
            alert("currently booking can only be made for upto 9 travellers.You can make multiple bookings to accommodate your entire party.");
            validator = false;
        }
        if (noOfAdults < noOfInfants && validator != false) {
            alert("The total number of Infants passengers cannot exceed the total number of Adult passengers.");
            validator = false;
        }
        if (validator) {
            var ckValue = "";
            var rctCkkValue = getCookie("RecentCookie");
            if (rctCkkValue != "") {
                if (rctCkkValue.split('~').length >= 2) {
                    for (var cntInd = rctCkkValue.split('~').length - 2; cntInd < rctCkkValue.split('~').length - 1; cntInd++) {
                        if (ckValue != "") {
                            ckValue += "~";
                        }
                        ckValue += rctCkkValue.split('~')[cntInd];
                    }
                    rctCkkValue = ckValue + "~" + from + "|" + to + "|" + departureDate + "|" + returnDate;
                }
                else {
                    for (var cntInd = 0; cntInd < rctCkkValue.split('~').length; cntInd++) {
                        if (rctCkkValue.split('~')[cntInd] != (from + "|" + to + "|" + departureDate + "|" + returnDate)) {
                            rctCkkValue += "~" + from + "|" + to + "|" + departureDate + "|" + returnDate;
                        }
                    }
                }
            }
            else {
                rctCkkValue = from + "|" + to + "|" + departureDate + "|" + returnDate;
            }
            setCookie("RecentCookie", rctCkkValue, "365");

            try {
                var tripTypeCook = document.getElementById('radio1').checked;
                // CreateAndGetRecentSearch(from, to, departureDate, returnDate,tripTypeCook);
                CreateAndGetRecentSearchV1(from, to, departureDate, returnDate, tripTypeCook, noOfAdults, noOfChild, noOfInfants);
            }
            catch (err) {
                // alert(err);
            }
            var url_;
            if (document.getElementById("radio1").checked === true) {
                if (IsCheckDomesticLocal(from, to)) {
                    window.location.href = "https://flight.easemytrip.com/FlightListRT/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + $("#optClass").text() + "&airline=Any&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=false&isDomestic=true"; //+ $scope.AirReq.isDomestic;
                }
                else {
                    window.location.href = "https://flight.easemytrip.com/InternationalRoundTrip/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + $("#optClass").text() + "&airline=Any&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=false&isDomestic=false"; //+ $scope.AirReq.isDomestic;
                }
            }
            else {
                window.location.href = "https://flight.easemytrip.com/FlightList/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + $("#optClass").text() + "&airline=Any&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=true&isDomestic=false" //+ $scope.AirReq.isDomestic;
            }

        }
        else { return false; }
    }

}
function listPageMob(val) {
    if (val != "") {
        document.getElementById('FromSector1').value = document.getElementById('hdnSourDest').value.split('|')[0];
        document.getElementById('Editbox14').value = document.getElementById('hdnSourDest').value.split('|')[1];
        document.getElementById('ddate').value = val;
        VisitValidatorIndexV1();

    }
}
function listPageJsMob(day) {
    var value = document.getElementById('hdnVal').value;
    document.getElementById('FromSector1').value = document.getElementById('hdnSourDest').value.split('|')[0];
    document.getElementById('Editbox14').value = document.getElementById('hdnSourDest').value.split('|')[1];
    document.getElementById("ddate").value = day + "/" + value.split('|')[2] + "/" + value.split('|')[3];
    VisitValidatorIndexV1();
}

function ValidateForm_old() {
    var src = document.getElementById("srcCity").value;
    var dest = document.getElementById("destCity").value;
    if (src == "") {
        alert("Source City Cannot Be Blank!");
        return false;
    }
    else if (dest == "") {
        alert("Destination City Cannot Be Blank!");
        return false;
    }
    else if (dest == src) {
        alert("Source City and Destination City Cannot Be Same!");
        return false;
    }
}

function ValidateForm_2() {
    var src = document.getElementById("srcCity").value;
    var dest = document.getElementById("destCity").value;
    var srcNew = document.getElementById("srcCity_show").value;
    var destNew = document.getElementById("destCity_show").value;
    var date = new Date();
    var depDate= date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getFullYear();
    if (src == "") {
        alert("Source City Cannot Be Blank!");
        return false;
    }
    else if (dest == "") {
        alert("Destination City Cannot Be Blank!");
        return false;
    }
    else if (dest == src) {
        alert("Source City and Destination City Cannot Be Same!");
        return false;
    }
	//-----------changeStart-----
    else {
        var ckValue = "";
        var rctCkkValue = getCookie("RecentCookie_new2");
        if (rctCkkValue != "") {
            if (rctCkkValue.split('~').length > 3) {
                var arr = rctCkkValue.split('~');
                var str = "";
                for (i = 1; i < 4; i++) {
                    if (arr[i] != src + "|" + dest + "|" + depDate + "|" + "" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew) {
                        str += arr[i] + "~";
                    }
                }
                rctCkkValue = str + src + "|" + dest + "|" + depDate + "|" + "" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
            }
            else {
                var arr = rctCkkValue.split('~');
                var str = "";
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] != src + "|" + dest + "|" + depDate + "|" + "" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew) {
                        str += arr[i] + "~";
                    }
                }
                rctCkkValue = str + src + "|" + dest + "|" + depDate + "|" + "" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
            }
        }
        else {
            rctCkkValue = src + "|" + dest + "|" + depDate + "|" + "" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
        }
        setCookie("RecentCookie_new2", rctCkkValue, "365");
    }
	//-----------changeEnd-----
}
function ValidateForm() {
    var src = document.getElementById("srcCity").value;
    var dest = document.getElementById("destCity").value;
    var srcNew = document.getElementById("srcCity_show").value;
    var destNew = document.getElementById("destCity_show").value;
    var date = new Date();
    var depDate= date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getFullYear();
    if (src == "") {
        alert("Source City Cannot Be Blank!");
        return false;
    }
    else if (dest == "") {
        alert("Destination City Cannot Be Blank!");
        return false;
    }
    else if (dest == src) {
        alert("Source City and Destination City Cannot Be Same!");
        return false;
    }
    else {
        var ckValue = "";
        var rctCkkValue = getCookie("RecentCookie_new2");
        if (rctCkkValue != "") {
            if (rctCkkValue.split('~').length > 3) {
                var arr = rctCkkValue.split('~');
                var str = "";
                for (i = 1; i < 4; i++) {
                    if (arr[i] != src + "|" + dest + "|" + depDate + "|" + "undefined" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew) {
                        str += arr[i] + "~";
                    }
                }
                rctCkkValue = str + src + "|" + dest + "|" + depDate + "|" + "undefined" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
            }
            else {
                var arr = rctCkkValue.split('~');
                var str = "";
                for (i = 0; i < arr.length; i++) {
                    if (arr[i] != src + "|" + dest + "|" + depDate + "|" + "undefined" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew) {
                        str += arr[i] + "~";
                    }
                }
                rctCkkValue = str + src + "|" + dest + "|" + depDate + "|" + "undefined" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
            }
        }
        else {
            rctCkkValue = src + "|" + dest + "|" + depDate + "|" + "undefined" + "|" + "1" + "|" + "0" + "|" + "0" + "|" + srcNew + "|" + destNew;
        }
        setCookie("RecentCookie_new2", rctCkkValue, "365");
    }
}


//---changeStart---
function swapvaluesSrcDest(id1, id2) {
    var tmp = document.getElementById(id1).value;
    document.getElementById(id1).value = document.getElementById(id2).value;
    document.getElementById(id2).value = tmp;
    if (id1 == "srcCity") {
        document.getElementById("FromSector").value = document.getElementById(id1).value;
        document.getElementById("Editbox13").value = document.getElementById(id2).value;
    }
    else {
        document.getElementById("FromSector_show").value = document.getElementById(id1).value;
        document.getElementById("Editbox13_show").value = document.getElementById(id2).value;
    }
}

function autoSelectMul_1(liControl, txtControl, value) {
    var showingValue = document.getElementById(liControl).innerHTML.trim();
    document.getElementById(txtControl).value = showingValue;
    document.getElementById(txtControl.split('_')[0]).value = value;
    if ("ToSector-mul1_show" == txtControl) {
        $("#FromSector-mul2_show").val(showingValue);
        $("#FromSector-mul2").val(value);
    }
    else if ("ToSector-mul2_show" == txtControl) {
        $("#FromSector-mul3_show").val(showingValue);
        $("#FromSector-mul3").val(value);
    }
    else if ("ToSector-mul3_show" == txtControl) {
        $("#FromSector-mul4_show").val(showingValue);
        $("#FromSector-mul4").val(value);
    }
    else if ("ToSector-mul4_show" == txtControl) {
        $("#FromSector-mul5_show").val(showingValue);
        $("#FromSector-mul5").val(value);
    }
    else if ("ToSector-mul5_show" == txtControl) {
        $("#FromSector-mul6_show").val(value);
        $("#FromSector-mul6").val(value);
    }
    //Change End
    document.getElementById("fromautoFill").style.display = 'none';
    document.getElementById("toautoFill").style.display = 'none';

            for (var i = 1; i < 7; i++) {
                document.getElementById("FromMulti" + i).style.display = 'none';
                document.getElementById("ToMulti" + i).style.display = 'none';
            }
			
			//---changeStart---

            if (txtControl == "FromSector_show")
            { setCookie("Org1", value + "|" + showingValue);
		if( document.getElementById('srcCity_show')!=null)
		{
			document.getElementById('srcCity_show').value = showingValue;
		}
                if( document.getElementById('srcCity')!=null)
				{
					document.getElementById('srcCity').value = value;
				}
                
               
             }
            else if (txtControl == "Editbox13_show")
            {setCookie("Dest1", value + "|" + showingValue);
		if(document.getElementById('destCity_show')!=null)
		{
			document.getElementById('destCity_show').value = showingValue;
		}
		if(document.getElementById('destCity')!=null)
		{
			document.getElementById('destCity').value = value;
		}
                
                
				
            }

			//----changeEnd---

        }


function autoSelectMul(liControl, txtControl, value, airport) {

    var showingValue = document.getElementById(liControl).innerHTML.trim();
    //document.getElementById(txtControl).value = liControl.innerHTML.trim();
    document.getElementById(txtControl).value = showingValue;
    document.getElementById(txtControl.split('_')[0]).value = value;
    if (txtControl == "FromSector_show") {
        setCookie("Org1", value + "|" + document.getElementById(liControl).innerHTML);
        setCookie("AirportOrg1", document.getElementById(airport).innerHTML);
        document.getElementById('FromSectorSpan').innerHTML = document.getElementById(airport).innerHTML;

    } else {
        setCookie("Dest1", value + "|" + document.getElementById(liControl).innerHTML);
        setCookie("AirportDest1", document.getElementById(airport).innerHTML);
        document.getElementById('Editbox13Span').innerHTML = document.getElementById(airport).innerHTML;

    }   
    if ("Editbox13_show" == txtControl) {
        $("#FromSector1_show").val(showingValue);
        $("#FromSector1").val(value);
    }
    if ("txtToAuto1_show" == txtControl) {
        $("#FromSector2_show").val(showingValue);
        $("#FromSector2").val(value);
    }
    else if ("txtToAuto2_show" == txtControl) {
        $("#FromSector3_show").val(showingValue);
        $("#FromSector3").val(value);
    }
    else if ("txtToAuto3_show" == txtControl) {
        $("#FromSector4_show").val(showingValue);
        $("#FromSector4").val(value);
    }
    else if ("txtToAuto4_show" == txtControl) {
        $("#FromSector5_show").val(showingValue);
        $("#FromSector5").val(value);
    }
    else if ("txtToAuto5_show" == txtControl) {
        $("#FromSector6_show").val(showingValue);
        $("#FromSector6").val(value);
    }
    document.getElementById("fromautoFill").style.display = 'none';
    document.getElementById("toautoFill").style.display = 'none';
    for (var i = 1; i < 7; i++) {
        document.getElementById("FromMulti" + i).style.display = 'none';
        document.getElementById("ToMulti" + i).style.display = 'none';
    }

}
//----changeEnd---

