import { Pregunta } from '../models/question.js'

// Obtener preguntas por tema y nivel
export const obtenerPreguntasPorTemaYNivel = async (req, res) => {
    const { tema, nivel } = req.query
    try {
        const preguntas = await Pregunta.find({ etiqueta: tema, nivel }).limit(10)
        res.json(preguntas)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener preguntas" })
    }
}

// Crear una nueva pregunta
export const crearPregunta = async (req, res) => {
    const { etiqueta, nivel, pregunta, opciones, respuestaCorrecta } = req.body
    try {
        const nuevaPregunta = new Pregunta({
            etiqueta,
            nivel,
            pregunta,
            opciones,
            respuestaCorrecta
        })
        await nuevaPregunta.save()
        res.status(201).json(nuevaPregunta)
    } catch (error) {
        res.status(500).json({ error: "Error al crear la pregunta" })
    }
}

// Obtener todas las preguntas (opcional)
export const obtenerTodasLasPreguntas = async (req, res) => {
    try {
        const preguntas = await Pregunta.find()
        res.json(preguntas)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener todas las preguntas" })
    }
}
