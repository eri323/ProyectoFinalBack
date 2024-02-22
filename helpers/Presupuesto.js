import DistribucionPresupuesto from "../models/DistribucionPresupuesto.js";
import ItemPresupuesto from "../models/ItemPresupuesto.js"
const helpersPresupuesto = {
    validarPresupuesto: async (Presupuesto, res) => {
        if (Presupuesto <= 0) {
            throw new Error("El presupuesto debe ser mayor a 0")
        }
    },
    obtenerDistribucionPresupuestoPorId: async (ItemPresupuesto_id, req, res) => {
        const distribucion = await ItemPresupuesto.findById(ItemPresupuesto_id);
        console.log(distribucion);
        if (distribucion.Presupuesto < req.req.body.Presupuesto) {
            throw new Error("El presupuesto debe ser menor al presupuesto asignado a la distribución")
        }

    }
}

export default helpersPresupuesto;