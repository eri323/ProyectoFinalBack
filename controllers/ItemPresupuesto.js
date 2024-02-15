import ItemPresupuesto from "../models/ItemPresupuesto.js";

const httpItemPresupuesto = {
    
    getItemPresupuesto: async (req, res) => {
        try {
            const itempresupuesto = await ItemPresupuesto.find();
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },



    getItemPresupuestoId: async (req, res) => {
        const { id } = req.params;
        try {
            const itempresupuesto = await ItemPresupuesto.findById(id);
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    postItemPresupuesto: async (req, res) => {
        try {
            const { Nombre,Presupuesto } = req.body;
            const itempresupuesto = new ItemPresupuesto({ Nombre,Presupuesto});
            itempresupuesto.save();
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putItemPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Nombre,Presupuesto } = req.body;
            const itempresupuesto = await ItemPresupuesto.findByIdAndUpdate(
                id,
                { Nombre,Presupuesto },
                { new: true }
            );
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putItemPresupuestoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const itempresupuesto = await ItemPresupuesto.findByIdAndUpdate(
                id,
                { Estado: 0 },
                { new: true }
            );
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putItemPresupuestoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const itempresupuesto = await ItemPresupuesto.findByIdAndUpdate(
                id,
                { Estado: 1 },
                { new: true }
            );
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpItemPresupuesto;