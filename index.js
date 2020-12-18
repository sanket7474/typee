var http = require('http');
var fs = require('fs');
var path = require('path');


const replaceTemplates = function(data) {

    let css1 = fs.readFileSync(path.join(__dirname , 'public' , 'css/bootstrap.css') , 'utf-8').toString();
    let css2 = fs.readFileSync(path.join(__dirname , 'public' , 'css/bootstrap-grid.css') , 'utf-8').toString();
    let css3 = fs.readFileSync(path.join(__dirname , 'public' , 'css/style.css') , 'utf-8').toString();
    
    let script1 = fs.readFileSync(path.join(__dirname , 'public' , 'js/setup.js') , 'utf-8').toString();
    
    data = data.replace('{css1}' , css1)
    data = data.replace('{css2}' , css2)
    data = data.replace('{css3}' , css3)

    data = data.replace('{script1}' , script1)
    return data
}
http.createServer(function (request, response) {
  

    if(request.url == '/start') {
        
        console.log(path.join(__dirname , 'public' , 'index.html'))
        var data = fs.readFileSync(path.join(__dirname , 'public' , 'index.html') , 'utf-8');
        data = data.toString()

        data = replaceTemplates(data)
        console.log('any')
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
    }
    response.end()
}).listen(7474);

