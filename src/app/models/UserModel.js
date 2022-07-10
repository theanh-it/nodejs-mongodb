const Model = require("./Model");

class UserModel extends Model{
    constructor(){
        var modelName   = "User";
        var schema      = {
            _id: {
                type: String
            },
            username: {
                type: String
            },
            password: {
                type: String
            },
            fullname:{
                type: String,
                index: true
            }
        };
        var collection = "users";

        super(modelName, schema, collection, {fullname: "text"});
    }
}

module.exports = new UserModel();