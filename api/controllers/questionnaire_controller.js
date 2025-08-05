import { Cuestionario } from "../models/questionnaire.js"
import { Pregunta } from "../models/question.js"

// Crear un nuevo cuestionario con 10 preguntas según tema y dificultad
export const crearCuestionario = async (req, res) => {
  const { tema, dificultad, titulo, descripcion } = req.body
  try {
    const preguntas = await Pregunta.find({ etiqueta: tema, nivel: dificultad }).limit(5)

    if (preguntas.length === 0) {
      return res.status(404).json({ error: "No se encontraron preguntas para ese tema y nivel" })
    }

    const nuevoCuestionario = new Cuestionario({
      titulo,
      descripcion,
      tema,
      dificultad,
      preguntas
    })

    await nuevoCuestionario.save()
    res.status(201).json(nuevoCuestionario)
  } catch (error) {
    res.status(500).json({ error: "Error al crear el cuestionario" })
  }
}

// Obtener todos los cuestionarios (solo título y descripción)
export const obtenerCuestionarios = async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find({}, "titulo descripcion")
    res.json(cuestionarios)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cuestionarios" })
  }
}

// Obtener un cuestionario por ID
export const obtenerCuestionarioPorId = async (req, res) => {
  try {
    const cuestionario = await Cuestionario.findById(req.params.id)
    if (!cuestionario) {
      return res.status(404).json({ error: "Cuestionario no encontrado" })
    }
    res.json(cuestionario)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cuestionario" })
  }
}

// Modificar título y descripción de un cuestionario
export const actualizarCuestionario = async (req, res) => {
  const { titulo, descripcion } = req.body
  try {
    const actualizado = await Cuestionario.findByIdAndUpdate(
      req.params.id,
      { titulo, descripcion },
      { new: true }
    )
    if (!actualizado) {
      return res.status(404).json({ error: "Cuestionario no encontrado" })
    }
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cuestionario" })
  }
}

export const eliminarCuestionario = async (req, res) => {
  try {
    const eliminado = await Cuestionario.findByIdAndDelete(req.params.id)
    if (!eliminado) {
      return res.status(404).json({ error: "Cuestionario no encontrado" })
    }
    res.json({ mensaje: "Cuestionario eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cuestionario" })
  }
}


export const responderCuestionario = async (req, res) => {
  const { respuestas } = req.body; // respuestas esperadas en formato: { "0": "Opción A", "1": "Opción B", ... }

  try {
    const cuestionario = await Cuestionario.findById(req.params.id);
    if (!cuestionario) {
      return res.status(404).json({ error: "Cuestionario no encontrado" });
    }

    let aciertos = 0;
    cuestionario.preguntas.forEach((pregunta, index) => {
      if (respuestas[index] === pregunta.respuestaCorrecta) {
        aciertos++;
      }
    });

    res.json({
      aciertos,
      totalPreguntas: cuestionario.preguntas.length,
      porcentaje: ((aciertos / cuestionario.preguntas.length) * 100).toFixed(2),
      mensaje: aciertos === cuestionario.preguntas.length 
        ? "¡Excelente! Respondiste todo correctamente 🎉" 
        : aciertos >= cuestionario.preguntas.length / 2 
          ? "¡Buen trabajo! Puedes seguir mejorando 💪" 
          : "No te preocupes, sigue practicando ✨"
    });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar las respuestas" });
  }
};
