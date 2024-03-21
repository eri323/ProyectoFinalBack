import Dependencia from "../models/Dependencias.js";
import DisDependenciaRed from "../models/DistribucionDependenciaRed.js";
import helpersGeneral from "../helpers/General.js";


const httpDependencia = {
  getDependencia: async (req, res) => {
    try {
      const dependencias = await Dependencia.find();
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getDependenciaId: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.findById(id);
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  /* getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencias = await Dependencia.finf(id);
      res.json(dependencias);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
 */
  getDependenciaNombre: async (req, res) => {
    try {
      const { Nombre } = req.params;
      const dependencia = await Dependencia.find({ Nombre });
      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  postDependencia: async (req, res) => {
    try {
      const {  Nombre, Codigo, PresupuestoAsignado, Año  } = req.body;

      const fecha = new Date(`${Año}-01-02T00:00:00.000Z`);

      const dependencia = new Dependencia({ 
        Nombre: await helpersGeneral.primeraMayuscula(Nombre), 
        Codigo, 
        PresupuestoAsignado, 
        PresupuestoDisponible: PresupuestoAsignado, 
        Año:fecha 
      });
      await dependencia.save();
      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {  Nombre, Codigo, PresupuestoAsignado, Año  } = req.body;


      const disDependenciaRed = await DisDependenciaRed.find({
        idDependencia: id
      });

      const totalPresupuestos = disDependenciaRed.reduce((total, disDependenciaRed) => {
       return total + disDependenciaRed.presupuesto;
      }, 0);

      const PresupuestoDisponible = presupuesto - totalPresupuestos;

      
      const dependencia = await Dependencia.findByIdAndUpdate(
        id,
        { Nombre: await helpersGeneral.primeraMayuscula(Nombre), 
          Codigo,
          PresupuestoAsignado, 
          PresupuestoDisponible, 
          Año },
        { new: true }
      );

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { PresupuestoAsignado} = req.body;

        const dependencia = await Dependencia.findById(id)
        const presupuestoDisponible = dependencia.PresupuestoDisponible-PresupuestoAsignado

        const updatedDependencia = await Dependencia.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedDependencia);

    } catch (error) {
        res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { Estado: 0 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const dependencia = await Dependencia.findByIdAndUpdate(id, { Estado: 1 }, { new: true });

      res.json(dependencia);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpDependencia;
