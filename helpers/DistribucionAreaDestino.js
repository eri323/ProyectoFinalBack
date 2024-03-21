import DistribucionAreaDestino from "../models/DsitribucionAreaDestino.js";

const helpersDistribucionAreaDestino = {
    existeDistribucion: async (Dependencia_id, req) => {
        const Red_id = req.req.body.Red_id
        if (Nombre) {
          const existe = await DistribucionAreaDestino.findOne({ 
            Dependencia_id,
            Red_id
          });
    
          if(existe){
            if (req.req.method === "PUT" && req.req.body._id != existe._id) {
              throw new Error(`Ya existe esta distribución!!`);
            } else if (req.req.method === "POST") {
              throw new Error(`Ya existe esta distribución!!`);
            }
          }
        }
      },
};

export default helpersDistribucionAreaDestino;