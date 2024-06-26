import mongoose from "mongoose";

const RythmRumbleSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    regBy:String,
    regbyEmail:String,
    teamName: String,
    teamLeadName: String,
    leadEmail: String,
    contact_phone: String,
    clgName: String,
    aud_link: String,
    vid_link: String,
    payment_link:{
        type:String,
        required : true
    }
});

const RythmRumble = mongoose.model('RythmRumble', RythmRumbleSchema);

export default RythmRumble;
