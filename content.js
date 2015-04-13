//var a = "<section id='sectionmysection'><iframe id='idelem' style='margin:0 0 0 -68px;width:19%;height:600px;position:fixed;' src='http://dave.ankin.info/'><p style='color:black;'>hello</p></iframe></section>";
var a = "<section id='sectionmysection'></section>";
//var a = "helloworld";

var b = "\
			position:fixed;\
			top:0px;\
			right:80%;\
			width:270px;\
			height:100%;\
			background:white;\
			box-shadow:inset 0 0 3px black;\
			z-index:999999;\
		";
var c = "stuff";

$.get("http://notbias.ankin.info/"+"good/"+window.location.href,{}, function (data){
	console.log("recieved notbias b-end");
	$.post("http://dave.ankin.info:9090/stuff.php", data, function (data) {
		$('#sectionmysection').html(data);
		console.log('recieved php template b-end');
		console.log(data);
	});
})