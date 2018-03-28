var liststate = {};
var pattern01=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var lastClicked;
var clicked;
var currbar = 0;
var lastClicked;
var clicked;
var liststate = {};
var seqarr = [];
var height = -1;
var width = -1;
var synth = '';
var tempo = 120;
var globalTick = 0;
var thisNote = 1;
var userNo = 0;
var id = 0;
var checkId = false;
var arrayrecieved = false;
var clientCounter = 0;
var thisnotation0 = false;
var thisnotation2 = false;
var thisnotation4 = false;
var thisnotation8 = false;
var thisnotation10 = false;
var thisnotation12 = false;
var thisnotation16 = false;
var thisnotation20 = false;
var thisnotation24 = false;
var thisnotation28 = false;
var thisnotation32 = false;
var thisnotation36 = false;
var thisnotation40 = false;
var thisnotation44 = false;
var thisnotation48 = false;
var LydianScalesA = [1,3,5,7,8,10,12,13,15,17,19,20,22];
var feedBackComment = ['Sounds Nice!', 'Thats My Shit!', 'Amazing Groove!', 'Music To My Ears!', 'Awesome Tune!', 'In The Pocket!'];

var currfeedback = 0;

var currsec = 0;
var currmin = 0;


var thisnotationArr = []

var soundsToPlay = 0;

var addRemove = '';


var audio = new AudioContext();

for (var i = 0; i < width*height; i++){
  //seqarraystate[i] = [];
  liststate[i] = {instrument: '',
  color: 'white',
  activated: 0,
  serverUID: 0};
}

console.log("liststate initialized")



//////


function buildArrayForGridState(liststate, synth, i){
  if ((liststate[i-1].activated!==1)){
    liststate[i-1].activated = 1;
    if (synth == 'red'){
      liststate[i-1].instrument = 'synth01';
    }
    if (synth == 'yellow'){
      liststate[i-1].instrument = 'synth02';
    }
    if (synth == 'purple'){
      liststate[i-1].instrument = 'synth03';
    }
    if (synth == 'gold'){
      liststate[i-1].instrument = 'synth04';
    }
    if (synth == 'green'){
      liststate[i-1].instrument = 'synth05';
    }
    if (synth == 'salmon'){
      liststate[i-1].instrument = 'synth06';
    }
    if (synth == 'blue'){
      liststate[i-1].instrument = 'synth07';
    }
    if (synth == 'aqua'){
      liststate[i-1].instrument = 'synth08';
    }
    if (synth == 'darkgreen'){
      liststate[i-1].instrument = 'synth09';
    }
    if (synth == 'lightpink'){
      liststate[i-1].instrument = 'synth10';
    }
    if (synth == 'darkblue'){
      liststate[i-1].instrument = 'synth11';
    }
    liststate[i-1].color = synth;
    // console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    // console.log('Liststate on Click',liststate[i-1]);
  }else {
    liststate[i-1].activated = 0;
    //console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    //console.log(liststate[i-1]);
    //element.className='';
  }
  return liststate;
}



$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  width = data.width;
  height = data.height;
  seqarr = data.array;
  userNo = data.userNumber;

  var grid = clickableGrid(height,width, function(element,row,col,i){
    //console.log(element);
    //console.log(row);
    //console.log(col);
    //console.log(i);
  });

  function assignColor(){


    if (userNo == 0){
      synth = 'white';
      //console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #ff0000">▣</span>';
    }

    if (userNo == 1){
      synth = 'red';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: red">▣</span>';
    }

    if (userNo == 2){
      synth = 'yellow';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #F7F748">▣</span>';

    }

    if (userNo == 3){
      synth = 'purple';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #9D48F7">▣</span>';
    }

    if (userNo == 4){
      synth = 'gold';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #E59D55">▣</span>';
    }

    if (userNo == 5){
      synth = 'green';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #5ABA5E">▣</span>';
    }

    if (userNo == 6){
      synth = 'salmon';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #FFA07A">▣</span>';
    }

    if (userNo == 7){
      synth = 'blue';
      // console.log('syou are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #3A4DF5">▣</span>';
    }

    if (userNo == 8){
      synth = 'aqua';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #00FFFF">▣</span>';
    }

    if (userNo == 9){
      synth = 'darkgreen';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #4F7754">▣</span>';
    }

    if (userNo == 10){
      synth = 'lightpink';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #FF99FA">▣</span>';
    }

    if (userNo == 11){
      synth = 'darkblue';
      // console.log('you are ', synth);
      document.getElementById("p0").innerHTML = '<span style="color: #1515B5">▣</span>';
    }


    document.getElementById("p1").innerHTML = 'You are the ' +synth+' synth';

  }

  assignColor();
  document.body.appendChild(grid);
});



for (i = 0 ; i < 300 ; i++){
  thisnotationArr[i] = false;
}



//state array
function clickableGrid( rows, cols, callback ){
  var i=0; // first number
  var grid = document.createElement('table');
  grid.className = 'grid';
  for (var r=0;r<rows;++r){
    //nested for loop
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = 1+i++ ;      //add content to html cells
      cell.id = "cell_"+(i);    // assign an id based on i
      cell.addEventListener('click',
      (function(element,r,c,i){ //click listener function
        return function(){
          //Clicks on and off for Red

          soundsToPlay = soundsToPlay - 1;
          currfeedback ++;
          if (currfeedback >= 6){
            currfeedback = 0;
          }
          //console.log(soundsToPlay);
          if (soundsToPlay <= 0){
            soundsToPlay = 0;
          }

          newGridState = buildArrayForGridState(liststate, synth, i);
          socket.emit('sendStep', {'theData': newGridState});
          callback(element,r,c,i);
        }



      })(cell,r,c,i),false);
    }
  }
  return grid;
}

////////////////////
///socket handlers//
////////////////////
socket.on('sendSteps', function(steps){
  seqarr = steps;
  arrayrecieved = true;
  // console.log('got_newArr', arrayrecieved, seqarr[1])
});


socket.on('resetAll', function(stepsreset){
  seqarr = stepsreset;
  for (i = 0 ; i < 300 ; i++){
    thisnotationArr[i] = false;
  }

  arrayrecieved = true;

});




if (checkId != true){
  checkId = true;
  socket.on('usercount', function(myId){

    id = myId;
    document.getElementById("p2").innerHTML =  +myId +' players are in this session';

  });
}
///////


socket.on('currplayer', function(incomingTick){
  globalTick = incomingTick;

  for(var i = 0; i < (width*height) ;i++){
    if (arrayrecieved == true){
      //  console.log(liststate[i].instrument);

      if(liststate[i].instrument == 'synth01'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_1();
        }
      }

      if(liststate[i].instrument == 'synth02'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note13_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note12_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note11_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note10_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note9_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note8_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note6_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note5_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note4_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note3_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note2_2();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note1_2();
        }
      }


      if(liststate[i].instrument == 'synth03'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_3();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_3();
        }
      }




      if(liststate[i].instrument == 'synth04'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note13_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note12_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note11_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note10_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note9_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note8_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note6_4();
        }
        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note5_4();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note4_4();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note3_4();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note2_4();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note1_4();
        }
      }


      if(liststate[i].instrument == 'synth05'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note13_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note12_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note11_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note10_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note9_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note8_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note6_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note5_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note4_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note3_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note2_5();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note1_5();
        }
      }


      if(liststate[i].instrument == 'synth06'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_6();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_6();
        }
      }



      if(liststate[i].instrument == 'synth07'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note13_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note12_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note11_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note10_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note9_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note8_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note6_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note5_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note4_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note3_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note2_7();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note1_7();
        }
      }



      if(liststate[i].instrument == 'synth08'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_8();
          console.log('hit');
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_8();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_8();
        }
      }




      if(liststate[i].instrument == 'synth09'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_9();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_9();
        }
      }

      if(liststate[i].instrument == 'synth10'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_10();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_10();
        }
      }

      if(liststate[i].instrument == 'synth11'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_1();
        }
      }

      if(liststate[i].instrument == 'synth12'){

        if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
          note1_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
          note2_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
          note3_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
          note4_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
          note5_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
          note6_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
          note7_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
          note8_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
          note9_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
          note10_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
          note11_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
          note12_1();
        }

        if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
          note13_1();
        }
      }
    }
  }

  /////////////////////////////
  /////draw the cursor/////////
  /////////////////////////////

//console.log(currbar);

  for(var i=0; i < width;i++){
    pattern01[i] = 0;
    document.getElementById("cell_"+(i+1)).classList.remove('player');
    document.getElementById("cell_"+(i+17)).classList.remove('player');
    document.getElementById("cell_"+(i+33)).classList.remove('player');
    document.getElementById("cell_"+(i+49)).classList.remove('player');
    document.getElementById("cell_"+(i+65)).classList.remove('player');
    document.getElementById("cell_"+(i+81)).classList.remove('player');
    document.getElementById("cell_"+(i+97)).classList.remove('player');
    document.getElementById("cell_"+(i+113)).classList.remove('player');
    document.getElementById("cell_"+(i+129)).classList.remove('player');
    document.getElementById("cell_"+(i+145)).classList.remove('player');
    document.getElementById("cell_"+(i+161)).classList.remove('player');
    document.getElementById("cell_"+(i+177)).classList.remove('player');
    document.getElementById("cell_"+(i+193)).classList.remove('player');
  }

  pattern01[currbar] = 1;
  document.getElementById("cell_"+(currbar+1)).classList.add('player');
  document.getElementById("cell_"+(currbar+17)).classList.add('player');
  document.getElementById("cell_"+(currbar+33)).classList.add('player');
  document.getElementById("cell_"+(currbar+49)).classList.add('player');
  document.getElementById("cell_"+(currbar+65)).classList.add('player');
  document.getElementById("cell_"+(currbar+81)).classList.add('player');
  document.getElementById("cell_"+(currbar+97)).classList.add('player');
  document.getElementById("cell_"+(currbar+113)).classList.add('player');
  document.getElementById("cell_"+(currbar+129)).classList.add('player');
  document.getElementById("cell_"+(currbar+145)).classList.add('player');
  document.getElementById("cell_"+(currbar+161)).classList.add('player');
  document.getElementById("cell_"+(currbar+177)).classList.add('player');
  document.getElementById("cell_"+(currbar+193)).classList.add('player');
});

socket.on('currTime', function(clientCurrTimeSec, clientCurrTimeMin){
  currsec = clientCurrTimeSec;
  currmin = clientCurrTimeMin;

  //console.log('somesec',somsec, 'somemin', somemin);
});


////recieve Current Bar From Server//


socket.on('globalTimetype', function(incomingBar){
  clientCounter = incomingBar;
  // console.log('clientCounter', clientCounter)
});




//draw function//
///drawin the cells and ID's


(function draw(){
  currbar = globalTick;
  liststate = seqarr;


  for(var i=0; i < width*height;i++){
    if (liststate[i] != null){
      //console.log(liststate[1].color);
      if (liststate[i].activated != null){
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'red') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedRed');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'red') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedRed');
        }

        if ( (liststate[i].activated == 1) && (liststate[i].color == 'yellow') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedYellow');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'yellow') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedYellow');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'purple') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedPurpule');
        }
        if ( (liststate[i].activated == 0) && (liststate[i].color == 'purple') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedPurpule');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'gold') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedGold');
        }
        if ( (liststate[i].activated == 0) && (liststate[i].color == 'gold') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedGold');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'green') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedGreen');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'green') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedGreen');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'salmon') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedSalmon');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'salmon') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedSalmon');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'blue') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedBlue');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'blue') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedBlue');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'aqua') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedAqua');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'aqua') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedAqua');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'darkgreen') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedDarkGreen');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'darkgreen') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedDarkGreen');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'lightpink') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedLightPink');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'lightpink') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedLightPink');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'darkblue') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedDarkBlue');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'darkblue') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedDarkBlue');
        }
      }
    }


  }



  /////////////
  ///notation//
  /////////////



  if (thisnotationArr[0] == false){
    if (clientCounter >= 0){
      soundsToPlay = 1;
      addRemove = 'Start with adding ';
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[0] = true;
    }
  }


  if (  thisnotationArr[4] == false){
    if (clientCounter == 4){
      soundsToPlay = 2;
      addRemove = 'Add another ' ;
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[4] = true;
    }
  }


  if (  thisnotationArr[8] == false){
    if (clientCounter == 8){
      soundsToPlay = 3;
      addRemove = 'Add ' ;
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[8] = true;
    }
  }

  if (  thisnotationArr[12] == false){
    if (clientCounter == 12){
      soundsToPlay = 4;
      addRemove = 'Add ' ;
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[12] = true;
    }
  }

  if (  thisnotationArr[16] == false){
    if (clientCounter == 16){
      soundsToPlay = getRandomInt(8,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
      }else{
        addRemove = 'Remove ';
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[16] = true;
    }
  }

  if (  thisnotationArr[20] == false){
    if (clientCounter == 20){
      soundsToPlay = getRandomInt(5,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[20] = true;
    }
  }

  if (  thisnotationArr[24] == false){
    if (clientCounter == 24){
      soundsToPlay = getRandomInt(9,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[24] = true;
    }
  }

  if (  thisnotationArr[30] == false){
    if (clientCounter == 30){
      soundsToPlay = getRandomInt(5,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[30] = true;
    }
  }


  if (  thisnotationArr[34] == false){
    if (clientCounter == 34){
      soundsToPlay = getRandomInt(4,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[34] = true;
    }
  }


  if (  thisnotationArr[38] == false){
    if (clientCounter == 38){
      soundsToPlay = getRandomInt(4,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[38] = true;
    }
  }



  if (  thisnotationArr[42] == false){
    if (clientCounter == 42){
      soundsToPlay = getRandomInt(7,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[42] = true;
    }
  }


  if (  thisnotationArr[46] == false){
    if (clientCounter == 46){
      soundsToPlay = getRandomInt(7,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[46] = true;
    }
  }

  if (  thisnotationArr[48] == false){
    if (clientCounter == 48){
      soundsToPlay = getRandomInt(7,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[48] = true;
    }
  }

  if (  thisnotationArr[52] == false){
    if (clientCounter == 52){
      soundsToPlay = getRandomInt(7,1);
      if ((soundsToPlay%2) == 0){
        addRemove = 'Add ';
        // console.log('add');
      }else{
        addRemove = 'Remove ';
        // console.log('remove');
      }
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[52] = true;
    }
  }



  if (  thisnotationArr[55] == false){
    if (clientCounter == 55){
      soundsToPlay = getRandomInt(7,1);
      addRemove = 'remove all ';
      // console.log("random number for bar", clientCounter, 'is' ,soundsToPlay);
      thisnotationArr[55] = true;
    }
  }


  if (clientCounter <= 54){
    if (soundsToPlay > 0){
      document.getElementById("p3").innerHTML =  addRemove + soundsToPlay + '  sounds';
    } else {
      document.getElementById("p3").innerHTML =  feedBackComment[currfeedback];
    }
  }
  else{
    document.getElementById("p3").innerHTML =  addRemove + ' sounds';
  }




  document.getElementById("p4").innerHTML = currmin +':'+ currsec +  ' seconds until song resets';


  function getRandomInt(max, min) {
    return (Math.floor(Math.random() * max) + min)
  }





  requestAnimationFrame(draw);
})();







/////////////////////////
////////////reset////////
////////////////////////

var body = document.querySelector('body');
body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  if (event.keyCode == 48){
    socket.emit('ClientReset', {'resetfromclient': 1});

  }
};





///////////////////////////////
//*********RED SYNTH*********//
///////////////////////////////



function note1_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[12]), '9n');
};

function note2_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[11]), '9n');
};
function note3_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[10]), '9n');
};
function note4_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[9]), '9n');
};
function note5_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[8]), '9n');
};
function note6_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[7]), '9n');
};
function note7_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[6]), '9n');
};
function note8_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[5]), '9n');
};
function note9_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[4]), '9n');
};
function note10_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[3]), '9n');
};
function note11_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[2]), '9n');

};
function note12_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[1]), '9n');

};
function note13_1() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(LydianScalesA[0]), '9n');
};



//////////////////////////////////
//*********YELLOW SYNTH*********//
//////////////////////////////////




function note1_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/3), '9n');
};

function note2_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/3), '9n');
};
function note3_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/3), '9n');
};


function note4_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/3), '9n');
};


function note5_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/3), '9n');
};


function note6_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/3), '9n');
};


function note7_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/3), '9n');
};


function note8_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/3), '9n');
};


function note9_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/3), '9n');
};


function note10_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/3), '9n');
};


function note11_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/3), '9n');
};

function note12_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/3), '9n');
};


function note13_2() {
  var synthYellow = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.09,
      decay : 0.9,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  synthYellow.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/3), '9n');
};




///////////////////////////////
//*********PURPLE SYNTH*********//
///////////////////////////////



function note1_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])*2), '9n');
};


function note2_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])*2), '9n');
};

function note3_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])*2), '9n');
};

function note4_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])*2), '9n');
};

function note5_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])*2), '9n');
};

function note6_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])*2), '9n');
};

function note7_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])*2), '9n');
};

function note8_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])*2), '9n');
};

function note9_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])*2), '9n');
};

function note10_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])*2), '9n');
};

function note11_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])*2), '9n');
};

function note12_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])*2), '9n');
};

function note13_3() {
  var msynth =  new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.9,
      decay : 0.7,
      sustain : 0.2,
      release : 0.2
    }
  }).toMaster()

  msynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])*2), '9n');
};





//////////////////////////////////
//*********GOLD SYNTH*********//
//////////////////////////////////




function note1_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/4), '7n');
};
function note2_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/4), '7n');
};
function note3_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/4), '7n');
};
function note4_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/4), '7n');
};
function note5_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/4), '7n');
};
function note6_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/4), '7n');
};
function note7_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/4), '7n');
};
function note8_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/4), '7n');
};
function note9_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/4), '7n');
};

function note10_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/4), '7n');
};

function note11_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/4), '7n');
};
function note12_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/4), '7n');
};
function note13_4() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/4), '7n');
};

//////////////////////////////////
//*********GREEN SYNTH*********//
//////////////////////////////////




// function note1_5() {
//   var phaser = new Tone.Phaser({
//     "frequency" : 15,
//     "octaves" : 2,
//     "baseFrequency" : 200
//   }).toMaster();
//   var roundsynth = new Tone.Synth({
//     oscillator : {
//       type : "fatsquare1"
//     },
//     envelope : {
//       attack : .09,
//       decay : .4,
//       sustain : 0.001,
//       release : .2
//     }
//   })connect(phaser).toMaster()
//   roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0]*2), '3n');
// };




function note1_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])), '3n');
  };


function note2_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])), '3n');
  };
function note3_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])), '3n');
  };

function note4_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])), '3n');
  };

function note5_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])), '3n');
  };
function note6_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])), '3n');
  };
function note7_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])), '3n');
  };
function note8_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])), '3n');
  };
function note9_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])), '3n');
  };
function note10_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])), '3n');
  };
function note11_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])), '3n');
  };
function note12_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])), '3n');
  };
function note13_5() {
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 2,
    "baseFrequency" : 200
  }).toMaster();
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).connect(phaser).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])), '3n');
  };



//////////////////////////////////
//*********SALMON SYNTH*********//
//////////////////////////////////




function note1_6() {

  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/4), '3n');
};

function note2_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/4), '3n');
};
function note3_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/4), '3n');
};


function note4_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/4), '3n');
};


function note5_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/4), '3n');
};


function note6_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/4), '3n');
};


function note7_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/4), '3n');
};


function note8_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/4), '3n');
};


function note9_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/4), '3n');
};


function note10_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/4), '3n');
};


function note11_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/4), '3n');
};

function note12_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/4), '3n');
};


function note13_6() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/4), '3n');
};





//////////////////////////////////
//*********BLUE SYNTH*********//
//////////////////////////////////




function note1_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])), '12n');
};

function note2_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])), '12n');
};
function note3_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])), '12n');
};
function note4_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])), '12n');
};
function note5_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])), '12n');
};

function note6_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])), '12n');
};

function note7_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])), '12n');
};

function note8_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])), '12n');
};


function note9_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])), '12n');
};


function note10_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])), '12n');
};


function note11_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])), '12n');
};

function note12_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])), '12n');
};


function note13_7() {
  var pingPong = new Tone.PingPongDelay("12n", 0.2).toMaster();
  var phaser = new Tone.Phaser({
    "frequency" : 2,
    "octaves" : 1,
    "baseFrequency" : 300
  }).toMaster();
  var fmSynth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : 0.1,
      decay : .01,
      sustain : 1.1,
      release : 0.5
    }
  }).connect(phaser).connect(pingPong).toMaster()
  fmSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])), '12n');
};




/////////////aqua synth////




function note1_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/2), '3n');
  console.log('hit');
};

function note2_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/2), '3n');
};
function note3_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/2), '3n');
};
function note4_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/2), '3n');
};
function note5_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/2), '3n');
};
function note6_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/2), '3n');
};
function note7_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/2), '3n');
};
function note8_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/2), '3n');
};
function note9_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/2), '3n');
};
function note10_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/2), '3n');
};
function note11_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/2), '3n');
};
function note12_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/2), '3n');
};

function note13_8() {
  var roundsynth = new Tone.Synth({
    oscillator : {
      type : "fatsquare1"
    },
    envelope : {
      attack : .09,
      decay : .4,
      sustain : 0.001,
      release : .2
    }
  }).toMaster()

  roundsynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/2), '3n');
};





//////////////////////////////////
//*********Dark Green SYNTH*********//
//////////////////////////////////




function note1_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.3,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/5), '7n');
};
function note2_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/5), '7n');
};
function note3_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/5), '7n');
};
function note4_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/5), '7n');
};
function note5_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/5), '7n');
};
function note6_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/5), '7n');
};
function note7_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/5), '7n');
};
function note8_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/5), '7n');
};
function note9_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/5), '7n');
};

function note10_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/5), '7n');
};

function note11_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/5), '7n');
};
function note12_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/5), '7n');
};
function note13_9() {
  var duoSynth = new Tone.DuoSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : 0.03,
      decay : .1,
      sustain : 0.3,
      release : 0.4
    }
  }).toMaster()

  duoSynth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/5), '7n');
};






///////////////////////////////
//*********Pink SYNTH*********//
///////////////////////////////



function note1_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[12])/4), '9n');
};

function note2_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[11])/4), '9n');
};
function note3_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[10])/4), '9n');
};
function note4_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[9])/4), '9n');
};
function note5_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[8])/4), '9n');
};
function note6_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[7])/4), '9n');
};
function note7_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[6])/4), '9n');
};
function note8_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[5])/4), '9n');
};
function note9_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[4])/4), '9n');
};
function note10_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[3])/4), '9n');
};
function note11_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[2])/4), '9n');

};
function note12_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[1])/4), '9n');

};
function note13_10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare100"
    },
    envelope : {
      attack : 0.01,
      decay : 0.5,
      sustain : 0.1,
      release : 0.8
    }
  }).toMaster()

  synth.triggerAttackRelease((440 * Tone.intervalToFrequencyRatio(LydianScalesA[0])/3), '9n');
};
