import DetallePedido from "../models/DetallePedido.js";

const helpersDetallePedido = {
    existeId: async (id, req) => {
        const detPedido = await DetallePedido.findById(id);
        if (!detPedido) {
            throw new Error(`Detalle de pedido no encontrado`);
        }

        req.DetPedidoUpdate = detPedido;
    },
};

export default helpersDetallePedido;
