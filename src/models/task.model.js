import mongoose from "mongoose";
const taskSchema = mongoose.Schema({

    title: {
    type: String,
    require: true,
    trim: true,
    },

    description: {
    type: String,
    require: true,
    trim: true,
    },    
    date: {
    type: Date,
    default: Date.now
    },
    user:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        
        },
    },{
        
    timestamps: true
    
})

export default mongoose.model('Task', taskSchema)


