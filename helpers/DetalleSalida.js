import DetalleSalida from "../models/DetalleSalida.js";

const helpersDetalleSalida = {
    existeId: async (id, req) => {
      const detalleSalida = await DetalleSalida.findById(id);
      if (!detalleSalida) {
        throw new Error(`Detalle de pedido no encontrado`);
      }
  
      req.DetSalidaUpdate = detalleSalida;
    },
  };
  
  export default helpersDetalleSalida;