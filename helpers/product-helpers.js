var db = require('../config/connection')
var objectId = require('mongodb').ObjectID
var collection = require('../config/collections')
module.exports = {

    addProduct:(product,callback)=>{

        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.ops[0]._id)
        })
    },

    getAllProducts:()=>{
         return new Promise(async(resolve,reject)=>{
             let products =await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
             resolve(products)
         })
    
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    }
}
