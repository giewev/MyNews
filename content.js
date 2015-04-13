var a = "<section><iframe id='idelem' style='margin:0 0 0 -68px;width:19%;height:600px;position:fixed;' src='http://dave.ankin.info/'><p style='color:black;'>hello</p></iframe></section>";
//var a = "helloworld";

var b = "\
			position:fixed;\
			top:0px;\
			right:80%;\
			width:30%;\
			height:100%;\
			background:white;\
			box-shadow:inset 0 0 3px black;\
			z-index:999999;\
		";

$.get("http://notbias.ankin.info/"+"good/"+window.location.href,{}, function (data){
	console.log(data);
	$('#idelem').html(data["tweets"][0]["date"]);
})