    var strValue;
    var squareValue;//squareValue1/ruutudearv
    var clickNr = 0;//clickNr1/klikknr 
    var bombCount;//bombCount/bombsearv
    var board = [];//
    var losing;//losing/kaotamine
    var openSquares;//openSquares/avatudruudud
    //squareValue1/ruutudearv
    //clickNr1/klikknr 
    //bombCount/bombsearv
    //losing/kaotamine
    //openSquares/avatudruudud
    //bombs
    //location-- askoht
    //locX -kotX
    //locY -kotY

    
    function registerServiceWorker () {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('js/offline.js').then(function (registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful: ', registration)
                }, function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err)
          })
       }
    }
    
    function Alusta() {
        var x = document.getElementById("squareValue");
        bombs = document.getElementById("bombCount").value;
        bombs = TryParseInt(bombs);
        strValue = parseInt(x.options[x.selectedIndex].value);
        var tabel = document.getElementById('tab');
        if (tabel != null){
            tabel.parentNode.removeChild(tabel);
        }
        tableCreate(); 
        clickNr = 0;
        losing = false;  
        openSquares = 0;      
        

    }
    function TryParseInt(bombs) 
    {
         if(bombs == null || bombs == "")
         {
             alert('Sisesta palun pommide arv!');
             tbl.parentNode.removeChild('tbl');
         }
         if(bombs < 0) {
            alert('bombse arv ei saa olla negatiivne!');
            tabel.parentNode.removeChild('tbl');
        }
        if(bombs == 0) {
            alert('Tehtud laud ilma pommideta, sest sisestatud väärtus oli 0!');
        }
         if(bombs !== null) {
             if(bombs.length > 0) {
                 
                     var retValue = parseInt(bombs);
                
             }
         }
         return retValue;
    }
    function cellClicked(element)
    {
        //location-- askoht
        //locX -kotX
        //locY -kotY
        if (losing == true) return;
        var location = element.target.id;
        var locX = Number(location.substring(0, location.search("-")));
        var locY = Number(location.substring(location.search("-")+1));
        cellOpen(locX, locY);
    }
    function tableCreate() {
        var body = document.getElementById('gameField');
        var tbl = document.createElement('table');
        squareValue = strValue;
        tbl.style.width = '100%';
        tbl.setAttribute("id", "tab");
        tbl.style.marginTop = "50px";
        tbl.style.visibility = 'visible';
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < squareValue; i++) 
        {
            var tr = document.createElement('tr');
            var board=[];
            for (var j = 0; j < squareValue; j++) 
            { 
                {
                    var td = document.createElement('td');
                    td.id = i+"-"+j;
                    td.setAttribute("style", "background-color: #4169E1");
                    tr.appendChild(td);
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        makeBoard(squareValue, bombs);
        tbl.addEventListener("click", function(e){cellClicked(e)})
        body.appendChild(tbl);
    } 
  function makeBoard(squareValue,bombs) 
  { 
      if (bombs>=squareValue*squareValue )  {
      alert('Pommide arv ei saa olla suurem kui väljaku ruutude arv-1! Ei ole mõtet mängida kui kõik on pommid.');
      tabel.parentNode.removeChild('tbl');
      }
      // initialize board, filling with zeros
      for (var x=0; x<squareValue; x++) 
      {
        board[x]=[]; // insert empty subarray
        for (var y=0; y<squareValue; y++) board[x][y]=0;
      }

      // now fill board with bombs in random positions
      var i=bombs;
      while (i>0) 
      {
        // generate random x and y in range 0...size-1
        x=Math.floor(Math.random() * squareValue);
        y=Math.floor(Math.random() * squareValue);
        // put bomb on x,y unless there is a bomb already
        if (board[x][y]!=1) 
        {
          board[x][y]=1;
          i--; // bomb successfully positioned, one less to go
          console.log("positioned "+x+", "+y+" yet to go "+i);
        }
      }
      return board;
      //console.log("board");
  
 }
 function cellOpen(x, y){
     
     document.getElementById(x+"-"+y).setAttribute("style", "background-color: coral");
     var xList = GetNeighbours(squareValue, x, y);
     clickNr++;
     document.getElementById(x+"-"+y).innerHTML = closerBombs(xList);
     if (closerBombs(xList) == "0")
     {
         for (var i = 0; i < xList.length; i++)
         {  
            //neighBombs
             var neighBombs = closerBombs(GetNeighbours(squareValue, xList[i][0], xList[i][1]));
             document.getElementById(xList[i][0]+"-"+xList[i][1]).innerHTML = neighBombs;
         }
     }
     console.log("Läheduses pomme: " +closerBombs(xList));
     console.log("Koordinaadid: "+x+" ja "+y);
     if (board[x][y] == 1)
     {
        alert('Kaotasid mängu '+clickNr+' käiguga');
       // document.getElementById('winwin').innerHTML = "Kaotasid "+clickNr+" käiguga";
        document.getElementById(x+"-"+y).innerHTML = "&#x2639;";
        document.getElementById(x+"-"+y).style.backgroundColor = "#f0fff0";
        document.getElementById('koguarv').innerHTML += "Kaotus: "+clickNr+" käiku <br>"; 
        losing = true;
       //setTimeout("location.href = 'minesweeper.html'",4000);
      // document.getElementById('gameField').style.display = "none";
       
      openSquares++;
      
     }
/*
      else if(openSquares == squareValue * squareValue - bombCount) {
        alert('jou');
      }*/
  
 }
  
     

function GetNeighbours(squareValue,x,y) {
  var list=[];
  for (var i=-1; i<=1; i++) {    
    for (var j=-1; j<=1; j++) {
      // square is not a neighbour of itself
      if (i==0 && j==0) continue;
      // check whether the the neighbour is inside board bounds
      if ((x+i)>=0 && (x+i)<squareValue && (y+j)>=0 && (y+j)<squareValue) {
        list.push([x+i,y+j]);
      }
    }
  }
  return list;  
}  
function closerBombs(array) {
    
    var totBombs = 0;
    for (var i = 0; i < array.length; i++){
         
        if (board[array[i][0]][array[i][1]] == 1)
        {
            totBombs++;
        }
    }
    return totBombs;
}   