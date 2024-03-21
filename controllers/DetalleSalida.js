import DetSalida from "../models/DetalleSalida.js";

const httpDetSalida = {
  getDetalleSalida: async (req, res) => {
    try {
      const detSalida = await DetSalida.find()
        .populate("Salida_id")
        .populate("Entrada_id");

      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDetalleSalidaById: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findById({ id })
        .populate("Salida_id")
        .populate("Entrada_id");

      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDetalleSalidaBySalida: async (req, res) => {
    try {
      const { Salida_id } = req.params;
      const salidas = await DetSalida.find({ Salida_id })
        .populate("Salida_id")
        .populate("Entrada_id");
      res.json(salidas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  postDetalleSalida: async (req, res) => {
    try {
      const { Numero, CantidadEntregada, cantidadPendiente, Salida_id, Entrada_id, SubTotal } = req.body;
      const detSalida = new DetSalida({
        Numero,
        CantidadEntregada, 
        CantidadPendiente,
        Salida_id,
        Entrada_id,
        SubTotal,
      });
      await detSalida.save();
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putDetalleSalida: async (req, res) => {
    try {
      const { id } = req.params;
      const { Numero, CantidadEntregada, CantidadPendiente, Salida_id, Entrada_id, SubTotal } = req.body;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { Numero, CantidadEntregada, CantidadPendiente, Salida_id, Entrada_id, SubTotal },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const detSalida = await DetSalida.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json(detSalida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDetSalida;
