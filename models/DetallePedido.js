import mongoose from "mongoose";
const DetallePedidoSchema = new mongoose.Schema({
    Cantidad: { type: Number, required: true },
    createAT: { type: Date, default: Date.now },
    Estado: { type: Number, default: 1 },
    Pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
    Producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true }
})
export default mongoose.model("DetallePedido", DetallePedidoSchema)