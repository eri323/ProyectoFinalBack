import DistribucionPresupuesto from "../models/DistribucionPresupuesto.js";

const helpersPresupuesto = {
    validarPresupuesto: async (Presupuesto, res) => {
        if (Presupuesto <= 0) {
            throw new Error("El presupuesto debe ser mayor a 0")
        }
    },
    obtenerDistribucionPresupuestoPorId: async (Presupuesto, req) => {
        const distribucion = await DistribucionPresupuesto.findById(Presupuesto);
        if (distribucion.Presupuesto < req.req.body.Presupuesto) {
            throw new Error("El presupuesto debe ser menor al presupuesto asignado a la distribución")
        }

    }
}

export default helpersPresupuesto;