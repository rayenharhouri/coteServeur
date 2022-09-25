//const http =  require('http')
//import { createServer } from 'http'
import express from 'express'
import fs from 'fs'

const app = express()
const hostname = "127.0.0.1"
const port= process.env.port || 9090
/**
*@param {IncomingMessage} req
* @param {http.ServerResponse} res
*/

app.get('/',(req,res) =>  {
    res.send('Hello world')
})

app.get('/game/:name', (req,res) => {
    res.status(200).json({message : `the game name is : ${req.params.name} `})
})
app.get('/secret',(req,res) => {
    res.status(401).json({message : "unauthorized"})
})


class Game {
    constructor(name,year) {
        this.name = name
        this.year = year
    }
}
app.get('/entity', (req,res) => {
    const game = new Game("dmc5" , 2019)
    res.status(200).json(game)
})


app.get('/game2', (req, res) => {


    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        let games = JSON.parse(data);
        res.status(200).json(games);
    });

    console.log('This is after the read call');
})
app.get('/game2/:name', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            if (entry.Game === req.params.name) {
                return entry.GameLink
            }
        });
        res.status(200).json(filteredgames[0]['GameLink'])
    });
})

app.get('/game/select/:year', (req, res) => {
    fs.readFile('./SteamGames.json', (err, data) => {
        if (err) throw err;
        var games = JSON.parse(data);
        var filteredgames = JSON.parse(data).filter(function (entry) {
            return entry.Year >= req.params.year;
        });
        res.status(200).json(filteredgames)
    });
})


app.listen(port, hostname, ()=> {
    console.log(hostname + ":" + port)
})