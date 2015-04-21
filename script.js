/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request, 
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSbWrap();
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;

//here
function toggleSbWrap (){
	toggleSidebar (a,b);
}

function toggleSidebar(text,css) {
	if(sidebarOpen) {
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else {
		var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
		sidebar.innerHTML = text;

		$.get("http://notbias.ankin.info/"+"corrupt/"+window.location.href,{}, function (data){
			console.log("recieved notbias b-end");
			console.log(data);
			$('#sectionmysection')[0].innerHTML=data;
		});

		sidebar.style.cssText = css;
		document.body.appendChild(sidebar);
		sidebarOpen = true;
	}
}