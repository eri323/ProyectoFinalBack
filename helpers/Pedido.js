import Pedido from "../models/Pedido.js";

const helpersPedido = {
    existeId: async (id, req) => {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            throw new Error(`Pedido no encontrado`);
        }

        req.PedidoUpdate = pedido;
    },
};

export default helpersPedido;