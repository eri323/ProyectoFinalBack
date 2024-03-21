import DisDependencia from "../models/DistribucionDependecia.js";
import Dependencia from "../models/Dependencias.js";

const httpDisDependencia = {
  getDisDependencias: async (req, res) => {
    try {
      const distribucion = await DisDependencia.find().populate(
        "Dependencia_id"
      );
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDisDependenciasId: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisDependencia.findById(id).populate(
        "Dependencia_id"
      );
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postDsiDependencias: async (req, res) => {
    try {
      const { PresupuestoAsignado, Dependencia_id, Año } = req.body;

      const distribucion = new DisDependencia({
        PresupuestoAsignado,
        PresupuestoDisponible: PresupuestoAsignado,
        Dependencia_id,
        Año,
      });
      await distribucion.save();

      const dependencia = await Dependencia.findById(
        distribucion.Dependencia_id
      );
      distribucion.Dependencia_id = dependencia;

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putDisDependencia: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado, Dependencia_id, Año } = req.body;

      const distribucion = await DisDependencia.findByIdAndUpdate(
        id,
        {
          PresupuestoAsignado,
          PresupuestoDisponible,
          Dependencia_id,
          Año,
        },
        { new: true }
      ).populate("Dependencia_id");
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

      const disDependencia = await DisDependencia.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      ).populate("Dependencia_id");

      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisDependencia.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate("Dependencia_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependencia = await DisDependencia.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      ).populate("Dependencia_id");
      res.json(disDependencia);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisDependencia;
