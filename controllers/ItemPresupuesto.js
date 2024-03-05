import ItemPresupuesto from "../models/ItemPresupuesto.js";
import DistribucionPresupuesto from "../models/DistribucionPresupuesto.js";
import helpersGeneral from "../helpers/General.js";

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

    getPorNombre: async (req, res) => {
        try {
          const { Nombre } = req.params;
          const item = await DistribucionPresupuesto.find({ Nombre });
          res.json(item);
        } catch (error) {
          res.status(400).json({ error });
        }
      },

    postItemPresupuesto: async (req, res) => {
        try {
            const { Nombre, Presupuesto } = req.body;
            const itempresupuesto = new ItemPresupuesto({ nombre: await helpersGeneral.primeraMayuscula(Nombre), Presupuesto, presupuestoDisponible: Presupuesto});
            await itempresupuesto.save();
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putItemPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Nombre, Presupuesto } = req.body;
    
            const disItemLote = await DistribucionPresupuesto.find({
                ItemPresupuesto_id: id
            });
    
            const totalPresupuestos = disItemLote.reduce((total, disItemLote) => {
                return total + disItemLote.Presupuesto;
            }, 0);
    
            const presupuestoDisponible = Presupuesto - totalPresupuestos;
    
            const item = await ItemPresupuesto.findByIdAndUpdate(
                id,
                { nombre: await helpersGeneral.primeraMayuscula(Nombre), Presupuesto, presupuestoDisponible },
                { new: true }
            );
    
            res.json(item);
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putAjustarPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Presupuesto} = req.body;
    
            const item = await DistribucionPresupuesto.findById(id)
            const presupuestoDisponible = item.presupuestoDisponible-Presupuesto
    
            const updatedItem = await DistribucionPresupuesto.findByIdAndUpdate(id,
                {  presupuestoDisponible }, 
                { new: true }
            );
    
            res.json(updatedItem);
    
        } catch (error) {
            res.status(400).json({ error });
        }
      },

    /* putItemPresupuesto: async (req, res) => {
        try {
            const { id } = req.params;
            const { Nombre, Presupuesto } = req.body;
            const itempresupuesto = await ItemPresupuesto.findByIdAndUpdate(
                id,
                { Nombre, Presupuesto },
                { new: true }
            );
            res.json({ itempresupuesto });
        } catch (error) {
            res.status(400).json({ error });
        }
    }, */

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
