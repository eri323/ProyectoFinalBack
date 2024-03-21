import mongoose from "mongoose";

const  disContratoLoteSchema = new mongoose.Schema({
    Codigo: { type: String, index:"text", require:true, unique:true},
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: {type:Number, require:true},
    Contrato_id:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato', require:true},
    Lote_id:{type:mongoose.Schema.Types.ObjectId,ref:'Lote', require:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});

export default mongoose.model("DistribucionContratoLote", disContratoLoteSchema)

