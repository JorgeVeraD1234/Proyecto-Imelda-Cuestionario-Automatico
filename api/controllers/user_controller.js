import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Crear usuario con contraseña cifrada y token
export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "clave_predeterminada", {
      expiresIn: "1d"
    });

    res.status(201).json({
      user: { _id: newUser._id, username: newUser.username },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios (sin contraseña)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario (con rehash de contraseña si se modifica)
export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    let updatedFields = { ...rest };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
      runValidators: true
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión de usuario
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "clave_predeterminada", {
      expiresIn: "1d"
    });

    res.json({
      user: { _id: user._id, username: user.username },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
