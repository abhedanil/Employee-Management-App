const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
  
    },
    reason:{
        type:String,
  
  
    },
    startdate:{
        type: String,
        required:true,
        
    },
    enddate:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        default:false
    }
    

},  

)
module.exports =  mongoose.model('applyform',applicationSchema)