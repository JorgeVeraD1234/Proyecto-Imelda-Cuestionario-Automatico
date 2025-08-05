import mongoose from "mongoose"

const preguntaSchema = new mongoose.Schema({
  etiqueta: String, // ej. "Ciencia"
  nivel: String, // ej. "Básico"
  pregunta: String,
  opciones: [String],
  respuestaCorrecta: String
})

export const Pregunta = mongoose.model("Pregunta", preguntaSchema)
