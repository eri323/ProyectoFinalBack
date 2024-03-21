import Entrada from "../models/Entrada.js";

const helperEntrada = {
    validarEntradaUnica: async (Nombre)=>{
        const existe = await Entrada.findOne({Nombre})
        if(existe){
            throw new Error("La entrada ya esta registrada")
        }
    },
    validarEntradaUnicaEditar:async (id, Nombre)=>{
        try{
            const entradaExiste = await Entrada.findOne({
                Nombre,
                _id: {$ne :id},

            });
            if(entradaExiste){
                throw new Error ("Ya existe una entrada con ese Nombre ")
            }

            return true;

            xº

        }catch (error) {
            throw error;
        }
    }

}
export default helperEntrada