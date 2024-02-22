import DistribucionPresupuesto from "../models/DistribucionPresupuesto.js";

const helpersDisPresupuesto = {
    validarDisPreUnica: async ( ItemPresupuesto_id, req) => {
        try {
            const Lote_id = req.req.body.Lote_id;

            const existe = await DistribucionPresupuesto.findOne({ 
                ItemPresupuesto_id: ItemPresupuesto_id,
                Lote_id: Lote_id,
            });
        
            if (existe) {
                throw new Error("Esta distribucion ya existe");
            } 
        } catch (error) {
            throw new Error(error)
        } 
    },
};


export default helpersDisPresupuesto;
