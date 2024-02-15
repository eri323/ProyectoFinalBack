import { Router } from "express";
import { check } from "express-validator";
import httpPedido from "../controllers/Pedido.js";
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();

routers.get('/pedidobusca', [validarCampos], httpPedido.getPedidos);

routers.get('/pedidoabuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.getPedidosId);

routers.post('/pedidocrear', [
    check("FechaCreacion", "Se necesita la fecha de creacion").not().isEmpty(),
    check("FechaEntrega", "Se necesita la fecha de entrega").not().isEmpty(),
    /*     check("DistribucionLoteFicha_id", "Se necesita la DistribucionLoteFicha_id").not().isEmpty(), 
        check("Subtotal", "Se necesita el subtotal").not().isEmpty(),  */
    check("Total", "Se necesita el total").not().isEmpty(),
    check("Entregado", "¿El pedido esta entregado?").not().isEmpty(),
    check("Usuario_Id", "Identifique el usuario").not().isEmpty(),
    check("Ficha_Id", "A que ficha corresponde el pedido").not().isEmpty(),
    validarCampos
], httpPedido.postPedidos);

routers.put('/pedidomodificar/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("FechaCreacion", "Se necesita la fecha de creacion").not().isEmpty(),
    check("FechaEntrega", "Se necesita la fecha de entrega").not().isEmpty(),
    /*   check("IdDistribucionLoteFicha", "Se necesita el IdDistribucionLoteFicha").not().isEmpty().isMongoId(), 
      check("Subtotal", "Se necesita el subtotal").not().isEmpty(),  */
    check("Total", "Se necesita el total").not().isEmpty(),
    check("Entregado", "¿El pedido esta entregado?").not().isEmpty(),
    check("Usuario_Id", "Identifique el usuario").not().isEmpty(),
    check("Ficha_Id", "A que ficha corresponde el pedido").not().isEmpty(),
    validarCampos
], httpPedido.putPedidos);

routers.put('/pedidoinac/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.putPedidosInactivar);

routers.put('/pedidoact/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.putPedidosActivar);

export default routers;
