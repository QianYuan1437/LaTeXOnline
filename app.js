const STORAGE_KEY = "latex-online-editor";
const HISTORY_KEY = "latex-online-history";
const DEFAULT_LANGUAGE = "en";
const DEFAULT_THEME = "light";
const MAX_HISTORY = 12;

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
    mathWorkspace: "Math workspace",
    inputArea: "Input",
    outputArea: "Output",
    memoryArea: "Memory",
    workspaceTools: "Workspace",
    quickActions: "Quick Actions",
    railEditor: "Editor",
    railPreview: "Preview",
    templateTab: "Templates",
    quickTab: "Quick Tools",
    currentMode: "Current mode",
    themeToggle: "Dark",
    themeLight: "Light",
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
    previewMeta: "Inspired by the live demo split-workspace pattern seen on latexlive.com, adapted for a GitHub Pages static app.",
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
    langToggle: "中文",
    historyTitle: "Formula History",
    clearHistory: "Clear History",
    collapseHistory: "Collapse History",
    expandHistory: "Show History",
    historyHint: "Recent formulas are saved locally. Click one to restore it.",
    historySearchPlaceholder: "Search history",
    favoritesTitle: "Favorites",
    recentTitle: "Recent",
    historyEmpty: "No formula history yet.",
    favoritesEmpty: "No favorites yet.",
    restore: "Restore",
    remove: "Remove",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
    historyDisplay: "Display",
    historyInline: "Inline",
    historyJustNow: "Just now",
    historyMinutesAgo: "m ago",
    historyHoursAgo: "h ago",
    historyDaysAgo: "d ago",
    historyCleared: "History cleared.",
    historyRestored: "History item restored."
  },
  zh: {
    mathWorkspace: "数学工作台",
    inputArea: "输入区",
    outputArea: "输出区",
    memoryArea: "历史区",
    workspaceTools: "工作区",
    quickActions: "快捷操作",
    railEditor: "编辑",
    railPreview: "预览",
    templateTab: "公式模板",
    quickTab: "快捷工具",
    currentMode: "当前模式",
    themeToggle: "暗色",
    themeLight: "亮色",
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
    previewMeta: "参考 latexlive.com 的输入/输出分栏工作台思路，改造成适合 GitHub Pages 的纯静态应用。",
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
    langToggle: "EN",
    historyTitle: "公式历史",
    clearHistory: "清空历史",
    collapseHistory: "收起历史栏",
    expandHistory: "显示历史栏",
    historyHint: "最近使用过的公式会保存在本地，点击即可恢复。",
    historySearchPlaceholder: "搜索历史记录",
    favoritesTitle: "收藏",
    recentTitle: "最近记录",
    historyEmpty: "还没有公式历史。",
    favoritesEmpty: "还没有收藏公式。",
    restore: "恢复",
    remove: "删除",
    favorite: "收藏",
    unfavorite: "取消收藏",
    historyDisplay: "块级",
    historyInline: "行内",
    historyJustNow: "刚刚",
    historyMinutesAgo: "分钟前",
    historyHoursAgo: "小时前",
    historyDaysAgo: "天前",
    historyCleared: "历史记录已清空。",
    historyRestored: "已恢复历史公式。"
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
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  toggleHistoryBtn: document.getElementById("toggleHistoryBtn"),
  templateSelect: document.getElementById("templateSelect"),
  statusText: document.getElementById("statusText"),
  modeIndicator: document.getElementById("modeIndicator"),
  modeToggleGroup: document.getElementById("modeToggleGroup"),
  languageToggle: document.getElementById("languageToggle"),
  themeToggle: document.getElementById("themeToggle"),
  historyCollapseBtn: document.getElementById("historyCollapseBtn"),
  railLoadTemplateBtn: document.getElementById("railLoadTemplateBtn"),
  railExportSvgBtn: document.getElementById("railExportSvgBtn"),
  railExportPngBtn: document.getElementById("railExportPngBtn"),
  railEditorBtn: document.getElementById("railEditorBtn"),
  railPreviewBtn: document.getElementById("railPreviewBtn"),
  templateTabBtn: document.getElementById("templateTabBtn"),
  snippetTabBtn: document.getElementById("snippetTabBtn"),
  templateGallery: document.getElementById("templateGallery"),
  snippetGallery: document.getElementById("snippetGallery"),
  historySearch: document.getElementById("historySearch"),
  favoritesList: document.getElementById("favoritesList"),
  historyList: document.getElementById("historyList"),
  toggles: Array.from(document.querySelectorAll(".toggle")),
  snippetButtons: Array.from(document.querySelectorAll(".snippet-button")),
  templateCards: Array.from(document.querySelectorAll("[data-template-card]")),
  i18nNodes: Array.from(document.querySelectorAll("[data-i18n]"))
};

let mode = "display";
let language = DEFAULT_LANGUAGE;
let theme = DEFAULT_THEME;
let renderTimer = null;
let historyTimer = null;
let lastStatusKey = "waiting";
let historyItems = [];
let historySearchQuery = "";
let historyCollapsed = false;

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function setStatus(key) {
  lastStatusKey = key;
  elements.statusText.textContent = t(key);
}

function updateI18nUi() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  elements.i18nNodes.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  elements.languageToggle.textContent = t("langToggle");
  elements.historySearch.placeholder = t("historySearchPlaceholder");
  elements.modeToggleGroup.setAttribute("aria-label", t("formulaDisplayMode"));
  updateModeUi();
  updateThemeUi();
  updateHistoryCollapseUi();
  elements.statusText.textContent = t(lastStatusKey);
  renderHistory();
}

function updateThemeUi() {
  document.body.dataset.theme = theme;
  elements.themeToggle.textContent = theme === "light" ? t("themeToggle") : t("themeLight");
}

function persistState() {
  const payload = {
    source: elements.latexInput.value,
    mode,
    language,
    theme,
    historyCollapsed
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function persistHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historyItems));
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

function updateModeUi() {
  elements.modeIndicator.textContent = mode === "display" ? t("displayIndicator") : t("inlineIndicator");
  elements.toggles.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

function updateHistoryCollapseUi() {
  document.body.classList.toggle("history-collapsed", historyCollapsed);
  const label = historyCollapsed ? t("expandHistory") : t("collapseHistory");
  elements.toggleHistoryBtn.textContent = label;
  elements.historyCollapseBtn.textContent = label;
}

function setRailActive(activeButton) {
  [elements.railEditorBtn, elements.railPreviewBtn].forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

function updateTemplateCardUi() {
  elements.templateCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.templateCard === elements.templateSelect.value);
  });
}

function showTemplatePane(pane) {
  const templateActive = pane === "templates";
  elements.templateTabBtn.classList.toggle("active", templateActive);
  elements.snippetTabBtn.classList.toggle("active", !templateActive);
  elements.templateGallery.classList.toggle("is-hidden", !templateActive);
  elements.snippetGallery.classList.toggle("is-hidden", templateActive);
}

function getShareUrl() {
  const params = new URLSearchParams();
  params.set("latex", elements.latexInput.value);
  params.set("mode", mode);
  params.set("lang", language);
  params.set("theme", theme);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

async function copyText(text, successKey) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(successKey);
  } catch (error) {
    setStatus("copyFailed");
  }
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
    context.fillStyle = theme === "dark" ? "#121b2d" : "#ffffff";
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

function addHistoryEntry() {
  const source = elements.latexInput.value.trim();
  if (!source) {
    return;
  }

  const existingIndex = historyItems.findIndex((item) => item.source === source && item.mode === mode);
  const nextEntry = {
    id: existingIndex >= 0 ? historyItems[existingIndex].id : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source,
    mode,
    favorite: existingIndex >= 0 ? Boolean(historyItems[existingIndex].favorite) : false,
    updatedAt: Date.now()
  };

  if (existingIndex >= 0) {
    historyItems.splice(existingIndex, 1);
  }

  historyItems.unshift(nextEntry);
  historyItems = historyItems.slice(0, MAX_HISTORY);
  persistHistory();
  renderHistory();
}

function formatRelativeTime(timestamp) {
  const diffMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffMinutes <= 0) {
    return t("historyJustNow");
  }
  if (diffMinutes < 60) {
    return language === "zh" ? `${diffMinutes}${t("historyMinutesAgo")}` : `${diffMinutes}${t("historyMinutesAgo")}`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return language === "zh" ? `${diffHours}${t("historyHoursAgo")}` : `${diffHours}${t("historyHoursAgo")}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return language === "zh" ? `${diffDays}${t("historyDaysAgo")}` : `${diffDays}${t("historyDaysAgo")}`;
}

function createEmptyState(messageKey, target) {
  target.textContent = "";
  const empty = document.createElement("div");
  empty.className = "history-empty";
  empty.textContent = t(messageKey);
  target.appendChild(empty);
}

function createHistoryCard(item) {
    const card = document.createElement("article");
    card.className = "history-item";
    if (item.favorite) {
      card.classList.add("favorite");
    }

    const head = document.createElement("div");
    head.className = "history-item-head";

    const title = document.createElement("p");
    title.className = "history-item-title";
    title.textContent = item.mode === "display" ? t("historyDisplay") : t("historyInline");

    const time = document.createElement("span");
    time.className = "support-text";
    time.textContent = formatRelativeTime(item.updatedAt);

    head.append(title, time);

    const preview = document.createElement("pre");
    preview.className = "history-snippet";
    preview.textContent = item.source.length > 160 ? `${item.source.slice(0, 160)}...` : item.source;

    const actions = document.createElement("div");
    actions.className = "history-actions";

    const restoreBtn = document.createElement("button");
    restoreBtn.type = "button";
    restoreBtn.className = "toolbar-button";
    restoreBtn.textContent = t("restore");
    restoreBtn.addEventListener("click", () => {
      elements.latexInput.value = item.source;
      mode = item.mode;
      updateModeUi();
      scheduleRender();
      setStatus("historyRestored");
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "toolbar-button";
    removeBtn.textContent = t("remove");
    removeBtn.addEventListener("click", () => {
      historyItems = historyItems.filter((entry) => entry.id !== item.id);
      persistHistory();
      renderHistory();
    });

    const favoriteBtn = document.createElement("button");
    favoriteBtn.type = "button";
    favoriteBtn.className = "toolbar-button";
    favoriteBtn.textContent = item.favorite ? t("unfavorite") : t("favorite");
    favoriteBtn.addEventListener("click", () => {
      historyItems = historyItems.map((entry) => {
        if (entry.id !== item.id) {
          return entry;
        }
        return { ...entry, favorite: !entry.favorite };
      });
      persistHistory();
      renderHistory();
    });

    actions.append(restoreBtn, favoriteBtn, removeBtn);
    card.append(head, preview, actions);
    return card;
}

function renderHistory() {
  elements.historyList.textContent = "";
  elements.favoritesList.textContent = "";

  const query = historySearchQuery.trim().toLowerCase();
  const filtered = historyItems.filter((item) => {
    if (!query) {
      return true;
    }
    return item.source.toLowerCase().includes(query);
  });

  const favorites = filtered.filter((item) => item.favorite);
  const recent = filtered.filter((item) => !item.favorite);

  if (favorites.length === 0) {
    createEmptyState("favoritesEmpty", elements.favoritesList);
  } else {
    favorites.forEach((item) => {
      elements.favoritesList.appendChild(createHistoryCard(item));
    });
  }

  if (recent.length === 0) {
    createEmptyState("historyEmpty", elements.historyList);
  } else {
    recent.forEach((item) => {
      elements.historyList.appendChild(createHistoryCard(item));
    });
  }
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

function scheduleHistoryCapture() {
  clearTimeout(historyTimer);
  historyTimer = window.setTimeout(() => {
    addHistoryEntry();
  }, 1200);
}

function scheduleRender() {
  persistState();
  clearTimeout(renderTimer);
  renderTimer = window.setTimeout(() => {
    void renderMath();
  }, 140);
  scheduleHistoryCapture();
}

function insertSnippet(snippet) {
  const { latexInput } = elements;
  const start = latexInput.selectionStart;
  const end = latexInput.selectionEnd;
  const value = latexInput.value;
  latexInput.value = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
  latexInput.focus();
  const cursor = start + snippet.length;
  latexInput.setSelectionRange(cursor, cursor);
  scheduleRender();
}

function loadTemplate() {
  elements.latexInput.value = templates[elements.templateSelect.value];
  updateTemplateCardUi();
  scheduleRender();
}

function restoreState() {
  const query = new URLSearchParams(window.location.search);

  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    const rawHistory = localStorage.getItem(HISTORY_KEY);
    const saved = rawState ? JSON.parse(rawState) : {};
    historyItems = rawHistory ? JSON.parse(rawHistory) : [];
    elements.latexInput.value = query.get("latex") || saved.source || templates.quadratic;
    mode = query.get("mode") === "inline" || saved.mode === "inline" ? "inline" : "display";
    language = query.get("lang") === "zh" || saved.language === "zh" ? "zh" : "en";
    theme = query.get("theme") === "dark" || saved.theme === "dark" ? "dark" : "light";
    historyCollapsed = Boolean(saved.historyCollapsed);
  } catch (error) {
    elements.latexInput.value = templates.quadratic;
    historyItems = [];
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
elements.railExportSvgBtn.addEventListener("click", exportSvg);
elements.railExportPngBtn.addEventListener("click", exportPng);
elements.loadTemplateBtn.addEventListener("click", loadTemplate);
elements.railLoadTemplateBtn.addEventListener("click", loadTemplate);
elements.templateSelect.addEventListener("change", updateTemplateCardUi);

elements.clearHistoryBtn.addEventListener("click", () => {
  historyItems = [];
  persistHistory();
  renderHistory();
  setStatus("historyCleared");
});

function toggleHistoryPanel() {
  historyCollapsed = !historyCollapsed;
  persistState();
  updateHistoryCollapseUi();
}

elements.toggleHistoryBtn.addEventListener("click", toggleHistoryPanel);
elements.historyCollapseBtn.addEventListener("click", toggleHistoryPanel);

elements.toggles.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    updateModeUi();
    scheduleRender();
  });
});

elements.languageToggle.addEventListener("click", () => {
  language = language === "en" ? "zh" : "en";
  persistState();
  updateI18nUi();
});

elements.themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  persistState();
  updateThemeUi();
});

elements.historySearch.addEventListener("input", (event) => {
  historySearchQuery = event.target.value;
  renderHistory();
});

elements.railEditorBtn.addEventListener("click", () => {
  setRailActive(elements.railEditorBtn);
  document.querySelector(".editor-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.railPreviewBtn.addEventListener("click", () => {
  setRailActive(elements.railPreviewBtn);
  document.querySelector(".preview-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.templateTabBtn.addEventListener("click", () => {
  showTemplatePane("templates");
});

elements.snippetTabBtn.addEventListener("click", () => {
  showTemplatePane("snippets");
});

elements.templateCards.forEach((card) => {
  card.addEventListener("click", () => {
    elements.templateSelect.value = card.dataset.templateCard;
    updateTemplateCardUi();
    loadTemplate();
  });
});

elements.snippetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    insertSnippet(button.dataset.snippet);
  });
});

restoreState();
updateThemeUi();
updateI18nUi();
setRailActive(elements.railEditorBtn);
showTemplatePane("templates");
updateTemplateCardUi();
renderHistory();
scheduleRender();
