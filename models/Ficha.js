import mongoose from "mongoose";
const FichaSchema = new mongoose.Schema({
  CodigoFicha: { type: Number, required: true },
  Nombre: { type: String, required: true },
  NivelFormacion: { type: String, required: true },
  FechaInicio: { type: Date, required: true },
  FechaFin: { type: Date, required: true },
  createAT: { type: Date, default: Date.now },
  Estado: { type: Number, default: 1 },
  Area_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
});
export default mongoose.model("Ficha", FichaSchema);
