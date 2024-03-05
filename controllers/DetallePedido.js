import DetallePedido from "../models/DetallePedido.js";

const httpDetallePedido = {

    getDetallePedido: async (req, res) => {
        try {
            const detallePedido = await DetallePedido.find()
            .populate("Producto_id")
            .populate("Pedido_id");
            
            res.json({ detallePedido })
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    getDetallePedidoId: async (req, res) => {
        try {
          const { id } = req.params;
          const detallePedido = await DetallePedido.findById({ id })
          .populate("Producto_id")
          .populate("Pedido_id");
    
          res.json(detallePedido);
        } catch (error) {
          res.status(400).json({ error });
        }
      },


      getByPedido: async (req, res) => {
        try {
          const { Pedido_id } = req.params;
          const pedidos = await DetallePedido.find({ Pedido_id })
          .populate("Producto_id")
          .populate("Pedido_id");
          res.json(pedidos);
        } catch (error) {
          res.status(500).json({ error });
        }
      },



    /* getDetallePedidoId: async (req, res) => {
        const { id } = req.params
        try {
            const detallePedido = await DetallePedido.findById(id)
            res.json({ detallePedido })

        } catch (error) {
            res.status(400).json({ error })
        }
    }, */

    postDetallePedido: async (req, res) => {
        try {
            const { Cantidad, Pedido_id, SubTotal, Producto_id } = req.body;
            const detallePedido = new DetallePedido({ Cantidad, Pedido_id, SubTotal, Producto_id });
            detallePedido.save();
            res.json({ detallePedido });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putEditarDetallePedido: async (req, res) => {
        try {
            const { id } = req.params;
            const { Cantidad, Pedido_id, SubTotal, Producto_id } = req.body;
            const detallePedido = await DetallePedido.findByIdAndUpdate(id, { Cantidad, Pedido_id, SubTotal, Producto_id }, { new: true });
            res.json({ detallePedido });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    putDetallePedidoInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const detallePedido = await DetallePedido.findByIdAndUpdate(id, { Estado: 0 }, { new: true });
            res.json({ detallePedido });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putDetallePedidoActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const detallePedido = await DetallePedido.findByIdAndUpdate(id, { Estado: 1 }, { new: true });
            res.json({ detallePedido });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpDetallePedido