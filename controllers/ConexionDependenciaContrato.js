import ConexDependenciaContrato from "../models/ConexionDependenciaContrato.js";

const httpConexDependenciaContrato = {

  getConDepCon: async (req, res) => {
    try {
      const conexion = await ConexDependenciaContrato.find()
        .populate("DistribucionDependencia_id").populate('Contrato_id');
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getConDepConId: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findById(id)
        .populate("DistribucionDependencia_id").populate('Contrato_id')
      res.json(conexion)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });

    }
  },

  // Post
  postConDepCon: async (req, res) => {
    try {
      const { DistribucionDependencia_id, Contrato_id } = req.body;

      const conexion = new ConexDependenciaContrato({
        DistribucionDependencia_id,
        Contrato_id,
      });
      await conexion.save();

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putConDepCon: async (req, res) => {
    try {
      const { id } = req.params;
      const { DistribucionDependencia_id, Contrato_id } = req.body;

      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        {
          DistribucionDependencia_id,
          Contrato_id
        }, { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexDependenciaContrato.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      )
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpConexDependenciaContrato;
