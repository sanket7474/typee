
const head = document.getElementById('head')
const subHead = document.getElementById('subHead')
const data = document.getElementById('data')
const btn = document.getElementById('btn')
const inp = document.getElementById('inp')
// const bar1 = document.getElementById('bar1')
const bar2 = document.getElementById('bar2')
const timerElem = document.getElementById('timer')
const box = document.getElementById('box')
const bar = document.getElementById('bar')
const score = document.getElementById('score')
const resDiv = document.getElementById('resDiv')
const dispScore = document.getElementById('dispScore')
const scoreHead = document.getElementById('scoreHead')
const scoreCntxt = document.getElementById('scoreCntxt')
const userName = document.getElementById('name')

let obj = [{head:'Woah, you are good', p:"High Score so far is <span style='color:#F4B912'>{score}</span> by <span style='color:#F4B912'>{name}</span>, click on Try Again to retry beating a high score"}, {head:'BOOM!!!' , p:"<span style='color:#F4B912'>{name}</span> New High Score <span style='color:#F4B912'>{score}</span>,<p> click on Try Again to create new high score </p> "}]

let counter = 0;            // to stop starting animation
let arr = ["2","1","Go!"];  // to store words
let int = undefined         // interval
let int2 = undefined        // interval 2
let timer = 5               // timer counter
var time = new easytimer.Timer();
let b = true

let c = -3                   // index counter                   
let i = 0;                  // array index for short words
let j = 200;                // array index for medium words
let k = 400                 // array index for long words
let word = ''        

let highScore = 0
let socket = io.connect()

socket.on('getWords', function(data) {
    
    arr = arr.concat(data)

})
socket.on('getHighScore', function(hc) {

    highScore = hc.split(',')
})

const start = function() {

    userName.style.animationName = 'reset'
    
    if( userName.value != '' && isNaN(userName.value) ) {
        data.style.animationName = 'fadeOut';
        data.style.animationDuration = '0.8s';
        data.style.animationTimingFunction = 'ease-in-out';
        setTimeout(astart , 800)
    }
    else {

        userName.placeholder = 'Enter Valid Name'
        userName.style.animationName = 'wobble-hor-bottom'
        userName.style.animationDuration = '0.8s'
        userName.style.animationTimingFunction = 'ease'
        userName.style.border = '5px solid red'
    }

}

const astart = function() {

    btn.style.display = 'none';
    userName.style.display = 'none'

	data.style.animationName = 'reset';
	
    head.style.animationName = 'fadeIn';
    head.style.animationDuration = '1s';
    head.style.animationTimingFunction = 'ease-in-out';
    head.innerText = 'Get Ready!';


    subHead.style.animationName = 'fadeIn';
    subHead.style.animationDuration = '1s';
    subHead.style.animationTimingFunction = 'ease-in-out';
    subHead.innerText = '3';

    inp.style.animationName = 'fadeIn';
    inp.style.animationDuration = '1s';
    inp.style.animationTimingFunction = 'ease-in-out';
    inp.style.display = 'block';
    int  = setInterval(anime , 1000)

    }

const anime = function() {

    counter += 1;
    if(counter == 5)
        clearInterval(int)
	
	
    head.style.animationName = 'fadeOut';
    head.style.animationDelay = '0s';
	head.style.animationDuration = '0.5s';
    head.style.animationTimingFunction = 'ease-in-out';
    head.style.animationPlayState = 'running';
    
	setTimeout(one , 200, subHead.innerText);

}


const one = function(txt) {

    head.innerText = txt;
    head.style.color = 'white';
    inp.value = ""

    head.style.animationName = 'drag';
    head.style.animationDelay = '0s';
    head.style.animationDuration = '0.3s';
    head.style.animationTimingFunction = 'ease-in-out';
    

    if(!b && c % 4 == 0 || c % 7 == 0) {
    
        if(c % 4 == 0 && c % 7 != 0)
            word = arr[j++]
        else if(c % 7 == 0)
            word = arr[k++]
        
        c += 1;
    }
    else {
        
        word = arr[i++]
        c += 1
    }
    // console.log(word)
    setTimeout(two ,100, word);
}

const two = function(txt) {

    // console.log(txt);
    subHead.innerText = txt;
    
    subHead.style.animationName = 'fadeIn';
    subHead.style.animationPlayState = 'running'
    // subHead.style.animationDelay = '0s';
    subHead.style.animationDuration = '0.3s';
    subHead.style.animationTimingFunction = 'ease-in-out';
    
    setTimeout(three , 300)
}

const three = function() {
    
    subHead.style.animationName = 'reset';
    subHead.style.animationDuration = '0.3s';
    subHead.style.animationTimingFunction = 'ease-in-out';
    

    if(i > 3) {

        inp.focus()
        if(b) {
        
            bar.style.display = 'block'
        
           
            score.style.display = 'block'
            score.style.animationName = 'fadeIn'
            score.style.animationDuration = '0.8s'
            score.style.animationTimingFunction = 'ease-in-out'
        
            b = false
            c = 1
        }
        time.start({countdown: true, startValues: {seconds: 5}});

        /*    bar1.style.animationName = 'bar1'
            bar1.style.animationDuration = '6s'
            bar1.style.animationPlayState = 'linear'
        */
            bar2.style.animationName = 'bar2'
            bar2.style.animationDuration = '5s'
            bar2.style.animationTimingFunction = 'linear'
        
    }
}

time.addEventListener('secondsUpdated',function(e) {

    var str = time.getTimeValues().toString().split(':')
    timerElem.innerText  = str[2][1]
})
time.addEventListener('targetAchieved' , function(e){

    box.style.display = 'none'

    if(parseInt(score.innerText) > parseInt(highScore[1])) {

        dispScore.innerText = '🔥'+score.innerText+'🔥'
        scoreHead.innerText = obj[1].head
        obj[1].p = obj[1].p.replace('{score}', score.innerText)
        obj[1].p = obj[1].p.replace('{name}', userName.value)
        scoreCntxt.innerHTML = obj[1].p
        socket.emit('saveScore', userName.value+','+score.innerText)

    }
    else {

        dispScore.innerText = '🔥'+score.innerText+'🔥'
        scoreHead.innerText = obj[0].head
        obj[0].p = obj[0].p.replace('{name}', highScore[0])
        obj[0].p = obj[0].p.replace('{score}', highScore[1])
        scoreCntxt.innerHTML = obj[0].p
    }

    resDiv.style.display = 'flex'

    resDiv.style.animationName = 'slide-in-elliptic-top-fwd'
    resDiv.style.animationDuration = '0.8s'
    resDiv.style.animationTimingFunction = 'ease-in-out'
})
time.addEventListener('reset', function(e){

    timerElem.innerText = '5'
})
inp.addEventListener('keyup', function() {
    
    inp.value = inp.value.toLowerCase()
    head.style.color = 'white';
    head.style.animationName = 'reset'
    if(inp.value.length == head.innerText.length) {
        
        if(inp.value === head.innerText) {

            head.style.color = 'limegreen';

            head.style.animationName = 'jello-vertical'
            head.style.animationDuration = '0.9s'
            head.animationTimingFunction = 'ease'

            var newScore = parseInt(score.innerText) + (head.innerText.length * 10)
            score.style.animationName = 'reset'
            newScoreRecur(parseInt(score.innerText), newScore)
            reset()
            setTimeout(anime, 500)
        }
        else {
            head.style.color = 'red';
            
            head.style.animationName = 'wobble-hor-bottom'
            head.style.animationDuration = '0.9s'
            head.animationTimingFunction = 'ease'

        }
    }
})


const reset = function() {
    time.reset()
    bar2.style.animationName = 'reset'
}

const newScoreRecur = function(start,end) {

    if(start <= end) {

        score.innerText = start

        setTimeout(function() {

            newScoreRecur(start+1,end)
        },10)
    }
    else {

        score.style.animationName = 'pulsate-fwd'
        score.style.animationDuration = '0.5s'
        score.style.animationTimingFunction = 'ease-in-out'
    }
}