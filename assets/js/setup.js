
const head = document.getElementById('head')
const subHead = document.getElementById('subHead')
const data = document.getElementById('data')
const btn = document.getElementById('btn')

let i = 0;
let counter = 0;
let arr = ["2","1","Go!","noose","airings","egyptians","insoul","oscinine","tali","premises","candidatures","undershoot","genitor","virls","beefsteak","piggery","paleoecologic","versts","vervains","nonallergic","segregations","kayakers","misstep","hypopneas","variers","freehand","expresser","partings","pottering","corpsman","jacking","somedeal","chantey","stationary","neeps","reshingles","disputable","peccancies","hagbut","unbathed","depict","uttered","glees","subscripts","charabancs","snakier","monarchy","intricate","foodies"]
let int = undefined 

const start = function() {

    data.style.animationName = 'fadeOut';
    data.style.animationDuration = '0.8s';
    data.style.animationTimingFunction = 'ease-int-out';
    
    setTimeout(astart , 800)

    
}

const astart = function() {

    btn.style.display = 'none';

    head.style.animationName = 'fadeIn';
    head.style.animationDuration = '1s';
    head.style.animationTimingFunction = 'ease-int-out';
    head.innerText = 'Get Ready!';


    subHead.style.animationName = 'fadeIn';
    subHead.style.animationDuration = '1s';
    subHead.style.animationTimingFunction = 'ease-int-out';
    subHead.innerText = '3';
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
    
    setTimeout(one(subHead.innerText) , 300);

}


const one = function(txt) {

    head.innerText = txt;

    head.style.animationName = 'drag';
    head.style.animationDelay = '0s';
    head.style.animationDuration = '0.3s';
    head.style.animationTimingFunction = 'ease-int-out';

    setTimeout(two(arr[i++]) , 100);
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
    
}