import { Home } from "./pages/home";
import { I18nProvider } from "./locale";
import { Header } from "./components/header";

export function App() {
  return (
  <I18nProvider>
    <div class="grid h-full min-h-full w-full">
      <Header />
      <Home />
    </div>
  </I18nProvider>
  );
}

