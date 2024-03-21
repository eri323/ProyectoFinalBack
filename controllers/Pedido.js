import Pedidos from "../models/Pedido.js";

const httpPedidos = {
  getPedidos: async (req, res) => {
    try {
      const pedidos = await Pedidos.find().populate("DistribucionLoteFicha_id");
      res.json({ pedidos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getPedidosId: async (req, res) => {
    const { id } = req.params;
    try {
      const pedidos = await Pedidos.findById(id);
      res.json({ pedidos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  postPedidos: async (req, res) => {
    try {
      const { InstructorEncargado_id, Destino_id, Total } = req.body;

      const ultimoPedido = await Pedidos.findOne().sort({ Numero: -1 });
      console.log(ultimoPedido);
      let Numero = ultimoPedido ? ultimoPedido.Numero : 0;
      Numero += 1;

      console.log(Numero);

      const nuevoPedido = new Pedido({
        InstructorEncargado_id,
        Destino_id,
        Total,
        Numero,
      });
      const pedidoGuardado = await nuevoPedido.save();
      res.status(201).json(pedidoGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putPedidos: async (req, res) => {
    try {
      const pedidoActualizado = await Pedidos.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!pedidoActualizado) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

 /*  putPedidosInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const pedidos = await Pedidos.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json({ pedidos });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putPedidosActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const pedidos = await Pedidos.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json({ pedidos });
    } catch (error) {
      res.status(400).json({ error });
    }
  }, */
};

export default httpPedidos;
