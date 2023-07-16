import { createMemo, createSignal } from "solid-js";
import { useI18n } from "@/locale";

export function Header() {
  const [_, { locale, setLocale: _setLocale }] = useI18n()!;

  const flag = createMemo(() => {
    switch (locale()) {
      case "zh-CN":
        return "i-twemoji:flag-china";
      case "en-US":
        return "i-twemoji:flag-us-outlying-islands";
      case "zh-TW":
        return "i-twemoji:flag-taiwan";
    }
  });

  const THEME_KEY = "pwgen_theme";
  const localTheme = localStorage.getItem(THEME_KEY) || "valentine";
  const [theme, _setTheme] = createSignal(localTheme);

  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    _setTheme(theme);
  };

  setTheme(localTheme);

  const LOCALE_KEY = "pwgen_locale";
  const localLocale = localStorage.getItem(LOCALE_KEY) || "zh-CN";

  const setLocale = (...args: Parameters<typeof _setLocale>) => {
    localStorage.setItem(LOCALE_KEY, args[0] as string);
    _setLocale(...args);
  };

  setLocale(localLocale as any);

  return (
    <div class="absolute left-0 right-0 top-0 z-1 h-15 w-full flex justify-end flex-gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex={0} class="m-1 border-none bg-transparent btn">
          {theme()}
        </label>
        <ul
          tabindex={0}
          class="dropdown-content z-1 w-52 w-fit bg-base-100 p-2 shadow menu rounded-box"
        >
          <li>
            <div class="p-2" onClick={() => setTheme("valentine")}>
              <div>Valentine</div>
            </div>
          </li>
          <li>
            <div class="p-2" onClick={() => setTheme("cyberpunk")}>
              <div>Cyberpunk</div>
            </div>
          </li>
          <li>
            <div class="p-2" onClick={() => setTheme("bumblebee")}>
              <div>Bumblebee</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label
          tabindex={0}
          class="m-1 border-none bg-transparent btn btn-square"
        >
          <div class={`${flag()} text-7`} />
        </label>
        <ul
          tabindex={0}
          class="dropdown-content z-1 w-52 w-fit bg-base-100 p-2 shadow menu rounded-box"
        >
          <li>
            <div class="p-2" onClick={() => setLocale("zh-CN")}>
              <div class="i-twemoji:flag-china text-7" />
            </div>
          </li>
          <li>
            <div class="p-2" onClick={() => setLocale("en-US")}>
              <div class="i-twemoji:flag-us-outlying-islands text-7" />
            </div>
          </li>
          <li>
            <div class="p-2" onClick={() => setLocale("zh-TW")}>
              <div class="i-twemoji:flag-taiwan text-7" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
