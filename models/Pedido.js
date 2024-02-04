import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
    FechaCreacion: { type: Date, required: true },
    FechaEntrega: { type: Date, required: true },
    DistribucionLoteFicha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DistribucionLoteFicha', required: true },
    Subtotal: { type: Number, required: true },
    Total: { type: Number, required: true },
    createAT: { type: Date, default: Date.now },
    Estado: { type: String, default: 1 },
})



export default mongoose.model("Pedido", PedidoSchema);