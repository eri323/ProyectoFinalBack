import DisAreaDestino from "../models/disAreaDestino.js";

const httpDisAreaDestino = {
  getDisAreaDestino: async (req, res) => {
    try {
      const distribucion = await DisAreaDestino.find()
        .populate("DistribucionRedArea_id")
        .populate("Destino_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDisAreaDestinoById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisAreaDestino.findById(id)
        .populate("DistribucionRedArea_id")
        .populate("Destino_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postDisAreaDestino: async (req, res) => {
    try {
      const { PresupuestoAsignado, DistribucionRedArea_id, Destino_id, Año } = req.body;

      const distribucion = new DisAreaDestino({
        PresupuestoAsignado,
        presupuestoDisponible: PresupuestoAsignado,
        DistribucionRedArea_id,
        Destino_id,
        Año,
      });
      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putDisAreaDestino: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado, DistribucionRedArea_id, Destino_id, Año } = req.body;

      const distribucion = await DisAreaDestino.findByIdAndUpdate(
        id,
        {
          PresupuestoAsignado,
          presupuestoDisponible,
          DistribucionRedArea_id,
          Destino_id,
          Año,
        },
        { new: true }
      )
        .populate("DistribucionRedArea_id")
        .populate("Destino_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoDisponible } = req.body;

      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("DistribucionRedArea_id")
        .populate("Destino_id");

      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate("DistribucionRedArea_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisAreaDestino.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      ).populate("DistribucionRedArea_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisAreaDestino;
