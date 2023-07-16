import {
  Match,
  Switch,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import {
  generateConstantPassword,
  generatePassword,
  passwordQuality,
} from "@/utils";
import { Checkbox } from "@/components/checkbox";
import { useI18n } from "@/locale";

export function Home() {
  const [t, { locale, setLocale }] = useI18n()!;

  const [password, setPassword] = createSignal("");

  const [error, setError] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  const [collapsed, setCollapsed] = createSignal(true);

  const [quality, setQuality] = createSignal(0);
  createEffect(() => {
    if (password()) {
      setQuality(passwordQuality(password()));
      setCopied(false);
    }
  });
  const strength = createMemo(() => {
    const q = quality();
    if (q >= 0 && q < 64) {
      return 0;
    } else if (q >= 64 && q < 80) {
      return 1;
    } else if (q >= 80 && q < 112) {
      return 2;
    } else if (q >= 112 && q < 128) {
      return 3;
    } else {
      return 4;
    }
  });

  const [formData, _setFormData] = createStore({
    length: 16,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    seed: "",
    flag: "",
  });

  const setFormData = (fn: (state: typeof formData) => void) => {
    _setFormData(produce(fn));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(password());
    setCopied(true);
  };

  const generate = () => {
    if (!formData.seed && !formData.flag) {
      const password = generatePassword({
        number: formData.numbers,
        upper: formData.uppercase,
        lower: formData.lowercase,
        symbol: formData.symbols,
        length: formData.length,
      });
      setPassword(password);
    } else {
      if (!formData.seed) {
        let err = "";
        if (locale() === "en-US") {
          err = t.info.error("Seed is required when using a flag");
        }
        setError(err);
        return;
      }
      if (!formData.flag) {
        setError(t.info.error("Flag is required when using a seed"));
        return;
      }
      const password = generateConstantPassword(formData.seed, formData.flag, {
        number: formData.numbers,
        upper: formData.uppercase,
        lower: formData.lowercase,
        symbol: formData.symbols,
        length: formData.length,
      });
      setPassword(password);
    }
    setError("");
  };

  const passwd = generatePassword({
    number: formData.numbers,
    upper: formData.uppercase,
    lower: formData.lowercase,
    length: formData.length,
  });
  setPassword(passwd);

  return (
    <div class="grid h-full min-h-full w-full items-center justify-items-center">
      <div class="h-max w-max bg-base-200 shadow-xl card">
        <div class="card-body">
          <h2 class="card-title">{t.title()}</h2>
          <form class="flex flex-col flex-gap-4">
            <pre class="appearance-none rounded-full bg-neutral p-x-5 p-y-3 text-center text-5 text-white">
              {password()}
            </pre>
            <div class="flex items-center">
              <span class="w-23 shrink-0 cursor-default">
                {t.form.length()}: {formData.length}
              </span>
              <input
                value={formData.length}
                class="range range-accent"
                type="range"
                min={4}
                max={32}
                step={1}
                onInput={e =>
                  setFormData((s) => {
                    s.length = parseInt(e.target.value);
                  })
                }
              />
            </div>
            <div class="flex flex-wrap items-center justify-center flex-gap-5">
              <Checkbox
                value={formData.numbers}
                onValue={v => setFormData(s => (s.numbers = v))}
              >
                {t.form.number()}
              </Checkbox>
              <Checkbox
                value={formData.uppercase}
                onValue={v => setFormData(s => (s.uppercase = v))}
              >
                {t.form.uppercase()}
              </Checkbox>
              <Checkbox
                value={formData.lowercase}
                onValue={v => setFormData(s => (s.lowercase = v))}
              >
                {t.form.lowercase()}
              </Checkbox>
              <Checkbox
                value={formData.symbols}
                onValue={v => setFormData(s => (s.symbols = v))}
              >
                {t.form.symbols()}
              </Checkbox>
            </div>
            <div class="collapse">
              <input
                type="checkbox"
                checked={collapsed()}
                onInput={e => setCollapsed(e.currentTarget.checked)}
              />
              <div class="flex justify-between p-x-0 text-5 font-bold collapse-title">
                <span>{t.form.optional()}</span>
                <div
                  class={`i-ep:arrow-right-bold ${
                    collapsed() ? "rotate-90" : ""
                  } transition`}
                />
              </div>
              <div class="flex flex-col flex-gap-2 collapse-content">
                <div>
                  {t.form.seedDesc()}
                  <div class="w-full join">
                    <div class="w-fit shrink-0 rounded-l-full bg-accent p-x-5 font-medium text-accent-content label join-item">
                      {t.form.seed()}
                    </div>
                    <input
                      class="w-full rounded-r-full input input-bordered join-item"
                      value={formData.seed}
                      onInput={e =>
                        setFormData(s => (s.seed = e.currentTarget.value))
                      }
                    />
                  </div>
                </div>
                <div>
                  {t.form.flagDesc()}
                  <div class="w-full join">
                    <div class="shrink-0 rounded-l-full bg-accent p-x-5 font-medium label join-item">
                      {t.form.flag()}
                    </div>
                    <input
                      class="w-full rounded-r-full input input-bordered join-item"
                      value={formData.flag}
                      onInput={e =>
                        setFormData(s => (s.flag = e.currentTarget.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <progress
              class={`w-full progress ${
                [0].includes(strength())
                  ? "progress-error"
                  : [1, 2].includes(strength())
                  ? "progress-warning"
                  : "progress-success"
              }`}
              value={quality() / 1.28}
              max="100"
            />
            <div class="text-center">{t.strength[strength()]()}</div>
            <div class="flex justify-center">
              <button
                class="btn btn-circle"
                onClick={(e) => {
                  e.preventDefault();
                  generate();
                }}
              >
                <div class="i-tabler:refresh text-7" />
              </button>
            </div>
            <button
              class="uppercase btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                copy();
              }}
            >
              {t.copy()}
            </button>
            <Switch>
              <Match when={error()}>
                <div class="flex cursor-default justify-center alert alert-error">
                  <span>{error()}</span>
                </div>
              </Match>
              <Match when={!copied()}>
                <div class="flex cursor-default justify-center alert alert-warning">
                  <span class="uppercase">{t.info.notCopied()}</span>
                </div>
              </Match>
              <Match when={copied()}>
                <div class="flex cursor-default justify-center alert alert-success">
                  <div class="i-mdi:success" />
                  <span class="uppercase">{t.info.copied()}</span>
                </div>
              </Match>
            </Switch>
          </form>
        </div>
      </div>
    </div>
  );
}
