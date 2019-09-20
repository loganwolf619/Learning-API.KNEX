// We Modeules I am goign to call 

const http = require('http')
const url = require ('url') //these two modules we are going to work with. We need these dependencies and the library


const data = require('./data.json')
function employeesList(req, res) {
    res.statusCode=200
    res.end(JSON.stringify(data)) //we use the stringfy to convert the data into string
}
 
function addEmployee(req, res) {
    let body = ''; //this will create its own even listener. It will create its own post. 
    
    req.on('data', chunk => body += chunk.toString())
    req.on('end', () => {
        data.push(JSON.parse(body))
        res.statusCode = 201;
        return res.end(`Added ${JSON.parse(body).name}`)
    })
    req.on('error', error => {
        res.statusCode = 404
        return res.end(error)
    })
}

function errorRequest(req, res) {
    res.statusCode = 404
    res.end(`This api call is not supported`)
}

const server = http.createServer((req, res) => {
    const urlEmployee = url.parse(req.url)
    // console.log(urlEmloyee)
    if(urlEmployee.pathname == '/api/eployeees') {
        switch(req.method) {
            case 'GET':
                employeesList(req, res)
                break;
            case 'POST':
                addEmployee(req, res)
                break;
            default:
                errorRequest(req, res)
                break;
        }
    } else {
        errorRequest(req, res)
    }
})

server.listen(8080, () => console.info('Server is up on port 8080'))