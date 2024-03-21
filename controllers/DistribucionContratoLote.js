import DisContratoLote from "../models/DistribucionContratoLote.js";

const httpDisContratoLote = {
  getDisConLote: async (req, res) => {
    try {
      const distribucion = await DisContratoLote.find()
        .populate("Contrato_id")
        .populate("Lote_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDisConLoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisContratoLote.findById(id)
        .populate("Contrato_id")
        .populate("Lote_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postDisConLote: async (req, res) => {
    try {
      const { PresupuestoAsignado, Contrato_id, Lote_id, Año } = req.body;

      const distribucion = new DisContratoLote({
        PresupuestoAsignado,
        presupuestoDisponible: PresupuestoAsignado,
        Contrato_id,
        Lote_id,
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
  putDisConLote: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado, Contrato_id, Lote_id, Año } = req.body;

      const distribucion = await DisContratoLote.findByIdAndUpdate(
        id,
        {
          PresupuestoAsignado,
          presupuestoDisponible,
          Contrato_id,
          Lote_id,
          Año,
        },
        { new: true }
      )
        .populate("Contrato_id")
        .populate("Lote_id");
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

      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )
        .populate("Contrato_id")
        .populate("Lote_id");

      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate("Contrato_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisContratoLote.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      ).populate("Contrato_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisContratoLote;
