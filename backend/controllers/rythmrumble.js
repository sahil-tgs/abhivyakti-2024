import RythmRumble from "../models/rythmRumble.js";

export const getrythmrumble = async (req, res) => {
    const docs = await RythmRumble.find({});
    console.log("hii get");
    res.json(docs);
}

export const createrythmrumble = async (req, res) => {
    try {
        let user = new RythmRumble();
        let data = req.body.formData;
        let id = req.user.id;

        let entry = await RythmRumble.findOne({ userId: id });

        if (entry) {
            res.status(401).json({ success: false, msg: "You have Already Registered for this Event" });
            return;
        }

        user.userId = id;
        user.regBy = req.body.regBy;
        user.regbyEmail = req.body.regbyEmail;
        user.teamName = data.teamName;
        user.teamLeadName = data.teamLeadName;
        user.leadEmail = data.leadEmail;
        user.contact_phone = data.contact_phone;
        user.clgName = data.clgName;
        user.aud_link = data.aud_link;
        user.vid_link = data.vid_link;
        user.payment_link = data.payment_link;

        await user.save();
        console.log("hi post");

        res.status(200).json({ success: true, user });

    } catch (err) {
        res.status(403).json({ success: false, err: err.message, yay: "Asda" });
        return;
    }
}
