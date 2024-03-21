import ConexRedLote from "../models/ConexionRedLote.js";

const httpConexRedLote = {
  getConexionRedLote: async (req, res) => {
    try {
      const conexion = await ConexRedLote.find()
        .populate("Red_id")
        .populate("Lote_id");
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getConexionRedLoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findById(id)
        .populate("Red_id")
        .populate("Lote_id");

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postConexionRedLote: async (req, res) => {
    try {
      const { Red_id, Lote_id } = req.body;

      const conexion = new ConexRedLote({
        Red_id,
        Lote_id,
      });
      await conexion.save();

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Put
  putConexionRedLote: async (req, res) => {
    try {
      const { id } = req.params;
      const { Red_id, Lote_id } = req.body;

      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        {
          Red_id,
          Lote_id,
        },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpConexRedLote;
