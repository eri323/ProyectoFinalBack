import DistribucionPresupuesto from "../models/DistribucionDependenciaRed.js";

const helpersPresupuesto={
  validarPresupuesto: async(Presupuesto, res) => {
    if(Presupuesto<=0){
      throw new Error("El Presupuesto debe ser mayor a 0")
    }
  },
  obtenerDistribucionPresupuestoPorId: async(Presupuesto, req) => {
      const distribucion = await DistribucionPresupuesto.find({Presupuesto});
      if(distribucion.Presupuesto < req.req.body.Presupuesto){
        throw new Error("El Presupuesto debe ser menor al Presupuesto asignado a la distribución")
      }
  
    }
}

export default helpersPresupuesto;