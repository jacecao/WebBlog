// JavaScript Document
var search = document.getElementById("search"),
	searchResult = document.getElementById("searchResult"),
	keyword = document.getElementById("keyword");
	
search.addEventListener( 'click' , sendMess );

function sendMess()
{
	var request = new XMLHttpRequest();
	request.open( 'GET' , 'php/server.php?number='+keyword.value );
	request.send();
	request.onreadystatechange = function()
	{
		if( request.readyState === 4 )
		{
			if( request.status === 200 )
			{
				searchResult.style.color = "red";
				searchResult.innerHTML = request.responseText;
			}else{
				searchResult.style.color = "orange";
				searchResult.innerHTML = "error number:" + request.status;
			}
		}
	}
}

var save = document.getElementById("save"),
	staffName = document.getElementById("staffName"),
	staffNumber = document.getElementById("staffNumber"),
	staffSex = document.getElementById("staffSex"),
	staffJob = document.getElementById("staffJob"),
	createResult = document.getElementById("createResult");
	
save.addEventListener( "click", addmessage );
function addmessage()
{
	var request = new XMLHttpRequest();
	request.open( 'POST', 'php/server.php' );
	var data = 'name='+staffName.value+'&number='+staffNumber.value+'&sex='+staffSex.value+'&job='+staffJob.value;
	request.setRequestHeader( 'Content-type','application/x-www-form-urlencoded' );
	request.send( data );
	request.onreadystatechange = function()
	{
		if( request.readyState === 4 )
		{
			if( request.status === 200 )
			{
				createResult.style.color = "red";
				createResult.innerHTML = request.responseText;
			}else{
				createResult.style.color = "orange";
				createResult.innerHTML = "error number:" + request.status;
			}
		}
	}
}