import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./about.html", import.meta.url)),
        lab: fileURLToPath(new URL("./lab.html", import.meta.url)),
        blog: fileURLToPath(new URL("./blog.html", import.meta.url)),
        contact: fileURLToPath(new URL("./contact.html", import.meta.url)),
        roomInside: fileURLToPath(
          new URL("./blog-room-inside-the-name.html", import.meta.url)
        ),
        buildingTogether: fileURLToPath(
          new URL("./blog-building-together.html", import.meta.url)
        ),
        labNotes: fileURLToPath(new URL("./blog-lab-notes-01.html", import.meta.url)),
        interfaces: fileURLToPath(
          new URL("./blog-interfaces-that-exhale.html", import.meta.url)
        )
      }
    }
  }
});
