import type { JSX } from "solid-js";

export interface Props<T> {
  value: boolean;
  onValue: (value: boolean) => void;
}

export function Checkbox<T>(props: Props<T> & { children?: JSX.Element }) {
  return (
    <label class="flex cursor-pointer items-center flex-gap-2 label">
      <input
        type="checkbox"
        checked={props.value}
        class="checkbox"
        onInput={e => props.onValue(e.target.checked)}
      />
      <span class="label-text">{props.children}</span>
    </label>
  );
}
