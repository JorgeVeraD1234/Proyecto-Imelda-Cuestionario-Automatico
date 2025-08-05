import mongoose from "mongoose"

const cuestionarioSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  tema: String,
  dificultad: String,
  preguntas: [
    {
      etiqueta: String,
      nivel: String,
      pregunta: String,
      opciones: [String],
      respuestaCorrecta: String
    }
  ]
})

export const Cuestionario = mongoose.model("Cuestionario", cuestionarioSchema)
