const STORAGE_KEY = "latex-online-editor";
const DEFAULT_LANGUAGE = "en";

const templates = {
  quadratic: String.raw`\[
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\]`,
  matrix: String.raw`\[
\det\begin{pmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{pmatrix}
=
a(ei - fh) - b(di - fg) + c(dh - eg)
\]`,
  calculus: String.raw`\[
\lim_{n \to \infty}\int_{0}^{1} x^n\,dx = \lim_{n \to \infty}\frac{1}{n+1} = 0
\]`,
  physics: String.raw`\[
\left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r})\right]\Psi(\mathbf{r}, t)
= i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r}, t)
\]`,
  statistics: String.raw`\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0,1,\dots,n
\]`
};

const translations = {
  en: {
    currentMode: "Current mode",
    modeHint: "Switching the render mode refreshes the preview automatically.",
    formulaSource: "Formula Source",
    clear: "Clear",
    copySource: "Copy Source",
    starterTemplate: "Starter template",
    formulaDisplayMode: "Formula display mode",
    templateQuadratic: "Quadratic equation",
    templateMatrix: "Matrix and determinant",
    templateCalculus: "Calculus",
    templatePhysics: "Physics",
    templateStatistics: "Statistics",
    displayMode: "Display",
    inlineMode: "Inline",
    loadTemplate: "Load Template",
    quickSnippets: "Quick snippets",
    snippetFraction: "Fraction",
    snippetRoot: "Root",
    snippetSeries: "Series",
    snippetIntegral: "Integral",
    snippetMatrix: "Matrix",
    status: "Status",
    statusHint: "Source is automatically stored in this browser.",
    livePreview: "Live Preview",
    copyWrapped: "Copy Wrapped Source",
    copyShareLink: "Copy Share Link",
    exportSvg: "Export SVG",
    exportPng: "Export PNG",
    previewMeta: "Inspired by the live-demo direction on the MathJax homepage, shipped as a zero-build static site.",
    waiting: "Waiting for input",
    rendered: "Rendered",
    renderFailed: "Render failed. Check the LaTeX syntax.",
    copyFailed: "Copy failed. Check browser permissions.",
    sourceCopied: "Source copied.",
    wrappedCopied: "Wrapped source copied.",
    shareCopied: "Share link copied.",
    svgExported: "SVG exported.",
    pngExported: "PNG exported.",
    exportFailed: "Export failed. Render a valid formula first.",
    displayIndicator: "Display Math",
    inlineIndicator: "Inline Math",
    langToggle: "中文"
  },
  zh: {
    currentMode: "当前模式",
    modeHint: "切换显示模式后，预览区会自动重新渲染。",
    formulaSource: "公式源码",
    clear: "清空",
    copySource: "复制源码",
    starterTemplate: "示例模板",
    formulaDisplayMode: "公式显示模式",
    templateQuadratic: "一元二次方程",
    templateMatrix: "矩阵与行列式",
    templateCalculus: "积分与极限",
    templatePhysics: "物理公式",
    templateStatistics: "统计分布",
    displayMode: "块级",
    inlineMode: "行内",
    loadTemplate: "载入模板",
    quickSnippets: "常用片段",
    snippetFraction: "分式",
    snippetRoot: "根式",
    snippetSeries: "求和",
    snippetIntegral: "积分",
    snippetMatrix: "矩阵",
    status: "状态",
    statusHint: "源码会自动保存在当前浏览器。",
    livePreview: "实时预览",
    copyWrapped: "复制带分隔符源码",
    copyShareLink: "复制分享链接",
    exportSvg: "导出 SVG",
    exportPng: "导出 PNG",
    previewMeta: "参考 MathJax 官方首页的 live demo 思路，采用零构建静态部署。",
    waiting: "等待输入",
    rendered: "已渲染",
    renderFailed: "渲染失败，请检查 LaTeX 语法。",
    copyFailed: "复制失败，请检查浏览器权限。",
    sourceCopied: "源码已复制。",
    wrappedCopied: "带分隔符源码已复制。",
    shareCopied: "分享链接已复制。",
    svgExported: "SVG 已导出。",
    pngExported: "PNG 已导出。",
    exportFailed: "导出失败，请先渲染有效公式。",
    displayIndicator: "块级公式",
    inlineIndicator: "行内公式",
    langToggle: "EN"
  }
};

const elements = {
  latexInput: document.getElementById("latexInput"),
  preview: document.getElementById("preview"),
  clearBtn: document.getElementById("clearBtn"),
  copyBtn: document.getElementById("copyBtn"),
  copyWrappedBtn: document.getElementById("copyWrappedBtn"),
  copyShareBtn: document.getElementById("copyShareBtn"),
  exportSvgBtn: document.getElementById("exportSvgBtn"),
  exportPngBtn: document.getElementById("exportPngBtn"),
  loadTemplateBtn: document.getElementById("loadTemplateBtn"),
  templateSelect: document.getElementById("templateSelect"),
  statusText: document.getElementById("statusText"),
  modeIndicator: document.getElementById("modeIndicator"),
  modeToggleGroup: document.getElementById("modeToggleGroup"),
  languageToggle: document.getElementById("languageToggle"),
  toggles: Array.from(document.querySelectorAll(".toggle")),
  snippetButtons: Array.from(document.querySelectorAll(".snippet-button")),
  i18nNodes: Array.from(document.querySelectorAll("[data-i18n]"))
};

let mode = "display";
let language = DEFAULT_LANGUAGE;
let renderTimer = null;
let lastStatusKey = "waiting";

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function getWrappedSource(source) {
  const trimmed = source.trim();
  if (!trimmed) {
    return mode === "display" ? String.raw`\[ \]` : String.raw`\(\)`;
  }

  if (/^(\\\[|\\\(|\$\$|\$)/.test(trimmed)) {
    return trimmed;
  }

  return mode === "display"
    ? `\\[\n${trimmed}\n\\]`
    : `\\(${trimmed}\\)`;
}

function setStatus(key) {
  lastStatusKey = key;
  elements.statusText.textContent = t(key);
}

function updateLanguageUi() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  elements.i18nNodes.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  elements.languageToggle.textContent = t("langToggle");
  elements.modeToggleGroup.setAttribute("aria-label", t("formulaDisplayMode"));
  updateModeUi();
  elements.statusText.textContent = t(lastStatusKey);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(successMessage);
  } catch (error) {
    setStatus("copyFailed");
  }
}

function persistState() {
  const payload = {
    source: elements.latexInput.value,
    mode,
    language
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function updateModeUi() {
  elements.modeIndicator.textContent = mode === "display" ? t("displayIndicator") : t("inlineIndicator");
  elements.toggles.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

function getShareUrl() {
  const params = new URLSearchParams();
  params.set("latex", elements.latexInput.value);
  params.set("mode", mode);
  params.set("lang", language);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

function downloadFile(content, filename, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getRenderedSvg() {
  return elements.preview.querySelector("svg");
}

function exportSvg() {
  const svg = getRenderedSvg();
  if (!svg) {
    setStatus("exportFailed");
    return;
  }

  const serialized = new XMLSerializer().serializeToString(svg);
  downloadFile(serialized, "latex-formula.svg", "image/svg+xml;charset=utf-8");
  setStatus("svgExported");
}

function exportPng() {
  const svg = getRenderedSvg();
  if (!svg) {
    setStatus("exportFailed");
    return;
  }

  const serialized = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const width = Math.ceil(image.width || 1200);
    const height = Math.ceil(image.height || 400);
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      if (!blob) {
        setStatus("exportFailed");
        return;
      }
      downloadFile(blob, "latex-formula.png", "image/png");
      setStatus("pngExported");
    }, "image/png");
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    setStatus("exportFailed");
  };

  image.src = url;
}

async function renderMath() {
  const source = elements.latexInput.value.trim();
  const wrapped = getWrappedSource(source);
  elements.preview.textContent = "";
  elements.preview.innerHTML = wrapped;

  if (!source) {
    setStatus("waiting");
    return;
  }

  try {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise([elements.preview]);
    }
    setStatus("rendered");
  } catch (error) {
    setStatus("renderFailed");
  }
}

function scheduleRender() {
  persistState();
  clearTimeout(renderTimer);
  renderTimer = window.setTimeout(() => {
    void renderMath();
  }, 140);
}

function insertSnippet(snippet) {
  const { latexInput } = elements;
  const start = latexInput.selectionStart;
  const end = latexInput.selectionEnd;
  const value = latexInput.value;
  const nextValue = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
  latexInput.value = nextValue;
  latexInput.focus();
  const cursor = start + snippet.length;
  latexInput.setSelectionRange(cursor, cursor);
  scheduleRender();
}

function loadTemplate() {
  const selected = elements.templateSelect.value;
  elements.latexInput.value = templates[selected];
  scheduleRender();
}

function restoreState() {
  const query = new URLSearchParams(window.location.search);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : {};
    elements.latexInput.value = query.get("latex") || saved.source || templates.quadratic;
    mode = query.get("mode") === "inline" || saved.mode === "inline" ? "inline" : "display";
    language = query.get("lang") === "zh" || saved.language === "zh" ? "zh" : "en";
  } catch (error) {
    elements.latexInput.value = templates.quadratic;
  }
}

elements.latexInput.addEventListener("input", scheduleRender);

elements.clearBtn.addEventListener("click", () => {
  elements.latexInput.value = "";
  scheduleRender();
});

elements.copyBtn.addEventListener("click", () => {
  void copyText(elements.latexInput.value, "sourceCopied");
});

elements.copyWrappedBtn.addEventListener("click", () => {
  void copyText(getWrappedSource(elements.latexInput.value), "wrappedCopied");
});

elements.copyShareBtn.addEventListener("click", () => {
  void copyText(getShareUrl(), "shareCopied");
});

elements.exportSvgBtn.addEventListener("click", exportSvg);
elements.exportPngBtn.addEventListener("click", exportPng);

elements.loadTemplateBtn.addEventListener("click", loadTemplate);

elements.toggles.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    updateModeUi();
    scheduleRender();
  });
});

elements.languageToggle.addEventListener("click", () => {
  language = language === "en" ? "zh" : "en";
  updateLanguageUi();
  persistState();
});

elements.snippetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    insertSnippet(button.dataset.snippet);
  });
});

restoreState();
updateLanguageUi();
updateModeUi();
scheduleRender();
