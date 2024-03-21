import DistribucionRedArea from "../models/DistribucionRedArea.js";

const helpersDistribucionRedArea = {
  existeId: async (id, req) => {
    const distribucionRedArea = await DistribucionRedArea.findById(id);
    if (!distribucionRedArea) {
      throw new Error(`Distribución no encontrada`);
    }

    req.DistribucionRedAreaUpdate = distribucionRedArea;
  },
  existeDistribucion: async (DisDependenciaRed_id, req) => {
    const AreaTematica_id = req.req.body.AreaTematica_id
    if (Nombre) {
      const existe = await DistribucionRedArea.findOne({ 
        DisDependenciaRed_id,
        AreaTematica_id
      });

      if(existe){
        if (req.req.method === "PUT" && req.req.body._id != existe._id) {
          throw new Error(`Ya existe  esta distribución!`);
        } else if (req.req.method === "POST") {
          throw new Error(`Ya existe  esta distribución!`);
        }
      }
    }
  },
};

export default helpersDistribucionRedArea;
