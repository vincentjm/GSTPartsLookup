/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.getElementById('scan').addEventListener('click', this.scan, false);
    },

    scan: function() {
        console.log('scanning');

        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) {


           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("search-1").value = result.text;
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) {
            console.log("Scanning failed: ", error);
        } );
    }


};


function getdatabyform(){
var txt = document.getElementById("search-1").value;
var url = "https://ffmobilestage.fitsvcs.com/Lookup.svc/"+txt+"?callback=?";
$.getJSON( url, function( data ) {
	$("body").pagecontainer("change", "#detail", {});
	$("#vin").html(data.Vin);
	$("#yearmodel").html(data.ModelYear + " " + data.Model);
	var carpetlist, extlist, fleetlist, intlist, protlist, speclist, techlist, wheellist, partlist;
	carpetlist = jsontolist(data,"CARPET FLOOR MATS");
	extlist = jsontolist(data,"EXTERIOR");
	fleetlist = jsontolist(data,"FLEET");
	intlist = jsontolist(data,"INTERIOR");
	protlist = jsontolist(data,"PROTECTION");
	speclist = jsontolist(data,"SPECIAL EDITION");
	techlist = jsontolist(data,"TECHNOLOGY");
	wheellist = jsontolist(data,"WHEELS");
	partlist = carpetlist + extlist + fleetlist + intlist + protlist + speclist + techlist + wheellist;
	$("#partlist").html(partlist);
	$('#partlist').collapsibleset('refresh');
});
}

function getdata(year, model){
var url = "https://ffmobilestage.fitsvcs.com/Lookup.svc/"+year+"/"+model+"?callback=?";
$.getJSON( url, function( data ) {
	$("body").pagecontainer("change", "#detail", {});
	$("#yearmodel").html(data.ModelYear + " " + data.Model);
	var carpetlist, extlist, fleetlist, intlist, protlist, speclist, techlist, wheellist, partlist;
	carpetlist = jsontolist(data,"CARPET FLOOR MATS");
	extlist = jsontolist(data,"EXTERIOR");
	fleetlist = jsontolist(data,"FLEET");
	intlist = jsontolist(data,"INTERIOR");
	protlist = jsontolist(data,"PROTECTION");
	speclist = jsontolist(data,"SPECIAL EDITION");
	techlist = jsontolist(data,"TECHNOLOGY");
	wheellist = jsontolist(data,"WHEELS");
	partlist = carpetlist + extlist + fleetlist + intlist + protlist + speclist + techlist + wheellist;
	$("#partlist").html(partlist);
	$('#partlist').collapsibleset('refresh');
});
}

function jsontolist(data, cat){
	var gotone = false;
	var list = "<div data-role=\"collapsible\">";
	list += "<h4>"+cat+"</h4>";
	$.each( data.ParentPart, function( index, value ){
		if(value.Category == cat)
		{
			gotone = true;
			list += "<div data-role=\"collapsible\">";
			list += "<h4>" + $.trim(value.PartNumber) + " - " + $.trim(value.PartName) + "</h4>";
			//list += "<p>" + $.trim(value.PartNumber) + " - " + $.trim(value.PartName) + "</p>";
			if(value.ChildPart != null)
			{
				$.each( value.ChildPart, function( index2, value2 ){
					//list += "<div data-role=\"collapsible\">";
					//list += "<h4>" + $.trim(value2.PartNumber) + " - " + $.trim(value2.PartName) + "</h4>";
					list += "<p>" + $.trim(value2.PartNumber) + " - " + $.trim(value2.PartName) + "</p>";
				});
			}
			list += "</div>";
		}
	});
	list += "</div>";
	if(!gotone)
		list = "";
	return list;
}
