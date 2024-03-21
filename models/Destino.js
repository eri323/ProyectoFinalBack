import mongoose from "mongoose";

const destinoSchema = new mongoose.Schema({
    Codigo: {type:String, require:true, unique:true},
    Nombre: {type:String, require:true},
    Abreviatura: {type: String},
    NivelFormacion: {type:String, require:true},
    FechaInicio:{type:Date, require:true},
    FechaFin:{type:Date, require:true},
    Estado:{type:Boolean, default:1},
    createAT : {type:Date,default: Date.now }
});


export default mongoose.model("Destino", destinoSchema)