import Lote from "../models/Lote.js";

const httpLote = {
  getLote: async (req, res) => {
    try {
      const lote = await Lote.find();
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getLoteId: async (req, res) => {
    const { id } = req.params;
    try {
      const lote = await Lote.findById(id);
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  postLote: async (req, res) => {
    try {
      const { Nombre } = req.body;
      const lote = new Lote({ Nombre });
      lote.save();
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putLote: async (req, res) => {
    try {
      const { id } = req.params;
      const { Nombre } = req.body;
      const lote = await Lote.findByIdAndUpdate(
        id,
        { Nombre },
        { new: true }
      );
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error: "Error en el servidor" });
    }
  },

  putLoteInactivar: async (req, res) => {
    console.log(req.params.id);
    try {
      const { id } = req.params;
      const lote = await Lote.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putLoteActivar: async (req, res) => {
    console.log(req.params.id);
    try {
      const { id } = req.params;
      const lote = await Lote.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json({ lote });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpLote;
