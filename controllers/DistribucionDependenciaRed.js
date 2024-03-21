import DisDependenciaRed from "../models/DistribucionDependenciaRed.js";
import Dependencia from "../models/Dependencias.js";
import RedConocimiento from "../models/RedConocimiento.js";
import DisRedArea from "../models/DistribucionRedArea.js";

const httpDisDependenciaRed = {

  getDisDepRed: async (req, res) => {
    try {
      const distribucion = await DisDependenciaRed.find()
        .populate("Dependencia_id").populate("Red_id");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getDisDepRedId: async (req, res) => {
    try {
      const { Red_id } = req.params;
      const distribucion = await DisDependenciaRed.find({ Red_id })
        .populate("Dependencia_id").populate("Red_id");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  getDistribucionById: async (req, res) => {
    try {
      const { id } = req.params;

      const distribucion = await DisDependenciaRed.findById(id)
        .populate("Dependencia_id").populate("Red_id");
      res.json(distribucion)
    } catch (error) {
      res.status(400).json({ error });

    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { PresupuestoAsignado, Dependencia_id, Red_id, Año } = req.body;

      const distribucion = new DisDependenciaRed({
        PresupuestoAsignado,
        PresupuestoDisponible: PresupuestoAsignado,
        Dependencia_id,
        Red_id,
        Año,
      });

      const red = await RedConocimiento.findById(distribucion.Red_id);
      distribucion.Red_id = red;

      const dependencia = await Dependencia.findById(distribucion.Dependencia_id);
      distribucion.Dependencia_id = dependencia

      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado, Dependencia_id, Red_id, Año } = req.body;

      const disRedArea = await DisRedArea.find({
        idDisDependenciaRed: id
      });

      const totalPresupuestos = disRedArea.reduce((total, disRedArea) => {
        return total + disRedArea.presupuesto;
      }, 0);

      const presupuestoDisponible = presupuesto - totalPresupuestos;

      const distribucion = await DisDependenciaRed.findByIdAndUpdate(
        id,
        {
          PresupuestoAsignado,
          PresupuestoDisponible,
          Dependencia_id,
          Red_id,
          Año
        }, { new: true }
      ).populate("Dependencia_id").populate("Red_id");
      res.json(distribucion);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado } = req.body;

      const disDependenciaRed = await disDependenciaRed.findById(id)
      const presupuestoDisponible = disDependenciaRed.PresupuestoDisponible - PresupuestoAsignado

      const updatedDisDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedDisDependenciaRed);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate("Dependencia_id").populate("Red_id");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disDependenciaRed = await DisDependenciaRed.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      ).populate("Dependencia_id").populate("Red_id");
      res.json(disDependenciaRed);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
export default httpDisDependenciaRed;
