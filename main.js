const express = require('express');
const app =  express();
const Conteiner = require('./index')
const products = new Conteiner('products.txt')

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log('server runing'))
server.on ('error', error => console.log(`Error: ${error}`))

app.get('/', (req, res) => {
    res.send(`<div><h1>Felipe Pascuali servidor express</h1></div>
    <div><h2>Estas en root rutas sugerirdas: /products, /randomProduct</h2></div>
    <div><h3> Visitas hasta ahora ${++visits}</h3></div>`
    )
})
let visits = 0

app.get('/products', async (req, res) => {
    res.send(`<div><h1>Productos:</h1></div> 
    <div><h3>${await getProducts()}</h3></div>`)
})

app.get('/randomProduct', async (req, res) => {
    
    res.send(`<div><h1>Producto Random:</h1></div> 
    <div><h3>${await getRandomProducts()}</h3></div>`)
})

const getProducts = async () => {
    let ProdList = JSON.stringify(await products.getAll());
    return ProdList
}

const getRandomProducts = async () => {
    let content = await products.getLength();
    let randomize = Math.floor(Math.random() * content)
    let randomProd = await products.getAll()
    return JSON.stringify(randomProd[randomize])
}