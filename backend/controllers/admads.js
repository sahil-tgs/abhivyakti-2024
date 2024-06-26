import Admads from "../models/admads.js";


export const getadmads = async (req, res) => {
    const docs = await Admads.find({});

    res.json(docs)
}
export const createadmads = async (req, res) => {

    try {

        let user = new Admads();
        let data = req.body.formData;
        let id = req.user.id;

        let entry = await Admads.findOne({userId:id});
        if(entry){
            res.status(401).json({success:false,msg:"You have Already Registered for this Event"});
            return;
        }

        user.userId = id;
        user.regBy = req.body.regBy;
        user.regbyEmail = req.body.regbyEmail;
        user.teamName = data.teamName;
        user.clgName = data.clgName;
        user.teamLeadName = data.teamLeadName;
        user.contact_phone = data.contact_phone;
        user.vid_link = data.vid_link;
        user.payment_link = data.payment_link;

        await user.save();

       

        res.status(200).json({ success: true, user });

    } catch (err) {
        res.status(403).json({ success: false, err:err.message, yay:"Asda" });
        return
    }




}
export const checkRegistration = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingRegistration = await Admads.findOne({ userId });

        if (existingRegistration) {
            return res.status(200).json({ success: true, message: "User is already registered for Admads" });
        } else {
            return res.status(200).json({ success: false, message: "User is not registered for Admads" });
        }
    } catch (error) {
        console.error("Error checking registration:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};