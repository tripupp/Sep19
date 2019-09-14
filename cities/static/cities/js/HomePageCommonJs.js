function setType(e) {
    "O" == e ? (document.getElementById("Trip").checked = !0,
     document.getElementById("radio1").checked = !1, document.getElementById("rdate").value = "", $(".mul-sho").hide(),
     $(".flig-show1").show(), $(".retu-date-n").addClass("op")) : "R" == e ? (document.getElementById("radio1").checked = !0, document.getElementById("Trip").checked = !1, $(".mul-sho").hide(),
     $(".flig-show1").show(), $(".retu-date-n").removeClass("op")) : "M" == e && (document.getElementById("rdoMul").checked = !0, $(".flig-show1").hide(),
     $(".mul-sho").show()); var t = document.getElementById("Trip").checked ? "Oneway" : "Return"; SearchType.value = t;
    if (e == "O") {
        setCookie("tripType", "0");
    } else {
        setCookie("tripType", "1");
    }
}
function autoSelectMul(e, t, o, a) {
    if (t == "Editbox13_show" || t=="Editbox13s_show") {
        setCookie("Dest1", o + "|" + document.getElementById(e).innerHTML);
		if(document.getElementById(a)!=null)
		{
			 setCookie("AirportDest1", document.getElementById(a).innerHTML);
		}
       
    } else {
        setCookie("Org1", o + "|" + document.getElementById(e).innerHTML);
		if(document.getElementById(a)!=null)
		{
			  setCookie("AirportOrg1", document.getElementById(a).innerHTML);
		}
      
    }
    var l = document.getElementById(e).innerHTML.trim();
    var airport = "";
	if(document.getElementById(a)!=null)
	{
		airport = document.getElementById(a).innerHTML.trim();
	}
    document.getElementById(t).value = l; 
	document.getElementById(t.split("_")[0]).value = o;
	if(document.getElementById(t.split("_")[0] + "Span")!=null)
	{
	document.getElementById(t.split("_")[0] + "Span").innerHTML = airport;
	}
	
	"ToSector-mul1_show" == t ? ($("#FromSector-mul2_show").val(l), $("#FromSector-mul2").val(o), $("#FromSector-mul2Span").text(airport)) : "ToSector-mul2_show" == t ? ($("#FromSector-mul3_show").val(l), $("#FromSector-mul3").val(o), $("#FromSector-mul3Span").text(airport)) : "ToSector-mul3_show" == t ? ($("#FromSector-mul4_show").val(l), $("#FromSector-mul4").val(o), $("#FromSector-mul4Span").text(airport)) : "ToSector-mul4_show" == t ? ($("#FromSector-mul5_show").val(l), $("#FromSector-mul5").val(o), $("#FromSector-mul5Span").text(airport)) : "ToSector-mul5_show" == t && ($("#FromSector-mul6_show").val(l), $("#FromSector-mul6").val(o), $("#FromSector-mul6Span").text(airport)), document.getElementById("fromautoFill").style.display = "none", document.getElementById("toautoFill").style.display = "none";
    for (var n = 1; n < 7; n++) document.getElementById("FromMulti" + n).style.display = "none", document.getElementById("ToMulti" + n).style.display = "none";
}

$(".rt_cross").click(function () {
    document.getElementById("Trip").checked = !0, $("#rdate").val(""), $(".rt_cross").hide(), $("#cld_icon").show(), $(".retu-date-n").css("opacity", "0.4"), $(".click-round").css("opacity", "1"), $(".click-round").removeClass("bg-color"), $(".click-one").addClass("bg-color")
    setCookie("RTDate", "");
    setCookie("tripType", "0");
})
jQuery(document).ready(function () {
    $("#ddateMul1").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul1").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul2").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul2").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul2").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul3").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul3").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul3").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul4").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul4").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul4").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul5").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul5").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul5").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul6").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul6").datepicker({
        minDate: 0,
        onSelect: function (e, t) {
            var l = $("#ddateMul6").datepicker("getDate");
            l.setDate(l.getDate()), $("#ddateMul7").datepicker("option", "minDate", l)
        },
        dateFormat: "dd/mm/yy"
    }), $("#ddateMul7").datepicker(), $("#sign-up-now").click(function () {
        $("#hid1").show(), $("#hid").hide()
    }),
        $(".plus_box1").click(function (e) {
            e.preventDefault(), fieldName = $(this).attr("field");
            var t = parseInt($("input[name=" + fieldName + "]").val());
            isNaN(t) ? $("input[name=" + fieldName + "]").val(0) : (parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) == 9 && (document.getElementById("optChild").value = 0), t <= 8 && parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) <= 8 && $("input[name=" + fieldName + "]").val(t + 1));
            var l = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(l + " Guest")
            setCookie("Adt", parseInt($("input[name=" + fieldName + "]").val()), 2);
        }), $(".plus_boxChd").click(function (e) {
            e.preventDefault(), fieldName = $(this).attr("field");
            var t = parseInt($("input[name=" + fieldName + "]").val());
            isNaN(t) ? $("input[name=" + fieldName + "]").val(0) : t < 9 - parseInt(document.getElementById("optAdult").value) && parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) <= 8 ? $("input[name=" + fieldName + "]").val(t + 1) : alert("More than 9 Passenger's can not travel.");
            var l = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(l + " Guest")
            setCookie("Chd", parseInt($("input[name=" + fieldName + "]").val()), 2);
        }), $(".plus_box1Inf").click(function (e) {
            e.preventDefault(), fieldName = $(this).attr("field");
            var t = parseInt($("input[name=" + fieldName + "]").val());
            isNaN(t) ? $("input[name=" + fieldName + "]").val(0) : t < parseInt(document.getElementById("optAdult").value) ? $("input[name=" + fieldName + "]").val(t + 1) : alert("Infant can't travel more than Adult.");
            var l = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(l + " Guest")
            setCookie("Inf", parseInt($("input[name=" + fieldName + "]").val()), 2);
        }), $(".minus_boxADt").click(function (e) {
            e.preventDefault(), fieldName = $(this).attr("field");
            var t = parseInt($("input[name=" + fieldName + "]").val());
            !isNaN(t) && 0 < t ? 1 < t && $("input[name=" + fieldName + "]").val(t - 1) : $("input[name=" + fieldName + "]").val(0);
            var l = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(l + " Guest")
            setCookie("Adt", parseInt($("input[name=" + fieldName + "]").val()), 2)
        }), $(".minus_box1").click(function (e) {
            e.preventDefault(), fieldName = $(this).attr("field");
            var t = parseInt($("input[name=" + fieldName + "]").val());
            !isNaN(t) && 0 < t ? $("input[name=" + fieldName + "]").val(t - 1) : $("input[name=" + fieldName + "]").val(0);
            var l = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(l + " Guest")
            if (fieldName == "quantity1") {
                setCookie("Chd", parseInt($("input[name=" + fieldName + "]").val()), 2);
            } else {
                setCookie("Inf", parseInt($("input[name=" + fieldName + "]").val()), 2);
            }

        });
});
function fillOptClassName(name) {
    $('.optclass-name').text(name)
    setCookie("Cab", $("input:radio[name=optClass]:checked").val() + "|" + name);
}

function fillOptClassNameMul(name) {
    $('.optclass-nameMul').text(', ' + name)
}

{
    DeleteCookie("Dest1", "", "");
    var response = getCookie("RecentCookie_new2").split('~');
    var dDate = getCookie("DepDate");
    var RDate = getCookie("RTDate");
    var orgCk = getCookie("Org1");
    var destCk = getCookie("Dest1");
    var dateCookies = new Date();
    var Todate_c = new Date();
    if (response != null && response.length > 0 && response[0] != "") {
        if (response[response.length - 1].split('|')[2] != null && response[response.length - 1].split('|')[2] != '' && response[response.length - 1].split('|')[2] != 'undefined' && response[response.length - 1].split('|')[2] != undefined) {

            var CookiesDate_c = response[response.length - 1].split('|')[2];
            dateCookies = new Date(CookiesDate_c.split('/')[2], CookiesDate_c.split('/')[1] - 1, CookiesDate_c.split('/')[0]);
            if (Todate_c > dateCookies) {
                document.getElementById('ddate').value = getFormattedDate(new Date());
                document.getElementById('ddateMul1').value = getFormattedDate(new Date());
            } else {
                document.getElementById('ddate').value = response[response.length - 1].split('|')[2];
                document.getElementById('ddateMul1').value = response[response.length - 1].split('|')[2];
                if (dDate != "") {
                    $("#ddate").val(dDate);
                }

                /* 	if(RDate!="")
                    {
                        $("#rdate").val(RDate);
                    } */
            }
        }
        if (response[response.length - 1].split('|')[9] != undefined) {
            $(".click-one").removeClass('bg-color');
            $(".click-mul").addClass('bg-color');
            setType('M');
        } else if (response[response.length - 1].split('|')[3] != null && response[response.length - 1].split('|')[3] != '' && response[response.length - 1].split('|')[3] != 'undefined' && response[response.length - 1].split('|')[3] != undefined) {
            document.getElementById('rdate').value = response[response.length - 1].split('|')[3];
            document.getElementById('Trip').checked = false;
            document.getElementById('radio1').checked = true;
            SearchType.value = 'Return';
            $(".rt_cross").show();
            $("#cld_icon").hide();
            $(".click-round").addClass('bg-color');
            $(".click-one").removeClass('bg-color');
            $(".retu-date-n").removeClass("op");
            $("#rdate").val(RDate);
            if (RDate != "") {
                $("#rdate").val(RDate);
            }

        } else {
            document.getElementById("rdate").value = '';
            document.getElementById('Trip').checked = true;
            document.getElementById('radio1').checked = false;
            SearchType.value = 'Oneway';
            $(".click-round").removeClass('bg-color');
            $(".click-one").addClass('bg-color');
        }
        if (response[response.length - 1].split('|')[0] != 'undefined' && response[response.length - 1].split('|')[0] != undefined) {
            $("#FromSector").val(response[response.length - 1].split('|')[0]);
            $("#FromSector-mul1").val(response[response.length - 1].split('|')[0]);
            var _from = response[response.length - 1].split('|')[0];
            $("#FromSector_show").val(_from.split(',')[0].split('-')[1] + '(' + _from.split(',')[0].split('-')[0] + ')');
            $("#FromSector-mul1_show").val(_from.split(',')[0].split('-')[1] + '(' + _from.split(',')[0].split('-')[0] + ')');
            if (document.getElementById('srcCity_show') != null && document.getElementById('srcCity_show').value != null && $("#FromSector_show").val() != null && $("#FromSector_show").val() != "") {
                document.getElementById('srcCity').value = $("#FromSector").val();
                document.getElementById('srcCity_show').value = $("#FromSector_show").val();
            }
            $("#FromSector").val(orgCk.split('|')[0]);
            $("#FromSector_show").val(orgCk.split('|')[1]);
        }
        if (response[response.length - 1].split('|')[1] != 'undefined' && response[response.length - 1].split('|')[1] != undefined) {
            $("#Editbox13").val(response[response.length - 1].split('|')[1]);
            $("#ToSector-mul1").val(response[response.length - 1].split('|')[1]);
            $("#FromSector-mul2").val(response[response.length - 1].split('|')[1]);
            var _to = response[response.length - 1].split('|')[1];
            $("#Editbox13_show").val(_to.split(',')[0].split('-')[1] + '(' + _to.split(',')[0].split('-')[0] + ')');
            $("#ToSector-mul1_show").val(_to.split(',')[0].split('-')[1] + '(' + _to.split(',')[0].split('-')[0] + ')');
            $("#FromSector-mul2_show").val(_to.split(',')[0].split('-')[1] + '(' + _to.split(',')[0].split('-')[0] + ')');
            if (document.getElementById('destCity_show') != null && document.getElementById('destCity_show').value != null && $("#Editbox13_show").val() != null && $("#Editbox13_show").val() != "") {
                document.getElementById('destCity').value = $("#Editbox13").val();
                document.getElementById('destCity_show').value = $("#Editbox13_show").val();
            }
            $("#Editbox13").val(destCk.split('|')[0]);
            $("#Editbox13_show").val(destCk.split('|')[1]);
        }
        if (response[response.length - 1].split('|')[4] != 'undefined' && response[response.length - 1].split('|')[4] != undefined) {
            document.getElementById("optAdult").value = response[response.length - 1].split('|')[4];
            document.getElementById("optAdultMul").value = response[response.length - 1].split('|')[4];
        }
        if (response[response.length - 1].split('|')[5] != 'undefined' && response[response.length - 1].split('|')[5] != undefined) {
            document.getElementById("optChild").value = response[response.length - 1].split('|')[5];
            document.getElementById("optChildMul").value = response[response.length - 1].split('|')[5];
        }
        if (response[response.length - 1].split('|')[6] != 'undefined' && response[response.length - 1].split('|')[6] != undefined) {
            document.getElementById("optInfant").value = response[response.length - 1].split('|')[6];
            document.getElementById("optInfantMul").value = response[response.length - 1].split('|')[6];
        }
        if (document.getElementById('lblArrival') != null) {
            document.getElementById('lblArrival').innerHTML = response[response.length - 1].split('|')[1].split('-')[0].toUpperCase();
            document.getElementById('lblDeparture').innerHTML = response[response.length - 1].split('|')[0].split('-')[0].toUpperCase();
        }
        if (document.getElementById('lblArr') != null) {
            document.getElementById('lblArr').innerHTML = response[response.length - 1].split('|')[1].split('-')[1].split(',')[0].toUpperCase();
            document.getElementById('lblDepart').innerHTML = response[response.length - 1].split('|')[0].split('-')[1].split(',')[0].toUpperCase();
        }
        if (document.getElementById("optAdult") != null && document.getElementById("optChild") != null && document.getElementById("optInfant") != null) {
            var countPax = parseInt(document.getElementById("optAdult").value) + parseInt(document.getElementById("optChild").value) + parseInt(document.getElementById("optInfant").value);
            $(".drpNoTrv").text(countPax + ' Guest');
        }
        var mulRecentSearch = response[response.length - 1].split('|')[9];
        if (mulRecentSearch != undefined) {
            var serchArr = mulRecentSearch.split('^');
            for (var i = 0, j = 1; i < serchArr.length; i++, j++) {
                var mulFrom = serchArr[i].split('#$')[0];
                $('#FromSector-mul' + j).val(mulFrom);
                $('#FromSector-mul' + j + '_show').val(mulFrom.split(',')[0].split('-')[1] + '(' + mulFrom.split(',')[0].split('-')[0] + ')');
                var multo = serchArr[i].split('#$')[1];
                $('#ToSector-mul' + j).val(multo);
                $('#ToSector-mul' + j + '_show').val(multo.split(',')[0].split('-')[1] + '(' + multo.split(',')[0].split('-')[0] + ')');
                $('#ddateMul' + j).val(serchArr[i].split('#$')[2]);
                $('#sector-sec' + j).show()
                if (j == 6) {
                    $("#addAnFlt").hide();
                }
                if (j == serchArr.length) {
                    $("#crs" + j).show();
                } else {
                    $("#crs" + j).hide();
                }
            }
        }
    }
    else {
        if (dDate != "") {
            $("#ddate").val(dDate);
        }

        if (orgCk != null && orgCk != "" && orgCk.split('|').length > 1) {
            $("#FromSector").val(orgCk.split('|')[0]);
            $("#FromSector_show").val(orgCk.split('|')[1]);
        }
        else {
            $("#FromSector").val("DEL-Delhi, India");
            $("#FromSector_show").val("Delhi(DEL)");
        }
        if (destCk != null && destCk != "" && destCk.split('|').length > 1) {
            $("#Editbox13").val(destCk.split('|')[0]);
            $("#Editbox13_show").val(destCk.split('|')[1]);
        } else {
            $("#Editbox13").val("BOM-Mumbai, India");
            $("#Editbox13_show").val("Mumbai(BOM)");
            //BOM-Mumbai, India
        }
        if (RDate != "") {

            $("#rdate").val(RDate);
            document.getElementById('radio1').checked = true;
            $(".rt_cross").show();
            $("#cld_icon").hide();
            $(".click-round").addClass('bg-color');
            $(".click-one").removeClass('bg-color');
            $(".retu-date-n").removeClass("op");
        }

    }
    var adtCk = getCookie("Adt");
    var chdCk = getCookie("Chd");
    var infCk = getCookie("Inf");
    if (dDate != "") {
        $("#ddate").val(dDate);
    }
    var OrgAirport = getCookie("AirportOrg1");
    var DestAirport = getCookie("AirportDest1")

    if (orgCk != null && orgCk != "" && orgCk.split('|').length > 1) {
        $("#FromSector").val(orgCk.split('|')[0]);
        $("#FromSector_show").val(orgCk.split('|')[1]);
        $("#FromSectorSpan").text('');
        if (OrgAirport != "") {
            $("#FromSectorSpan").text(OrgAirport);
        }
    }
    else {
        $("#FromSector").val("DEL-Delhi, India");
        $("#FromSector_show").val("Delhi(DEL)");
        $("#FromSectorSpan").text("Indira Gandhi International Airport");

    }
    if (destCk != null && destCk != "" && destCk.split('|').length > 1) {
        $("#Editbox13").val(destCk.split('|')[0]);
        $("#Editbox13_show").val(destCk.split('|')[1]);
        $("#Editbox13Span").text('');
        if (DestAirport != "") {
            $("#Editbox13Span").text(DestAirport);
        }

    } else {
        $("#Editbox13").val("BOM-Mumbai, India");
        $("#Editbox13_show").val("Mumbai(BOM)");
        $("#Editbox13Span").text("Chhatrapati Shivaji International Airport");
    }
    if (RDate != "") {

        $("#rdate").val(RDate);
        document.getElementById('radio1').checked = true;
        $(".rt_cross").show();
        $("#cld_icon").hide();
        $(".click-round").addClass('bg-color');
        $(".click-one").removeClass('bg-color');
        $(".retu-date-n").removeClass("op");
    }
    var NumPass = 0;
    if (adtCk != "" && parseInt(adtCk) > 0) {
        document.getElementById("optAdult").value = adtCk;
        NumPass += parseInt(adtCk);
    }
    else {
        document.getElementById("optAdult").value = "1";
        NumPass += parseInt("1");
    }
    if (chdCk != "" && parseInt(chdCk) > 0) {
        document.getElementById("optChild").value = chdCk;
        NumPass += parseInt(chdCk);
    } else {
        document.getElementById("optChild").value = "0";
        NumPass += parseInt("0");
    }
    if (infCk != "" && parseInt(infCk) > 0) {
        document.getElementById("optInfant").value = infCk;
        NumPass += parseInt(infCk);
    }
    else {
        document.getElementById("optInfant").value = "0";
        NumPass += parseInt("0");
    }
    if (parseInt(NumPass) > 0) {
        $(".drpNoTrv").text(NumPass + " Guest")
    }
    else {
        $(".drpNoTrv").text("1 Guest")
        document.getElementById("optAdult").value = "1";
        document.getElementById("optChild").value = "0"
        document.getElementById("optInfant").value = "0";
    }
    var Cab = getCookie("Cab");
    if (parseInt(Cab.split('|')[0]) > 0) {
        $("input[name=optClass][value=" + parseInt(Cab.split('|')[0]) + "]").attr('checked', 'checked');
        $(".optclass-name").html("" + Cab.split('|')[1]);
    } else {
        Cab = 0;
        $("input[name=optClass][value=" + parseInt(0) + "]").attr('checked', 'checked');
        $(".optclass-name").html(" Economy");
    }
    var tripType = getCookie("tripType");
    if (tripType == "0") {
        document.getElementById('Trip').checked = true;
        document.getElementById('radio1').checked = false;
        document.getElementById("rdate").value = '';
        $(".mul-sho").hide();
        $(".flig-show1").show();
        $(".retu-date-n").addClass("op");
        $(".click-round").removeClass('bg-color');
        $(".click-one").addClass('bg-color');
    }
    else if (tripType == "1") {
        document.getElementById('Trip').checked = false;
        document.getElementById('radio1').checked = true;
        SearchType.value = 'Return';
        $(".rt_cross").show();
        $("#cld_icon").hide();
        $(".click-round").addClass('bg-color');
        $(".click-one").removeClass('bg-color');
    }
    else if (tripType == "2") {
        document.getElementById('Trip').checked = false;
        document.getElementById('radio1').checked = false;
        document.getElementById('mulChkFlag').checked = true;
        SearchType.value = 'Return';
        $(".rt_cross").hide();
        $("#cld_icon").hide();
        $(".click-round").removeClass('bg-color');
        $(".click-one").removeClass('bg-color');
        $(".click-mul").addClass('bg-color');
        ReadMultiCityFill();
    }

}
