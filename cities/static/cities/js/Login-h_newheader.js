try{
	GetRefferal();	
}catch(e)
{
//GetRefferal();	
}


function UserAuthentication() {
    try {
        var UserName_ = document.getElementById("txtusername").value;
        var Password_ = document.getElementById("Password1").value;
        $("#SignInEmailValid").hide();
        $("#passalert").hide();
        $("#r1").hide();
        if (!validateEmailCommon(UserName_) && !isValidPhone(UserName_)) {
            $("#SignInEmailValid").show();
            return false;
        }
        if (Password_ == "") {
            $("#passalert").show();
            return false;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "https://www.easemytrip.com/search.aspx/SignIn",
            data: "{'UserName_':'" + UserName_ + "','Password_':'" + Password_ + "'}",
            success: function(response) {
                $("#SignInWait").hide();
                if (response.d.split('|')[0].indexOf("not valid user") > -1) {
					alert('Invalid Credential')
                    $("#r1").show();
                    return false;
                }
                PrintUserDtl(response.d, 'Y');
            },
            beforeSend: function(XMLHttpRequest) {
                $("#SignInWait").show();
            },
            error: function(xmlHttpRequest, status, err) {
                $("#SignInWait").hide();
            }
        });
    } catch (e) {}
}

function UserAuthenticationHotel() {
    var UserName_ = document.getElementById("txtusername").value;
    var Password_ = document.getElementById("Password1").value;
    $("#SignInEmailValid").hide();
    $("#passalert").hide();
    $("#r1").hide();
    if (!validateEmailCommon(UserName_) && !isValidPhone(UserName_)) {
        $("#SignInEmailValid").show();
        return false;
    }
    if (Password_ == "") {
        $("#passalert").show();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://hotel.easemytrip.com/Login/SignIn",
        data: "{'UserName_':'" + UserName_ + "','Password_':'" + Password_ + "'}",
        success: function(response) {
            $("#SignInWait").hide();
            if (response.split('|')[0].indexOf("not valid user") > -1) {
                $("#r1").show();
                return false;
            }
            PrintUserDtl(response, 'Y');
        },
        beforeSend: function(XMLHttpRequest) {
            $("#SignInWait").show();
        },
        error: function(xmlHttpRequest, status, err) {
            $("#SignInWait").hide();
        }
    });
}

function PrintUserDtl(httpData, isErr_) {
	var Email="";
    if (httpData != "" && httpData.split('|')[0].indexOf("not valid user") <= 0) {
        if (document.getElementById('welcome-det-User') != null) {
            if (document.getElementById('spnLgnWelcome') != null) {
                document.getElementById('spnLgnWelcome').style.display = 'inline-block';
            }
            document.getElementById('welcome-det-User').style.display = 'inline-block';
            if (httpData.split('|')[1] == "") {
				
                document.getElementById('welcome-det-User').innerHTML = httpData.split('|')[2];
                //smartech('identify', httpData.split('|')[2]);
            } else {
				Email=httpData.split('|')[1];
                document.getElementById('welcome-det-User').innerHTML = httpData.split('|')[1];
               // smartech('identify', httpData.split('|')[1]);
            }
            if (document.getElementById('hddUserDtl') != null) {
                document.getElementById('hddUserDtl').value = httpData;
            }
        }
        if (document.getElementById('divMobProfile') != null) {
            document.getElementById('divMobProfile').style.display = "block";
            document.getElementById('divSignProfile').style.display = "none";
            document.getElementById('divMobLogout').style.display = "block";
            document.getElementById('divMobMyProfile').style.display = "block";
            if (httpData.split('|')[1] == "") {
                document.getElementById('divMobWelName').innerHTML = httpData.split('|')[2];
            } else {
                document.getElementById('divMobWelName').innerHTML = httpData.split('|')[1];
            }
        }
        if (document.getElementById('spnLogoutPnl') != null) {
            document.getElementById('spnLogoutPnl').style.display = 'block';
        }
        if (document.getElementById('divSignInPnl') != null) {
            document.getElementById('divSignInPnl').style.display = 'none';
        }
        if (document.getElementById('spnMyAcc') != null) {
            document.getElementById('spnMyAcc').style.display = 'none';
        }
        if (document.getElementById('welcome-det') != null) {
            document.getElementById('welcome-det').style.display = 'none';
        }
        if (document.getElementById('SigninDtl') != null) {
            document.getElementById('SigninDtl').style.display = 'block';
            $(".sign-abs").show();
        }
        if (document.getElementById('hid') != null) {
            document.getElementById('hid').style.display = 'none';
        }
        if (document.getElementById('RegInHome') != null) {
            document.getElementById('RegInHome').style.display = 'none';
        }
        if (document.getElementById('divLogin') != null) {
            document.getElementById('divLogin').style.display = 'none';
        }
    } else {
        if (document.getElementById("spnLgnWelcome") != null) {
            document.getElementById('spnLgnWelcome').style.display = 'none';
        }
        if (document.getElementById("spnLogoutPnl") != null) {
            document.getElementById('spnLogoutPnl').style.display = 'none';
        }
        if (document.getElementById("spnMyAcc") != null) {
            document.getElementById('spnMyAcc').style.display = 'inline';
        }
        if (document.getElementById("divSignInPnl") != null) {
            document.getElementById('divSignInPnl').style.display = 'block';
        }
        if (document.getElementById('welcome-det-User') != null) {
            document.getElementById('welcome-det-User').innerHTML = "";
        }
        if (document.getElementById('welcome-det') != null) {
            document.getElementById('welcome-det').style.display = 'block';
        }
        if (document.getElementById('RegInHome') != null) {
            document.getElementById('RegInHome').style.display = 'block';
        }
        if (document.getElementById('SigninDtl') != null) {
            $(".sign-abs").hide();
            document.getElementById('SigninDtl').style.display = 'none';
        }
        if (document.getElementById('hid') != null) {}
        if (isErr_ == "Y" && document.getElementById('divWrngPass') != null) {
            document.getElementById('divWrngPass').style.display = 'block';
        }
        if (document.getElementById('divMobProfile') != null) {
            document.getElementById('divMobProfile').style.display = "none";
            document.getElementById('divSignProfile').style.display = "block";
            document.getElementById('divMobLogout').style.display = "none";
            document.getElementById('divMobMyProfile').style.display = "none";
        }
    }
	try{
		window.criteo_q = window.criteo_q || [];
        window.criteo_q.push(
        { event: "setAccount", account: 49663 },
        { event: "setEmail", email: Email },
        { event: "setSiteType", type: "d" },
        { event: "viewHome" }
);


	}catch(e)
	{
		console.log(e);
	}
	
}

function CheckAuthentication() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://www.easemytrip.com/search.aspx/CheckSignIn",
        success: function(response) {
            localStorage.setItem("_boutIdentify", JSON.stringify(response.d));
            PrintUserDtl(response.d, 'Y')
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function CreateAccount() {
    var Email_ = document.getElementById("txtEmail").value;
    if (!validateEmailCommon(Email_)) {
        $("#RegValid").show();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        url: "https://flightservice.easemytrip.com/EmtAppService/UserRagister/UserRagistration",
        data: "{'_email':'" + Email_ + "'}",
        success: function(response) {
            $('#RegWait').hide();
            console.log(response);
            if (response != "" && response != null) {
                $('#AlertRegister').show();
                $('#AlertRegister').text(response);
            } else {
                $("#RegValid").show();
            }
        },
        beforeSend: function(XMLHttpRequest) {
            $('#RegWait').show();
            $("#RegValid").hide();
            $('#AlertRegister').hide();
        },
        error: function(xmlHttpRequest, status, err) {
            $('#RegWait').hide();
            alert("error " + http + status + "---" + httpObj);
        }
    });
}

function ReSetPassWord() {
    var Email_ = document.getElementById("ResetEmail").value;
    $('#ResetWait').hide();
    $("#ValidEmail").hide();
    if (!validateEmailCommon(Email_)) {
        $("#ValidEmail").show();
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        url: "https://www.easemytrip.com/search.aspx/ReSetPassWord",
        data: "{'UserName_':'" + Email_ + "'}",
        success: function(response) {
            $('#ResetWait').hide();
            if (response.d == "OK") {
                $('#resetmailsent').show();
            } else {
                $("#ValidEmail").show();
            }
        },
        beforeSend: function(XMLHttpRequest) {
            $('#ResetWait').show();
            $('#resetmailsent').hide();
        },
        error: function(xmlHttpRequest, status, err) {
            $('#ResetWait').hide();
            alert("error " + http + status + "---" + httpObj);
        }
    });
}

function validateEmailCommon(email) {
    var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
    return pattern.test(email);
}

function initilaFill_1() {
    var response = null;
    if (response != null && response.length > 0 && response[0] != "") {
        if (response[response.length - 1].split('|')[2] != null && response[response.length - 1].split('|')[2] != '' && response[response.length - 1].split('|')[2] != 'undefined' && response[response.length - 1].split('|')[2] != undefined) {
            var Todate_c = new Date();
            var CookiesDate_c = response[response.length - 1].split('|')[2];
            var dateCookies = new Date(CookiesDate_c.split('/')[2], CookiesDate_c.split('/')[1] - 1, CookiesDate_c.split('/')[0]);
            if (Todate_c > dateCookies) {
                document.getElementById('ddate').value = getFormattedDate(new Date());
            } else {
                document.getElementById('ddate').value = response[response.length - 1].split('|')[2];
            }
        }
        if (response[response.length - 1].split('|')[3] != null && response[response.length - 1].split('|')[3] != '' && response[response.length - 1].split('|')[3] != 'undefined' && response[response.length - 1].split('|')[3] != undefined) {
            document.getElementById('rdate').value = response[response.length - 1].split('|')[3];
            document.getElementById('Trip').checked = false;
            document.getElementById('radio1').checked = true;
            SearchType.value = 'Return';
            $(".click-round").addClass('bg-color');
            $(".click-one").removeClass('bg-color');
            $(".retu-date-n").removeClass("op");
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
            var _from = response[response.length - 1].split('|')[0];
            $("#FromSector_show").val(_from.split(',')[0].split('-')[1] + '(' + _from.split(',')[0].split('-')[0] + ')');
        }
        if (response[response.length - 1].split('|')[1] != 'undefined' && response[response.length - 1].split('|')[1] != undefined) {
            $("#Editbox13").val(response[response.length - 1].split('|')[1]);
            var _to = response[response.length - 1].split('|')[1];
            $("#Editbox13_show").val(_to.split(',')[0].split('-')[1] + '(' + _to.split(',')[0].split('-')[0] + ')');
        }
        if (response[response.length - 1].split('|')[4] != 'undefined' && response[response.length - 1].split('|')[4] != undefined) {
            document.getElementById("optAdult").value = response[response.length - 1].split('|')[4];
        }
        if (response[response.length - 1].split('|')[5] != 'undefined' && response[response.length - 1].split('|')[5] != undefined) {
            document.getElementById("optChild").value = response[response.length - 1].split('|')[5];
        }
        if (response[response.length - 1].split('|')[6] != 'undefined' && response[response.length - 1].split('|')[6] != undefined) {
            document.getElementById("optInfant").value = response[response.length - 1].split('|')[5];
        }
        if (document.getElementById('lblArrival') != null) {
            document.getElementById('lblArrival').innerHTML = response[response.length - 1].split('|')[1].split('-')[0].toUpperCase();
            document.getElementById('lblDeparture').innerHTML = response[response.length - 1].split('|')[0].split('-')[0].toUpperCase();
        }
        if (document.getElementById('lblArr') != null) {
            document.getElementById('lblArr').innerHTML = response[response.length - 1].split('|')[1].split('-')[1].split(',')[0].toUpperCase();
            document.getElementById('lblDepart').innerHTML = response[response.length - 1].split('|')[0].split('-')[1].split(',')[0].toUpperCase();
        }
    }
}

function initilaFill() {
	DeleteCookie("Dest1","","");
    var response =null;// getCookie("RecentCookie_new2").split('~');
	var dDate= getCookie("DepDate");
	var RDate= getCookie("RTDate");
	var orgCk= getCookie("Org1");
	var destCk= getCookie("Dest1");
	var dateCookies =new Date();
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
				if(dDate!="")
				{
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
			if(RDate!="")
			{
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
            $(".drpNoTrv").text(countPax + ' Traveller(s)');
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
	else{
		if(dDate!="")
		{
				$("#ddate").val(dDate);
		}
	
		if(orgCk!=null && orgCk!="" && orgCk.split('|').length>1)
		{
			  $("#FromSector").val(orgCk.split('|')[0]);
			  $("#FromSector_show").val(orgCk.split('|')[1]);
		}
		else{
			 $("#FromSector").val("DEL-Delhi, India");
			  $("#FromSector_show").val("Delhi(DEL)");
		}
		if(destCk!=null && destCk!=""  && destCk.split('|').length>1)
		{
			  $("#Editbox13").val(destCk.split('|')[0]);
			  $("#Editbox13_show").val(destCk.split('|')[1]);
		}else{
			 $("#Editbox13").val("BOM-Mumbai, India");
			  $("#Editbox13_show").val("Mumbai(BOM)");
			  //BOM-Mumbai, India
		}
     if(RDate!="")
	 {  
			 
		$("#rdate").val(RDate);
		document.getElementById('radio1').checked = true;
		  $(".rt_cross").show();
            $("#cld_icon").hide();
            $(".click-round").addClass('bg-color');
            $(".click-one").removeClass('bg-color');
            $(".retu-date-n").removeClass("op");
	 }		
		
	}
	var adtCk=getCookie("Adt");
	var chdCk=getCookie("Chd");
	var infCk=getCookie("Inf");
	    if(dDate!="")
		{
				$("#ddate").val(dDate);
		}
	 var OrgAirport = getCookie("AirportOrg1");
        var DestAirport = getCookie("AirportDest1")
	  
		if(orgCk!=null && orgCk!="" && orgCk.split('|').length>1)
		{
			  $("#FromSector").val(orgCk.split('|')[0]);
			  $("#FromSector_show").val(orgCk.split('|')[1]);
			    $("#FromSectorSpan").text('');
			  if(OrgAirport!="")
			  {
				   $("#FromSectorSpan").text(OrgAirport);
			  }
		}
		else{
			 $("#FromSector").val("DEL-Delhi, India");
			  $("#FromSector_show").val("Delhi(DEL)");
			    $("#FromSectorSpan").text("Indira Gandhi International Airport");
			  
		}
		if(destCk!=null && destCk!=""  && destCk.split('|').length>1)
		{
			  $("#Editbox13").val(destCk.split('|')[0]);
			  $("#Editbox13_show").val(destCk.split('|')[1]);
			  $("#Editbox13Span").text('');
			  if(DestAirport!=""){
				  $("#Editbox13Span").text(DestAirport);
			  }
			  
		}else{
			 $("#Editbox13").val("BOM-Mumbai, India");
			  $("#Editbox13_show").val("Mumbai(BOM)");
			  $("#Editbox13Span").text("Chhatrapati Shivaji International Airport");
		}
     if(RDate!="")
	 {  
			 
		$("#rdate").val(RDate);
		document.getElementById('radio1').checked = true;
		  $(".rt_cross").show();
            $("#cld_icon").hide();
            $(".click-round").addClass('bg-color');
            $(".click-one").removeClass('bg-color');
            $(".retu-date-n").removeClass("op");
	 }
	 var NumPass=0;
if(adtCk!="" && parseInt(adtCk)>0)
{
	document.getElementById("optAdult").value=adtCk;
	NumPass+=parseInt(adtCk);
}
else{
	document.getElementById("optAdult").value="1";
	NumPass+=parseInt("1");
}	
if(chdCk!="" && parseInt(chdCk)>0)
{
	document.getElementById("optChild").value=chdCk;
	NumPass+=parseInt(chdCk);
}else{
	document.getElementById("optChild").value="0";
	NumPass+=parseInt("0");
}
if(infCk!="" && parseInt(infCk)>0)
{
	document.getElementById("optInfant").value=infCk;
	NumPass+=parseInt(infCk);
}
else{
	document.getElementById("optInfant").value="0";
	NumPass+=parseInt("0");
}
if(parseInt(NumPass)>0)
{
	 $(".drpNoTrv").text(NumPass+" Traveller(s)")
}
else{
	   $(".drpNoTrv").text("1 Traveller(s)")
	    document.getElementById("optAdult").value = "1";
        document.getElementById("optChild").value = "0"
        document.getElementById("optInfant").value = "0";
  }
  var Cab=getCookie("Cab");
  if( parseInt(Cab.split('|')[0])>0)
  {
	$("input[name=optClass][value=" + parseInt(Cab.split('|')[0]) + "]").attr('checked', 'checked');  
	$(".optclass-name").html(","+Cab.split('|')[1]);
  }else{
	  Cab=0;
	  $("input[name=optClass][value=" + parseInt(0) + "]").attr('checked', 'checked'); 
	  $(".optclass-name").html(", Economy");
  }
  var tripType=getCookie("tripType");
		 if(tripType=="0")
		 {
						document.getElementById('Trip').checked = true;
						document.getElementById('radio1').checked = false;
						document.getElementById("rdate").value = '';
						$(".mul-sho").hide();
						$(".flig-show1").show();
						$(".retu-date-n").addClass("op");
							$(".click-round").removeClass('bg-color');
					$(".click-one").addClass('bg-color');
		 }
		 else  if(tripType=="1"){
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
function ReadMultiCityFill()
{
	for (var i = 1; i < 7; i++) {
        var MairOrg = getCookie("mul" + i + "AirOrg");
        var MairDest = getCookie("mul" + i + "AirDest");
        if (MairOrg != null && MairOrg != "" && MairDest != null && MairDest != "") {

            $("#FromSector-mul" + i + "Span").text(MairOrg);
            $("#ToSector-mul" + i + "Span").text(MairDest);
            if (i > 2) {
                $("#addAnFlt").click();
            }
        }
    }

}
function SetMultiCityCookie() {
    for (i = 1; i < 7; i++) {
        if (document.getElementById("FromSector-mul"+i).value != "") {
            setCookie("mul"+i+"Org", document.getElementById("FromSector-mul" + i).value + "|" + document.getElementById('FromSector-mul' + i + '_show').value);
            setCookie("mul"+i+"AirOrg", document.getElementById("FromSector-mul"+i+"Span").innerHTML);         
        }
        if (document.getElementById('ToSector-mul' + i).value != "") {           
            setCookie("mul" + i + "Dest", document.getElementById("ToSector-mul" + i).value + "|" + document.getElementById("ToSector-mul" + i + "_show").value);
            setCookie("mul" + i + "AirDest", document.getElementById("ToSector-mul" + i + "Span").innerHTML);
        }
    }
}
function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}

function LogOut() {
    if (confirm("Do you want to logout !")) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "https://www.easemytrip.com/search.aspx/LogOut",
            success: function(response) {
                PrintUserDtl("", 'N')
            },
            beforeSend: function(XMLHttpRequest) {},
            error: function(xmlHttpRequest, status, err) {}
        });
    }
}

function LogOutHotel() {
    if (confirm("Do you want to logout !")) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "https://hotel.easemytrip.com/Login/LogOut",
            success: function(response) {
                PrintUserDtl("", 'N')
            },
            beforeSend: function(XMLHttpRequest) {},
            error: function(xmlHttpRequest, status, err) {}
        });
    }
}

function UserAuthenticationHotel() {
    try {
        var UserName_ = document.getElementById("txtusername").value;
        var Password_ = document.getElementById("Password1").value;
        $("#SignInEmailValid").hide();
        $("#passalert").hide();
        $("#r1").hide();
        if (!validateEmailCommon(UserName_) && !isValidPhone(UserName_)) {
            $("#SignInEmailValid").show();
            return false;
        }
        if (Password_ == "") {
            $("#passalert").show();
            return false;
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "https://hotel.easemytrip.com/Login/SignIn",
            data: "{'UserName_':'" + UserName_ + "','Password_':'" + Password_ + "'}",
            success: function(response) {
                $("#SignInWait").hide();
                if (response.split('|')[0].indexOf("not valid user") > -1) {
                    $("#r1").show();
                    return false;
                }
                PrintUserDtl(response, 'Y');
            },
            beforeSend: function(XMLHttpRequest) {
                $("#SignInWait").show();
            },
            error: function(xmlHttpRequest, status, err) {
                $("#SignInWait").hide();
            }
        });
    } catch (e) {}
}

function CheckHotelSignIn() {
    try {
        $("#SignInEmailValid").hide();
        $("#passalert").hide();
        $("#r1").hide();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "https://hotel.easemytrip.com/Login/CheckSignIn",
            success: function(response) {
                $("#SignInWait").hide();
                if (response.split('|')[0].indexOf("not valid user") > -1) {
                    $("#r1").show();
                    return false;
                }
                PrintUserDtl(response, 'Y');
            },
            beforeSend: function(XMLHttpRequest) {
                $("#SignInWait").show();
            },
            error: function(xmlHttpRequest, status, err) {
                $("#SignInWait").hide();
                var response = xmlHttpRequest.responseText.replace('"', '').replace('"', '').replace('"', '');
                if (response.split('|')[0].indexOf("not valid user") > -1) {
                    $("#r1").show();
                    return false;
                }
                PrintUserDtl(response, 'Y');
            }
        });
    } catch (e) {}
}
CheckAuthentication();
//CheckHotelSignIn();
function VisitValidatorIndex() {
    var departureDate;
    var returnDate;
    var jtype;
    jtype = document.getElementById("JournyType").value;
    if (document.getElementById("radio1").checked) {
        departureDate = $("#ddate").val();
        returnDate = $("#rdate").val();
    } else {
        departureDate = $("#ddate").val();
    }
    var from;
    var to;
    var noOfAdults;
    var noOfChild;
    var noOfInfants;
    if ($('#mobile-sec').css('display') == 'block') {
        from = $("#FromSector1").val();
        to = $("#Editbox14").val();
    } else {
        from = $("#FromSector").val();
        to = $("#Editbox13").val();
        FromNew = document.getElementById('FromSector_show').value;
        ToNew = document.getElementById('Editbox13_show').value;
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
    noOfAdults = $("#optAdult").val();
    noOfChild = $("#optChild").val();
    noOfInfants = $("#optInfant").val();
    var noOfPassenger = parseInt(noOfAdults) + parseInt(noOfChild);
    var validator = true;
    if (validator) {
        if (from == to && from != "" && to != "" && validator != false) {
            alert("Source and Destination cannot be same");
            validator = false;
        }
        if (from == "" && validator != false) {
            alert("Enter valid origin city");
            validator = false;
        }
        if (to == "" && validator != false) {
            alert("Enter valid destination city");
            validator = false;
        }
        var enterValueValidator;
        enterValueValidator = from.indexOf(",");
        if (enterValueValidator == -1 && validator != false) {
            alert("Source Value entered is not correct");
            validator = false;
        }
        enterValueValidator = to.indexOf(",");
        if (enterValueValidator == -1 && validator != false) {
            alert("Destination Value entered is not correct");
            validator = false;
        }
        if (departureDate == '' && $("#Trip").is(':checked') && validator != false) {
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
        } else if (departureDate == '' && $("#radio1").is(':checked') && validator != false) {
            alert("Please specify a Departure Date OR change Trip Type to 'One Way'");
            validator = false;
        } else if (returnDate == '' && $("#radio1").is(':checked') && validator != false) {
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
            } else if (departureYear == returnYear) {
                if (departureMonth > returnMonth) {
                    alert("The Return date cannot be before the Departure date");
                    validator = false;
                } else if (departureMonth == returnMonth) {
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
			var OrgAirport = "";
			if(document.getElementById("FromSectorSpan")!=null)
			{
				OrgAirport = document.getElementById("FromSectorSpan").innerHTML;
			}
        var DestAirport = "";
		if(document.getElementById("Editbox13Span")!=null)
		{
			DestAirport = document.getElementById("Editbox13Span").innerHTML;
		}
        if (validator) {
			setCookie("Org1",from+"|"+FromNew);
			setCookie("Dest1",to+"|"+ToNew);
			setCookie("AirportDest1", DestAirport);
            setCookie("AirportOrg1", OrgAirport);  
			setCookie("DepDate", departureDate);			
			setCookie("Adt", noOfAdults);
            setCookie("Chd", noOfChild);
            setCookie("Inf", noOfInfants);   
            if (returnDate != '' && $("#radio1").is(':checked') && validator != false) {
                setCookie("RTDate", returnDate);
                setCookie("tripType", "1");
            }
            else {
               
                setCookie("tripType", "0");
            }
            var ckValue = "";
            var rctCkkValue = getCookie("RecentCookie_new2");
            if (rctCkkValue != "") {
                if (rctCkkValue.split('~').length >5) {
                    var arr = rctCkkValue.split('~');
                    var str = "";
                    for (i = 1; i < 6; i++) {
                        if (arr[i] != from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew) {
                            str += arr[i] + "~";
                        }
                    }
                    rctCkkValue = str + from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew;
                } else {
                    var arr = rctCkkValue.split('~');
                    var str = "";
                    for (i = 0; i < arr.length; i++) {
                        if (arr[i] != from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew) {
                            str += arr[i] + "~";
                        }
                    }
                    rctCkkValue = str + from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew;
                }
            } else {
                rctCkkValue = from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew;
            }
            setCookie("RecentCookie_new2", rctCkkValue, "365");
            var gamooge = "";
            try {
                gamooge = _taq.vid;
            } catch (e) {}
            var cabinClass
            if (document.querySelector('input[name="optClass"]') != null) {
                cabinClass = (document.querySelector('input[name="optClass"]:checked').value);
            } else if ($("#optClass option:selected").length > 0) {
                cabinClass = $("#optClass option:selected");
            } else {
                cabinClass = "0";
            }
            var url_;
			var sbi=window.location.href.split('?').length>1? window.location.href.split('?')[1]:"";
            if (document.getElementById("radio1").checked === true) {
                if (IsCheckDomesticLocal(from, to)) {
                    window.location.href = "https://flight.easemytrip.com/FlightListRT/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + cabinClass + "&airline=" + $("#Combobox8 option:selected").val() + "&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=false&isDomestic=true"+"&"+sbi;
                } else {
                    window.location.href = "https://flight.easemytrip.com/InternationalRoundTrip/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + cabinClass + "&airline=" + $("#Combobox8 option:selected").val() + "&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=false&isDomestic=false"+"&"+sbi;
                }
            } else {
                window.location.href = "https://flight.easemytrip.com/FlightList/Index?org=" + from + "&dept=" + to + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + cabinClass + "&airline=" + $("#Combobox8 option:selected").val() + "&deptDT=" + departureDate + "&arrDT=" + returnDate + "&isOneway=true&isDomestic=false"+"&"+sbi
            }
        }
    }
}

function swapValues() {
    var tmp = document.getElementById("FromSector").value;
    document.getElementById("FromSector").value = document.getElementById("Editbox13").value;
    document.getElementById("Editbox13").value = tmp;
    if (document.getElementById("FromSectorShow") != null) {
        document.getElementById("FromSectorShow").value = document.getElementById("FromSector").value;
    }
    if (document.getElementById("EditboxShow") != null) {
        document.getElementById("EditboxShow").value = document.getElementById("Editbox13").value;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.easemytrip.com;path=/";
	
}

function DeleteCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * -24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=www.easemytrip.com;path=/";
	
}

function ClearTextFrom() {
    $("#FromSector").val('');
    if (document.getElementById('FromSector') != null) {
        document.getElementById('FromSector').value = '';
    }
    if (document.getElementById('FromSector1') != null && document.getElementById('FromSector1').value.length > 10) {
        $("#FromSector1").val('');
        document.getElementById('FromSector1').value = "";
    }
    if (document.getElementById("fromautoFill") != null) document.getElementById("fromautoFill").style.display = 'block';
    if (document.getElementById("toautoFill") != null) document.getElementById("toautoFill").style.display = 'none';
    var ulFromhtml = '';
    var response = getCookie("RecentCookie_new2").split('~');
    if (response != null && response.length > 0 && response[0] != "") {
        document.getElementById("ulfrom").innerHTML = '';
        for (var count = response.length - 1; count >= 0; count--) {
            if (count == response.length - 1) {
                ulFromhtml = '<li class="recent-search">Recent Searches</li>';
            }
            var criplog = "autoSelectFill(this,\'FromSector\',\'Editbox13\','" + response[count].split('|')[1] + "','" + response[count].split('|')[2] + "','" + response[count].split('|')[3] + "','" + response[count].split('|')[0] + "')";
            ulFromhtml += '<li class="r-s-li" onclick="' + criplog + '">' + response[count].split('|')[0] + '  >  ' + response[count].split('|')[1] + '</li>';
        }
    }
    ulFromhtml += ' <li class="top-cities">Top Cities</li>' + '<li onclick="autoSelect(this,\'FromSector\');">DEL-Delhi, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">BLR-Bangalore, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">BOM-Mumbai, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">CCU-Kolkata, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">GOI-Goa, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">HYD-Hyderabad, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">MAA-Chennai, India</li>' + '<li onclick="autoSelect(this,\'FromSector\');">SIN-Singapore, Singapore</li>' + '<li onclick="autoSelect(this,\'FromSector\');">DXB-Dubai, United Arab Emirates</li>' + '<li onclick="autoSelect(this,\'FromSector\');">BKK-Bangkok, Thailand</li>' + '<li onclick="autoSelect(this,\'FromSector\');">KTM-Kathmandu, Nepal</li>'
    document.getElementById("ulfrom").innerHTML = ulFromhtml;
}

function ClearTextTo() {
    $("#toautoFill1").hide();
    if (document.getElementById('Editbox13') != null) document.getElementById('Editbox13').value = '';
    if (document.getElementById('EditboxShow') != null) document.getElementById('EditboxShow').value = '';
    if (document.getElementById('Editbox14') != null && document.getElementById('Editbox14').value.length > 10) {
        document.getElementById('Editbox14').value = "";
    }
    if (document.getElementById("fromautoFill") != null) document.getElementById("fromautoFill").style.display = 'none';
    if (document.getElementById("toautoFill") != null) document.getElementById("toautoFill").style.display = 'block';
    var innerHtmlToDiv = ' <div class="aut-bx-m"><div class="clr"></div><div class="rcnt"><div class="tp-cit"><div class="main-tp-city"><div class="cit-im"></div>' + '   <div class="rec-sc-b">Top Cities</div><div class="clr"></div></div><div class="clr"></div></div><div class="clr"></div>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo1,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo1" class="ct" >Delhi(DEL)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Indira Gandhi International Airport</span><span class="cnt"> India </span></div><div class="clr"></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo2,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo2" class="ct" >Bangalore(BLR)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Bengaluru International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo3,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo3" class="ct" >Mumbai(BOM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Chhatrapati Shivaji International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo4,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo4" class="ct" >Kolkata(CCU)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Netaji Subhash Chandra Bose Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo5,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo5" class="ct" >Goa(GOI)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dabolim Goa International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo6,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo6" class="ct" >Hyderabad(HYD)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Rajiv Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo7,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo7" class="ct" >Chennai(MAA)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Madras,Chennai International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo8,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo8" class="ct" >Singapore(SIN)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Changi Airport</span><span class="cnt"> Singapore </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo9,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo9" class="ct" >Dubai(DXB)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dubai International Airport</span><span class="cnt"> United Arab Emirates </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo10,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo10"  class="ct" >Bangkok(BKK)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Suvarnabhumi Airport</span><span class="cnt"> Thailand </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onclick="autoSelectNew(spnTo11,\'Editbox13\');" onchange="ChangeCabin();"><div><span class="cty"></span><span id="spnTo11"  class="ct" >Kathmandu(KTM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Tribhuvan International Airport</span><span class="cnt"> Nepal </span></div></li>' + '<div class="clr"></div></div></div><div class="clr"></div>'
    document.getElementById("toautoFill").innerHTML = innerHtmlToDiv;
    displayBoxIndex = 0;
    Navigate(0);
}

function getSubscription() {
    var Email = document.getElementById("txtEmailIDSub").value;
    if (!valid_email(Email)) {
        alert("please enter your valid email");
        $("#txtEmailForSingUp").focus();
        return false;
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/search.aspx/subscribe",
            data: "{'Email':'" + Email + "'}",
            success: function(response) {
                document.getElementById("lblMsg").style.display = "block";
            },
            beforeSend: function(XMLHttpRequest) {},
            error: function(xmlHttpRequest, status, err) {}
        });
    }
}

function SendRegMail() {
    var Email = document.getElementById("txtEmail").value;
    if (!valid_email(Email)) {
        alert("please enter your valid email");
        $("#txtEmail").focus();
        return false;
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "/search.aspx/subscribe",
            data: "{'Email':'" + Email + "'}",
            success: function(response) {
                document.getElementById("mailsent").style.display = "block";
            },
            beforeSend: function(XMLHttpRequest) {},
            error: function(xmlHttpRequest, status, err) {}
        });
    }
}

function valid_email(email) {
    var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
    return pattern.test(email);
}

function GetHotel() {
    if (document.getElementById("txtHotelCity").value.indexOf(',') > -1) {
        document.location.href = "http://hotel.easemytrip.com/Hotel/HotelListing?city=" + document.getElementById("txtHotelCity").value;
    } else {
        alert("please enter the valid city");
    }
}

function IsCheckDomestic(org_, dest_) {
    var isDom = true;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        url: "https://flightservice.easemytrip.com/EmtAppService/AppInitialize/TripType?org_=" + org_ + "&dest_=" + dest_ + "",
        success: function(response) {
            isDom = response;
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
    return isDom;
}

function IsCheckDomesticLocal(org_, des_) {
    if (org_.indexOf('India') > 0 && des_.indexOf('India') > 0) {
        return true;
    }
    return false;
}

function ChangeCabin() {
    if (IsCheckDomesticLocal(document.getElementById("Editbox13").value, document.getElementById("FromSector").value)) {
        if (document.getElementById("optFrst") != null) {
            document.getElementById("optFrst").style.display = "none";
        }
        $(".optFrst").hide();
    } else {
        if (document.getElementById("optFrst") != null) {
            document.getElementById("optFrst").style.display = "block";
        }
        $(".optFrst").show();
    }
}
var ServiceUrl = "https://flightservice.easemytrip.com/EmtAppService/UserRagister/";

function CreateAccountMobEmail() {
    $("#RegValid").hide();
    $("#EmailAlert").hide();
    var input = $("#txtEmail").val();
    if (input == "") {
        $("#RegWait").hide();
        $("#EmailAlert").show();
        $("#AlertRegister").hide();
        return false;
    }
    if (!(validateEmailCommon(input) ? true : (isValidPhone(input)))) {
        $("#RegValid").show();
        document.getElementById('txtEmail').focus();
        return false;
    }
    localStorage.setItem('added-items', input);
    $('#RegWait').show();
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "UserRagistrationEmailMob",
        data: "{'_email':'" + input + "'}",
        success: function(response) {
            $("#RegWait").hide();
            if (response != "null" && response != "") {
                if (response.indexOf("successfully") > -1) {
                    $('#regNumber').text($('#txtEmail').val());
                    $("#RegWait").hide();
                    $("#AlertRegister").fadeIn(500);
                    $("#AlertRegister").fadeOut(4000);
                    $("#r3").show();
                    $("#r3").fadeIn(500);
                    $("#r3").fadeOut(4000);
                    $(".se-m1").slideDown();
                    $(".se-m").slideUp();
                } else {
                    response = response.split('|');
                    if (response[4].indexOf("False") > -1 && response[5].indexOf("False") > -1) {
                        $('#regNumber').text($('#txtEmail').val());
                        $("#RegWait").hide();
                        $("#AlertRegister").fadeIn(500);
                        $("#AlertRegister").fadeOut(4000);
                        $("#r3").show();
                        $("#r3").fadeIn(500);
                        $("#r3").fadeOut(4000);
                        $(".se-m1").slideDown();
                        $(".se-m").slideUp();
                    } else if (response[4].indexOf("False") > -1 && response[5].indexOf("True") > -1) {
						 $('#regNumber').text($('#txtEmail').val());
                        $("#RegWait").hide();
                        $("#AlertRegister").fadeIn(500);
                        $("#AlertRegister").fadeOut(4000);
                        $("#r3").show();
                        $("#r3").fadeIn(500);
                        $("#r3").fadeOut(4000);
                        $(".se-m1").slideDown();
                        $(".se-m").slideUp();
                        //alert("Your Email is already registered");
                    } else if (response[4].indexOf("True") > -1 && response[5].indexOf("False") > -1) {
						 $('#regNumber').text($('#txtEmail').val());
                        $("#RegWait").hide();
                        $("#AlertRegister").fadeIn(500);
                        $("#AlertRegister").fadeOut(4000);
                        $("#r3").show();
                        $("#r3").fadeIn(500);
                        $("#r3").fadeOut(4000);
                        $(".se-m1").slideDown();
                        $(".se-m").slideUp();
                        //alert("Your Mobile number is already registered");
                    } else if (response[4].indexOf("True") > -1 && response[5].indexOf("True") > -1) {
                         $('#regNumber').text($('#txtEmail').val());
                        $("#RegWait").hide();
                        $("#AlertRegister").fadeIn(500);
                        $("#AlertRegister").fadeOut(4000);
                        $("#r3").show();
                        $("#r3").fadeIn(500);
                        $("#r3").fadeOut(4000);
                        $(".se-m1").slideDown();
                        $(".se-m").slideUp();
                    }
                }
            } else {
                alert("Please try again");
                $("#RegWait").hide();
            }
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function isValidPhone(phone) {
    var phoneno = /^\d{10}$/;
    return $.trim(phone).match(phoneno) ? true : false;
}

function RegConfirmOTP() {
    var otp = $('#otptxt').val();
    var Pass = $('#pass').val();
    var Confirmpass = $('#confirmpass').val();
    var Number = $("#txtEmail").val();
    if (otp == "") {
        alert("OTP is required");
        return false;
    }
    if (Pass == "") {
        alert("Password is required");
        return false;
    }
    if (Confirmpass == "") {
        alert("Re-type Password is required");
        return false;
    }
    if (Pass != Confirmpass) {
        $("#errorpass").fadeIn(1000);
        $("#errorpass").fadeOut(4000);
        return false;
    }
    if (otp.length != "6") {
        $("#errorotp").fadeIn(1000);
        $("#errorotp").fadeOut(4000);
        return false;
    }
    $('#otpmsg1InvOtp').hide();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "ConfirmOTP",
        data: "{'_mobile':'" + Number + "','_OTP':'" + otp + "','_Pass':'" + Pass + "','_Confirmpass':'" + Confirmpass + "'}",
        success: function(response) {
            if (response != "null" && response != "NOTOK") {
                if (response.indexOf("Your OTP has been expired") > -1) {
                    $('#otpmsg1').show();
                } else if (response.indexOf("Enter the valid OTP") > -1) {
                    $('#otpmsg1InvOtp').show();
                } else {
                    $('#otpmsg').show();
                    $('#otptxt').val('');
                    $('#pass').val('');
                    $('#confirmpass').val('');
                    localStorage.clear();
                    $("#hid1").hide();
                    $('#divLogin').show();
                    try {
                        if (document.getElementById("txtEmail") != null) {
                            SignUP(document.getElementById("txtEmail").value);
                        }

                    } catch (e) {}
                }
            } else {
                alert("please refresh the page");
            }
            $("#RegWait").hide();
        },
        beforeSend: function(XMLHttpRequest) {
            $("#RegWait").show();
        },
        error: function(xmlHttpRequest, status, err) {
            $("#RegWait").hide();
        }
    });
}

function ResendOTP(ID) {
    var mobile = localStorage.getItem('added-items');
    var EmailMob = $('#' + ID).text();
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: ServiceUrl + "ResendOTP",
        data: "{'_mobile':'" + EmailMob + "'}",
        success: function(response) {
            alert("otp send succesfully")
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function GoToMybookingSec() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://www.easemytrip.com/search.aspx/CheckSignIn",
        success: function(response) {
            response = response.d;
            localStorage.setItem('userDetailsForMybooking', response);
            if (response != null && response.split('|')[0].indexOf("Normal User") > -1) {
                var resp = [];
                resp = response.split('|');
                if (resp[4].indexOf("True") > -1 && resp[5].indexOf("True") > -1) {
                    window.location.href = "https://mybookings.easemytrip.com";
                } else if (resp[4].indexOf("False") > -1 && resp[5].indexOf("True") > -1) {
                    window.location.href = "https://mybookings.easemytrip.com/MyBooking/Profile";
                } else if (resp[4].indexOf("True") > -1 && resp[5].indexOf("False") > -1) {
                    window.location.href = "https://mybookings.easemytrip.com/MyBooking/Profile";
                }
            } else {
                window.location.href = "https://mybookings.easemytrip.com";
            }
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function VerifiedEmail() {
    var Email = $("#txtemailVaf").val();
    var phone = localStorage.getItem('userDetailsForMybooking').split('|')[2];
    var pass = localStorage.getItem('userDetailsForMybooking').split('|')[7];
    if (Email != null && Email != '') {
        if (validateEmailCommon(Email)) {
            $.ajax({
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "text",
                url: ServiceUrl + "UpdateEmail",
                data: "{'_mobile':'" + phone + "','_email':'" + Email + "','_Pass':'" + pass + "'}",
                success: function(response) {
                    $('#RegWaitVarE').hide();
                    localStorage.setItem('add-items', Email);
                    $(".se-m4").slideUp();
                    $(".se-m5").slideDown();
                    $('#emailVarify').text(Email);
                },
                beforeSend: function(XMLHttpRequest) {
                    $('#RegWaitVarE').show();
                },
                error: function(xmlHttpRequest, status, err) {}
            });
        } else {
            alert("Please enter valid email.")
        }
    } else {
        alert("Please enter email.")
    }
}

function VerifiedEmailOTP() {
    var emailotp = $("#emailotp").val();
    var Email = $("#emailVarify").text();
    if (emailotp == null && emailotp == '') {
        alert("Please enter OTP.");
        return false;
    }
    if (emailotp.length != "6") {
        alert("Please enter correct OTP.");
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "ConfirmOTP",
        data: "{'_mobile':'" + Email + "','_OTP':'" + emailotp + "','_Pass':'" + "" + "','_Confirmpass':'" + "" + "'}",
        success: function(response) {
            if (response != "null" && response.split('|')[4].indexOf("True") > -1 && response.split('|')[5].indexOf("True") > -1) {
                localStorage.clear();
                window.location.href = "http://mybooking.easemytrip.com";
            } else {
                response
            }
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function VerifiedPhone() {
    var input = $("#txtph").val();
    if (!isValidPhone(input)) {
        alert("Please insert valid Mobile Number");
        return false;
    }
    var email = localStorage.getItem('userDetailsForMybooking').split('|')[1];
    var pass = localStorage.getItem('userDetailsForMybooking').split('|')[7];
    localStorage.setItem('add-items', input);
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "UpdateMobile",
        data: "{'_mobile':'" + input + "','_email':'" + email + "','_Pass':'" + pass + "'}",
        success: function(response) {
            $('#mobVarify').text(input);
            $('.pl-wat').hide();
            $(".se-m2").slideUp();
            $(".se-m3").slideDown();
        },
        beforeSend: function(XMLHttpRequest) {
            $('.pl-wat').show();
        },
        error: function(xmlHttpRequest, status, err) {}
    });
}

function verifyOTP() {
    var Email = localStorage.getItem('userDetailsForMybooking').split('|')[1];
    var pass = localStorage.getItem('userDetailsForMybooking').split('|')[7];
    var _otp = $('#otpMobbile').val();
    var number = localStorage.getItem('add-items');
    if (number == null) {
        alert("OTP is varified");
        return false;
    }
    if (_otp == null && _otp == '' && number == null) {
        alert('Plese enter Otp');
        return false;
    }
    if (_otp.length != "6") {
        alert('Plese enter six digit OTP');
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "ConfirmOTP",
        data: "{'_mobile':'" + number + "','_OTP':'" + _otp + "','_Pass':'" + pass + "','_Confirmpass':'" + "" + "'}",
        success: function(response) {
            if (response != null && response.split('|')[4].indexOf("True") > -1 && response.split('|')[5].indexOf("True") > -1) {
                localStorage.clear();
                window.location.href = "http://mybooking.easemytrip.com";
            } else {
                response;
            }
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function ResendOTPVarify() {
    var mobile = localStorage.getItem('add-items');
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: "http://localhost:10440/EmtAppService/UserRagister/ResendOTP",
        data: "{'_mobile':'" + mobile + "'}",
        success: function(response) {
            alert("otp send succesfully")
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function ForgetPassword() {
    $("#RegValidF").hide();
    $("#EmailAlertF").hide();
    var input = $("#txtEmailMobF").val();
    if (input == "") {
        $("#RegWaitF").hide();
        $("#EmailAlertF").show();
        return false;
    }
    if (!(validateEmailCommon(input) ? true : (isValidPhone(input)))) {
        $("#RegValidF").show();
        document.getElementById('txtEmailMobF').focus();
        return false;
    }
    $('#RegWaitF').show();
    localStorage.setItem('added-items', input);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "ForgetPassword",
        data: "{'_email':'" + input + "'}",
        success: function(response) {
            if (response.indexOf("true") > -1 && response != "null" && response != "") {
                $("#RegWaitF").hide();
                $('#regNumberF').text($('#txtEmailMobF').val());
                $("#RegWaitF").hide();
                $(".se-m1").slideDown();
                $(".se-m").slideUp();
            } else if (isValidPhone(input)) {
                alert("Contact Number is not registered please register");
                $("#RegWaitF").hide();
            } else {
                alert("Email is not registered please register");
                $("#RegWaitF").hide();
            }
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function ForgetConfirmOTP() {
    var otp = $('#otptxtF').val();
    var Pass = $('#passF').val();
    var Confirmpass = $('#confirmpassF').val();
    var Number = $("#txtEmailMobF").val();
    if (otp == "") {
        alert("OTP is required");
        return false;
    }
    if (Pass == "") {
        alert("Password is required");
        return false;
    }
    if (Confirmpass == "") {
        alert("Re-type Password is required");
        return false;
    }
    if (Pass != Confirmpass) {
        $("#errorpassF").fadeIn(1000);
        $("#errorpassF").fadeOut(4000);
        return false;
    }
    if (otp.length != "6") {
        $("#errorotpF").fadeIn(1000);
        $("#errorotpF").fadeOut(4000);
        return false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "text",
        url: ServiceUrl + "ConfirmOTP",
        data: "{'_mobile':'" + Number + "','_OTP':'" + otp + "','_Pass':'" + Pass + "','_Confirmpass':'" + Confirmpass + "'}",
        success: function(response) {
            if (response != "null" && response != "NOTOK") {
                if (response.indexOf("Your OTP has been expired") > -1) {
                    $('#otpmsg1F').show();
                } else {
                    $('#otpmsgF').show();
                    $('#otptxtF').val('');
                    $('#passF').val('');
                    $('#confirmpassF').val('');
                }
            } else {
                alert("please refresh the page");
            }
            $("#RegWaitF").hide();
        },
        beforeSend: function(XMLHttpRequest) {
            $("#RegWaitF").show();
        },
        error: function(xmlHttpRequest, status, err) {
            $("#RegWaitF").hide();
        }
    });
}

function ClearTextFromNew() {
    $('#FromAutoFill1').hide();
    $("#FromSectorShow").val('');
    if (document.getElementById('FromSector') != null) {
        document.getElementById('FromSector').value = '';
    }
    if (document.getElementById('FromSector1') != null && document.getElementById('FromSector1').value.length > 10) {
        $("#FromSector1").val('');
        document.getElementById('FromSector1').value = "";
    }
    if (document.getElementById("fromautoFill") != null) document.getElementById("fromautoFill").style.display = 'block';
    if (document.getElementById("toautoFill") != null) document.getElementById("toautoFill").style.display = 'none';
    var ulFromhtml = '';
    var response = getCookie("RecentCookie_new2").split('~');
    if (response != null && response.length > 0 && response[0] != "") {
        document.getElementById("ulfrom").innerHTML = '';
        var d = "";
        var ddate = "";
        var date1 = new Date();
        var date = new Date();
        var res = "";
        for (var count = response.length - 1; count >= 0; count--) {
            if (count == response.length - 1) {
                ulFromhtml = ' <div class="aut-bx-m_not_use"><div class="rcnt"><div class="rcnt2"><div class="rcticn"></div>' + '<div class="rec-sc-b">Recent Searches</div>' + '<div class="clr"></div></div><div class="clr"></div></div><div class="clr"></div>';
            }
            var criplog = "autoSelectFill(this,\'FromSector\',\'Editbox13\','" + response[count].split('|')[1] + "','" + response[count].split('|')[2] + "','" + response[count].split('|')[3] + "','" + response[count].split('|')[0] + "','" + response[count].split('|')[7] + "','" + response[count].split('|')[8] + "')";
            try {
                if (date.getDate() < 10) {
                    var day = "0" + date.getDate();
                } else {
                    day = date.getDate();
                }
                date = new Date((date.getMonth() + 1) + "/" + day + "/" + date.getFullYear());
                res = new Date(date).getTime();
                d = response[count].split('|')[2];
                ddate = (d.split('/')[1] + "/" + d.split('/')[0] + "/" + d.split('/')[2]);
                date1 = new Date(ddate).getTime();
            } catch (err) {
                console.log(err);
            }
            if (date1 >= res) {
                ulFromhtml += '<div class="srch-bw fromSalection" style="padding: 5px 0px;"><div class="clickClass"  onclick="' + criplog + '">' + '<div style="float:left; width:100%;"><span class="cty"></span><span id="spn1" class="ct" style="float:left;" >' + response[count].split('|')[7] + '</span>' + '<div class="fli-im rcnDrop"></div>' + '<span id="spn1" class="ct" style="float:right;margin-right:20px;" >' + response[count].split('|')[8] + '</span></div>' + '<div class="clr"></div>' + '</div></div>'
            }
        }
        ulFromhtml += '<div class="clr"></div>';
    }
    ulFromhtml += '<div class="rcnt"><div class="tp-cit"><div class="main-tp-city"><div class="cit-im"></div><div class="rec-sc-b">Top Cities</div><div class="clr"></div></div>' + '<div class="clr"></div><div class="clr"></div>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn12,\'FromSector\');"><div><span class="cty"></span><span id="spn12" class="ct" >Delhi(DEL)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Indira Gandhi International Airport</span><span class="cnt"> India </span></div><div class="clr"></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn2,\'FromSector\');"><div><span class="cty"></span><span id="spn2" class="ct" >Bangalore(BLR)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Bengaluru International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn3,\'FromSector\');"><div><span class="cty"></span><span id="spn3" class="ct" >Mumbai(BOM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Chhatrapati Shivaji International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn4,\'FromSector\');"><div><span class="cty"></span><span id="spn4" class="ct" >Kolkata(CCU)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Netaji Subhash Chandra Bose Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn5,\'FromSector\');"><div><span class="cty"></span><span id="spn5" class="ct" >Goa(GOI)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dabolim Goa International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn6,\'FromSector\');"><div><span class="cty"></span><span id="spn6" class="ct" >Hyderabad(HYD)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Rajiv Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn7,\'FromSector\');"><div><span class="cty"></span><span id="spn7" class="ct" >Chennai(MAA)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Madras,Chennai International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn8,\'FromSector\');"><div><span class="cty"></span><span id="spn8" class="ct" >Singapore(SIN)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Changi Airport</span><span class="cnt"> Singapore </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn9,\'FromSector\');"><div><span class="cty"></span><span id="spn9" class="ct" >Dubai(DXB)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dubai International Airport</span><span class="cnt"> United Arab Emirates </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn10,\'FromSector\');"><div><span class="cty"></span><span id="spn10"  class="ct" >Bangkok(BKK)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Suvarnabhumi Airport</span><span class="cnt"> Thailand </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px;" onchange="ChangeCabin();" onclick="autoSelectNew(spn11,\'FromSector\');"><div><span class="cty"></span><span id="spn11"  class="ct" >Kathmandu(KTM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Tribhuvan International Airport</span><span class="cnt"> Nepal </span></div></li>'
    ulFromhtml += '<div class="clr"></div></div></div>';
    document.getElementById("ulfrom").innerHTML = ulFromhtml;
    $("#ulfrom").css("display", "block");
}

function GanCusId() {
    if (getCookie("CusId") == "") {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            url: "https://www.easemytrip.com/search.aspx/GenCustId",
            data: "",
            success: function(CusId) {
                if (CusId != null && CusId.d != "") {
                    setCookie("CusId", CusId.d, "365");
                }
            },
            beforeSend: function(XMLHttpRequest) {},
            error: function(xmlHttpRequest, status, err) {}
        });
    }
}
GanCusId();
RecentSearch();

function RecentSearch() {
    var response = getCookie("RecentCookie_new2").split('~');
    response = response.reverse();
    var html = "";
    var date = new Date();
    if (date.getDate() < 10) {
        var day = "0" + date.getDate();
    } else {
        day = date.getDate();
    }
    var d = "";
    var ddate = "";
    var date1 = new Date();
    date = (date.getMonth() + 1) + "/" + day + "/" + date.getFullYear();
    var res = new Date(date).getTime();
    response.forEach(function(item, index) {
        if (item.split('|').length > 1) {
            d = item.split('|')[2];
        }
        if (d != "" && d != undefined) {
            ddate = (d.split('/')[1] + "/" + d.split('/')[0] + "/" + d.split('/')[2]);
            date1 = new Date(ddate).getTime();
        }
        if (date1 >= res && item != null && item.split('|').length > 6) {
            var data = item.split('|');
            html += '<div id=' + index + ' class="roud-m1 mr-g2" onclick=RecentSearchIndex("' + encodeURIComponent(item) + '");>';
            html += '<div class="lin-a1">';
            html += '<div class="ft-1n">' + data[0].split('-')[0] + '-' + data[1].split('-')[0] + '</div>';
            if (data[3] == 'undefined' || data[3]=="") {
                html += '<div class="ft-2n">One Way</div>';
            } else {
                html += '<div class="ft-2n">Round Trip</div>';
            }
            html += '<div class="clr"></div>';
            html += '</div>';
            html += '<div class="lin-a2">';
            html += '<div class="gt-1n">' + data[0].split('-')[1].split(',')[0];
            //html += '<br>';
            html += '<span class="sp-dt2">' + data[2] + '</span>';
            html += '</div>';
            if (data[3] == 'undefined' || data[3]=="") {
                html += '<div class="gt-2n"><img src="img/arrow-one-w1.gif" alt="Oneway"></div>';
            } else {
                html += '<div class="gt-2n"><img src="img/roundtrip-one-w1.gif" alt="Roundtrip"></div>';
            }
            html += '<div class="gt-3n"> ' + data[1].split('-')[1].split(',')[0] + '</div>';
			if(data[3]!="undefined" && data[3]!="")
			{
				html += '<span class="sp-dt2" style="float:right;">'+data[3]+'</span>';
			}
			
            html += '<div class="clr"></div>';
            html += '</div>';
            html += '<div class="lin-a3">';
            html += '<div class="it-1n">' + data[4] + ' Adult, ' + data[5] + ' Child, ' + data[6] + ' Infant</div>';
            html += '<div class="it-2n"><a>Search</a></div>';
            html += '<div class="clr"></div>';
            html += '</div>';
            html += '</div>';
        }
    })
    if (document.getElementById("RecentSearch") != null) {
        document.getElementById("RecentSearch").innerHTML = html;
    }
    if (response != null && response.length > 0 && response[0] != "") {
        if (document.getElementById("divRctSearch") != null) {
            document.getElementById("divRctSearch").style.display = "block";
        }
        if (document.getElementById("recentSearchtxt") != null) {
            document.getElementById("recentSearchtxt").style.display = "block";
        }
    } else {
        if (document.getElementById("divRctSearch") != null) {
            document.getElementById("divRctSearch").style.display = "none";
        }
        if (document.getElementById("recentSearchtxt") != null) {
            document.getElementById("recentSearchtxt").style.display = "none";
        }
    }
}

function RecentSearchIndex(item) {
    item = decodeURIComponent(item);
    document.getElementById("FromSector").value = item.split('|')[0];
	document.getElementById("FromSector_show").value= item.split('|')[0].split('-')[1].split(',')[0]+"("+item.split('|')[0].split('-')[0]+")";
 
    document.getElementById("Editbox13").value = item.split('|')[1];
	document.getElementById("Editbox13_show").value=item.split('|')[1].split('-')[1].split(',')[0]+"("+item.split('|')[1].split('-')[0]+")";

    document.getElementById("ddate").value = item.split('|')[2];
    document.getElementById("rdate").value = item.split('|')[3];
    if (item.split('|')[3] == 'undefined' || item.split('|')[3]=="") {
        document.getElementById('Trip').checked = true;
        document.getElementById('radio1').checked = false;
        document.getElementById("rdate").value = '';
        $(".retu-date-n").addClass("op");
    } else {
        document.getElementById('radio1').checked = true;
        document.getElementById('Trip').checked = false;
        $(".retu-date-n").removeClass("op");
    }
    document.getElementById("optAdult").value = item.split('|')[4];
    document.getElementById("optChild").value = item.split('|')[5];
    document.getElementById("optInfant").value = item.split('|')[6];
    VisitValidatorIndex();
}

function readReferalCookie() {
    var response = getCookie("ReferalCookie").split('#');
    console.log(response);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1]);
}

function GetRefferal() {
    var Refferalvalue = getCookie("ReferalCookie");
    var gclid = getParameterByName("gclid");
    var utm_source = getParameterByName("utm_source");
    var utm_medium = getParameterByName("utm_medium");
    var utm_campaign = getParameterByName("utm_campaign");
    var coupan = getParameterByName("coupan");
    var Referrer = document.referrer;
    if (Referrer == "") {
        Referrer = "easemytrip.com";
    }
    if (Refferalvalue != "") {
        if (Refferalvalue.split('#').length > 4) {
            var arr = Refferalvalue.split('#');
            var str = "";
            for (i = 1; i < 5; i++) {
                str += arr[i] + "#";
            }
            Refferalvalue = str + gclid + "|" + utm_source + "|" + utm_medium + "|" + utm_campaign + "|" + coupan + "|" + Referrer;
        } else {
            var arr = Refferalvalue.split('#');
            var str = "";
            for (i = 0; i < arr.length; i++) {
                str += arr[i] + "#";
            }
            Refferalvalue = str + gclid + "|" + utm_source + "|" + utm_medium + "|" + utm_campaign + "|" + coupan + "|" + Referrer;
        }
    } else {
        Refferalvalue = gclid + "|" + utm_source + "|" + utm_medium + "|" + utm_campaign + "|" + coupan + "|" + Referrer;
    }
    setCookie("ReferalCookie", Refferalvalue, "365");
}

function ValidateMuticity() {
    var _param = "";
    var _parameterForRecent = "";
    for (i = 1; i <= 7; i++) {
        if ($("#sector-sec" + i).css("display") == "block") {
            if ($("#FromSector-mul" + i).val().trim() == "") {
                alert("Source cannot be Empty");
                $("#FromSector-mul" + i).focus();
                return false;
            }
            if ($("#ToSector-mul" + i).val().trim() == "") {
                alert("Destination cannot be Empty");
                $("#ToSector-mul" + i).focus();
                return false;
            }
            if ($("#FromSector-mul" + i).val().trim() == $("#ToSector-mul" + i).val().trim()) {
                alert("Source and Destination cannot be Same");
                $("#ToSector-mul" + i).focus();
                return false;
            }
            if ($("#ddateMul" + i).val().trim() == "") {
                alert("Date cannot be Empty");
                $("#ddateMul" + i).focus();
                return false;
            }
            if (i != 1) {
                _param += "^"
                _parameterForRecent += "^";
            }
            _param += $("#FromSector-mul" + i).val().trim() + "|" + $("#ToSector-mul" + i).val().trim() + "|" + $("#ddateMul" + i).val().trim();
            _parameterForRecent += $("#FromSector-mul" + i).val().trim() + "#$" + $("#ToSector-mul" + i).val().trim() + "#$" + $("#ddateMul" + i).val().trim();
        }
    }
    var noOfAdults = $("#optAdultMul").val();
    var noOfChild = $("#optChildMul").val();
    var noOfInfants = $("#optInfantMul").val();
    var noOfPassenger = parseInt(noOfAdults) + parseInt(noOfChild);
    if (noOfPassenger > 9) {
        alert("currently booking can only be made for upto 9 travellers.You can make multiple bookings to accommodate your entire party.");
    }
    if (noOfAdults < noOfInfants) {
        alert("The total number of Infants passengers cannot exceed the total number of Adult passengers.");
    }
    var from = $("#FromSector-mul1").val().trim();
    var to = $("#ToSector-mul1").val().trim();
    var departureDate = $("#ddateMul1").val().trim();
    var returnDate = "";
    var FromNew = $("#FromSector-mul1_show").val().trim();
    var ToNew = $("#ToSector-mul1_show").val().trim();
    var rctCkkValue = getCookie("RecentCookie_new2");
    var strRecent = from + "|" + to + "|" + departureDate + "|" + returnDate + "|" + noOfAdults + "|" + noOfChild + "|" + noOfInfants + "|" + FromNew + "|" + ToNew + "|" + _parameterForRecent;
    if (rctCkkValue != "") {
        if (rctCkkValue.split('~').length > 3) {
            var arr = rctCkkValue.split('~');
            var str = "";
            for (i = 1; i < 4; i++) {
                if (arr[i] != strRecent) {
                    str += arr[i] + "~";
                }
            }
            rctCkkValue = str + strRecent;
        } else {
            var arr = rctCkkValue.split('~');
            var str = "";
            for (i = 0; i < arr.length; i++) {
                if (arr[i] != strRecent) {
                    str += arr[i] + "~";
                }
            }
            rctCkkValue = str + strRecent;
        }
    } else {
        rctCkkValue = strRecent;
    }
    debugger;
    var cabinClass
    if (document.querySelector('input[name="optClassMul"]') != null) {
        cabinClass = (document.querySelector('input[name="optClassMul"]:checked').value);
    } else if ($("#optClassMul option:selected").length > 0) {
        cabinClass = $("#optClassMul option:selected");
    } else {
        cabinClass = "0";
    }
    window.location.href = "//flight.easemytrip.com/multicity/Index?SrchID=" + _param + "&adt=" + noOfAdults + "&chd=" + noOfChild + "&inf=" + noOfInfants + "&cabin=" + cabinClass + "&airline=" + $("#Combobox8 option:selected").val() + "&isOneway=true&isDomestic=false&ompAff=easemytrip&lead=12";
}

function fillOptClassName(name) {
    $('.optclass-name').text(', ' + name)
	 setCookie("Cab",$("input:radio[name=optClass]:checked").val()+"|"+name);
}

function fillOptClassNameMul(name) {
    $('.optclass-nameMul').text(', ' + name)
}

function autoSelectNew(liControl, txtControl) {
    var searchKey = liControl.innerHTML.split('(')[0];
    $.ajax({
        url: "api/Flight/GetTopCity?SearchKey=" + searchKey,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var Sector = data.AirportCode + '-' + data.cityName + ' ,' + data.Country;
            if (txtControl == "FromSector") {
                document.getElementById('FromSector').value = Sector;
                document.getElementById('FromSectorShow').value = liControl.innerHTML;
                $("#ulfrom").css("display", "none");
            }
            if (txtControl == "Editbox13") {
                document.getElementById('Editbox13').value = Sector;
                document.getElementById('EditboxShow').value = liControl.innerHTML;
                $("#toautoFill").css("display", "none");
            }
            liControl = "";
        }
    })
}

function autoSelectFill(liControl, txtControl, toControl, tocity, fromdate, todate, fromcity, fromsectorNew, tosectorNew) {
    document.getElementById(txtControl).value = fromcity;
    document.getElementById(toControl).value = tocity;
    document.getElementById(txtControl + '_show').value = fromcity.split(',')[0].split('-')[1] + '(' + fromcity.split(',')[0].split('-')[0] + ')';
    document.getElementById(toControl + '_show').value = tocity.split(',')[0].split('-')[1] + '(' + tocity.split(',')[0].split('-')[0] + ')';
    document.getElementById("ddate").value = fromdate;
    if (todate != null && todate != "" && todate != "undefined") {
        document.getElementById("rdate").value = todate;
        document.getElementById('Trip').checked = false;
        document.getElementById('radio1').checked = true;
        SearchType.value = 'Return';
        $(".click-round").addClass('bg-color');
        $(".click-one").removeClass('bg-color');
    } else {
        document.getElementById("rdate").value = '';
        document.getElementById('Trip').checked = true;
        document.getElementById('radio1').checked = false;
        SearchType.value = 'Oneway';
        $(".click-round").removeClass('bg-color');
        $(".click-one").addClass('bg-color');
    }
    document.getElementById("fromautoFill").style.display = 'none';
    document.getElementById("toautoFill").style.display = 'none';
}

function TocontrolTabClickFrom(e) {
    if (e.keyCode == 9) {
        if ($(".display_box_hover_from .rcnDrop").length == 0) {
            $('.display_box_hover_from .clickClass').click();
        } else {
            $('.display_box_hover_from .clickClass').click();
            e.preventDefault();
        }
        return;
    }
    return;
}

function TocontrolTabClickTo(e) {
    if (e.keyCode == 9) {
        $('.display_box_hover_to .clickClass').click();
        return;
    }
    return;
}
var availableTags = [];

function autoCompleteDropdownFrom(value, e) {
    if (e.keyCode == 9) {
        return;
    }
    if (e.keyCode == 40 || e.keyCode == 38) {
        if (e.keyCode == 40) {
            NavigateFrom(1);
            if ($(".display_box_hover_from .rcnDrop").length > 0) {
                if (document.getElementById("fromautoFill").style.display == 'block') {
                    $('#FromSector').val($('.display_box_hover_from .recent-destntn').text().trim());
                    $('#Editbox13').val($('.display_box_hover_from .recent-dest2').text().trim());
                    $('#FromSectorShow').val($('.display_box_hover_from .recent-destntn').text().trim());
                    $('#EditboxShow').val($('.display_box_hover_from .recent-dest2').text().trim());
                }
            } else {
                if (document.getElementById("fromautoFill").style.display == 'block') {
                    $('#FromSector').val($('.display_box_hover_from .clickClass').text().trim());
                    $('#FromSectorShow').val($('.display_box_hover_from .clickClass').text().trim());
                }
            }
            jumpToAnchor('.bx1', '.display_box_hover_from');
        }
        if (e.keyCode == 38) {
            NavigateFrom(-1);
            if ($(".display_box_hover_from .rcnDrop").length > 0) {
                if (document.getElementById("fromautoFill").style.display == 'block') {
                    $('#FromSector').val($('.display_box_hover_from .recent-destntn').text().trim());
                    $('#Editbox13').val($('.display_box_hover_from .recent-dest2').text().trim());
                    $('#FromSectorShow').val($('.display_box_hover_from .recent-destntn').text().trim());
                    $('#EditboxShow').val($('.display_box_hover_from .recent-dest2').text().trim());
                }
            } else {
                if (document.getElementById("fromautoFill").style.display == 'block') {
                    $('#FromSector').val($('.display_box_hover_from .clickClass').text().trim());
                    $('#FromSectorShow').val($('.display_box_hover_from .clickClass').text().trim());
                }
            }
            jumpToAnchor('.bx1', '.display_box_hover_from');
        }
        return;
    }
    if (e.keyCode == 13) {
        $('.display_box_hover_from .clickClass').click();
        $('#Editbox13').focus();
        $('#EditboxShow').focus();
        return
    }
    document.getElementById("ulfrom").innerHTML = '';
    document.getElementById("fromautoFill").style.display = 'none';
    document.getElementById("FromDivFill").innerHTML = '';
    var htmlAutoCom = "";
    for (var i = 0; i < availableTags.length; i++) {
        if (availableTags[i].toLowerCase().indexOf(value) > -1 && value != '') {
            var clickFun = 'onclick="autoSelect(this,\'FromSector\');"'
            htmlAutoCom += '<div class="srch-bw fromSalection">' + '<div class="fli-im2"></div>' + '<div class="destntn clickClass" ' + clickFun + '>' + availableTags[i] + '</div>' + '<div class="city">[' + availableTags[i].split('-')[0] + ']</div>' + '<div class="clr"></div>' + '</div>'
        }
    }
    document.getElementById('FromDivFill').innerHTML = htmlAutoCom;
    if (value == '') {
        $('#FromAutoFill1').hide();
    } else {
        $('#FromAutoFill1').show();
    }
    displayBoxIndexFrom = -1;
    NavigateFrom(1);
}
var NavigateFrom = function(diff) {
    displayBoxIndexFrom += diff;
    var oBoxCollection = $(".fromSalection");
    if (displayBoxIndexFrom >= oBoxCollection.length) displayBoxIndexFrom = 0;
    if (displayBoxIndexFrom < 0) displayBoxIndexFrom = oBoxCollection.length - 1;
    var cssClass = "display_box_hover_from";
    oBoxCollection.removeClass(cssClass).eq(displayBoxIndexFrom).addClass(cssClass);
}

function MulticityClearText1(id_, eId, InputType) {
    document.getElementById(eId).value = "";
    $("#" + eId.split('_')[0]).val("");
    var ulFromhtml = '';
    if (InputType == 'F') {
        var response = null;
        if (response != null && response.length > 0 && response[0] != "") {
            document.getElementById(id_).innerHTML = '';
            for (var count = response.length - 1; count >= 0; count--) {
                if (count == response.length - 1) {
                    ulFromhtml = '<div class="rcnt"><div class="rcnt2"><div class="rcticn"></div><div class="rec-sc-b">Recent Searches</div><div class="clr"></div></div><div class="clr"></div></div><div class="clr"></div>';
                }
                var criplog = "autoSelectFill(this,\'FromSector\',\'Editbox13\','" + response[count].split('|')[1] + "','" + response[count].split('|')[2] + "','" + response[count].split('|')[3] + "','" + response[count].split('|')[0] + "')";
                ulFromhtml += '<div class="srch-bw fromSalection display_box_hover_from"><div class="clickClass" onclick="' + criplog + '"><div class="recent-destntn">' + response[count].split(' | ')[0] + '</div><div class="fli-im rcnDrop"></div><div class="recent-dest2">' + response[count].split('|')[1] + '</div><div class="clr"></div></div></div>'
            }
        }
        ulFromhtml += '<div class="clr"></div>';
    }
    ulFromhtml += '<div class="rcnt">' + '     <div class="tp-cit">' + '         <div class="main-tp-city">' + '             <div class="cit-im"></div>' + '             <div class="rec-sc-b">Top Cities</div>' + '             <div class="clr"></div>' + '         </div><div class="clr">' + '         </div><div class="clr"></div>' + '         <ul>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();" onclick="autoSelectMul(\'spn12\',\'' + eId + '\', \'DEL-Delhi, India\');"><div><span class="cty"></span><span id="spn12" class="ct" >Delhi(DEL)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Indira Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn2\', \'' + eId + '\', \'BLR-Bangalore, India\');"><div><span class="cty"></span><span id="spn2" class="ct">Bangalore(BLR)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Bengaluru International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn3\', \'' + eId + '\', \'BOM-Mumbai, India\');"><div><span class="cty"></span><span id="spn3" class="ct">Mumbai(BOM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Chhatrapati Shivaji International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn4\', \'' + eId + '\', \'CCU-Kolkata, India\');"><div><span class="cty"></span><span id="spn4" class="ct">Kolkata(CCU)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Netaji Subhash Chandra Bose Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn5\', \'' + eId + '\', \'GOI-Goa, India\');"><div><span class="cty"></span><span id="spn5" class="ct">Goa(GOI)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dabolim Goa International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn6\', \'' + eId + '\', \'HYD-Hyderabad, India\');"><div><span class="cty"></span><span id="spn6" class="ct">Hyderabad(HYD)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Rajiv Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn7\', \'' + eId + '\', \'MAA-Chennai, India\');"><div><span class="cty"></span><span id="spn7" class="ct">Chennai(MAA)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Madras,Chennai International Airport</span><span class="cnt"> India </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn8\', \'' + eId + '\', \'SIN-Singapore, Singapore\');"><div><span class="cty"></span><span id="spn8" class="ct">Singapore(SIN)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Changi Airport</span><span class="cnt"> Singapore </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn9\', \'' + eId + '\', \'DXB-Dubai, United Arab Emirates\');"><div><span class="cty"></span><span id="spn9" class="ct">Dubai(DXB)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Dubai International Airport</span><span class="cnt"> United Arab Emirates </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn10\',\'' + eId + '\', \'BKK-Bangkok, Thailand\');"><div><span class="cty"></span><span id="spn10"class="ct">Bangkok(BKK)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Suvarnabhumi Airport</span><span class="cnt"> Thailand </span></div></li>' + '             <li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn11\',\'' + eId + '\', \'KTM-Kathmandu, Nepal\');"><div><span class="cty"></span><span id="spn11"class="ct"     >Kathmandu(KTM)</span></div><div class="ar-m"><span class="arpn" style="padding-left:0%;">Tribhuvan International Airport</span><span class="cnt"> Nepal </span></div></li>' + '         </ul>' + '         <div class="clr"></div>' + '     </div>' + ' </div>';
    document.getElementById(id_).innerHTML = ulFromhtml;
    $("#dvcalendar").hide();
    $("#fromautoFill").hide();
    $("#toautoFill").hide();
    for (var i = 1; i < 7; i++) {
        document.getElementById("FromMulti" + i).style.display = 'none';
        document.getElementById("ToMulti" + i).style.display = 'none';
    }
    document.getElementById(id_).style.display = 'block';
}

function MulticityClearText(id_, eId, InputType) {
    document.getElementById(eId).value = "";
    $("#" + eId.split('_')[0]).val("");
    $("#" + eId.split('_')[0] + "Span").text("");
    var ulFromhtml = '';
    if (InputType == 'F') {
        var response = null;
        if (response != null && response.length > 0 && response[0] != "") {
            document.getElementById(id_).innerHTML = '';
            for (var count = response.length - 1; count >= 0; count--) {
                if (count == response.length - 1) {
                    ulFromhtml = '<div class="rcnt"><div class="rcnt2"><div class="rcticn"></div><div class="rec-sc-b">Recent Searches</div><div class="clr"></div></div><div class="clr"></div></div><div class="clr"></div>';
                }
                var criplog = "autoSelectFill(this,\'FromSector\',\'Editbox13\','" + response[count].split('|')[1] + "','" + response[count].split('|')[2] + "','" + response[count].split('|')[3] + "','" + response[count].split('|')[0] + "')";
                ulFromhtml += '<div class="srch-bw fromSalection display_box_hover_from"><div class="clickClass" onclick="' + criplog + '"><div class="recent-destntn">' + response[count].split(' | ')[0] + '</div><div class="fli-im rcnDrop"></div><div class="recent-dest2">' + response[count].split('|')[1] + '</div><div class="clr"></div></div></div>'
            }
        }
        ulFromhtml += '<div class="clr"></div>';
    }
    ulFromhtml += '<div class="rcnt">' + '<div class="tp-cit">' + '<div class="main-tp-city">' + '<div class="cit-im"></div>' + '<div class="rec-sc-b">Top Cities</div>' + '<div class="clr"></div>' + '</div><div class="clr">' + '</div><div class="clr"></div>' + '<ul>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();" onclick="autoSelectMul(\'spn12\',\'' + eId + '\', \'DEL-Delhi, India\',\'airport12\');"><div><span class="cty"></span><span id="spn12" class="ct" >Delhi(DEL)</span></div><div class="ar-m"><span id="airport12" class="arpn" style="padding-left:0%;">Indira Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn2\', \'' + eId + '\', \'BLR-Bangalore, India\',\'airport2\');"><div><span class="cty"></span><span id="spn2" class="ct">Bangalore(BLR)</span></div><div class="ar-m"><span id="airport2" class="arpn" style="padding-left:0%;">Bengaluru International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn3\', \'' + eId + '\', \'BOM-Mumbai, India\',\'airport3\');"><div><span class="cty"></span><span id="spn3" class="ct">Mumbai(BOM)</span></div><div class="ar-m"><span id="airport3"class="arpn" style="padding-left:0%;">Chhatrapati Shivaji International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn4\', \'' + eId + '\', \'CCU-Kolkata, India\',\'airport4\');"><div><span class="cty"></span><span id="spn4" class="ct">Kolkata(CCU)</span></div><div class="ar-m"><span id="airport4"class="arpn" style="padding-left:0%;">Netaji Subhash Chandra Bose Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn5\', \'' + eId + '\', \'GOI-Goa, India\',\'airport5\');"><div><span class="cty"></span><span id="spn5" class="ct">Goa(GOI)</span></div><div class="ar-m"><span id="airport5"class="arpn" style="padding-left:0%;">Dabolim Goa International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn6\', \'' + eId + '\', \'HYD-Hyderabad, India\',\'airport6\');"><div><span class="cty"></span><span id="spn6" class="ct">Hyderabad(HYD)</span></div><div class="ar-m"><span id="airport6"class="arpn" style="padding-left:0%;">Rajiv Gandhi International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn7\', \'' + eId + '\', \'MAA-Chennai, India\',\'airport7\');"><div><span class="cty"></span><span id="spn7" class="ct">Chennai(MAA)</span></div><div class="ar-m"><span id="airport7"class="arpn" style="padding-left:0%;">Madras,Chennai International Airport</span><span class="cnt"> India </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn8\', \'' + eId + '\', \'SIN-Singapore, Singapore\',\'airport8\');"><div><span class="cty"></span><span id="spn8" class="ct">Singapore(SIN)</span></div><div class="ar-m"><span id="airport8"class="arpn" style="padding-left:0%;">Changi Airport</span><span class="cnt"> Singapore </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn9\', \'' + eId + '\', \'DXB-Dubai, United Arab Emirates\',\'airport9\');"><div><span class="cty"></span><span id="spn9" class="ct">Dubai(DXB)</span></div><div class="ar-m"><span id="airport9"class="arpn" style="padding-left:0%;">Dubai International Airport</span><span class="cnt"> United Arab Emirates </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn10\',\'' + eId + '\', \'BKK-Bangkok, Thailand\',\'airport10\');"><div><span class="cty"></span><span id="spn10"class="ct">Bangkok(BKK)</span></div><div class="ar-m"><span id="airport10"class="arpn" style="padding-left:0%;">Suvarnabhumi Airport</span><span class="cnt"> Thailand </span></div></li>' + '<li style="border-bottom:1px solid #ccc;padding: 5px 0px; cursor: pointer;" onchange="ChangeCabin();"onclick="autoSelectMul(\'spn11\',\'' + eId + '\', \'KTM-Kathmandu, Nepal\',\'airport11\');"><div><span class="cty"></span><span id="spn11"class="ct"     >Kathmandu(KTM)</span></div><div class="ar-m"><span id="airport11" class="arpn" style="padding-left:0%;">Tribhuvan International Airport</span><span class="cnt"> Nepal </span></div></li>' + '  </ul>' + '         <div class="clr"></div>' + '     </div>' + ' </div>';
    document.getElementById(id_).innerHTML = ulFromhtml;
    $("#dvcalendar").hide();
    $("#fromautoFill").hide();
    $("#toautoFill").hide();
    for (var i = 1; i < 7; i++) {
        document.getElementById("FromMulti" + i).style.display = 'none';
        document.getElementById("ToMulti" + i).style.display = 'none';
    }
    document.getElementById(id_).style.display = 'block';
}

function fillMultiCityTotxtBox() {}

function swapValues(_id1, _id2) {
    var tmp = document.getElementById(_id1).value;
    document.getElementById(_id1).value = document.getElementById(_id2).value;
    document.getElementById(_id2).value = tmp;
    if (document.getElementById('srcCity') != null && document.getElementById('destCity') != null && document.getElementById(_id2).value != "" && document.getElementById(_id1).value != "") {
        if (_id1.indexOf('show') > -1) {
            document.getElementById('srcCity_show').value = document.getElementById(_id1).value;
            document.getElementById('destCity_show').value = document.getElementById(_id2).value;
        } else {
            document.getElementById('srcCity').value = document.getElementById(_id1).value;
            document.getElementById('destCity').value = document.getElementById(_id2).value;
        }
    }
	if (_id1 == 'FromSector') {
		if(document.getElementById("FromSectorSpan")!=null){
        orgAirport = document.getElementById("FromSectorSpan").innerHTML;
        destAirport = document.getElementById("Editbox13Span").innerHTML;
        document.getElementById("FromSectorSpan").innerHTML = destAirport;
        document.getElementById("Editbox13Span").innerHTML = orgAirport;}
    }
	setCookie("Org1", document.getElementById("FromSector").value + "|" + document.getElementById('FromSector_show').value);
	setCookie("Dest1", document.getElementById("Editbox13").value + "|" + document.getElementById("Editbox13_show").value);
	if(document.getElementById("FromSectorSpan")!=null)
	{
			setCookie("AirportOrg1", document.getElementById("FromSectorSpan").innerHTML);
	}
    if(document.getElementById("Editbox13Span")!=null)
	{
		 setCookie("AirportDest1", document.getElementById("Editbox13Span").innerHTML);
	}
   
}

function SendMail(Email) {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: "https://www.easemytrip.com/search.aspx/SendTemplate",
        data: "{'emailid':'" + Email + "'}",
        success: function(response) {
            alert("otp send succesfully")
        },
        beforeSend: function(XMLHttpRequest) {},
        error: function(xmlHttpRequest, status, err) {}
    });
}

function OpenLoginPop() {
    document.getElementById("divLogin").style.display = "block";
}