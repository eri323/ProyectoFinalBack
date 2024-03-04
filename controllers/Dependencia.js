import Area from "../models/Dependencia.js";

const httpArea = {
    getArea: async (req, res) => {
        try {
            const areaList = await Area.find();
            res.json({  areaList });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    getAreaId: async (req, res) => {
        const { id } = req.params;
        try {
            const area = await Area.findById(id);
            res.json({ area });
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    postArea: async (req, res) => {
        try {
            const { Nombre } = req.body;
            const area = new Area({ Nombre });
            area.save();
            res.json({ area });
        } catch (error) {
            res.status(400).json({ error });
        }

    },

    putArea: async (req, res) => {
        try {
            const { id } = req.params;
            const { Nombre } = req.body;
            const area = await Area.findByIdAndUpdate(id, { Nombre }, { new: true });
            res.json({ area });
        } catch (error) {
            res.status(400).json({ error: "Error en el servidor" });
        }
    },


    putAreaInactivar: async (req, res) => {
        try {
            const { id } = req.params;
            const area = await Area.findByIdAndUpdate(id, { Estado: 0 }, { new: true });
            res.json({ area });
        } catch (error) {
            res.status(400).json({ error });
        }
    },


    putAreaActivar: async (req, res) => {
        try {
            const { id } = req.params;
            const area = await Area.findByIdAndUpdate(id, { Estado: 1 }, { new: true });
            res.json({ area });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

};

export default httpArea;
