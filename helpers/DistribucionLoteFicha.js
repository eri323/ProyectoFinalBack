import DistribucionLoteFicha from "../models/DistribucionLoteFicha.js.js";

const helpersDistribucionLoteFicha = {
    existeId: async (id, req) => {
        const distLoteFicha = await DistribucionLoteFicha.findById(id);
        if (!distLoteFicha) {
            throw new Error(`Distribución no encontrada`);
        }

        req.DistLoteFichaUpdate = distLoteFicha;
    },
};

export default helpersDistribucionLoteFicha;
