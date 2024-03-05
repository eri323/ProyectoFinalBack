/* DistribucionPresupuesto */
import DistribucionPresupuesto from "../models/DistribucionPresupuesto.js"
import ItemPresupuesto from "../models/ItemPresupuesto.js"
import DisLoteFicha from "../models/DistribucionLoteFicha.js"
import Lote from "../models/Lote.js"

const httpDistribucionPresupuesto = {

    getDistribucionPresupuesto: async (req, res) => {
        try {
            const distribucionpresupuesto = await DistribucionPresupuesto.find()
                .populate("Lote_id")
                .populate("ItemPresupuesto_id");
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getDistribucionesById: async (req, res) => {
        try {
            const { ItemPresupuesto_id } = req.params;
            const distribucionpresupuesto = await DistribucionPresupuesto.find({ ItemPresupuesto_id })
                .populate("Lote_id")
                .populate("ItemPresupuesto_id");
            res.json(distribucionpresupuesto)
        } catch (error) {
            res.status(400).json({ error });

        }
    },

    getDistribucionPresupuestoId: async (req, res) => {
        try {
            const { id } = req.params;

            const distribucionpresupuesto = await DistribucionPresupuesto.findById(id)
                .populate("Lote_id")
                .populate("ItemPresupuesto_id");
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    /* postDistribucionPresupuesto: async (req, res) => {
        try {
            const { Presupuesto, Lote_id, ItemPresupuesto_id } = req.body;
            const distribucionpresupuesto = new DistribucionPresupuesto({ Presupuesto, Lote_id, ItemPresupuesto_id });
            distribucionpresupuesto.save();
            res.json({ distribucionpresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    }, */


    postDistribucionPresupuesto: async (req, res) => {
        try {
            const { Presupuesto, Lote_id, ItemPresupuesto_id } = req.body;
            const distribucion = new DistribucionPresupuesto(
                { Presupuesto, PresupuestoDisponible: Presupuesto, Lote_id, ItemPresupuesto_id });

            const lote = await Lote.findById(distribucion.Lote_id);
            distribucion.Lote_id = lote;

            const item = await ItemPresupuesto.findById(distribucion.ItemPresupuesto_id);
            distribucion.ItemPresupuesto_id = item

            await distribucion.save();

            res.json(distribucion);
        } catch (error) {
            res.status(400).json({ error });
        }
    },





    /* putDistribucionPresupuesto: async (req, res) => {
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
    }, */

    putDistribucionPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Presupuesto, Lote_id, ItemPresupuesto_id } = req.body;

            const disLoteFicha = await DisLoteFicha.find({
                DistribucionPresupuesto_id: id
            });

            const totalPresupuestos = disLoteFicha.reduce((total, disLoteFicha) => {
                return total + disLoteFicha.Presupuesto;
            }, 0);

            const presupuestoDisponible = Presupuesto - totalPresupuestos;

            const distribucionpresupuesto = await DistribucionPresupuesto.findByIdAndUpdate(
                id,
                { Presupuesto,presupuestoDisponible, Lote_id, ItemPresupuesto_id },
                { new: true }
            ).populate("Lote_id").populate("ItemPresupuesto_id");
            res.json(distribucionpresupuesto);
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putAjustarPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Presupuesto } = req.body;

            const item = await DistribucionPresupuesto.findById(id)
            const presupuestoDisponible = item.presupuestoDisponible - Presupuesto

            const updatedItem = await DistribucionPresupuesto.findByIdAndUpdate(id,
                { presupuestoDisponible },
                { new: true }
            );

            res.json(updatedItem);

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