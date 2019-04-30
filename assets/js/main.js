  var allVals = {};
  $( document ).ready(function(){
  	$('#frm input[type=radio]:checked').each(function() {
        allVals[this.name] = $(this).val();
	});
  	widget(allVals)
  })

  function save(event){
	$('#frm input[type=radio]:checked').each(function() {
        allVals[this.name] = $(this).val();
     });
  	widget(allVals)
  }

  function widget(data){
  	if (data.vertical == 'top') {
      $('.float').css({'bottom':'','top':'-15px'})
      $('.formwidget').css({'bottom':'','top':'10px'})
    }
    if (data.vertical == 'bottom') {
      $('.float').css({'bottom':0,'top':''})
      $('.formwidget').css({'bottom':'10px','top':''})
    }
    if (data.horizontal == 'right') {
      $('.float').css({'right':0,'left':''})
      $('.formwidget').css({'right':'20px','left':''})
    }
    if (data.horizontal == 'left') {
      $('.float').css({'right':'','left':0})
      $('.formwidget').css({'right':'','left':'10px'})
    }
    if (data.name == 0) {
      document.getElementById('name').style.display = "none";
    }
    else{
      document.getElementById('name').style.display = "block";
    }
    if (data.phone == 0) {
      document.getElementById('inputtlp').style.display = "none";
    }
    else{
      document.getElementById('inputtlp').style.display = "block";
    }
    if (data.email == 0) {
      document.getElementById('eml').style.display = "none";
    }
    else{
      document.getElementById('eml').style.display = "block";
    }
  }

  function fn_hide() {
    var button = document.getElementById("buttonfloat");
    var div = document.getElementById("formwidget");
    if (button.style.display === "block") {
      button.style.display = "none";
      div.style.display = "block";
    } else {
      button.style.display = "block";
      div.style.display = "none";
    }
  }

  function post() {
    var telephone = document.getElementById("telephone").value;
    var code = document.getElementById("code").value;

    var error = document.getElementsByClassName("error");
    for (var i = 0; i < error.length; i++) {
      error[i].style.display = 'none'; 
    }

    if (validation()) {
      document.getElementsByClassName("loader")[0].style.display = "block";
      var url = 'http://apilayer.net/api/validate?access_key=ba56df1697894a95b46ef10b4847152e&number='+telephone;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (this.readyState != 4) return;
          if (this.status == 200) {
              var data = JSON.parse(this.responseText);
              document.getElementsByClassName("loader")[0].style.display = "none";
              document.getElementsByClassName("alert")[0].style.display = "block";
              setTimeout(function(){ 
                document.getElementsByClassName("alert")[0].style.display = "none";
              }, 5000);
          }
      };
      xhr.open('POST', url, true);
      xhr.send();
    }
  }

function validation(){
  var name      = document.getElementById("name").value;
  var telephone = document.getElementById("telephone").value;
  var email     = document.getElementById("eml").value;

  var errname   = document.getElementById("errname");
  var errtlp    = document.getElementById("errtlp");
  var errtlp2   = document.getElementById("errtlp2");
  var erremail  = document.getElementById("erremail");
  var erremail  = document.getElementById("erremail");
  var erremail2 = document.getElementById("erremail2");

  var result = true

  if (name == '') {
    errname.style.display = "block";
    result = false
  }
  if (telephone == '') {
    errtlp.style.display = "block";
    result = false
  }
  else{
    if (phonenumber(telephone) == false){
      errtlp2.style.display = "block";
      result = false
    }
  }
  if (email == '') {
    erremail.style.display = "block";
    result = false
  }
  else{
    if (validateEmail(email) == false){
      erremail2.style.display = "block";
      result = false
    }
  }

  return result;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function phonenumber(number)
{
	var code = document.getElementById("code").value;
	if (number.substr(0, 1) == 0) {
		while(number.charAt(0) === '0')
		{
		 number = number.substr(1);
		}
	}
	number = code + number
	var url = 'http://apilayer.net/api/validate?access_key=ba56df1697894a95b46ef10b4847152e&number='+number;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.readyState != 4) return;
	if (xhr.status == 200) {
		var data = JSON.parse(xhr.responseText);
		return data.valid
    }
}