const fs = require('fs');

class Conteiner{
    constructor(file){
        this.file = file
    };
    async save(product){

        let content = await fs.promises.readFile(this.file); 
        let contObj = JSON.parse(content);
        let asignId;
        asignId = contObj.length > 0 ? contObj.length + 1 : 1;
        product.id = asignId;
        contObj.push(product);
        await fs.promises.writeFile(this.file, JSON.stringify(contObj))
    };

    async getAll(){
        let content = await fs.promises.readFile(this.file); 
        let contObj = JSON.parse(content);
        return contObj
    };

    async getLength(){
        let content = await this.getAll();
        return await content.length;
    }

    async getById(id){
        let contObj = await this.getAll();
        let requestedIdObj = contObj.find(prod => prod.id == id)
        console.log(requestedIdObj)
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]") 
};

    async deleteById(id){
        let contObj = await this.getAll();
        let minusDeleteId = contObj.filter(prod => prod.id !== id)
        console.log(minusDeleteId)
        await fs.promises.writeFile(this.file, JSON.stringify(minusDeleteId))
    }; 

};

let conteiner = new Conteiner('products.txt');

//conteiner.save({"name": "Factor 02 VAM", "price": 3500});
//conteiner.save({"name": "Factor 02", "price": 2300});
//conteiner.save({"name": "Factor OSTRO", "price": 2100});
//conteiner.save({"name": "Factor OSTRO VAM", "price": 3100});
//conteiner.save({"name": "Factor ONE", "price": 2500});
//conteiner.getById(4) 
//conteiner.deleteById(3)
//conteiner.deleteAll()
conteiner.getLength()
    

module.exports= Conteiner; 