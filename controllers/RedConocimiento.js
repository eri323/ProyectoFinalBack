import helpersGeneral from "../helpers/General.js";
import RedConocimiento from "../models/RedConocimiento.js";

const httpRedConocimiento = {
  
  getRedConocimiento: async (req, res) => {
    try {
      const redes = await RedConocimiento.find();
      res.json(redes);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getRedConocimientoNombre: async (req, res) => {
    try {
      const { Nombre } = req.params;
      const red = await RedConocimiento.find({ Nombre });
      res.json(red);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Post
  postRedConocimiento: async (req, res) => {
    try {
      const { Nombre } = req.body;
      const red = new RedConocimiento({ 
        Nombre: await helpersGeneral.primeraMayuscula(Nombre) 
      });
      await red.save();
      res.json(red);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  },

  // Put
  putRedConocimiento: async (req, res) => {
    try {
      const { id } = req.params;
      const { Nombre } = req.body;
      const red = await RedConocimiento.findByIdAndUpdate(id, { Nombre: await helpersGeneral.primeraMayuscula(Nombre) }, { new: true });

      res.json(red);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    const { id } = req.params;
    const red = await RedConocimiento.findByIdAndUpdate(id, { Estado }, { new: true });

    res.json(red);
  },

  putActivar: async (req, res) => {
    const { id } = req.params;
    const red = await ReD.findByIdAndUpdate(id, { Estado }, { new: true });

    res.json(red);
  },
};

export default httpRedConocimiento;
