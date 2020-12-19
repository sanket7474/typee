
const head = document.getElementById('head')
const subHead = document.getElementById('subHead')
const data = document.getElementById('data')
const btn = document.getElementById('btn')
const inp = document.getElementById('inp')
      
let counter = 0;            // to stop starting animation
let arr = ["2","1","Go!"];  // to store words
let i = 0;                  // array index
let int = undefined         // interval



let socket = io.connect()

socket.on('getWords', function(data) {

    console.log(data)
    arr = arr.concat(data)

})



const start = function() {

    data.style.animationName = 'fadeOut';
    data.style.animationDuration = '0.8s';
    data.style.animationTimingFunction = 'ease-int-out';
    
    setTimeout(astart , 800)

    
}

const astart = function() {

    btn.style.display = 'none';
	data.style.animationName = 'reset';
	
    head.style.animationName = 'fadeIn';
    head.style.animationDuration = '1s';
    head.style.animationTimingFunction = 'ease-int-out';
    head.innerText = 'Get Ready!';


    subHead.style.animationName = 'fadeIn';
    subHead.style.animationDuration = '1s';
    subHead.style.animationTimingFunction = 'ease-int-out';
    subHead.innerText = '3';

    inp.style.animationName = 'fadeIn';
    inp.style.animationDuration = '1s';
    inp.style.animationTimingFunction = 'ease-int-out';
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
    head.style.animationTimingFunction = 'ease-int-out';
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
    head.style.animationTimingFunction = 'ease-int-out';

    setTimeout(two , 100, arr[i++]);
}

const two = function(txt) {

    console.log('yes');
    subHead.innerText = txt;
    
    
    subHead.style.animationName = 'fadeIn';
    subHead.style.animationPlayState = 'running'
    // subHead.style.animationDelay = '0s';
    subHead.style.animationDuration = '0.3s';
    subHead.style.animationTimingFunction = 'ease-int-out';
    
    setTimeout(three , 300)
}

const three = function() {

    subHead.style.animationName = 'reset';
    subHead.style.animationDuration = '0.3s';
    subHead.style.animationTimingFunction = 'ease-int-out';
    inp.focus()
}


inp.addEventListener('keyup', function() {
    
    head.style.color = 'white';
    head.style.animationName = 'reset'
    if(inp.value.length == head.innerText.length) {
        
        if(inp.value === head.innerText) {

            head.style.color = 'limegreen';

            head.style.animationName = 'jello-vertical'
            head.style.animationDuration = '0.9s'
            head.animationTimingFunction = 'ease'

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
