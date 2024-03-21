import Salida from "../models/Salida.js";

const helpersSalida = {
  existeId: async (id, req) => {
    const salida = await Salida.findById(id);
    if (!salida) {
      throw new Error(`Salida no encontrada`);
    }

    req.SalidaUpdate = salida;
  },
};

export default helpersSalida;