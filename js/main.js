  
  var crop = -1,
	  org = "",
	  id = "",
	  env = -1,
	  sp = "",
	  lat = -1,
	  lng = -1,
	  pdc = [],
	  pdn = [],
	  pdi = [],
	  cdl = [],
	  pbp = [],
	  pbc = [];


   var disNum = 1,
   	   pdnList;


  document.addEventListener('init', function(event) {
	clearAll();
	getDis();
	$(".pd").hide();
	$(".cdlr").hide();
	$(".pbp").hide();
	$(".pbcb").hide();

	$("#pd1").show();


  	$("#cropname").click(function(){
  		//alert($("input[name='cdl1']:checked").val());
  		//alert($("input[name='pbp1check']:checked").val());
  		//$("input[name='pbp1check']").prop("disabled", true);
  		buildDialog(cropList,"getCrop",this);
  	})

	
	$("#organization").click(function(){
		if (crop!=-1) {
			var thisList = orgList[crop-1];
			buildDialog(thisList,"getOrg",this);
		}else{
			showAlert("対象作物を選択してください")
		}
	})

	$("#sp").click(function(){

		if (crop!=-1) {
			var thisList = spList[crop-1];
			buildDialog(thisList,"getSp",this);
		}else{
			showAlert("対象作物を選択してください")
		}

	})

	$("#getLocation").click(function(){
		if (navigator.geolocation)
		    {
		    	navigator.geolocation.getCurrentPosition(showPosition,positionError);
		    }
		else{
		  		showAlert("Position Error");
		  	}
	}) 

	$("#env").click(function(){
			buildDialog(envList,"getEnv",this);	
	})


	$(".pdc").click(function(){
			
			buildDialog(pdcList,"getPdc",this)
	})

	$(".pdn").click(function(){

		var num = (this.id).substr((this.id).length-1,1);

			if (pdc[num-1]==null) {
				showAlert("病害虫区分を選択してください")
			}else if(pdc[num-1]==1||pdc[num-1]==2){
				if (crop == -1) {
					showAlert("対象作物を選択してください");
				}else{
					if (pdc[num-1] == 1) {
						pdnList = pdnList1[crop-1];
					}else if(pdc[num-1] == 2){
						pdnList = pdnList2[crop-1];
					}
					buildDialog(pdnList,"getPdn",this);
				}
			}
	})

	$(".pdi").click(function(){
			
		buildDialog(pdiList,"getPdi",this);
	})


	$(".pbp").click(function(){

		var num = (this.id).substr((this.id).length-1,1);
		
		if ($("#pbpCheck"+num)[0].checked == true) {
			pbp[num-1] = 1;
			$("#pbcb"+num).show();
			$("#pbcInput"+num).val("");
			pbc[num-1]=null;

		}else{
			pbp[num-1] = 0;
			$("#pbcb"+num).hide();
			$("#pbcInput"+num).val("");
			pbc[num-1]=0;
		}
	})


	$(".pbc").click(function(){


		buildDialog(pbcList,"getPbc",this);

	})

	$("#next").click(function(){

		if(disNum>=5){

		}else{
			disNum+=1;
			$("#delete").show();
			if (disNum>=5) {
				$("#next").css("color","rgb(180,180,180)");
			}	
			$("#pd"+disNum).show();

			$('.page__content').animate({scrollTop:$("#delete").offset().top+200}, 1000);
			return false;
		}

	})


	$("#delete").click(function(){

		var text = "病害虫"+disNum+"を削除しますか";

		var deleteDis = function(){
			
			pdc.splice(disNum-1,1);
	  		pdn.splice(disNum-1,1);
	  		pdi.splice(disNum-1,1);
	  		cdl.splice(disNum-1,1);
	  		pbp.splice(disNum-1,1);
	  		pbc.splice(disNum-1,1);

	  		$("#pdcInput"+disNum).val("");
	  		$("#pdnInput"+disNum).val("");
	  		$("#pdiInput"+disNum).val("");
	  		$("#pbcInput"+disNum).val("");

	  		for(var f = 0 ;f < $("input[name='cdl"+disNum+"']").length;f++){
				$("input[name='cdl"+disNum+"']")[f].checked = false;
			}
			$("#pbpCheck"+disNum)[0].checked = false;

			$("#cdlr"+disNum).hide();
			$("#pbp"+disNum).hide();
			$("#pbcb"+disNum).hide();

			$("#pd"+disNum).hide();

			disNum-=1;

			$("#next").css("color","rgb(30,30,30)");
			
			if (disNum==1) {
				$("#delete").hide();
			}
		}

		showConfirm(text,"削除",deleteDis);

	})


	$("#clear").click(function(){
		
	

	var text = "全ての内容を削除しますか";

	showConfirm(text,"Clear",clearAll);

	})


function clearAll(){

		crop = -1,
		org = "",
		id = "",
		env = -1,
		sp = "",
		lat = -1,
		lng = -1,
		pdc = [],
		pdn = [],
		pdi = [],
		cdl = [],
		pbp = [],
		pbc = [];

		disNum = 1;

  		$(".input").val("");
  		$(".pbpcheck")[0].checked = false;


	  	for(var f = 0 ;f < $("input:radio").length;f++){
			($("input:radio"))[f].checked=false;
		}

		$(".cdlr").hide();
		$(".pbp").hide();
		$(".pbcb").hide();
		$("#delete").hide();
			
		for(var f=2;f<=5;f++){
			$("#pd"+f).hide();
		}

		$("#next").css("color","rgb(30,30,30)");
	}

	$("#getQR").click(function(){

		var checkOK = true;

		id = $("#idInput").val(); 
		lat = $("#latInput").val();
		lng = $("#lngInput").val();
		if (lat=="") {
			lat=0;
		}
		if(lng==""){
			lng=0;
		}


		if (crop==-1) {
			showAlert("対象作物を選択してください");
			checkOK = false;
		}else if(org == ""){
			showAlert("試験機関を選択してください");
			checkOK = false;
		}else if(id == ""){
			showAlert("試験IDを入力してください");
			checkOK = false;
		}else if(env == -1){
			showAlert("環境を選択してください");
			checkOK = false;
		}else if(sp == ""){
			showAlert("対象部位を選択してください");
			checkOK = false;
		}
		else{

			for(var i=0;i<disNum;i++){

				if (pdc[i]==1||pdc[i]==2) {
					cdl[i] = $("input[name='cdl"+(i+1)+"']:checked").val();
				}

				if (pdc[i]==null) {
					showAlert("病害虫"+(i+1)+":病害虫区分を選択してください");
					checkOK = false;
					break;
				}else if(pdn[i]==""){
					showAlert("病害虫"+(i+1)+":病害虫名を選択してください");
					checkOK = false;
					break;
				}else if(pdi[i]==null){
					showAlert("病害虫"+(i+1)+":同定区分を選択してください");
					checkOK = false;
					break;
				}else if(cdl[i]==null){
					showAlert("病害虫"+(i+1)+":被害程度を選択してください");	
					checkOK = false;
					break;			
				}else if(pbc[i]==null){
					showAlert("病害虫"+(i+1)+":虫体区分を選択してください");	
					checkOK = false;
					break;
				}

			}

		}

		if (checkOK==true) {

			var str = lat+","+lng+","+crop+","+org+","+id+","+env+","+sp;

					for(var i=0;i<disNum;i++){
						str += ","+pdc[i]+","+pdn[i]+","+pdi[i]+","+cdl[i]+","+pbp[i]+","+pbc[i];
					}
			console.log(str);
            $("#back").show();
			ons.createDialog('chooselist.html').then(function(dialog) {
					
				$(".chooseBox").html('<div class="qrcode" style="padding:30px;text-align:center;bac"></div>');
				getQR(str);
				showDialog();

			});

		}

		console.log(crop,org,id,env,sp,lat,lng,pdc,pdn,pdi,cdl,pbp,pbc);

	})

  });




	function getCrop(i){

		if (cropList[i].value != crop) {
			$("#cropnameInput").val(cropList[i].name);
  			crop = cropList[i].value;

  			$("#orgInput").val("");
  			org = "";

  			$("#spInput").val("");
  			sp="";

  			for(var f=0;f<disNum;f++){
  				if (pdc[f] == 1 || pdc[f] == 2) {
  					$("#pdnInput"+(f+1)).val("");
  					pdn[f] = "";
  				}
  			}
		}

  		hideDialog();

  	}

  	function getOrg(i){

  		$("#orgInput").val(orgList[crop-1][i].name);
  		org = orgList[crop-1][i].value;
  		hideDialog(); 

  	}


  	function getSp(i,theHTML){


  		$("#spInput").val(spList[crop-1][i]);
  		sp = spList[crop-1][i];
  		hideDialog(); 

  	}

  	function getEnv(i){

  		$("#envInput").val(envList[i].name);
  		env = envList[i].value;
  		hideDialog(); 

  	}


  	function getPdc(i,theHTML){
  		
		var num = (theHTML.id).substr((theHTML.id).length-1,1);

  		if (pdc[num-1] == pdcList[i].value) {
			hideDialog(); 
  		}else{
			
			$("#pdcInput"+num).val(pdcList[i].name);
			pdc[num-1] = pdcList[i].value;

			if (pdc[num-1]==0) {
  				$("#pdnInput"+num).val("健全");
  				pdn[num-1] = "健全";

  				$("#cdlr"+num).hide();
  				cdl[num-1] = 0;

  				$("#pbp"+num).hide();
  				pbp[num-1] = 0;

  				$("#pbcb"+num).hide();
  				pbc[num-1] = 0;

  			}else if(pdc[num-1]==3){
  				$("#pdnInput"+num).val("該当なし");
  				pdn[num-1] = "該当なし";

  				$("#cdlr"+num).hide();
  				cdl[num-1] = 4; 

  				$("#pbp"+num).hide();
  				pbp[num-1] = 0;

  				$("#pbcb"+num).hide();
  				pbc[num-1] = 0;

  			}else{
  				$("#pdnInput"+num).val("");
  				pdn[num-1] = "";

  				$("#cdlr"+num).show();

				cdl[num-1] = null;

				for(var f = 0 ;f < $("input[name='cdl"+num+"']").length;f++){
					$("input[name='cdl"+num+"']")[f].checked = false;
				}
				

  				if (pdc[num-1]==2) {
  					$("#pbp"+num).show();
  					pbp[num-1] = 0;
  					$("#pbpCheck"+num)[0].checked = false;
  					$("#pbcb"+num).hide();
  					pbc[num-1] = 0;
  				}else{
  					$("#pbp"+num).hide();
  					pbp[num-1] = 0;

  					$("#pbcb"+num).hide();
  					pbc[num-1] = 0;
  				}

  			}
  			
  			hideDialog(); 
  		}

  	}


  	function getPdn(i,theHTML){
  		var num = (theHTML.id).substr((theHTML.id).length-1,1);
  		if (pdc[num-1] == 1) {
  			pdnList = pdnList1;
  		}else{
  			pdnList = pdnList2;
  		}
  		$("#pdnInput"+num).val(pdnList[crop-1][i]);
  		pdn[num-1] = pdnList[crop-1][i];

  		hideDialog(); 
  	}


  	function getPdi(i,theHTML){
  		var num = (theHTML.id).substr((theHTML.id).length-1,1);

		$("#pdiInput"+num).val(pdiList[i].name);
		pdi[num-1] = pdiList[i].value;

		hideDialog(); 

  	}


  	function getPbc(i,theHTML){

  		var num = (theHTML.id).substr((theHTML.id).length-1,1);

  		$("#pbcInput"+num).val(pbcList[i].name);
  		pbc[num-1]=pbcList[i].value;

  		hideDialog();

  	}

//alert
  	function showAlert(myMessage){
		ons.notification.alert({
  		message: myMessage,
  		title: '',
  			buttonLabel: 'OK',
  			animation: 'default', 
 			callback: function() {
  				}
		});
	}


//confirm
	function showConfirm(myMessage,title,myFunc){
			ons.notification.confirm({
 			message: myMessage,
 			title: title,
  			buttonLabels: ['はい', 'いいえ'],
  			animation: 'default',
 			primaryButtonIndex: 1,
  			cancelable: false,
  			callback: function(index) {
  				if(index==0){
  					myFunc();
  				};
  			}
		});
	}

//dialog
	function buildDialog(arr,funcName,theHTML){
  			
  			var chtml='<ons-list class="chooseList"></ons-list>';
			
  			ons.createDialog('chooselist.html').then(function(dialog){
			$(".chooseBox").html(chtml);
			$(".chooseList").html("");

			for (var i = 0; i < arr.length; i++) {
				var txt="<ons-list-item modifier='tappable' onclick='"+funcName+"("+i+","+theHTML.id+")'>"+(arr[i].name?arr[i].name:arr[i])+"</ons-list-item>";
				$(".chooseList").append(txt);
			}

			showDialog();

		    });	
  	}



    var ifPreHide = -1;
	function showDialog(){

		var dialog = document.getElementById('dialog');
		
	  	if (dialog) {
	   		dialog.show();
	  	}
	  	else {
	    	ons.createDialog('chooselist.html')
	      	.then(function (dialog) {
	      		dialog.show();
	     	});
	  	}

	  	

	  	if (ifPreHide==-1){
	  			dialog.addEventListener("prehide",function(){
					$("#back").hide();
				});

				ifPreHide = 1;
	  	}
	}


	function hideDialog(){

	  	document.getElementById("dialog").hide();
	  	
	}


//position

	function showPosition(position)

		{

		  	//console.log(position);
		  	$("#latInput").val(position.coords.latitude);
		  	$("#lngInput").val(position.coords.longitude);

		}


	function positionError(error){
		
            switch(error.code){
                   case 1:
                   showAlert("位置情報の利用が許可されていません");
                   break;

                   case 2:
                   showAlert("現在位置が取得できませんでした");
                   break;

                   case 3:
                   showAlert("タイムアウトになりました");
                   break;

                   case 4:
                   showAlert("位置情報エラー");
                   break;
               }
     }


    function getQR(str){



		$('.qrcode').qrcode({
			render: "canvas", 
			minVersion: 1,
			maxVersion: 40,
			ecLevel: 'H',
			width: 250,
			height: 250,
			foreground: "#000",
			background: "#fff",
			text: utf16to8(str)
		});

    }


     function utf16to8(str) {  
            var out, i, len, c;    
            out = "";    
            len = str.length;    
                for(i = 0; i < len; i++) {    
                c = str.charCodeAt(i);    
                if ((c >= 0x0001) && (c <= 0x007F)) {    
                    out += str.charAt(i);    
                } else if (c > 0x07FF) {    
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
                    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
                } else {    
                    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
                }    
                }    
                return out;    
        }


   function getDis(){

   	for(var i=2;i<6;i++){
/*
   var newDisHtml = '<div id="pd'+i+'" class="pd" style="display:none;">\
						<div class="disName">病害虫'+i+'</div>\
					   <div>\
					<span class="inputname">病害虫区分:</span><div class="inputBox pdc" id="pdc'+i+'"><input id="pdcInput'+i+'" class="input pdcInput" disabled="disabled" placeholder="病害虫区分"></div>\
				</div><div>\
					<span class="inputname">病害虫名:</span><div class="inputBox pdn" id="pdn'+i+'"><input id="pdnInput'+i+'" class="input pdnInput" disabled="disabled" placeholder="病害虫名"></div>\
				</div><div>\
					<span class="inputname">同定区分:</span><div class="inputBox pdi" id="pdi'+i+'"><input id="pdiInput'+i+'" class="input pdiInput" disabled="disabled" placeholder="同定区分"></div>\
				</div>\
					<div id="cdlr'+i+'" class="cdlr">\
						<span>被害程度:</span>\
						<label>\
	        				<ons-radio name="cdl'+i+'" input-id="cdl'+i+'_r0" value="0" ></ons-radio>\
	      				</label>\
	      				<label for="cdl'+i+'_r0" >0</label>\
					    <label >\
					    	<ons-radio name="cdl'+i+'" input-id="cdl'+i+'_r1" value="1" ></ons-radio>\
					    </label>\
					    <label for="cdl'+i+'_r1" >1</label>\
	 				    <label >\
					    	<ons-radio name="cdl'+i+'" input-id="cdl'+i+'_r2" value="2" ></ons-radio>\
					    </label>\
					    <label for="cdl'+i+'_r2" >2</label>\
					    <label >\
					    	<ons-radio name="cdl'+i+'" input-id="cdl'+i+'_r3" value="3" ></ons-radio>\
					    </label>\
					    <label for="cdl'+i+'_r3" >3</label>\
      				</div>\
					<div id="pbp'+i+'" class="pbp">\
				      	<label for="pbpCheck'+i+'" class="center">\
				       			 虫体の有無:\
				     		</label>\
						<label class="left">\
				        	<ons-checkbox class="pbpcheck" name="pbpCheck'+i+'" input-id="pbpCheck'+i+'" value="1"></ons-checkbox>\
				   	  	</label>\
						</div>\
						<div id="pbcb'+i+'" class="pbcb">\
							<span class="inputname">虫体区分:</span><div class="inputBox pbc" id="pbc'+i+'"><input id="pbcInput'+i+'" class="input pbcInput" disabled="disabled" placeholder="虫体区分"></div>\
						</div></div>';
*/

	var newDisHtml = '<div id="pd'+i+'" class="pd">\
				<div class="disName">病害虫'+i+'</div>\
				<div class="pdBox">\
				<div class = "leftBox">\
				<div class="ni">\
					<span class="inputname">区分<span></span></span><div class="inputBox pdc" id="pdc'+i+'"><input id="pdcInput'+i+'" class="input pdcInput" disabled="disabled" placeholder="病害虫区分"></div>\
				</div>\
				<div class="ni">\
					<span class="inputname">病害虫名<span></span></span><div class="inputBox pdn" id="pdn'+i+'"><input id="pdnInput'+i+'" class="input pdnInput" disabled="disabled" placeholder="病害虫名"></div>\
				</div>\
				<div class="ni">\
					<span class="inputname">同定区分<span></span></span><div class="inputBox pdi" id="pdi'+i+'"><input id="pdiInput'+i+'" class="input pdiInput" disabled="disabled" placeholder="同定区分"></div>\
				</div>\
				</div>\
					<div id="cdlr'+i+'" class="cdlr ni">\
						<span class="inputname">被害程度<span></span></span>\
						<div>\
	        				<ons-radio class="radio" name="cdl'+i+'" input-id="cdl'+i+'_r0" value="0" ></ons-radio>\
	      				</div>\
	      				<label for="cdl'+i+'_r0" >0</label>\
					    <div>\
					    	<ons-radio class="radio" name="cdl'+i+'" input-id="cdl'+i+'_r1" value="1" ></ons-radio>\
					    </div>\
					    <label for="cdl'+i+'_r1" >1</label>\
	 				    <div>\
					    	<ons-radio class="radio" name="cdl'+i+'" input-id="cdl'+i+'_r2" value="2" ></ons-radio>\
					    </div>\
					    <label for="cdl'+i+'_r2" >2</label>\
					    <div>\
					    	<ons-radio class="radio" name="cdl'+i+'" input-id="cdl'+i+'_r3" value="3" ></ons-radio>\
					    </div>\
					    <label for="cdl'+i+'_r3" >3</label>\
      				</div>\
					<div class = "leftBox">\
					<div id="pbp'+i+'" class="pbp ni">\
				      	<label for="pbpCheck'+i+'" class="center inputname">\
				       			 <span class="inputname">虫体の有無<span></span></span>\
				     	</label>\
						<label class="left">\
				        	<ons-checkbox class="pbpcheck" name="pbpCheck'+i+'" input-id="pbpCheck'+i+'" value="1"></ons-checkbox>\
				   	  	</label>\
						</div>\
						<div id="pbcb'+i+'" class="pbcb ni">\
							<span class="inputname">虫体区分<span></span></span><div class="inputBox pbc" id="pbc'+i+'"><input id="pbcInput'+i+'" class="input pbcInput" disabled="disabled" placeholder="虫体区分"></div>\
						</div>\
						</div>\
			</div>\
		</div>';

		$("#content2").append(newDisHtml);

		}
    }
