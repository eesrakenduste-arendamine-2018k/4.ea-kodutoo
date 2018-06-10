    var strValue;
    var ruutudearv;
    var klikknr = 0;
    var pommidearv;
    var board = [];
    var kaotamine;
    var avatudruudud;
    

    
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
        var x = document.getElementById("ruutudearv");
        pommid = document.getElementById("pommidearv").value;
        pommid = TryParseInt(pommid);
        strValue = parseInt(x.options[x.selectedIndex].value);
        var tabel = document.getElementById('tab');
        if (tabel != null){
            tabel.parentNode.removeChild(tabel);
        }
        tableCreate(); 
        klikknr = 0;
        kaotamine = false;  
        avatudruudud = 0;      
        

    }
    function TryParseInt(pommid) 
    {
         if(pommid == null || pommid == "")
         {
             alert('Sisesta palun pommide arv!');
             tbl.parentNode.removeChild('tbl');
         }
         if(pommid < 0) {
            alert('Pommide arv ei saa olla negatiivne!');
            tabel.parentNode.removeChild('tbl');
        }
        if(pommid == 0) {
            alert('Tehtud laud ilma pommideta, sest sisestatud vأ¤أ¤rtus oli 0!');
        }
         if(pommid !== null) {
             if(pommid.length > 0) {
                 
                     var retValue = parseInt(pommid);
                
             }
         }
         return retValue;
    }
    function cellClicked(element)
    {
        if (kaotamine == true) return;
        var asukoht = element.target.id;
        var kohtX = Number(asukoht.substring(0, asukoht.search("-")));
        var kohtY = Number(asukoht.substring(asukoht.search("-")+1));
        cellOpen(kohtX, kohtY);
    }
    function tableCreate() {
        var body = document.getElementById('gameField');
        var tbl = document.createElement('table');
        ruutudearv = strValue;
        tbl.style.width = '100%';
        tbl.setAttribute("id", "tab");
        tbl.style.marginTop = "50px";
        tbl.style.visibility = 'visible';
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < ruutudearv; i++) 
        {
            var tr = document.createElement('tr');
            var board=[];
            for (var j = 0; j < ruutudearv; j++) 
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
        makeBoard(ruutudearv, pommid);
        tbl.addEventListener("click", function(e){cellClicked(e)})
        body.appendChild(tbl);
    } 
  function makeBoard(ruutudearv,pommid) 
  { 
      if (pommid>=ruutudearv*ruutudearv )  {
      alert('Pommide arv ei saa olla suurem kui vأ¤ljaku ruutude arv-1! Ei ole mأµtet mأ¤ngida kui kأµik on pommid.');
      tabel.parentNode.removeChild('tbl');
      }
      // initialize board, filling with zeros
      for (var x=0; x<ruutudearv; x++) 
      {
        board[x]=[]; // insert empty subarray
        for (var y=0; y<ruutudearv; y++) board[x][y]=0;
      }

      // now fill board with bombs in random positions
      var i=pommid;
      while (i>0) 
      {
        // generate random x and y in range 0...size-1
        x=Math.floor(Math.random() * ruutudearv);
        y=Math.floor(Math.random() * ruutudearv);
        // put bomb on x,y unless there is a bomb already
        if (board[x][y]!=1) 
        {
          board[x][y]=1;
          i--; // bomb successfully positioned, one less to go
          console.log("positioned "+x+", "+y+" yet to go "+i);
        }
      }
      return board;
      console.log(board);
  
 }
 function cellOpen(x, y){
     
     document.getElementById(x+"-"+y).setAttribute("style", "background-color: coral");
     var xList = GetNeighbours(ruutudearv, x, y);
     klikknr++;
     document.getElementById(x+"-"+y).innerHTML = closerBombs(xList);
     if (closerBombs(xList) == "0")
     {
         for (var i = 0; i < xList.length; i++)
         {
             var naabripommid = closerBombs(GetNeighbours(ruutudearv, xList[i][0], xList[i][1]));
             document.getElementById(xList[i][0]+"-"+xList[i][1]).innerHTML = naabripommid;
         }
     }
     console.log("Lأ¤heduses pomme: " +closerBombs(xList));
     console.log("Koordinaadid: "+x+" ja "+y);
     if (board[x][y] == 1)
     {
        alert('Kaotasid mأ¤ngu '+klikknr+' kأ¤iguga');
       // document.getElementById('winwin').innerHTML = "Kaotasid "+klikknr+" kأ¤iguga";
        document.getElementById(x+"-"+y).innerHTML = "&#x2639;";
        document.getElementById(x+"-"+y).style.backgroundColor = "#f0fff0";
        document.getElementById('koguarv').innerHTML += "Kaotus: "+klikknr+" kأ¤iku <br>"; 
        kaotamine = true;
       //setTimeout("location.href = 'minesweeper.html'",4000);
      // document.getElementById('gameField').style.display = "none";
       
      avatudruudud++;
      
     }
/*
      else if(avatudruudud == ruutudearv * ruutudearv - pommidearv) {
        alert('jou');
      }*/
  
 }
  
     

function GetNeighbours(ruutudearv,x,y) {
  var list=[];
  for (var i=-1; i<=1; i++) {    
    for (var j=-1; j<=1; j++) {
      // square is not a neighbour of itself
      if (i==0 && j==0) continue;
      // check whether the the neighbour is inside board bounds
      if ((x+i)>=0 && (x+i)<ruutudearv && (y+j)>=0 && (y+j)<ruutudearv) {
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