$(function(){$(".special-menu").click(function(){$(".black_backgr").show();$(".res_nav_n").fadeIn();});$(".cbn2").click(function(){$(".black_backgr").hide();$(".res_nav_n").hide();});$(".black_backgr").click(function(){$(".cbn2").hide();$(".res_nav_n").hide();$(".black_backgr").hide();});});$(document).ready(function(){$('#welcome-det').click(function(e){e.stopPropagation();$('.sign-abs').toggle();$('#hid').show();});$('#close').click(function(e){e.stopPropagation();$('#hid').hide();});$('#hj').click(function(e){e.stopPropagation();$('#hid').hide();});$('#RegInHome').click(function(e){e.stopPropagation();$('.sign-abs').toggle();$('#hid1').show();});$('#close1').click(function(e){e.stopPropagation();$('#hid1').hide();});$('#hj1').click(function(e){e.stopPropagation();$('#hid1').hide();});});$(document).ready(function(){$('#welcome-det').click(function(e){e.stopPropagation();$('.sign-abs').toggle();$('#hid').show();});$('#close').click(function(e){e.stopPropagation();$('#hid').hide();});$('#hj').click(function(e){e.stopPropagation();$('#hid').hide();});$('#RegInHome').click(function(e){e.stopPropagation();$('.sign-abs').toggle();$('#hid1').show();});$('#close1').click(function(e){e.stopPropagation();$('#hid1').hide();});$('#hj1').click(function(e){e.stopPropagation();$('#hid1').hide();});$("#forge-tex").click(function(){$("#forget-pass").show();$("#sign-in-pop").hide();});$("#welcome-det").click(function(){$("#hid").show();$("#forget-pass").hide();$("#sign-in-pop").show();});});$(function(){$(".special-menu").click(function(){$(".black_backgr").show();$(".res_nav_n").fadeIn();});$(".cbn2").click(function(){$(".black_backgr").hide();$(".res_nav_n").hide();});$(".black_backgr").click(function(){$(".cbn2").hide();$(".res_nav_n").hide();$(".black_backgr").hide();});$(".retu-date-n").click(function(){$(".retu-date-n").removeClass("op");});$(".border-rht").click(function(){$(".retu-date-n").removeClass("op");});$(".border-lft").click(function(){$(".retu-date-n").addClass("op");});});$(function(){$('.one-rou li').click(function(){$('.one-rou li.bg-color').removeClass('bg-color');$(this).addClass('bg-color');});$('.dom-int a').click(function(){$('.dom-int a.bg-color').removeClass('bg-color');$(this).addClass('bg-color');});$(".click-one").click(function(){$(".hide-ddate1").hide();});$(".click-round").click(function(){$(".hide-ddate1").show();});$(".round-but1").click(function(){document.getElementById('Trip').checked=false;document.getElementById('radio1').checked=true;SearchType.value='Return';$(".click-round").addClass('bg-color');$(".click-one").removeClass('bg-color');});});$(document).on('click',function(e){if(e.target.id==''||(e.target.id!='img1'&&e.target.id!='img2'&&e.target.id!='FromSector'&&e.target.id!='FromSector1'&&e.target.id!='Editbox14'&&e.target.id!='Editbox13'&&e.target.id=='lblDeparture'&&e.target.id=='lblArrival')){$("#fromautoFill").hide();$("#auto_saugg").hide();$("#toautoFill").hide();$("#dvcalendar").hide();$(".drop").hide();}});