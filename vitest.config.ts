import path from "path";
import { fileURLToPath } from "url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, "**/playwright/**"],
    alias: {
      "~/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(
        __dirname,
        "./src/features/common/components"
      ),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
});
