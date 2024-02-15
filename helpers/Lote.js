import Lote from "../models/Lote.js";

const helpersLote = {
    existeId: async (id, req) => {
        const existe = await Lote.findById(id);

        if (!existe) {
            throw new Error(`El id no existe ${id}`);
        }

        req.req.LoteUpdate = existe;
    },

    existeNombre: async (Nombre, req) => {
        if (Nombre) {
            const existe = await Lote.findOne({ $text: { $search: Nombre } });
            if (existe) {
                if (req.req.method === "PUT") {
                    throw new Error(
                        `Ya existe ese lote en la base de datos!!! ${Nombre}`
                    );
                } else if (req.req.method === "POST")
                    throw new Error(
                        `Ya existe ese lote en la base de datos!!! ${Nombre}`
                    );
            }
        }
    },
};
export default helpersLote;
