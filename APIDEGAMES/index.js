const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())
//config body-parser
app.use(bodyParser.urlencoded({extended:false}))
//converter o corpo da requisição para json
app.use(bodyParser.json())

var DB = {

    games:[

        {
            id: 23,
            title: "Ninja gaiden",
            year: 2020,
            price: 60.00
        },
        {
            id: 30,
            title: "Mario brós",
            year: 1997,
            price: 80.00
        },
        {
            id: 45,
            title: "Sonic",
            year: 2018,
            price: 20.00
        },


    ]

}

//rotas
app.get('/games', (req, res)=>{
    res.statusCode = 200
    res.json(DB.games)
})

app.get('/game/:id', (req,res)=>{
    if(isNaN(req.params.id)) {
        res.status = 400
        res.send("Isso não é um número")
    }else{
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)
        if(game !=undefined) {
            res.statusCode = 200
            res.send(game)
        }else{
            res.sendStatus(404)
        }
       // res.send("isso é um número!")
    }
    res.statusCode=200
    //res.json( req.params.id)
})

app.post('/game', (req, res)=>{
    //req.body serve para pegar o que vem no corpo da requisição
    var {title, year, price} = req.body
    //é importante fazer validações
    DB.games.push({
        id:0,
        title,
        year,
        price
    })
    res.sendStatus(200)
})

app.delete('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)) {
        res.status = 400
        res.send("Isso não é um número")
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1) {
            res.statusCode(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }

       // res.send("isso é um número!")
    }
})

app.put('/game/:id', (req,res)=>{
    if(isNaN(req.params.id)) {
        res.status = 400
        res.send("Isso não é um número")
    }else{
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)
        if(game !=undefined) {
           var {title, year, price} = req.body
           if(title != undefined){
            game.title = title

            if(year != undefined){
                game.year = year
            }
            if (price != undefined){
                game.price = price
            }
            res.sendStatus(200)
            
           }
        }else{
            res.sendStatus(404)
        }
       // res.send("isso é um número!")
    }
    res.statusCode=200
    //res.json( req.params.id)
})


app.listen(port, ()=>{
    console.log("Servidor no ar na porta", port)
})