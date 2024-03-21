import DisRedArea from "../models/DistribucionRedArea.js";

const httpDisRedArea = {

  getDisRedArea: async (req, res) => {
    try {
      const disRedAreas = await DisRedArea.find()
        .populate({ path: "DistribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
        .populate("AreaTematica_id");
      res.json(disRedAreas);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findById(id)
      .populate({ path: "DsitribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
      .populate("AreaTematica_id");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getByIdDistribucion: async (req, res)=>{
    try {
      const { DsitribucionDependenciaRed_id } = req.params

      const disRedArea = await DisRedArea.find({DsitribucionDependenciaRed_id})
      .populate({ path: "DsitribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
      .populate("AreaTematica_id");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({error})
    }
  },

  // Post
  post: async (req, res) => {
    try {
      const { PresupuestoAsignado, DsitribucionDependenciaRed_id,AreaTematica_id ,Año } = req.body;
      const disRedArea = new DisRedArea({
        PresupuestoAsignado,
        PresupuestoDisponible:PresupuestoAsignado,
        DsitribucionDependenciaRed_id,
        AreaTematica_id,
        Año
      });
      await disRedArea.save();
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Put
  putEditar: async (req, res) => {
    try {
      const { id } = req.params;
      const {  PresupuestoAsignado, DsitribucionDependenciaRed_id,AreaTematica_id ,Año} = req.body;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        {  PresupuestoAsignado, DsitribucionDependenciaRed_id,AreaTematica_id ,Año },
        { new: true }
      );
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  // putEditar: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { presupuestoAsignado, DsitribucionDependenciaRed_id, AreaTematica_id, Año } = req.body;

  //     const disAreaDestino = await DisAreaDestino.find({
  //       idDisAreaDestino: id
  //     });

  //     const totalPresupuestos = disAreaDestino.reduce((total, disAreaDestino) => {
  //       return total + disAreaDestino.presupuesto;
  //     }, 0);

  //     const presupuestoDisponible = presupuesto - totalPresupuestos;

  //     const distribucion = await DisRedArea.findByIdAndUpdate(
  //       id,
  //       {
  //         presupuestoAsignado,
  //         presupuestoDisponible,
  //         DsitribucionDependenciaRed_id,
  //         AreaTematica_id,
  //         Año
  //       }, { new: true }
  //     ).populate({ path: "DsitribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
  //     .populate("AreaTematica_id");
  //     res.json(distribucion);
  //   } catch (error) {
  //     res.status(400).json({ error });
  //   }
  // },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { presupuestoAsignado } = req.body;

      const disRedArea = await DisRedArea.findById(id)
      const presupuestoDisponible = disRedArea.PresupuestoDisponible - presupuestoAsignado

      const updatedDisRedArea = await DisRedArea.findByIdAndUpdate(id,
        { presupuestoDisponible },
        { new: true }
      );

      res.json(updatedDisRedArea);

    } catch (error) {
      res.status(400).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate({ path: "DsitribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
      .populate("AreaTematica_id");

      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const disRedArea = await DisRedArea.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      )
      .populate({ path: "DsitribucionDependenciaRed_id", populate: [{ path: "Dependencia_id" }, { path: "Red_id" }] })
      .populate("AreaTematica_id");
      res.json(disRedArea);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};

export default httpDisRedArea;
