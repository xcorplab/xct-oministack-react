const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        //console.log(req.body);
        //console.log(req.file);

        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({"error": "usuário não existe"});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(",").map(tech => tech.trim()),
            price
        });

        await Spot
            .populate("user")
            .execPopulate();
        
        return res.json(spot);
    }
};