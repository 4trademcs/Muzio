import fs from "fs";
import path from "path";

// Ruta de la carpeta de imágenes
const folder = path.join(process.cwd(), "public/");

// Lee todos los archivos
const files = fs.readdirSync(folder);

// Filtrar solo imágenes .jpg (puedes agregar más extensiones si quieres)
const images = files.filter(f => f.toLowerCase().endsWith(".webp"));

// Renombrar secuencialmente
images.forEach((file, index) => {
  const ext = path.extname(file); // extensión (.jpg)
  const newName = `f-${index + 1}${ext}`;
  const oldPath = path.join(folder, file);
  const newPath = path.join(folder, newName);

  fs.renameSync(oldPath, newPath);
  console.log(`Renombrado: ${file} -> ${newName}`);
});

console.log("✅ Renombrado completado.");
