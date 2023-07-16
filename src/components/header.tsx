import { createMemo } from "solid-js";
import { useI18n } from "@/locale";

export function Header() {
  const [_, { locale, setLocale }] = useI18n()!;

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

  return (
    <div class="absolute left-0 right-0 top-0 z-1 h-15 w-full flex">
      <div class="m-l-auto dropdown dropdown-end">
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
