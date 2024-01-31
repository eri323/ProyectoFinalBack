import mongoose from "mongoose";
const AreaSchema = new mongoose.Schema({
    Nombre:{type: String, required: true},
    createAT : {type:Date,default: Date.now},
    Estado: { type: Number, default: 1 }
})
export default mongoose.model("Area", AreaSchema)