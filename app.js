let buildingArray;// global variable for storing building height, get data first

window.addEventListener('load', function () { //add listener to fetch the data when page is loaded
    console.log("page is loaded"); 

    // fetch the data
    fetch("https://data.cityofnewyork.us/resource/hu6m-9cfi.json")
        .then(response=>response.json())
        .then(data => {
            console.log('savingJson');
             buildingArray = data; //store the data into buildingArray
            }); 

    // store the button in the variable, creating a click funtion        
    let button = document.getElementById('play-button');
    button.addEventListener('click', function(){
        console.log("button was clicked");
         
            var audioContext = new AudioContext(); //object allows me to create and manipulate sounds
            let noteAdjustment = 100; // some of the building heights are too low for later to  *

            let startDelay = .27; // the amount to delay each note by
            let duration = .25; //length of each note 

            for(let i = 0; i < buildingArray.length/10; i++){ // make it play the first ~200 buildings, we can manipulate with user input later
                if(buildingArray[i].stories != null){  // only play the buildings with a height value
                    console.log(buildingArray[i].stories); // checking
                    let buildingHeight = buildingArray[i].stories; //get the height value
                    let buildingNote = buildingHeight * noteAdjustment;  //in line 20, make sure we able to hear note by ear
                    const oscillator = audioContext.createOscillator(); // boom, oscillator is here. ps: oscillator can't exist outside of an audiocontext
                    var gainNode = audioContext.createGain(); // add gain node to control volume and adjust wave
                    oscillator.connect(gainNode); // connecting gain node and oscillator
                    gainNode.connect(audioContext.destination); // connecting gain node to destination (speaker)
                    gainNode.gain.value = 0.01; // lower the volume, the original version was too high
                    oscillator.type = "square"; // 4 types, suqare is usually for old video games
                    oscillator.start(audioContext.currentTime+(startDelay*i));
                    oscillator.frequency.value = buildingNote; // DRIVING ME CRAZY, beacuse can't set frequency directly
                    oscillator.stop(audioContext.currentTime+duration+(startDelay*i)); // each note will stop
                }
            }  
    })
})

