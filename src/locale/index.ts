import { createChainedI18nContext } from "@solid-primitives/i18n";

export const dictionary = {
  "zh-CN": {
    title: "密码生成器",
    form: {
      length: "长度",
      number: "数字",
      uppercase: "大写字母",
      lowercase: "小写字母",
      symbols: "符号",
      optional: "可选项",
      seed: "种子",
      seedDesc: "一串助记字符",
      flag: "标志",
      flagDesc: "一串用于标识的字符，比如wechat",
    },
    strength: {
      0: "非常弱",
      1: "弱",
      2: "中等",
      3: "强",
      4: "非常强",
    },
    copy: "复制密码",
    info: {
      notCopied: "未复制",
      copied: "已复制",
      error: (prop: string) => prop,
    },
  },
  "zh-TW": {
    title: "密碼生成器",
    form: {
      length: "長度",
      number: "數字",
      uppercase: "大寫字母",
      lowercase: "小寫字母",
      symbols: "符號",
      optional: "可選項",
      seed: "種子碼",
      seedDesc: "一組助記碼",
      flag: "標識",
      flagDesc: "一組用於標識的字串，像 `wechat`",
    },
    strength: {
      0: "非常弱",
      1: "弱",
      2: "中等",
      3: "強",
      4: "非常強",
    },
    copy: "複製密碼",
    info: {
      notCopied: "未複製",
      copied: "已複製",
      error: prop => prop,
    },
  },
  "en-US": {
    title: "Password Generator",
    form: {
      length: "Length",
      number: "Numbers",
      uppercase: "Uppercase",
      lowercase: "Lowercase",
      symbols: "Symbols",
      optional: "Optional",
      seed: "SEED",
      seedDesc: "A mnemonic code",
      flag: "FLAG",
      flagDesc: "A distinguishing code, like `tiktok`",
    },
    strength: {
      0: "Very weak",
      1: "Weak",
      2: "Moderate",
      3: "Strong",
      4: "Very strong",
    },
    copy: "copy password",
    info: {
      notCopied: "not copied",
      copied: "copied",
      error: (prop: string) => prop,
    },
  },
};

export const [I18nProvider, useI18n] = createChainedI18nContext({
  dictionaries: dictionary,
  locale: "zh-CN",
});

