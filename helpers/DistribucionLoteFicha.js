import DistribucionLoteFicha from "../models/DistribucionLoteFicha.js";

const helpersDistribucionLoteFicha = {
    existeId: async (id, req) => {
        const distLoteFicha = await DistribucionLoteFicha.findById(id);
        if (!distLoteFicha) {
            throw new Error(`Distribución no encontrada`);
        }

        req.DistLoteFichaUpdate = distLoteFicha;
    },

    existeDistribucion: async (Ficha_id, req) =>{
        try {
          const DistribucionPresupuesto_id = req.req.body.DistribucionPresupuesto_id;
    
          const existe = await DistribucionLoteFicha.findOne({ 
              DistribucionPresupuesto_id: DistribucionPresupuesto_id,
              Ficha_id: Ficha_id,
          });
      
          if (existe) {
              throw new Error("Esta distribucion ya existe");
          } 
      } catch (error) {
          throw new Error(error)
      } 
      }

};

export default helpersDistribucionLoteFicha;
