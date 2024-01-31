import Ficha from "../models/Ficha.js";

const httpFicha = {

    getFichas: async (req, res) => {
        try {
            const fichas = await Ficha.find().populate("Area_Id");
            res.json({ fichas });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    getFichaById: async (req, res) => {
        const { id } = req.params;
        try {
            const ficha = await Ficha.findById(id);
            res.json({ ficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postFicha: async (req, res) => {
        try {
            const { CodigoFicha, Nombre, NivelFormacion, FechaInicio, FechaFin, Area_Id } = req.body;
            const ficha = new Ficha({ CodigoFicha, Nombre, NivelFormacion, FechaInicio, FechaFin, Area_Id });
            ficha.save();
            res.json({ ficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putFicha: async (req, res) => {
        try {
            const { id } = req.params;
            const { CodigoFicha, Nombre, NivelFormacion, FechaInicio, FechaFin, Area_Id } = req.body;
            const ficha = await Ficha.findByIdAndUpdate(
                id,
                { CodigoFicha, Nombre, NivelFormacion, FechaInicio, FechaFin, Area_Id },
                { new: true }
            );
            res.json({ ficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putFichaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const ficha = await Ficha.findByIdAndUpdate(
                id,
                { Estado: 0 },
                { new: true }
            );
            res.json({ ficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    putFichaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const ficha = await Ficha.findByIdAndUpdate(
                id,
                { Estado: 1 },
                { new: true }
            );
            res.json({ ficha });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpFicha;
