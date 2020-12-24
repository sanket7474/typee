var http = require('http');
var fs = require('fs');
var path = require('path');

let score = 0

const bSort = function(arr) {

    for(var i = 0 ; i < arr.length -1 ; i++) 
        for(var j = 0 ; j < arr.length - i - 1 ; j++) 
            
        if(arr[j].length > arr[j+1].length) {

                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
    
            return arr
}

const replaceTemplates = function(data) {

    let css1 = fs.readFileSync(path.join(__dirname , 'public' , 'css/bootstrap.css') , 'utf-8').toString();
    let css2 = fs.readFileSync(path.join(__dirname , 'public' , 'css/bootstrap-grid.css') , 'utf-8').toString();
    let css3 = fs.readFileSync(path.join(__dirname , 'public' , 'css/style.css') , 'utf-8').toString();
    
    
    let script1 = fs.readFileSync(path.join(__dirname , 'public' , 'js/setup.js') , 'utf-8').toString();
    // /
    data = data.replace('{css1}' , css1)
    data = data.replace('{css2}' , css2)
    data = data.replace('{css3}' , css3)
 
    data = data.replace('{script1}' , script1)

    return data
}

const shuffleArray = function(array) { 
    for (var i = array.length - 1; i > 0; i--) {  
     
        // Generate random number  
        var j = Math.floor(Math.random() * (i + 1)); 
                     
        var temp = array[i]; 
        array[i] = array[j]; 
        array[j] = temp; 
    } 
         
    return array; 
 }
let server = http.createServer(function (request, response) {
  
    if(request.url == '/start') {
        
        //console.log(path.join(__dirname , 'public' , 'index.html'))
        var data = fs.readFileSync(path.join(__dirname , 'public' , 'index.html') , 'utf-8');
        data = data.toString()

        data = replaceTemplates(data)
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
    }
    

    var io = require('socket.io')(server);
    
    io.on('connection', function(socket) {

        console.log('connected!')
        
        var words = fs.readFileSync(path.join(__dirname ,  'words.txt') , 'utf-8').toString();
        
        var highScore = fs.readFileSync(path.join(__dirname , 'score.txt')).toString()
            
        words = words.split(",")
        
		words = bSort(words)
        
        var shortWords = words.slice(0,100)
        var medWords = words.slice(100,200)
        var longWords = words.slice(200,600)
        
        shortWords = shuffleArray(shortWords)
        medWords = shuffleArray(medWords)
        longWords = shuffleArray(longWords)
        
        // console.log(longWords)
        words = []
        
        words = words.concat(shortWords , medWords , longWords)
        //console.log(words.length)
        // words = shuffleArray(words);
        socket.emit('getWords' , words)
        

        socket.emit('getHighScore', highScore)
        
        socket.on('saveScore', function(score){
            
            fs.writeFile(path.join(__dirname , 'score.txt'),score, (err)=> {
                if(err) throw err;
                
            })
        })
            
        })
    

    response.end()
}).listen(7474);

//process.env.PORT

