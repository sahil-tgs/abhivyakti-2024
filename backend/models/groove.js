import mongoose from "mongoose";

const GrooveGenesisSchema = mongoose.Schema({
    participantName: String,
    contact_phone: String,
    Email: String,
    instituteName: String,
    instrumentsName: String,
    instagramID: String,
    yesno: String,
    instrumentsNameBacktrack: String,
    vid_link: String,
    aud_link: String
});

const GrooveGenesis = mongoose.model('GrooveGenesis', GrooveGenesisSchema);

export default GrooveGenesis;
