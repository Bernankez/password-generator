import { render } from "solid-js/web";
import "./style.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import { Home } from "./pages/home";
import { I18nProvider } from "./locale";
import { Header } from "./components/header";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <I18nProvider>
      <div class="grid h-full min-h-full w-full">
        <Header />
        <Home />
      </div>
    </I18nProvider>
  ),
  root!,
);
