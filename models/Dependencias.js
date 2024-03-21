import mongoose from "mongoose";

const dependenciaSchema = new mongoose.Schema({
    Nombre: { type: String, index: "text", require:true, unique: true},
    Codigo: { type: String, index:"text", require:true, unique:true},
   /*  PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: {type:Number, require:true},
    Año: {type: Date, require: true}, */
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});


export default mongoose.model("Dependencias", dependenciaSchema)