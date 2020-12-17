
const head = document.getElementById('head')
const subHead = document.getElementById('subHead')
let i = 0;
let arr = ["verbicide","misapplying","postbellum","tenanting","noose","airings","egyptians","insoul","oscinine","tali","premises","candidatures","undershoot","genitor","virls","beefsteak","piggery","paleoecologic","versts","vervains","nonallergic","segregations","kayakers","misstep","hypopneas","variers","freehand","expresser","partings","pottering","corpsman","jacking","somedeal","chantey","stationary","neeps","reshingles","disputable","peccancies","hagbut","unbathed","depict","uttered","glees","subscripts","charabancs","snakier","monarchy","intricate","foodies"]


const start = function() {

    
}


const anime = function() {

   
    head.style.animationName = 'fadeOut';
    head.style.animationDelay = '0s';
    head.style.animationDuration = '0.5s';
    head.style.animationTimingFunction = 'ease-int-out';
    
    setTimeout(one , 300);

}
const one = function() {

    head.innerText = subHead.innerText;

    head.style.animationName = 'drag';
    head.style.animationDelay = '0s';
    head.style.animationDuration = '0.3s';
    head.style.animationTimingFunction = 'ease-int-out';

    setTimeout(two , 100);
}

const two = function() {

    console.log('yes');
    subHead.innerText = arr[i];
    i += 1;
    
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