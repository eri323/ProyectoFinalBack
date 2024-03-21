import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  Numero: {type: Number, unique: true},
  FechaEntrega: { type: Date, required: true },
  /* DistribucionLoteFicha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DistribucionLoteFicha', required: true }, */
  /*  Subtotal: { type: Number, required: true }, */
  Total: { type: Number, required: true },
  Entregado: { type: Boolean, required: true },
  createAT: { type: Date, default: Date.now },
  Estado: { type: String, default: 1 },
  InstructorEncargado_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  Destino_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destino",
    require: true,
  },
});

export default mongoose.model("Pedido", PedidoSchema);
