import Ficha from "../models/Ficha.js";

const helpersFicha = {
    existeId: async (id, req) => {
        const ficha = await Ficha.findById(id);
        if (!ficha) {
            throw new Error(`Ficha no encontrada`);
        }

        req.FichaUpdate = ficha;
    },

    validarFechas: async (FechaInicio, req) => {
        const fechaActual = new Date();
        const fechaFin = req.req.body.FechaFin;

        if (FechaInicio <= fechaActual) {
            throw new Error("La fecha de inicio debe ser mayor que la fecha actual");
        }
        if (fechaFin <= FechaInicio) {
            throw new Error("La fecha de fin debe ser mayor a la de inicio");
        }
    },
    validarFichaUnica: async (CodigoFicha) => {
        const existe = await Ficha.findOne({ CodigoFicha });

        if (existe) {
            throw new Error("La ficha ya esta registrada");
        }
    },
    validarFichaUnicaEditar: async (id, CodigoFicha) => {
        try {
            const fichaExiste = await Ficha.findOne({
                CodigoFicha,
                _id: { $ne: id },
            });

            if (fichaExiste) {
                throw new Error("Ya existe una ficha con este codigo");
            }

            return true;
        } catch (error) {
            throw error;
        }
    },
};
export default helpersFicha;
