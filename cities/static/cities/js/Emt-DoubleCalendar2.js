$(document).ready(function(){
   $("#overlaybg1").click(function(){
       $("#dvcalendar").hide();
       $("#overlaybg1").hide();
   });
  
});
var todayDateNextPrv = new Date();
var checkRdate = "";
$(function () {
	 
    //Check the initial Poistion of the Sticky Header
    $("#dvfarecal").click(function () {
        ddateObj('ddate', 'ddate', 'rdate', 'dvcalendar');
        checkRdate = "";
        var id = $('#ddate').val();
        if (id != "")
            todayDateNextPrv = new Date(id.split('/')[2], id.split('/')[1] - 1, id.split('/')[0]);
        else
            todayDateNextPrv = new Date();
		var cDate = new Date();
        if (cDate.getMonth() == todayDateNextPrv.getMonth() && cDate.getFullYear() == todayDateNextPrv.getFullYear()) {
            document.getElementById("dvprevious").style.visibility = "hidden";
        }
       // FillcalendarFillDates();

        //fill next cal
        var getDateForNextCal = nextMonth(todayDateNextPrv.getFullYear(), todayDateNextPrv.getMonth(), "01");
        //FillcalendarV1(getDateForNextCal.getMonth()+1, getDateForNextCal.getFullYear());
		FillcalendarFares("ddate");
    });
    $("#divRtnCal").click(function () {
        ddateObj('rdate', 'ddate', 'rdate', 'dvcalendar');
        checkRdate = "yes";
        if (checkRdate == "yes")
            var id = $('#ddate').val();
       var ddates = new Date(id.split('/')[2], id.split('/')[1] - 1, id.split('/')[0]);
	   
	   
	  // DISPLAY NONE
       var rdate = $('#rdate').val();
       if (id != "" && rdate == "")
           todayDateNextPrv = new Date(id.split('/')[2], id.split('/')[1] - 1, id.split('/')[0]);
       else if (id != "" && rdate != "")
           todayDateNextPrv = new Date(rdate.split('/')[2], rdate.split('/')[1] - 1, rdate.split('/')[0]);
       else
           todayDateNextPrv = new Date();
       if (ddates.getMonth() == todayDateNextPrv.getMonth() && ddates.getFullYear() == todayDateNextPrv.getFullYear()) {
           document.getElementById("dvprevious").style.visibility = "hidden";
       }
        //END
	   
      /*   if (ddates.getMonth() == todayDateNextPrv.getMonth()) {
            document.getElementById("dvprevious").style.visibility = "hidden";
        } */
      //  FillcalendarFillDates();
     
        //condition to fill rdate cal
       // var rdate = $('#rdate').val();
        if (rdate != "") {
            rdate = new Date(rdate.split('/')[2], rdate.split('/')[1] - 1, rdate.split('/')[0]);
        }else {
            rdate = ddates;
        }
        var getDateForNextCal = nextMonth(rdate.getFullYear(), rdate.getMonth(), "01");
        //FillcalendarV1(getDateForNextCal.getMonth() + 1, getDateForNextCal.getFullYear());
		FillcalendarFares("ddate");
    });
});

function NextPrevClick(_prvNext) {
    if (_prvNext == 'nxtMnt') {
        nextPrevButton('ddate', 'ddate', 'rdate', 'dvcalendar', 'nxtMnt')
    }
    else {
        nextPrevButton('ddate', 'ddate', 'rdate', 'dvcalendar', 'prvtMnt')

    }

  //  FillcalendarV1(todayDateNextPrv.getMonth() + 1, todayDateNextPrv.getFullYear());
    var id = $('#ddate').val();
    if (ddate != "")
        var ddates = new Date(id.split('/')[2], id.split('/')[1] - 1, id.split('/')[0]);
   /*  if (checkRdate == "yes")
        if (ddates.getMonth() == todayDateNextPrv.getMonth()) {
            document.getElementById("dvprevious").style.visibility = "hidden";
        } */
		 if (checkRdate == "yes")
		 {
			  if (ddates.getMonth() == todayDateNextPrv.getMonth() && ddates.getFullYear() == todayDateNextPrv.getFullYear()) {
            document.getElementById("dvprevious").style.visibility = "hidden";
             }
		 }
       

    //for next month
    var getDateForNextCal = nextMonth(todayDateNextPrv.getFullYear(), todayDateNextPrv.getMonth(), "01");
	 var cDate = new Date();
    if ((cDate.getMonth() == todayDateNextPrv.getMonth() && cDate.getFullYear() == todayDateNextPrv.getFullYear()) || (cDate.getMonth() == getDateForNextCal.getMonth() && cDate.getFullYear() == getDateForNextCal.getFullYear())) {
        document.getElementById("dvprevious").style.visibility = "hidden";
    }
   // FillcalendarV1(getDateForNextCal.getMonth() + 1, getDateForNextCal.getFullYear());
	FillcalendarFares_Cm(todayDateNextPrv.getMonth() + 1, todayDateNextPrv.getFullYear(),"");
}
function FillcalendarFares(hdnFrom) {
    var from = '';
    if (document.getElementById("FromSector") != null) from = document.getElementById("FromSector").value;
    else
        from = document.getElementById("FromSector1").value;
    var to = '';
    if (document.getElementById("Editbox13") != null) to = document.getElementById("Editbox13").value;
    else
        to = document.getElementById("Editbox14").value;
    var Rway = document.getElementById("rdate").value;
    var depdate = document.getElementById("ddate").value;
    var dates = "";
    var sector = from.split('-')[0] + "_" + to.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    if (hdnFrom == 'rdate') {
        sector = to.split('-')[0] + "_" + from.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    }
    var divCal = document.getElementById("dvcalendar");
    var month = "";
    var year = "";
    if (!IsCheckDomesticLocal(from, to)) {
        $('.imgHide').hide();
        return true;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://flightservice.easemytrip.com/EmtAppService/FareCalendar/FillCalendarDataByMonth",
        data: "{'CalKey_':'" + sector + "'}",
        async: true,
        crossDomain: true,
        success: function(data) {
            for (var _mnth = 0; _mnth < data.length; _mnth++) {
                var result = data[_mnth];
                for (var i = 0; i < result.FstRow.length; i++) {
                    if (document.getElementById(result.FstRow[i].fulDate) != null) {
                        document.getElementById(result.FstRow[i].fulDate).innerHTML = result.FstRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.FstRow[i].bookMsg;
                        document.getElementById(result.FstRow[i].fulDate).style.color = ReturnCheapestColour(result.FstRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.SndRow.length; i++) {
                    if (document.getElementById(result.SndRow[i].fulDate) != null) {
                        document.getElementById(result.SndRow[i].fulDate).innerHTML = result.SndRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width:5px; display:none;'>" + result.SndRow[i].bookMsg;
                        document.getElementById(result.SndRow[i].fulDate).style.color = ReturnCheapestColour(result.SndRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.TrdRow.length; i++) {
                    if (document.getElementById(result.TrdRow[i].fulDate) != null) {
                        document.getElementById(result.TrdRow[i].fulDate).innerHTML = result.TrdRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.TrdRow[i].bookMsg;
                        document.getElementById(result.TrdRow[i].fulDate).style.color = ReturnCheapestColour(result.TrdRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.ForthRow.length; i++) {
                    if (document.getElementById(result.ForthRow[i].fulDate) != null) {
                        document.getElementById(result.ForthRow[i].fulDate).innerHTML = result.ForthRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.ForthRow[i].bookMsg;
                        document.getElementById(result.ForthRow[i].fulDate).style.color = ReturnCheapestColour(result.ForthRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.FifthRow.length; i++) {
                    if (document.getElementById(result.FifthRow[i].fulDate) != null) {
                        document.getElementById(result.FifthRow[i].fulDate).innerHTML = result.FifthRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.FifthRow[i].bookMsg;
                        document.getElementById(result.FifthRow[i].fulDate).style.color = ReturnCheapestColour(result.FifthRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.SixRow.length; i++) {
                    if (document.getElementById(result.SixRow[i].fulDate) != null) {
                        document.getElementById(result.SixRow[i].fulDate).innerHTML = result.SixRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.SixRow[i].bookMsg;
                        document.getElementById(result.SixRow[i].fulDate).style.color = ReturnCheapestColour(result.SixRow[i].cheapest);
                    }
                }
            }
            $('.imgHide').hide();
            return false;
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function salection() {
    $('.date-sct li span').click(function (e) {
        e.preventDefault();
        $('.date-sct li span').removeClass('active-date');
        $(this).addClass('active-date');
    });
}
var monthGroup = [];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
function makeCalHtml(_dateType, _idDDate, _idRdate, _divId) {
    //document.getElementById("monthToBind").innerHTML = '';
    document.getElementById(_divId).innerHTML = '';
    var calHtml = '';
    calHtml += '<div>';

    for (var month = 0; month < monthGroup.length; month++) {
        var cal = monthGroup[month];
        var html = '';
        if (month == 0) {
            html += '<div class="main">';
            html += '<div class="box">';
            html += '<div class="month">';
        } else {
            html += '<div class="main1">';
            html += '<div class="box1">';
            html += '<div class="month-sec">';
        }
       // html += '<div class="month">';
        //  + '<div class="month1" runat="server" id="dvprevious"><img id="img2Prv" src="img/left.png" alt="Arrow" onclick="nextPrevButton(' +'\''+ _dateType + '\',' + '\'ddate\'' + ',' + '\'rdate\'' + ',' + '\'dvcalendar\'' + ',' + '\'prvtMnt\'' + ')"></div>'


        html += '<div class="month1" runat="server" id="dvprevious" style="display:block">';
        if (month == 0) {
            html += '<img id="img2Prv" src="assets/img/left.png" alt="Arrow" onclick="NextPrevClick(' + '\'prvtMnt\'' + ')">';
        }
        html += '</div>';

        html += '<div class="month2">' + cal.month + ' ' + cal.year + '</div>';
        // + '<div class="month3" ><img id="img2Nex" src="img/right.png" alt="Arrow" onclick="nextPrevButton(' +'\''+ _dateType + '\',' + '\'ddate\'' + ',' + '\'rdate\'' + ',' + '\'dvcalendar\'' + ',' + '\'nxtMnt\'' + ')"></div>'  //'ddate', 'rdate', 'dvcalendar');
        //if (month == 1) {
        html += '<div class="month3" >';
		html += '<img id="img2Nex" class="dis_n" src="assets/img/right.png" alt="Arrow" onclick="NextPrevClick(' + '\'nxtMnt\'' + ')">';
        if (month == 1) {
            html += '<img id="img2Nex" src="assets/img/right.png" alt="Arrow" onclick="NextPrevClick(' + '\'nxtMnt\'' + ')">';
        }
        html += '</div>'; //'ddate', 'rdate', 'dvcalendar');

        html += '</div>'
        + '<div class="weekdays">'
        + '<ul><li>Su</li><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li></ul>'
        + '</div>';
        //1st row
        html += '<div class="days"><ul class="bor-d21">';
        //SelectDate(id, _dateType, _idDDate, _idRdate)
        for (var i = 0; i < cal.firstRow.length; i++) {
            html += '<li class="' + cal.firstRow[i].Css + '" id="fst_' + i + '_' + cal.firstRow[i].fulDate + '" style="visibility:' + cal.firstRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.firstRow[i].Date + '<span class="' + cal.firstRow[i].Css + '" id=' + cal.firstRow[i].fulDate + '>' + "" + '</span></li>';
        }
        html += '</ul></div>';

        //2nd row
        html += '<div class="days"><ul class="bor-d31">';
        for (var i = 0; i < cal.secondRow.length; i++) {
            html += '<li class="' + cal.secondRow[i].Css + '" id="snd_' + i + '_' + cal.secondRow[i].fulDate + '" style="visibility:' + cal.secondRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.secondRow[i].Date + '<span class="' + cal.secondRow[i].Css + '" id=' + cal.secondRow[i].fulDate + '>' + "" + '</span></li>';
        }
        html += '</ul></div>';
        //3rd row
        html += '<div class="days"><ul class="bor-d41">';
        for (var i = 0; i < cal.thirdRow.length; i++) {
            //  html += '<li class="' + cal.thirdRow[i].Css + '" id="fst_' + i + '_' + cal.thirdRow[i].fulDate + '" style="visibility:' + cal.thirdRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.thirdRow[i].Date + '<span class="' + cal.thirdRow[i].Css + '">' + '' + '</span></li>';
            html += '<li class="' + cal.thirdRow[i].Css + '" id="trd_' + i + '_' + cal.thirdRow[i].fulDate + '" style="visibility:' + cal.thirdRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.thirdRow[i].Date + '<span class="' + cal.thirdRow[i].Css + '" id=' + cal.thirdRow[i].fulDate + '>' + "" + '</span></li>';
        }
        html += '</ul></div>';
        //4th row
        html += '<div class="days"><ul class="bor-d51">';
        for (var i = 0; i < cal.fouthRow.length; i++) {
            html += '<li class="' + cal.fouthRow[i].Css + '" id="frth_' + i + '_' + cal.fouthRow[i].fulDate + '" style="visibility:' + cal.fouthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.fouthRow[i].Date + '<span class="' + cal.fouthRow[i].Css + '" id=' + cal.fouthRow[i].fulDate + '>' + "" + '</span></li>';
        }
        html += '</ul></div>';
        //5th row
        html += '<div class="days"><ul class="bor-d61">';
        for (var i = 0; i < cal.fifthRow.length; i++) {
            if (cal.fifthRow[i].Date != '') {
                html += '<li class="' + cal.fifthRow[i].Css + '" id="fiv_' + i + '_' + cal.fifthRow[i].fulDate + '" style="visibility:' + cal.fifthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.fifthRow[i].Date + '<span class="' + cal.fifthRow[i].Css + '" id=' + cal.fifthRow[i].fulDate + '>' + "" + '</span></li>';
            }
        }
        html += '</ul></div>';
        //6th row
        html += '<div class="days"><ul class="bor-d71">';
        for (var i = 0; i < cal.sixthRow.length; i++) {
            if (cal.sixthRow[i].Date != '') {
                html += '<li class="' + cal.sixthRow[i].Css + '" id="six_' + i + '_' + cal.sixthRow[i].fulDate + '" style="visibility:' + cal.sixthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + cal.sixthRow[i].Date + '<span class="' + cal.sixthRow[i].Css + '" id=' + cal.sixthRow[i].fulDate + '>' + "" + '</span></li>';
            }
        }
        html += '</ul></div>'
        + '<div class="clr"></div>'
		+''
        + '</div>'
        + '</div>';


        calHtml = calHtml + html;
    }
    calHtml += '</div>';

    document.getElementById(_divId).innerHTML = calHtml;
    document.getElementById(_divId).style.display = "block";
}
function nextMonth(Y, M, D) {
    var now = new Date(Y, M, D);
    if (now.getMonth() == 11) {
        return new Date(now.getFullYear() + 1, 0, 1);
    } else {
        return new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
}
function SelectDate(id, _dateType, _idDDate, _idRdate) {
    // var date = id.split('_')[2];
    var date = '';
    if (_dateType == "rdate") {
        $('#rdate').val(id.split('_')[2]);
        date = new Date(id.split('_')[2].split('/')[2], id.split('_')[2].split('/')[1] - 1, id.split('_')[2].split('/')[0]);
        $('#headerCalRDdate').text(date.toDateString());
        $(".mai-dv").hide();
        $("#mainDiv").show();
        $("#spanIdRMsg").hide();
        $("#headerCalRDdate").show();
        todayDateNextPrv = date;
    }
    else {
        $('#ddate').val(id.split('_')[2]);
        date = new Date(id.split('_')[2].split('/')[2], id.split('_')[2].split('/')[1] - 1, id.split('_')[2].split('/')[0]);
        $('#headerCalDdate').text(date.toDateString());
        $(".mai-dv").hide();
        $("#mainDiv").show();
        todayDateNextPrv = date;
    }
}
//new logic
function SelectDate(id) {
    var date = id.split('_')[2];
    var rndD = document.getElementById("rdate").value;
    var oneWay = document.getElementById("ddate").value;
    var hdn = document.getElementById("hdn").value;
    if (hdn == "ddate") {

        document.getElementById("ddate").value = date;

         setCookie("DepDate",date,2);
		   if (document.getElementById('radio1').checked == true) {
			    var rDateInc= new Date(document.getElementById("ddate").value.split('/')[2]+"/"+document.getElementById("ddate").value.split('/')[1]+"/"+document.getElementById("ddate").value.split('/')[0]);
         rDateInc.setDate(rDateInc.getDate() + 2);
		 document.getElementById("rdate").value =rDateInc.getDate()+"/"+ (parseInt( rDateInc.getMonth())+1)+"/"+rDateInc.getFullYear() ;//document.getElementById("ddate").value;
           // document.getElementById("rdate").value = document.getElementById("ddate").value;
		   setCookie("RTDate",document.getElementById("rdate").value,2);
           setCookie("tripType","1");
		   }
        /* if (rndD != "") {
		 var rDateInc= new Date(document.getElementById("ddate").value.split('/')[2]+"/"+document.getElementById("ddate").value.split('/')[1]+"/"+document.getElementById("ddate").value.split('/')[0]);
         rDateInc.setDate(rDateInc.getDate() + 2);
		 document.getElementById("rdate").value =rDateInc.getDate()+"/"+ (parseInt( rDateInc.getMonth())+1)+"/"+rDateInc.getFullYear() ;//document.getElementById("ddate").value;
           // document.getElementById("rdate").value = document.getElementById("ddate").value;
		   setCookie("RTDate",document.getElementById("rdate").value,2);
           setCookie("tripType","1");
        } */
        if (document.getElementById('radio1').checked == true) {
            //document.getElementById('divRtnCal').click();
        }
    }
    if (hdn == "rdate") {
        if (oneWay != "") {
            document.getElementById("rdate").value = date;
           setCookie("RTDate",date,2);
		   setCookie("tripType","1");
        }
        document.getElementById("rdate").value = date;
    }
    document.getElementById("dvcalendar").style.display = "none";
}
function ddateObj(_dateType, _idDDate, _idRdate, _divIdToBind) {
    var Todate = new Date();
    var mtoday = (Todate.getMonth() + 1) + '/' + Todate.getDate() + '/' + Todate.getFullYear();
    //var parts = mnth + "/" + dayDate + "/" + cal.year;
    Todate = new Date(mtoday);
    monthGroup = [];
    var todayDate = '';
    if (_dateType == "rdate") {
        var ddate = $('#' + _idDDate).val();
        var rdate = $('#' + _idRdate).val();
        if (ddate != "" && rdate == "") {
            todayDate = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);
            Todate = todayDate;
        }
        else if (rdate != "") {
            todayDate = new Date(rdate.split('/')[2], rdate.split('/')[1] - 1, rdate.split('/')[0]);
            Todate = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);;
        }
        else {
            todayDate = new Date();
        }
    }
    else if (_dateType == "ddate") {
        var ddate = $('#' + _idDDate).val();
        if (ddate != "") {
            todayDate = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);
          
        }

        else {
            todayDate = new Date();
        }
    }
    else {
        todayDate = new Date();
        /* if($('#' + _idDDate)!=null &&   $('#' + _idDDate).val()!="" && $('#' + _idDDate).val().split('/').length>2)
         {
             var date=$('#' + _idDDate).val().split('/');
              todayDate = new Date(date[2]+"/"+date[1]+"/"+date[0]);
         }
         else{
             todayDate = new Date();
         } */
    }

    for (var month = 0; month < 2; month++) {
        if (month == 0) {
            var currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), "01");
        }
        else {
            var currentDate = nextMonth(currentDate.getFullYear(), currentDate.getMonth(), "01");
        }
        var cal = {};
        //cal.month = currentDate.toLocaleString("en-us", { month: "short" });
        cal.month = monthNames[currentDate.getMonth()];
        cal.noMonth = currentDate.getMonth() + 1;
        cal.year = currentDate.getFullYear();
        cal.firstRow = [];
        cal.secondRow = [];
        cal.thirdRow = [];
        cal.fouthRow = [];
        cal.fifthRow = [];
        cal.sixthRow = [];
        var monthDate = 1;
        for (var i = 1; i <= 42; i++) {
            var dayDes = {};
            if (i >= currentDate.getDay() + 1 && i <= daysInMonth(cal.noMonth, cal.year) + currentDate.getDay()) {
                dayDes.Active = "true";
                dayDes.Date = monthDate;
                var mnth = cal.noMonth < 10 ? "0" + cal.noMonth : cal.noMonth;
                var dayDate = monthDate < 10 ? "0" + monthDate : monthDate;
                dayDes.fulDate = dayDate + "/" + mnth + "/" + cal.year;
                var parts = mnth + "/" + dayDate + "/" + cal.year;

                //var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
                var mydate = new Date(parts);
                dayDes.Disabled = "show";
                //if (cal.year == todayDate.getFullYear() && cal.noMonth == todayDate.getMonth() + 1 && dayDes.Date == todayDate.getDate()) {
                //    dayDes.Css = "active-date";
                //}
                //else {
                //    dayDes.Css = "newdate";
                //}
                //current year
               
                if (cal.year == todayDate.getFullYear()) {
                    //current month
                    if (cal.noMonth == todayDate.getMonth() + 1) {
                        dayDes.Css = mydate >= Todate ? "" : "old-dt";
                        //current date
                        {
                            if (dayDes.Date == todayDate.getDate()) {
                                dayDes.Css = "active-date";
                            }
                        }

                    }
                    else if (cal.noMonth < Todate.getMonth() + 1) {
                        //chnage
                        if (cal.year > Todate.getFullYear()) {
                            dayDes.Css = "";
                        }
                        else {
                            dayDes.Css = "old-dt";
                        }
                        //change end
                        //dayDes.Css = "old-dt";

                    }
                    else if (cal.noMonth > Todate.getMonth() + 1) {
                        dayDes.Css = "";
                    }
                }
                else if (cal.year > todayDate.getFullYear()) {
                    dayDes.Css = "";
                    //if (dayDes.Date == Convert.ToInt32(data.Split('_')[4].Split('/')[0]))//final change made //date 
                    //{
                    //    dayDes.Css = "sel-date";
                    //}
                }
                else if (cal.year < todayDate.getFullYear()) {
                    dayDes.Css = "old-dt";
                   
                }
                else {
                    dayDes.Css = "old-dt";
                }
                monthDate++;
            }
            else {
                //other month date
                dayDes.Active = "false";
                dayDes.Date = "";
                dayDes.fulDate = "00/00/0000";
                dayDes.Disabled = "hidden";
                dayDes.Css = "old-dt";
            }
            //fill days description in rows 
            if (i <= 7) {
                cal.firstRow.push(dayDes);
            }
            else if (i > 7 && i <= 14) {
                cal.secondRow.push(dayDes);
            }
            else if (i > 14 && i <= 21) {
                cal.thirdRow.push(dayDes);
            }
            else if (i > 21 && i <= 28) {
                cal.fouthRow.push(dayDes);
            }
            else if (i > 28 && i <= 35) {
                cal.fifthRow.push(dayDes);
            }
            else if (i > 35 && i <= 42) {
                cal.sixthRow.push(dayDes);
            }
        }
        monthGroup.push(cal);
    }
    makeCalHtml(_dateType, _idDDate, _idRdate, _divIdToBind);
}
function nextPrevButton(_dateType, _idDDate, _idRdate, _divIdToBind, _PrvNextTag) {
    var date = new Date();
    monthGroup = [];
    //if (_dateType == "rdate") {
    //    $('#rdate').val();
    //    date = new Date($('#rdate').val());

    //    todayDateNextPrv = date;
    //}
    //else {
    //    $('#ddate').val();
    //    date = new Date($('#ddate').val());

    //    todayDateNextPrv = date;
    //}

    if (_PrvNextTag == 'nxtMnt') {
        todayDateNextPrv.setMonth(todayDateNextPrv.getMonth() + 1);
    }
    else {
        todayDateNextPrv.setMonth(todayDateNextPrv.getMonth() - 1);
    }

    // var todayDateNextPrv = '';
    var Datecheck = '';
    if (_dateType == "rdate") {
        var ddate = $('#' + _idDDate).val();
        if (ddate != "") {
            Datecheck = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);
        }
        else {
            Datecheck = new Date();
        }
    }
    else if (_dateType == "ddate" && checkRdate == "yes") {
        var ddate = $('#' + _idDDate).val();
        if (ddate != "") {
            Datecheck = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);
        }
        else {
            Datecheck = new Date();
        }
    }
    else {
        Datecheck = new Date();
    }

    for (var month = 0; month < 2; month++) {
        if (month == 0) {
            var currentDate = new Date(todayDateNextPrv.getFullYear(), todayDateNextPrv.getMonth(), "01");
        }
        else {
            var currentDate = nextMonth(currentDate.getFullYear(), currentDate.getMonth(), "01");
        }
        var cal = {};
        //cal.month = currentDate.toLocaleString("en-us", { month: "short" });
        cal.month = monthNames[currentDate.getMonth()];
        cal.noMonth = currentDate.getMonth() + 1;
        cal.year = currentDate.getFullYear();
        cal.firstRow = [];
        cal.secondRow = [];
        cal.thirdRow = [];
        cal.fouthRow = [];
        cal.fifthRow = [];
        cal.sixthRow = [];
        var monthDate = 1;
        for (var i = 1; i <= 42; i++) {
            var dayDes = {};
            if (i >= currentDate.getDay() + 1 && i <= daysInMonth(cal.noMonth, cal.year) + currentDate.getDay()) {
                dayDes.Active = "true";
                dayDes.Date = monthDate;
                var mnth = cal.noMonth < 10 ? "0" + cal.noMonth : cal.noMonth;
                var dayDate = monthDate < 10 ? "0" + monthDate : monthDate;
                dayDes.fulDate = dayDate + "/" + mnth + "/" + cal.year;
                dayDes.Disabled = "show";
                //if (cal.year == todayDate.getFullYear() && cal.noMonth == todayDate.getMonth() + 1 && dayDes.Date == todayDate.getDate()) {
                //    dayDes.Css = "active-date";
                //}
                //else {
                //    dayDes.Css = "newdate";
                //}
                //  var Datecheck = new Date();
                //current year
                if (cal.year == Datecheck.getFullYear()) {
                    //current month
                    if (cal.noMonth == Datecheck.getMonth() + 1) {
                        //  dayDes.Css = dayDes.Date >= todayDate.getDate() ? "" : "old-dt";
                        dayDes.Css = dayDes.Date >= Datecheck.getDate() ? "" : "old-dt";
                        //current date
                        if (dayDes.Date == Datecheck.getDate()) {
                            dayDes.Css = "active-date";
                        }
                    }
                    else if (cal.noMonth < Datecheck.getMonth() + 1) {
                        dayDes.Css = "old-dt";
                    }
                    else if (cal.noMonth > Datecheck.getMonth() + 1) {
                        if (checkRdate == "yes") {
                            if (_dateType == "ddate") {
                                var ddate = $('#' + _idDDate).val();
                                if (ddate != "") {

                                    var Datechecks = new Date(ddate.split('/')[2], ddate.split('/')[1] - 1, ddate.split('/')[0]);
                                    if (cal.noMonth == Datechecks.getMonth() + 1) {
                                        dayDes.Css = dayDes.Date >= Datechecks.getDate() ? "" : "old-dt";

                                    }

                                }
                            }
                            else
                                dayDes.Css = "";
                        }
                        dayDes.Css = "";

                    }
                }
                else if (cal.year > Datecheck.getFullYear()) {
                    dayDes.Css = "";
                    //if (dayDes.Date == Convert.ToInt32(data.Split('_')[4].Split('/')[0]))//final change made //date 
                    //{
                    //    dayDes.Css = "sel-date";
                    //}
                }
                else if (cal.year < Datecheck.getFullYear()) {
                    dayDes.Css = "old-dt";
                }
                else {
                    dayDes.Css = "old-dt";
                }
                monthDate++;
            }
            else {
                //other month date
                dayDes.Active = "false";
                dayDes.Date = "";
                dayDes.fulDate = "00/00/0000";
                dayDes.Disabled = "hidden";
                dayDes.Css = "old-dt";
            }
            //fill days description in rows 
            if (i <= 7) {
                cal.firstRow.push(dayDes);
            }
            else if (i > 7 && i <= 14) {
                cal.secondRow.push(dayDes);
            }
            else if (i > 14 && i <= 21) {
                cal.thirdRow.push(dayDes);
            }
            else if (i > 21 && i <= 28) {
                cal.fouthRow.push(dayDes);
            }
            else if (i > 28 && i <= 35) {
                cal.fifthRow.push(dayDes);
            }
            else if (i > 35 && i <= 42) {
                cal.sixthRow.push(dayDes);
            }
        }
        monthGroup.push(cal);
    }
 
    makeCalHtml(_dateType, _idDDate, _idRdate, _divIdToBind);
}
function FillcalendarFares_Cm(month, year, _bindType) {
    var from = '';
    if (document.getElementById("FromSector") != null) from = document.getElementById("FromSector").value;
    else
        from = document.getElementById("FromSector1").value;
    var to = '';
    if (document.getElementById("Editbox13") != null) to = document.getElementById("Editbox13").value;
    else
        to = document.getElementById("Editbox14").value;
    var Rway = document.getElementById("rdate").value;
    var depdate =  "01/" + month + "/" + year; //document.getElementById("ddate").value;
    var dates = "";
	var hdnFrom="ddate";
    var sector = from.split('-')[0] + "_" + to.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    if (hdnFrom == 'rdate') {
        sector = to.split('-')[0] + "_" + from.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    }
    var divCal = document.getElementById("dvcalendar");
    var month = "";
    var year = "";
    if (!IsCheckDomesticLocal(from, to)) {
        $('.imgHide').hide();
        return true;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://flightservice.easemytrip.com/EmtAppService/FareCalendar/FillCalendarDataByMonth",
        data: "{'CalKey_':'" + sector + "'}",
        async: true,
        crossDomain: true,
        success: function(data) {
            for (var _mnth = 0; _mnth < data.length; _mnth++) {
                var result = data[_mnth];
                for (var i = 0; i < result.FstRow.length; i++) {
                    if (document.getElementById(result.FstRow[i].fulDate) != null) {
                        document.getElementById(result.FstRow[i].fulDate).innerHTML = result.FstRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.FstRow[i].bookMsg;
                        document.getElementById(result.FstRow[i].fulDate).style.color = ReturnCheapestColour(result.FstRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.SndRow.length; i++) {
                    if (document.getElementById(result.SndRow[i].fulDate) != null) {
                        document.getElementById(result.SndRow[i].fulDate).innerHTML = result.SndRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width:5px;display:none;'>" + result.SndRow[i].bookMsg;
                        document.getElementById(result.SndRow[i].fulDate).style.color = ReturnCheapestColour(result.SndRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.TrdRow.length; i++) {
                    if (document.getElementById(result.TrdRow[i].fulDate) != null) {
                        document.getElementById(result.TrdRow[i].fulDate).innerHTML = result.TrdRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.TrdRow[i].bookMsg;
                        document.getElementById(result.TrdRow[i].fulDate).style.color = ReturnCheapestColour(result.TrdRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.ForthRow.length; i++) {
                    if (document.getElementById(result.ForthRow[i].fulDate) != null) {
                        document.getElementById(result.ForthRow[i].fulDate).innerHTML = result.ForthRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.ForthRow[i].bookMsg;
                        document.getElementById(result.ForthRow[i].fulDate).style.color = ReturnCheapestColour(result.ForthRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.FifthRow.length; i++) {
                    if (document.getElementById(result.FifthRow[i].fulDate) != null) {
                        document.getElementById(result.FifthRow[i].fulDate).innerHTML = result.FifthRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.FifthRow[i].bookMsg;
                        document.getElementById(result.FifthRow[i].fulDate).style.color = ReturnCheapestColour(result.FifthRow[i].cheapest);
                    }
                }
                for (var i = 0; i < result.SixRow.length; i++) {
                    if (document.getElementById(result.SixRow[i].fulDate) != null) {
                        document.getElementById(result.SixRow[i].fulDate).innerHTML = result.SixRow[i].bookMsg == "" ? "" : "<img src='https://easemytrip.com/img/rs-hm.png' style='width: 5px;display:none;'>" + result.SixRow[i].bookMsg;
                        document.getElementById(result.SixRow[i].fulDate).style.color = ReturnCheapestColour(result.SixRow[i].cheapest);
                    }
                }
            }
            $('.imgHide').hide();
            return false;
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

//NEW FUNCTION TO FILL VALUE OF DATES
function FillcalendarFillDates() {
    var from = '';
    if (document.getElementById("FromSector") != null)
        from = document.getElementById("FromSector").value;
    else
        from = document.getElementById("FromSector1").value;
    var to = '';
    if (document.getElementById("Editbox13") != null)
        to = document.getElementById("Editbox13").value;
    else
        to = document.getElementById("Editbox14").value;
    var hdnFrom = document.getElementById("hdn").value;
    var Rway = document.getElementById("rdate").value;
    var depdate = document.getElementById("ddate").value;
    if(depdate=="")
	{
		 depdate=todayDateNextPrv.getDate()+"/"+parseInt(todayDateNextPrv.getMonth()+1)+"/"+todayDateNextPrv.getFullYear();
	}
    var dates = "";
    var sector = from.split('-')[0] + "_" + to.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    if (hdnFrom == 'rdate') {
        sector = to.split('-')[0] + "_" + from.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Rway;
    }
    var divCal = document.getElementById("dvcalendar");
    var month = "";
    var year = "";
    //  BindFare();
    //  FillcalendarGetDates();
	   if (!IsCheckDomesticLocal(from, to)) {
        $('.imgHide').hide();
        return true;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        //url: "http://localhost:10440/EmtAppService/FareCalendar/FillCalendarData",
        url: "https://flightservice.easemytrip.com/EmtAppService/FareCalendar/FillCalendarData",
        data: "{'CalKey_':'" + sector + "'}",
        async: true,
        crossDomain: true,
        success: function (data) {
            var result = JSON.parse(data);
            month = result.current.month;
            year = result.current.year;
            var preMnth = result.previous.month < 10 ? "0" + result.previous.month.toString() : result.previous.month.toString();
            //var preYear = result.previous.year;
            var nxtMnth = result.next.month < 10 ? "0" + result.next.month.toString() : result.next.month.toString();
            for (var i = 0; i < result.FstRow.length; i++) {
                if (document.getElementById(result.FstRow[i].fulDate) != null) {
                    document.getElementById(result.FstRow[i].fulDate).innerHTML = result.FstRow[i].bookMsg;
					document.getElementById(result.FstRow[i].fulDate).style.color = ReturnCheapestColour(result.FstRow[i].cheapest);
                }

                // html += '<li class="' + result.FstRow[i].Css + '" id="fst_' + i + '_' + result.FstRow[i].fulDate + '" style="visibility:' + result.FstRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.FstRow[i].Date + '<span class="' + result.FstRow[i].Css + '">' + result.FstRow[i].bookMsg + '</span></li>';
            }
            for (var i = 0; i < result.SndRow.length; i++) {
                if (document.getElementById(result.SndRow[i].fulDate) != null) {
                    document.getElementById(result.SndRow[i].fulDate).innerHTML = result.SndRow[i].bookMsg;
					document.getElementById(result.SndRow[i].fulDate).style.color = ReturnCheapestColour(result.SndRow[i].cheapest);
                }
                //html += '<li class="' + result.SndRow[i].Css + '" id="snd_' + i + '_' + result.SndRow[i].fulDate + '" style="visibility:' + result.SndRow[i].Disabled + '" onclick="SelectDate(this.id)">' + result.SndRow[i].Date + '<span class="' + result.SndRow[i].Css + '">' + result.SndRow[i].bookMsg + '</span></li>';
            }

            for (var i = 0; i < result.TrdRow.length; i++) {
                if (document.getElementById(result.TrdRow[i].fulDate) != null) {
                    document.getElementById(result.TrdRow[i].fulDate).innerHTML = result.TrdRow[i].bookMsg;
					document.getElementById(result.TrdRow[i].fulDate).style.color = ReturnCheapestColour(result.TrdRow[i].cheapest);
                }
                //  html += '<li class="' + result.TrdRow[i].Css + '" id="trd_' + i + '_' + result.TrdRow[i].fulDate + '" style="visibility:' + result.TrdRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.TrdRow[i].Date + '<span class="' + result.TrdRow[i].Css + '">' + result.TrdRow[i].bookMsg + '</span></li>';
            }

            for (var i = 0; i < result.ForthRow.length; i++) {
                if (document.getElementById(result.ForthRow[i].fulDate) != null) {
                    document.getElementById(result.ForthRow[i].fulDate).innerHTML = result.ForthRow[i].bookMsg;
					document.getElementById(result.ForthRow[i].fulDate).style.color = ReturnCheapestColour(result.ForthRow[i].cheapest);
                }
                //html += '<li class="' + result.ForthRow[i].Css + '" id="frth_' + i + '_' + result.ForthRow[i].fulDate + '" style="visibility:' + result.ForthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.ForthRow[i].Date + '<span class="' + result.ForthRow[i].Css + '">' + result.ForthRow[i].bookMsg + '</span></li>';
            }

            for (var i = 0; i < result.FifthRow.length; i++) {
                if (document.getElementById(result.FifthRow[i].fulDate) != null) {
                    document.getElementById(result.FifthRow[i].fulDate).innerHTML = result.FifthRow[i].bookMsg;
					document.getElementById(result.FifthRow[i].fulDate).style.color = ReturnCheapestColour(result.FifthRow[i].cheapest);
                }
                //html += '<li class="' + result.FifthRow[i].Css + '" id="fiv_' + i + '_' + result.FifthRow[i].fulDate + '" style="visibility:' + result.FifthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.FifthRow[i].Date + '<span class="' + result.FifthRow[i].Css + '">' + result.FifthRow[i].bookMsg + '</span></li>';
            }
            for (var i = 0; i < result.SixRow.length; i++) {
                if (document.getElementById(result.SixRow[i].fulDate) != null) {
                    document.getElementById(result.SixRow[i].fulDate).innerHTML = result.SixRow[i].bookMsg;
					document.getElementById(result.SixRow[i].fulDate).style.color = ReturnCheapestColour(result.SixRow[i].cheapest);
                }
                //html += '<li class="' + result.SixRow[i].Css + '" id="six_' + i + '_' + result.SixRow[i].fulDate + '" style="visibility:' + result.SixRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.SixRow[i].Date + '<span class="' + result.SixRow[i].Css + '">' + result.SixRow[i].bookMsg + '</span></li>';
            }
            return false;
        },
        beforeSend: function (XMLHttpRequest) {
        },
        error: function (xmlHttpRequest, status, err) {
        }
    });
    //if ($('#sixRowClass ul li .olddate').length == 7) {
    //    $('#sixRowClass').hide();
    //}
    //else {
    //    $('#sixRowClass').show();
    //}
}


//month diff 
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function FillcalendarV1(month, year) {
  
    var from = '';
    if (document.getElementById("FromSector") != null)
        from = document.getElementById("FromSector").value;
    else
        from = document.getElementById("FromSector1").value;
    var to = '';
    if (document.getElementById("Editbox13") != null)
        to = document.getElementById("Editbox13").value;
    else
        to = document.getElementById("Editbox14").value;
    var hdnFrom = document.getElementById("hdn").value;
    var Oneway = document.getElementById("ddate").value;
    var depdate = "";

    var dates = month + "_" + year;
    // var sector = from.split('-')[0] + "_" + to.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Oneway;
    var sector = from.split('-')[0] + "_" + to.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Oneway;
    if (hdnFrom == 'rdate') {
        sector = to.split('-')[0] + "_" + from.split('-')[0] + "_" + hdnFrom + "_" + dates + "_" + depdate + "_" + Oneway;
    }
    var divCal = document.getElementById("dvcalendar");
    var month = "";
    var year = "";
  //chnage start
    if (!IsCheckDomesticLocal(from, to)) {
        $('.imgHide').hide();
        return true;
    }
    var NoOfMonth = monthDiff(new Date(), todayDateNextPrv)
    if (NoOfMonth > 5) {
        $('.imgHide').hide();
        return true;
    }
    //chnage end
    //  nextPrevButton('ddate', 'ddate', 'rdate', 'dvcalendar', prvNextArrow);

    //<img src="~/Content/img/right.png" />
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://flightservice.easemytrip.com/EmtAppService/FareCalendar/FillCalendarDataFrIncr",
        data: "{'CalKey_':'" + sector + "'}",
        async: true,
        success: function (data) {
            var result = JSON.parse(data);
            month = result.current.month;
            year = result.current.year;
            var preMnth = result.previous.month < 10 ? "0" + result.previous.month.toString() : result.previous.month.toString();
            //var preYear = result.previous.year;
            var nxtMnth = result.next.month < 10 ? "0" + result.next.month.toString() : result.next.month.toString();
            //var html = '<div class="main">'
            //+ '<div class="box">'
            //+ '<div class="month-right">'
            //+ '<div class="month1-right" runat="server" id="dvprevious"><img id="img2" src="/Content/img/left.png" alt="Arrow" onclick="return FillcalendarV(' + preMnth + ',' + result.previous.year + ');"></div>'
            //+ '<div class="month2-right">' + result.current.name + ' ' + result.current.year + '</div>'
            //+ '<div class="month3-right" ><img id="img1" src="/Content/img/right.png" alt="Arrow" onclick="return FillcalendarV(' + nxtMnth + ',' + result.next.year + ');"></div>'
            //+ '</div>'
            //+ '<div class="weekdays-right">'
            //+ '<ul><li>Su</li><li>Mo</li><li>Tu</li><li>We</li><li>Th</li><li>Fr</li><li>Sa</li></ul>'
            //+ '</div>';

            //html += '<div class="days-right"><ul>'
            for (var i = 0; i < result.FstRow.length; i++) {
                // html += '<li class="' + result.FstRow[i].Css + '" id="fst_' + i + '_' + result.FstRow[i].fulDate + '" style="visibility:' + result.FstRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.FstRow[i].Date + '<span class="' + result.FstRow[i].Css + '">' + result.FstRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.FstRow[i].fulDate) != null) {
                    document.getElementById(result.FstRow[i].fulDate).innerHTML = result.FstRow[i].bookMsg;
					document.getElementById(result.FstRow[i].fulDate).style.color = ReturnCheapestColour(result.FstRow[i].cheapest);
                }

            }
            //  html += '</ul></div>';

            //  html += '<div class="days-right"><ul>'
            for (var i = 0; i < result.SndRow.length; i++) {
                //html += '<li class="' + result.SndRow[i].Css + '" id="snd_' + i + '_' + result.SndRow[i].fulDate + '" style="visibility:' + result.SndRow[i].Disabled + '" onclick="SelectDate(this.id)">' + result.SndRow[i].Date + '<span class="' + result.SndRow[i].Css + '">' + result.SndRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.SndRow[i].fulDate) != null) {
                    document.getElementById(result.SndRow[i].fulDate).innerHTML = result.SndRow[i].bookMsg;
					document.getElementById(result.SndRow[i].fulDate).style.color = ReturnCheapestColour(result.SndRow[i].cheapest);
                }
            }
            //  html += '</ul></div>';

            // html += '<div class="days-right"><ul>'
            for (var i = 0; i < result.TrdRow.length; i++) {
                //html += '<li class="' + result.TrdRow[i].Css + '" id="trd_' + i + '_' + result.TrdRow[i].fulDate + '" style="visibility:' + result.TrdRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.TrdRow[i].Date + '<span class="' + result.TrdRow[i].Css + '">' + result.TrdRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.TrdRow[i].fulDate) != null) {
                    document.getElementById(result.TrdRow[i].fulDate).innerHTML = result.TrdRow[i].bookMsg;
					document.getElementById(result.TrdRow[i].fulDate).style.color = ReturnCheapestColour(result.TrdRow[i].cheapest);
                }

            }
            //  html += '</ul></div>';

            //  html += '<div class="days-right"><ul>'
            for (var i = 0; i < result.ForthRow.length; i++) {
                // html += '<li class="' + result.ForthRow[i].Css + '" id="frth_' + i + '_' + result.ForthRow[i].fulDate + '" style="visibility:' + result.ForthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.ForthRow[i].Date + '<span class="' + result.ForthRow[i].Css + '">' + result.ForthRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.ForthRow[i].fulDate) != null) {
                    document.getElementById(result.ForthRow[i].fulDate).innerHTML = result.ForthRow[i].bookMsg;
						document.getElementById(result.ForthRow[i].fulDate).style.color = ReturnCheapestColour(result.ForthRow[i].cheapest);
                }

            }
            //  html += '</ul></div>';

            //  html += '<div class="days-right"><ul>'
            for (var i = 0; i < result.FifthRow.length; i++) {
                //html += '<li class="' + result.FifthRow[i].Css + '" id="fiv_' + i + '_' + result.FifthRow[i].fulDate + '" style="visibility:' + result.FifthRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.FifthRow[i].Date + '<span class="' + result.FifthRow[i].Css + '">' + result.FifthRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.FifthRow[i].fulDate) != null) {
                    document.getElementById(result.FifthRow[i].fulDate).innerHTML = result.FifthRow[i].bookMsg;
					document.getElementById(result.FifthRow[i].fulDate).style.color = ReturnCheapestColour(result.FifthRow[i].cheapest);
                }

            }
            // html += '</ul></div>';

            // html += '<div id="sixRowClassNex" class="days-right"><ul>'
            for (var i = 0; i < result.SixRow.length; i++) {
                // html += '<li class="' + result.SixRow[i].Css + '" id="six_' + i + '_' + result.SixRow[i].fulDate + '" style="visibility:' + result.SixRow[i].Disabled + '"  onclick="SelectDate(this.id)">' + result.SixRow[i].Date + '<span class="' + result.SixRow[i].Css + '">' + result.SixRow[i].bookMsg + '</span></li>';
                if (document.getElementById(result.SixRow[i].fulDate) != null) {
                    document.getElementById(result.SixRow[i].fulDate).innerHTML = result.SixRow[i].bookMsg;
					document.getElementById(result.SixRow[i].fulDate).style.color = ReturnCheapestColour(result.SixRow[i].cheapest);
                }
            }
            //   html += '</ul></div>';

            // html += '</div>'
            //  + '</div>';
            //divCal.innerHTML = html;
            divCal.style.display = "block";

            var dateObj = new Date();
            var monthT = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var yearT = dateObj.getUTCFullYear();
            if (monthT == month && yearT == year) {
                document.getElementById("dvprevious").className = "dvnxt";
            }
            else if (Oneway != "" && (month == Oneway.split('/')[1] && year == Oneway.split('/')[2]) && hdnFrom == "rdate") {
                document.getElementById("dvprevious").className = "dvnxt";
            }
            return false;
        },
        beforeSend: function (XMLHttpRequest) {
        },
        error: function (xmlHttpRequest, status, err) {
        }
    });
    //if ($('#sixRowClassNex ul li .olddate').length == 7) {
    //    $('#sixRowClassNex').hide();
    //}
    //else {
    //    $('#sixRowClassNex').show();
    //}
}

function ReturnCheapestColour(cheapest) {
    if (cheapest == 1) {
        return "green";
    }
    else if (cheapest == 2) {
        return "#a5a4a4";
    }
    else if (cheapest == 3) {
        return "red";
    }
}