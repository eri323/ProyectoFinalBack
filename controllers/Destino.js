import Destino from "../models/Destino.js";
import helpersGeneral from "../helpers/General.js";

const httpDestino = {
  getDestino: async (req, res) => {
    try {
      const destino = await Destino.find();
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDestinoById: async (req, res) => {
    const { id } = req.params;
    try {
      const destino = await Destino.findById({ id });
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDestinoCodigo: async (req, res) => {
    const { Codigo } = req.params;

    try {
      const destino = await Destino.find(Codigo);
      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDestinoEstado: async (req, res) => {
    try {
      const Estado = req.params;

      const destinosPorEstado = await Destino.find({ Estado });

      res.json(destinosPorEstado);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las destinos por Estado" });
    }
  },

  postDestino: async (req, res) => {
    try {
      const {
        Codigo,
        Nombre,
        NivelFormacion,
        FechaInicio,
        FechaFin,
        Abreviatura,
      } = req.body;

      const destino = new Destino({
        Codigo,
        Nombre: await helpersGeneral.primeraMayuscula(Nombre),
        NivelFormacion,
        FechaInicio,
        FechaFin,
        Abreviatura: Abreviatura?.toUpperCase(),
      });
      await destino.save();

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putDestino: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        Codigo,
        Nombre,
        NivelFormacion,
        FechaInicio,
        FechaFin,
        Abreviatura,
      } = req.body;
      const destino = await Destino.findByIdAndUpdate(
        id,
        {
          Codigo,
          Nombre: await helpersGeneral.primeraMayuscula(Nombre),
          NivelFormacion,
          FechaInicio,
          FechaFin,
          Abreviatura: Abreviatura?.toUpperCase(),
        },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const destino = await Destino.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const destino = await Destino.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );

      res.json(destino);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};

export default httpDestino;
