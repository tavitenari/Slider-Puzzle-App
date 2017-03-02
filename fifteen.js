/*
Tavi Tenari
CS154 AK
2/10/16

Fifteen Puzzle:

	The code creates a 4x4 clickable picture puzzle which can be shuffled.
	Moving the cursor over any of the tiles of the puzzle will change the
	border of the tile to red. Shuffling will display the tiles in random
	order.
	
	*extra feature: It features 3 different selectable background pictures.
*/

(function(){
	"use strict";
	
	var eRow = 3;
	var eCol = 0;
	var TILE_AREA = 100;
	var pic = "default";

	window.onload = function(){
		createPuzzle();
		document.getElementById("shufflebutton").onclick = shuffle;
	};
	
	/*
	This function creates the 4x4 puzzle and sets initial class and position
	of each tile. Lastly, it creates the dropdown list which can alter the
	background image of the puzzle. It is called when the window loads.
	*/
	function createPuzzle(){
		var row = 0;
		var col = 3;
		for (var i = 1; i < 16; i++){
			var square = document.createElement("div");
			square.id = i;
			square.innerHTML = "" + i;
			square.className = "colorBlack " + pic;
			
			square.style.top = (row * TILE_AREA) + "px";
			square.style.right = (col * TILE_AREA) + "px";
			square.style.backgroundPosition = ((col-3) * TILE_AREA) + "px " + 
				((-row)  * TILE_AREA) + "px";
			
			square.onmouseover = red;
			square.onmouseout = black;
			square.onclick = go;
			
			document.getElementById("puzzlearea").appendChild(square);
			if (col > 0){
				col--;
			} else{
				col = 3;
				row++;
			}
		}
		
		//extra feature: dropdown list of images.
		var picSelect = document.createElement("fieldset");
		picSelect.onchange = changeBackground;
		
		var legend = document.createElement("legend");
		legend.innerHTML = "Picture:";
		picSelect.appendChild(legend);
		
		var sel = document.createElement("select");
		picSelect.appendChild(sel);
		
		var a = document.createElement("option");
		a.id = "default";
		a.innerHTML = "My son, Niko";
		sel.appendChild(a);
		
		var b = document.createElement("option");
		b.id = "scaryface";
		b.innerHTML = "Scary Face";
		sel.appendChild(b);
		
		var c = document.createElement("option");
		c.id = "xfiles";
		c.innerHTML = "The X-Files";
		sel.appendChild(c);
		
		document.getElementById("controls").appendChild(picSelect);
	}
	
	/*
	When a tile is clicked, go() checks if the tile can be moved,
	and if it can, it slides it into the empty square.
	*/
	function go(){
		if (moveable(this)){
			slide(this);
		}
	}
	
	/*
	This function slides a moveable tile into the empty square
	and updates the position of the new empty square.
	*/
	function slide(element){
		var col = parseInt(getComputedStyle(element).getPropertyValue("right")) / TILE_AREA;
		var row = parseInt(getComputedStyle(element).getPropertyValue("top")) / TILE_AREA;
		element.style.top = eRow * TILE_AREA + "px";
		element.style.right = (eCol * TILE_AREA) + "px";
		eRow = row;
		eCol = col;
	}
	
	/*
	This function discerns whether a tile is moveable or not by
	calculating its position in relation to the empty square and returns
	true if it is adjacent to the empty square.
	*/
	function moveable(element){
		var col = parseInt(getComputedStyle(element).getPropertyValue("right")) / TILE_AREA;
		var row = parseInt(getComputedStyle(element).getPropertyValue("top")) / TILE_AREA;
		var rowDif = Math.abs(row - eRow);
		var colDif = Math.abs(col - eCol);
		if ( ((row == eRow) && (colDif == 1)) || ((col == eCol) && (rowDif == 1)) ){
			return true;
		}
	}
	
	/*
	changes tile text and border red.
	*/
	function red(){
		this.className = "colorRed " + pic;
	}
	
	/*
	changes tile text and border black.
	*/
	function black(){
		this.className = "colorBlack " + pic;
	}
	
	/*
	shuffles the tiles by randomly moving tiles 1000 times.
	*/
	function shuffle(){
		for (var i = 0; i < 1000; i++){
			var squares = document.getElementsByClassName("colorBlack");
			var movers = [];
				for (var j = 0; j < 15; j++){
					if(moveable(squares[j])){
						movers.push(squares[j]);
					}
				}
			var randomPick = Math.floor(Math.random() * movers.length-1) + 1;
			slide(movers[randomPick]);
		}
	}
	
	//extra feature: will change the background-image of the puzzle to the selected image.
	function changeBackground(){
		var options = document.querySelector("select").options;
		pic = options[document.querySelector("select").selectedIndex].id;
		var list = document.querySelectorAll("div > div");
		for (var i = 0; i < list.length; i++){
			list[i].className = "colorBlack " + pic;
		}	
	}
})();