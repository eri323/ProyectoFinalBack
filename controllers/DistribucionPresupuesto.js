/* DistribucionPresupuesto */
import  DistribucionPresupuesto from "../models/DistribucionPresupuesto.js"

const httpDistribucionPresupuesto = {

    getDistribucionPresupuesto: async (req, res) => {
        try {
            const distribucionpresupuesto = await DistribucionPresupuesto.find().populate("Lote_id").populate("ItemPresupuesto_id");
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getDistribucionPresupuestoId: async (req, res) => {
        const { id } = req.params;
        try {
            const distribucionpresupuesto = await DistribucionPresupuesto.findById(id);
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postDistribucionPresupuesto: async (req, res) => {
        try {
            const { Presupuesto, Lote_id, ItemPresupuesto_id } = req.body;
            const distribucionpresupuesto = new DistribucionPresupuesto({ Presupuesto, Lote_id, ItemPresupuesto_id });
            distribucionpresupuesto.save();
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putDistribucionPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Presupuesto, Lote_id, ItemPresupuesto_id } = req.body;
            const distribucionpresupuesto = await DistribucionPresupuesto.findByIdAndUpdate(
                id,
                { Presupuesto, Lote_id, ItemPresupuesto_id },
                { new: true }
            );
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putDistribucionPresupuestoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucionpresupuesto = await DistribucionPresupuesto.findByIdAndUpdate(
                id,
                { Estado: 0 },
                { new: true }
            );
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putDistribucionPresupuestoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const distribucionpresupuesto = await DistribucionPresupuesto.findByIdAndUpdate(
                id,
                { Estado: 1 },
                { new: true }
            );
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpDistribucionPresupuesto;


