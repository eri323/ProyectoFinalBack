import mongoose from "mongoose";

const disRedAreaSchema = new mongoose.Schema({
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: { type:Number, require:true},
    Año: {type: Date, require: true},
    DistribucionDependenciaRed_id: {type:mongoose.Schema.Types.ObjectId,ref:'DisDependenciaRed', require:true},
    AreaTematica_id:{type:mongoose.Schema.Types.ObjectId,ref:'Area', require:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});


export default mongoose.model("DistribucionRedArea", disRedAreaSchema)