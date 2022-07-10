const Controller    = require("./Controller")

class UserController extends Controller{
    constructor(){
        super({model: require("../models/UserModel")});        
    }
}

module.exports = new UserController();