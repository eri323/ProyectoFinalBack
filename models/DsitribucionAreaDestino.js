import mongoose from "mongoose";

const disAreaDestinoSchema = new mongoose.Schema({
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: { type:Number, require:true},
    DistribucionRedArea_id: {type:mongoose.Schema.Types.ObjectId,ref:'DistribucionRedArea', require:true},
    Destino_id : {type:mongoose.Schema.Types.ObjectId,ref:'Destino', require:true},
    Año: {type: Date, require: true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionAreaDestino", disAreaDestinoSchema)