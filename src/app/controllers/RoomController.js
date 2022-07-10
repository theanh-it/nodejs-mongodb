const Controller    = require("./Controller")

class RoomController extends Controller{
    constructor(){
        super({model: require("../models/RoomModel")});

        this.index = this.index.bind(this);
    }

    index(request, response){
        var search = request.query.search ? request.query.search : false;
        var size = request.query.size ? request.query.size : false;
        var page = request.query.page ? request.query.page : (request.query.size ? 1 : false);
        var skip = page ? (page - 1)*size : false;

        var aggregate = [];

        if(search) aggregate.push({
            $match:{
                $text: {$search: `\"${search}\"`}
            }
        });

        if(size){
            console.log(size);
            aggregate.push({ $skip: skip});
            aggregate.push({ $limit: limit});
        }

        // join with message
        aggregate.push({
            $lookup:{
                from: "messages",
                //localField: "_id",
                //foreignField: "room_id",
                as: "messages",
                let: {
                    "roomId": "$_id"
                },
                pipeline:[
                    { 
                        $match: { 
                            $expr: { 
                                $eq: [
                                    "$room_id",
                                    "$$roomId"
                                ]
                            }
                        }
                    },
                    {
                        $lookup:{
                            from: "status_messages",
                            localField: "_id",
                            foreignField: "message_id",
                            as: "status"
                        }
                    }
                ]
            }
        });

        // join members
        aggregate.push({
            $lookup:{
                from: "members",
                //localField: "_id",
                //foreignField: "room_id",
                as: "members",
                let: {
                    "roomId": "$_id"
                },
                pipeline:[
                    { 
                        $match: { 
                            $expr: { 
                                $eq: [
                                    "$room_id",
                                    "$$roomId"
                                ]
                            }
                        }
                    },
                    {
                        $lookup:{
                            from: "users",
                            localField: "user_id",
                            foreignField: "_id",
                            as: "info"
                        }
                    },
                    {
                        $unwind : "$info"
                    }
                ]
            }
        });

        // $project
        aggregate.push({
            $project:{
                _id: 1,
                name: 1,
                messages: 1,
                //"members._id": "$members._id"
                //"members.info": 1
                members:{
                    _id: 1,
                    info: 1
                    //"$members.username": "$info.username"
                }
            }
        });

        this
        .model
        .db
        .aggregate(aggregate)
        //.sort({_id: 1})
        .then(results=>{
            response.json({
                message: "success",
                page: page,
                size: size,
                search: search,
                result: results
            });
        })
        .catch(error=>{
            console.log(error);
        });
    }
}

module.exports = new RoomController();