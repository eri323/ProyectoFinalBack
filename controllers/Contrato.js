import Contrato from "../models/Contrato.js";
import DisContratoLote from "../models/disContratoLote.js";
import helpersGeneral from "../helpers/generales.js";


const httpContrato= {
  getContrato: async (req, res) => {
    try {
      const contratos = await Contrato.find();
      res.json(contratos);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getContratoId: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findById(id);
      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  /* getsById: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.finf(id);
      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  }, */

  getPorNombre: async (req, res) => {
    try {
      const { Nombre } = req.params;
      const contrato = await Contrato.find({ Nombre });
      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  postContrato: async (req, res) => {
    try {
      const { Nombre, Condigo, PresupuestoAsignado, Año } = req.body;

      const fecha = new Date(`${Año}-01-02T00:00:00.000Z`);

      const dependencia = new Dependencia({ 
        Nombre: await helpersGeneral.primeraMayuscula(Nombre), 
        Condigo, 
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
  putContrato: async (req, res) => {
    try {
      const { id } = req.params;
      const {  Nombre, Condigo, PresupuestoAsignado, Año  } = req.body;


      const disContratoLote = await DisContratoLote.find({
        idContrato: id
      });

      const totalPresupuestos = disContratoLote.reduce((total, disContratoLote) => {
       return total + disContratoLote.presupuesto;
      }, 0);

      const PresupuestoDisponible = presupuesto - totalPresupuestos;

      
      const contrato = await Contrato.findByIdAndUpdate(
        id,
        { Nombre: await helpersGeneral.primeraMayuscula(Nombre), 
          Condigo,
          PresupuestoAsignado, 
          PresupuestoDisponible, 
          Año },
        { new: true }
      );

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
/* 
  putAjustarPresupuesto: async (req, res) => {
    try {
        const { id } = req.params;
        const { presupuestoAsignado} = req.body;

        const contrato = await Contrato.findById(id)
        const presupuestoDisponible = contrato.presupuestoDisponible-presupuestoAsignado

        const updatedContrato = await Contrato.findByIdAndUpdate(id,
            {  presupuestoDisponible }, 
            { new: true }
        );

        res.json(updatedContrato);

    } catch (error) {
        res.status(400).json({ error });
    }
  }, */

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(id, { Estado: 0 }, { new: true });

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }

  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const contrato = await Contrato.findByIdAndUpdate(id, { Estado: 1 }, { new: true });

      res.json(contrato);
    } catch (error) {
      res.status(400).json({ error });
    }

  },
};

export default httpContrato;
