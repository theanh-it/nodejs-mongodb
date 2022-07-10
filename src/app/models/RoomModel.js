const Model = require("./Model");

class UserModel extends Model{
    constructor(){
        var modelName   = "Room";
        var schema      = {
            _id: {
                type: String
            },
            name:{
                type: String,
                index: true
            }
        };
        var collection = "rooms";

        super(modelName, schema, collection, {name: "text"});
    }
}

module.exports = new UserModel();