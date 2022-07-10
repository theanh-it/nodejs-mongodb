const mongoose = require("mongoose");

module.exports = class Model{
    db;

    /*
    modelName: string
    schema: object,
    collection: string,
    index: {column: "text"}
    */
    constructor(modelName, schema, collection = false, index = false){
        var schema = collection ? new mongoose.Schema(schema,{collection: collection}) : new mongoose.Schema(schema);

        if (index) schema.index(index);

        this.db = mongoose.model(modelName, schema);
    }

    getAll(data){
        var aggregate = [];

        if(data.size){
            var limit       = data.size;
            var skip        = (data.page - 1) * limit;

            aggregate.push({ $skip: skip});
            aggregate.push({ $limit: limit});
        }

        if(data.search) aggregate.push({ $match:{ $text: {$search: `\"${data.search}\"`} } });

        if(aggregate.length) return this.db.aggregate(aggregate);
        else return this.db.find();
    }

    getSingle(id){
        return this.db
        .findById(id);
    }

    create(data){
        return this.db
        .create(data);
    }

    update(id, data){
        return new Promise((resolve, reject)=>{
            this.db
            .findById(id)
            .then(model=>{
                console.log(data);
                return Object.assign(model, data);
            })
            .then(update=>{
                update.save();
                return resolve(update);
            })
            .catch(error=>{
                return reject(error);
            });
        });
    }

    delete(id){
        return new Promise((resolve, reject)=>{
            this.db.deleteOne({_id: id}, error=>{
                if(error) return reject(error);
                return resolve(true);
            });
        });
    }
}