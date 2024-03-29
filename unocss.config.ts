import { defineConfig, presetIcons, presetUno, transformerDirectives } from "unocss";
import { presetDaisy } from "unocss-preset-daisy";
/* eslint-disable unused-imports/no-unused-imports */
import type { UserConfig } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetDaisy({
    themes: ["valentine", "bumblebee", "cyberpunk"],
  }), presetIcons()],
  transformers: [transformerDirectives()],
});
