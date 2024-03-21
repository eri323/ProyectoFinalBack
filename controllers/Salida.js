import Salida from "../models/Salida.js";
import DetalleSalida from '../models/DetalleSalida.js';

const httpSalida = {
  getSalidas: async (req, res) => {
    try {
      const salidas = await Salida.find().populate("Pedido_id").populate("Bodeguero_id");

      const detSalidas = salidas.map(async (e) => {
        e.detSalida= await DetalleSalida.find({Pedido_id:e._id});
      });

      await Promise.all(detSalidas);

      res.json(salidas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSalidasId: async (req, res) => {
    try {
      const salida = await Salida.findById(req.params.id).populate("Pedido_id").populate("Bodeguero_id");
      if (!salida) {
        return res.status(404).json({ mensaje: "Salida no encontrada" });
      }
      res.json(salida);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSalidaNumero: async (req, res) => {
    try {
      const ultimoSalida = await Salida.findOne().sort({ Numero: -1 });    
      console.log(ultimoSalida);
      let Numero = ultimoSalida ? ultimoSalida.Numero : 0;
      Numero+=1
      res.json(Numero)       
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  postSalida: async (req, res) => {
    try {
      const {Bodeguero_id, Pedido_id, Entregado, Total} = req.body;

      const ultimoSalida = await Salida.findOne().sort({ Numero: -1 });    
      console.log(ultimoSalida);
      let Numero = ultimoSalida ? ultimoSalida.Numero : 0;
      Numero+=1

      console.log(Numero);

      const nuevoSalida = new Salida({Bodeguero_id, Pedido_id, Total, Entregado, Numero});
      const salidaGuardado = await nuevoSalida.save();
      res.status(201).json(salidaGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putSalida: async (req, res) => {
    try {
      const salidaActualizado = await Salida.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!salidaActualizado) {
        return res.status(404).json({ mensaje: "Salida no encontrado" });
      }
      res.json(salidaActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default httpSalida
