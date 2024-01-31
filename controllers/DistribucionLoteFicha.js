import DistribucionLoteFicha from "../models/DistribucionLoteFicha.js";

const httpDistribucionLoteFicha = {
    
    getDistribucionLoteFicha: async (req, res) => {
        try {
            const distribucionloteficha = await DistribucionLoteFicha.find().populate("Ficha_id");
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },



    getDistribucionLoteFichaId: async (req, res) => {
        const { id } = req.params;
        try {
            const distribucionloteficha = await DistribucionLoteFicha.findById(id).populate("Ficha_id");
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    postDistribucionLoteFicha: async (req, res) => {
        try {
            const { Presupuesto, DistribucionPresupuesto_id, Ficha_id } = req.body;
            const distribucionloteficha = new DistribucionLoteFicha({ Presupuesto, DistribucionPresupuesto_id, Ficha_id });
            distribucionloteficha.save();
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putDistribucionLoteFicha: async (req, res) => {
        try {
            const { id } = req.params;
            const { Presupuesto, DistribucionPresupuesto_id, Ficha_id } = req.body;
            const distribucionloteficha = await DistribucionLoteFicha.findByIdAndUpdate(
                id,
                { Presupuesto, DistribucionPresupuesto_id, Ficha_id },
                { new: true }
            );
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putDistribucionLoteFichaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucionloteficha = await DistribucionLoteFicha.findByIdAndUpdate(
                id,
                { Estado: 0 },
                { new: true }
            );
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putDistribucionLoteFichaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucionloteficha = await DistribucionLoteFicha.findByIdAndUpdate(
                id,
                { Estado: 1 },
                { new: true }
            );
            res.json({ distribucionloteficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpDistribucionLoteFicha;