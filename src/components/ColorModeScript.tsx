// copied from  https://github.com/chakra-ui/chakra-ui/blob/a61cc65d2367ac21c9d25a9a2bac1a8b4a87b927/packages/components/color-mode/src/color-mode-script.tsx
export type ColorModeScriptProps = {
  // type?: "localStorage" | "cookie";
  type?: "localStorage";
  initialColorMode?: "light" | "dark" | "auto";
  storageKey?: string;
  nonce?: string;
};

const VALID_VALUES = new Set(["dark", "light", "auto"]);

/**
 * runtime safe-guard against invalid color mode values
 */
function normalize(initialColorMode: "light" | "dark" | "auto") {
  let value = initialColorMode;
  if (!VALID_VALUES.has(value)) {
    value = "light";
  }
  return value;
}

export function getScriptSrc(props: ColorModeScriptProps = {}) {
  const {
    initialColorMode = "light",
    type = "localStorage",
    storageKey: key = "theme",
  } = props;

  // runtime safe-guard against invalid color mode values
  const init = normalize(initialColorMode);

  // const isCookie = type === "cookie";

  // 这个用不到，本站暂时没有 cookie
  // const cookieScript = `(function(){try{var a=function(o){var l="(prefers-color-scheme: dark)",v=window.matchMedia(l).matches?"dark":"light",e=o==="system"?v:o,d=document.documentElement,m=document.body,i="chakra-ui-light",n="chakra-ui-dark",s=e==="dark";return m.classList.add(s?n:i),m.classList.remove(s?i:n),d.style.colorScheme=e,d.dataset.theme=e,e},u=a,h="${init}",r="${key}",t=document.cookie.match(new RegExp("(^| )".concat(r,"=([^;]+)"))),c=t?t[2]:null;c?a(c):document.cookie="".concat(r,"=").concat(a(h),"; max-age=31536000; path=/")}catch(a){}})();
  // `;

  // windicss / unocss 默认基于 class 的主题切换
  const localStorageScript = `
  (function () {
  try {
    var a = function (c) {
        var v = '(prefers-color-scheme: dark)',
          h = window.matchMedia(v).matches ? 'dark' : 'light',
          r = c === 'auto' ? h : c,
          o = document.documentElement,
          l = 'light',
          d = 'dark',
          i = r === 'dark'
        return (
          o.classList.add(i ? d : l),
          o.classList.remove(i ? l : d),
          r
        )
      },
      n = a,
      m = '${init}',
      e = '${key}',
      t = localStorage.getItem(e)
    t ? a(t) : localStorage.setItem(e, a(m))
  } catch (a) {}
})()
`;

  // const fn = isCookie ? cookieScript : localStorageScript;
  const fn = localStorageScript;
  return `!${fn}`.trim();
}

export function ColorModeScript(props: ColorModeScriptProps = {}) {
  const { nonce } = props;

  return (
    <script id="chakra-script" nonce={nonce} v-html={getScriptSrc(props)} />
  );
}
