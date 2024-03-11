import Area from "../models/Dependencia.js";

const helpersArea = {
    validarAreaUnica: async(Nombre, )=>{
        
        const existe = await Area.findOne({Nombre})
    
        if(existe){
            throw new Error("La area ya esta registrada")
        }
       
    }, 
    validarAreaUnicaEditar: async (id, Nombre) => {
        try {
            const areaExiste = await Area.findOne({
                Nombre,
                _id: { $ne: id },
            });

            if (areaExiste) {
                throw new Error("Ya existe un area con este nombre");
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
}
export default helpersArea