
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    // Put the image URL in Google search.
    renderStatus('asdfasdf');
	var img = document.createElement("img");
	
	img.width = 200;
	img.height = 200;
	
	img.src = "Koala.jpg";
	document.body.appendChild(img);
	
});
