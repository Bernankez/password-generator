import { render } from "solid-js/web";
import "./style.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import { Home } from "./pages/home";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <div class="grid h-full min-h-full w-full">
      <Home />
    </div>
  ),
  root!,
);
