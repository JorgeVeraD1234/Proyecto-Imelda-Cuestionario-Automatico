import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } from "../controllers/user_controller.js"
import {
  obtenerPreguntasPorTemaYNivel,
  crearPregunta,
  obtenerTodasLasPreguntas
} from "../controllers/question_controller.js"
import {
  crearCuestionario,
  obtenerCuestionarios,
  obtenerCuestionarioPorId,
  actualizarCuestionario,
  eliminarCuestionario,
  responderCuestionario
} from "../controllers/questionnaire_controller.js"






export const router = express.Router();

//Usuario rutas
router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);


router.get("/preguntas", obtenerPreguntasPorTemaYNivel)
router.post("/preguntas", crearPregunta)
router.get("/preguntas/todas", obtenerTodasLasPreguntas)


router.post("/cuestionarios", crearCuestionario)
router.get("/cuestionarios", obtenerCuestionarios)
router.get("/cuestionarios/:id", obtenerCuestionarioPorId)
router.put("/cuestionarios/:id", actualizarCuestionario)
router.delete("/cuestionarios/:id", eliminarCuestionario)
router.post("/cuestionarios/:id/responder", responderCuestionario);
