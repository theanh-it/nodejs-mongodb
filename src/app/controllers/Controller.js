const Model = require("../models/Model");

module.exports = class Controller {
    model;

    constructor({ model = false, modelName, schema, collection = false, index = false }) {
        if (model) this.model = model;
        else this.model = new Model(modelName, schema, collection, index);

        this.index  = this.index.bind(this);
        this.show   = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    index(request, response){
        var query = {
            search: request.query.search ? request.query.search : false,
            size: request.query.size ? request.query.size : false,
            page: request.query.page ? request.query.page : (request.query.size ? 1 : false)
        };

        this
        .model
        .getAll(query)
        .then(results=>{
            response.json({
                message: "success",
                size: query.size,
                page: query.page,
                search: query.search,
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
            response.json({
                message: "error"
            })
        });
    }

    show(request, response){
        this
        .model
        .getSingle(request.params.id)
        .then(results=>{
            response.json({
                message: "success",
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
            response.json({
                message: "error"
            })
        });
    }

    create(request, response){
        this
        .model
        .create(request.body)
        .then(results=>{
            response.json({
                message: "success",
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
            response.json({
                message: "error"
            })
        });
    }

    update(request, response){
        this
        .model
        .update(request.params.id, request.body)
        .then(results=>{
            response.json({
                message: "success",
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
            response.json({
                message: "error"
            })
        });
    }

    delete(request, response){
        this
        .model
        .delete(request.params.id)
        .then(results=>{
            response.json({
                message: "success",
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
            response.json({
                message: "error"
            })
        });
    }
}