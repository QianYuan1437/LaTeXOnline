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

const templateCatalog = [
  {
    id: "quadratic",
    titleKey: "templateQuadratic",
    categoryKey: "templateCategoryAlgebra",
    preview: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`,
    examples: [
      { math: String.raw`ax^2+bx+c=0`, insert: String.raw`ax^2 + bx + c = 0` },
      { math: String.raw`x_1+x_2=-\frac{b}{a}`, insert: String.raw`x_1 + x_2 = -\frac{b}{a}` },
      { math: String.raw`x_1x_2=\frac{c}{a}`, insert: String.raw`x_1x_2=\frac{c}{a}` },
      { math: String.raw`\Delta=b^2-4ac`, insert: String.raw`\Delta=b^2-4ac` }
    ]
  },
  {
    id: "matrix",
    titleKey: "templateMatrix",
    categoryKey: "templateCategoryLinear",
    preview: String.raw`\begin{bmatrix}a&b\\c&d\end{bmatrix}`,
    examples: [
      { math: String.raw`\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc`, insert: String.raw`\det\begin{pmatrix}a & b\\ c & d\end{pmatrix}=ad-bc` },
      { math: String.raw`A^{-1}=\frac{1}{\det(A)}\operatorname{adj}(A)`, insert: String.raw`A^{-1}=\frac{1}{\det(A)}\operatorname{adj}(A)` },
      { math: String.raw`A\mathbf{x}=\mathbf{b}`, insert: String.raw`A\mathbf{x}=\mathbf{b}` },
      { math: String.raw`\begin{pmatrix}1&0\\0&1\end{pmatrix}`, insert: String.raw`\begin{pmatrix}1&0\\0&1\end{pmatrix}` }
    ]
  },
  {
    id: "calculus",
    titleKey: "templateCalculus",
    categoryKey: "templateCategoryCalculus",
    preview: String.raw`\int_0^1 x^n\,dx`,
    examples: [
      { math: String.raw`\frac{d}{dx}\sin x=\cos x`, insert: String.raw`\frac{d}{dx}\sin x=\cos x` },
      { math: String.raw`\int_a^b f'(x)\,dx=f(b)-f(a)`, insert: String.raw`\int_a^b f'(x)\,dx=f(b)-f(a)` },
      { math: String.raw`\lim_{x\to 0}\frac{\sin x}{x}=1`, insert: String.raw`\lim_{x\to 0}\frac{\sin x}{x}=1` },
      { math: String.raw`\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}`, insert: String.raw`\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}` }
    ]
  },
  {
    id: "physics",
    titleKey: "templatePhysics",
    categoryKey: "templateCategoryPhysics",
    preview: String.raw`i\hbar\frac{\partial \Psi}{\partial t}`,
    examples: [
      { math: String.raw`E=mc^2`, insert: String.raw`E=mc^2` },
      { math: String.raw`F=ma`, insert: String.raw`F=ma` },
      { math: String.raw`\lambda=\frac{h}{p}`, insert: String.raw`\lambda=\frac{h}{p}` },
      { math: String.raw`\oint \mathbf{E}\cdot d\mathbf{A}=\frac{Q}{\varepsilon_0}`, insert: String.raw`\oint \mathbf{E}\cdot d\mathbf{A}=\frac{Q}{\varepsilon_0}` }
    ]
  },
  {
    id: "statistics",
    titleKey: "templateStatistics",
    categoryKey: "templateCategoryStatistics",
    preview: String.raw`\binom{n}{k}p^k(1-p)^{n-k}`,
    examples: [
      { math: String.raw`\mu=\frac{1}{n}\sum_{i=1}^{n}x_i`, insert: String.raw`\mu=\frac{1}{n}\sum_{i=1}^{n}x_i` },
      { math: String.raw`\sigma^2=\frac{1}{n}\sum_{i=1}^{n}(x_i-\mu)^2`, insert: String.raw`\sigma^2=\frac{1}{n}\sum_{i=1}^{n}(x_i-\mu)^2` },
      { math: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`, insert: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}` },
      { math: String.raw`X\sim\mathcal{N}(\mu,\sigma^2)`, insert: String.raw`X\sim\mathcal{N}(\mu,\sigma^2)` }
    ]
  }
];

const toolCatalog = window.toolCatalogData || [];

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
    templateCategoryAll: "All",
    templateCategoryAlgebra: "Algebra",
    templateCategoryLinear: "Linear Algebra",
    templateCategoryCalculus: "Calculus",
    templateCategoryPhysics: "Physics",
    templateCategoryStatistics: "Statistics",
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
    collapseHistory: "Hide History",
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
    historyRestored: "History item restored.",
    toolSymbols: "Symbols",
    toolGeometry: "Geometry",
    toolAlgebra: "Algebra",
    toolCalculus: "Calculus",
    toolMatrix: "Matrix",
    toolPhysics: "Physics",
    groupBinaryOps: "Binary operations",
    groupRelations: "Binary relations",
    groupArrows: "Arrows",
    groupOthers: "Others",
    groupGeometryExamples: "Geometry examples",
    groupAlgebraExamples: "Algebra examples",
    groupCalculusExamples: "Calculus examples",
    groupMatrixExamples: "Matrix examples",
    groupPhysicsExamples: "Physics examples",
    toolSearchPlaceholder: "Search tools",
    toolEmpty: "No matching tools in this group."
    ,
    openTemplates: "Browse Templates",
    openTools: "Browse Tools",
    close: "Close",
    templateSearchPlaceholder: "Search templates",
    previewOnly: "Preview Only",
    loadIntoInput: "Load Into Input",
    templateEmpty: "No matching templates.",
    templateExamples: "Template examples"
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
    templateCategoryAll: "全部",
    templateCategoryAlgebra: "代数",
    templateCategoryLinear: "线性代数",
    templateCategoryCalculus: "微积分",
    templateCategoryPhysics: "物理",
    templateCategoryStatistics: "统计",
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
    historyRestored: "已恢复历史公式。",
    toolSymbols: "常用符号",
    toolGeometry: "几何",
    toolAlgebra: "代数",
    toolCalculus: "积分",
    toolMatrix: "矩阵",
    toolPhysics: "物理",
    groupBinaryOps: "二元运算符",
    groupRelations: "二元关系符",
    groupArrows: "箭头符号",
    groupOthers: "其他符号",
    groupGeometryExamples: "几何示例",
    groupAlgebraExamples: "代数示例",
    groupCalculusExamples: "积分示例",
    groupMatrixExamples: "矩阵示例",
    groupPhysicsExamples: "物理示例",
    toolSearchPlaceholder: "搜索工具条目",
    toolEmpty: "当前分组没有匹配项。",
    openTemplates: "打开模板库",
    openTools: "打开快捷工具",
    close: "关闭",
    templateSearchPlaceholder: "搜索模板",
    previewOnly: "仅预览",
    loadIntoInput: "载入到输入区",
    templateEmpty: "没有匹配的模板。",
    templateExamples: "模板示例"
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
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  toggleHistoryBtn: document.getElementById("toggleHistoryBtn"),
  templatePickerBtn: document.getElementById("templatePickerBtn"),
  templatePickerLabel: document.getElementById("templatePickerLabel"),
  openTemplateModalBtn: document.getElementById("openTemplateModalBtn"),
  openToolModalBtn: document.getElementById("openToolModalBtn"),
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
  templateGallery: document.getElementById("templateGallery"),
  templateDetailPanel: document.getElementById("templateDetailPanel"),
  snippetGallery: document.getElementById("snippetGallery"),
  toolModal: document.getElementById("toolModal"),
  toolModalBackdrop: document.getElementById("toolModalBackdrop"),
  toolModalClose: document.getElementById("toolModalClose"),
  toolModalTitle: document.getElementById("toolModalTitle"),
  toolModalMeta: document.getElementById("toolModalMeta"),
  toolModalSearch: document.getElementById("toolModalSearch"),
  toolModalNav: document.getElementById("toolModalNav"),
  toolModalBody: document.getElementById("toolModalBody"),
  templateModal: document.getElementById("templateModal"),
  templateModalBackdrop: document.getElementById("templateModalBackdrop"),
  templateModalClose: document.getElementById("templateModalClose"),
  templateModalTitle: document.getElementById("templateModalTitle"),
  templateModalSearch: document.getElementById("templateModalSearch"),
  templateFilterBar: document.getElementById("templateFilterBar"),
  templatePreviewBtn: document.getElementById("templatePreviewBtn"),
  templateUseBtn: document.getElementById("templateUseBtn"),
  historySearch: document.getElementById("historySearch"),
  favoritesList: document.getElementById("favoritesList"),
  historyList: document.getElementById("historyList"),
  toggles: Array.from(document.querySelectorAll(".toggle")),
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
let activeTemplateId = "quadratic";
let activeToolId = toolCatalog[0]?.id || "symbol";
let activeToolGroupIndex = 0;
let activeToolSearch = "";
let activeTemplateSearch = "";
let activeTemplateCategory = "templateCategoryAll";
let toolCenterInitialized = false;

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function localizeText(value) {
  if (typeof value === "string") {
    return value;
  }
  return value?.[language] || value?.en || value?.zh || "";
}

function setStatus(key) {
  lastStatusKey = key;
  if (elements.statusText) {
    elements.statusText.textContent = t(key);
  }
}

function updateI18nUi() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  elements.i18nNodes.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  elements.languageToggle.textContent = t("langToggle");
  elements.toolModalClose.textContent = language === "zh" ? "关闭" : "Close";
  elements.templateModalClose.textContent = t("close");
  elements.toolModalSearch.placeholder = t("toolSearchPlaceholder");
  elements.templateModalSearch.placeholder = t("templateSearchPlaceholder");
  elements.templatePreviewBtn.textContent = t("previewOnly");
  elements.templateUseBtn.textContent = t("loadIntoInput");
  updateTemplatePickerLabel();
  elements.historySearch.placeholder = t("historySearchPlaceholder");
  elements.modeToggleGroup.setAttribute("aria-label", t("formulaDisplayMode"));
  updateModeUi();
  updateThemeUi();
  updateHistoryCollapseUi();
  if (elements.statusText) {
    elements.statusText.textContent = t(lastStatusKey);
  }
  renderHistory();
  if (toolCenterInitialized && !elements.toolModal.classList.contains("is-hidden")) {
    renderToolCenter();
    renderToolModal(activeToolId);
    void renderCardMath();
  }
  if (toolCenterInitialized && !elements.templateModal.classList.contains("is-hidden")) {
    renderTemplateGallery();
    renderTemplateDetailPanel();
    void renderCardMath();
  }
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
    historyCollapsed,
    activeTemplateId,
    activeToolId
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

function createMathNode(tag, className, math) {
  const node = document.createElement(tag);
  node.className = className;
  node.dataset.math = math;
  return node;
}

function getFilteredTemplates() {
  const searchTerm = activeTemplateSearch.trim().toLowerCase();
  return templateCatalog.filter((item) => {
    const categoryMatch = activeTemplateCategory === "templateCategoryAll" || item.categoryKey === activeTemplateCategory;
    const searchMatch =
      !searchTerm ||
      [t(item.titleKey), t(item.categoryKey), item.preview]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm);
    return categoryMatch && searchMatch;
  });
}

function renderTemplateGallery() {
  elements.templateGallery.textContent = "";
  const filteredTemplates = getFilteredTemplates();

  if (!filteredTemplates.some((item) => item.id === activeTemplateId) && filteredTemplates[0]) {
    activeTemplateId = filteredTemplates[0].id;
  }

  if (!filteredTemplates.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = t("templateEmpty");
    elements.templateGallery.appendChild(empty);
    return;
  }

  filteredTemplates.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-card";
    if (item.id === activeTemplateId) {
      button.classList.add("active");
    }

    const formula = createMathNode("span", "template-card-formula", item.preview);
    const title = document.createElement("span");
    title.className = "template-card-title";
    title.textContent = t(item.titleKey);
    const tag = document.createElement("span");
    tag.className = "tool-card-tag";
    tag.textContent = t(item.categoryKey);
    button.append(formula, title, tag);
    button.addEventListener("click", () => {
      activeTemplateId = item.id;
      persistState();
      renderTemplateGallery();
      renderTemplateDetailPanel();
      updateTemplatePickerLabel();
      void renderCardMath();
    });
    elements.templateGallery.appendChild(button);
  });
}

function renderTemplateDetailPanel() {
  elements.templateDetailPanel.textContent = "";
  const active = getFilteredTemplates().find((item) => item.id === activeTemplateId);
  if (!active) {
    return;
  }

  const head = document.createElement("div");
  head.className = "detail-panel-head";
  const title = document.createElement("p");
  title.className = "detail-panel-title";
  title.textContent = t(active.titleKey);
  const tag = document.createElement("span");
  tag.className = "detail-example-tag";
  tag.textContent = t(active.categoryKey);
  head.append(title, tag);

  const intro = document.createElement("p");
  intro.className = "support-text";
  intro.textContent = t("templateExamples");

  const grid = document.createElement("div");
  grid.className = "detail-example-grid";
  active.examples.forEach((example) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "detail-example-card";
    button.appendChild(createMathNode("span", "detail-example-math", example.math));
    button.addEventListener("click", () => {
      previewTemplateExample(example.insert);
    });
    grid.appendChild(button);
  });

  elements.templateDetailPanel.append(head, intro, grid);
}

function renderToolGallery() {
  elements.snippetGallery.textContent = "";
  toolCatalog.forEach((tool) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tool-card";
    if (tool.id === activeToolId) {
      button.classList.add("active");
    }
    const head = document.createElement("div");
    head.className = "tool-card-head";
    const titleWrap = document.createElement("div");
    titleWrap.className = "tool-card-title-wrap";
    const title = document.createElement("span");
    title.className = "tool-card-title";
    title.textContent = localizeText(tool.title);
    const subtitle = document.createElement("span");
    subtitle.className = "tool-card-subtitle";
    subtitle.textContent = language === "zh" ? tool.title.en : tool.title.zh;
    titleWrap.append(title, subtitle);
    const tag = document.createElement("span");
    tag.className = "tool-card-tag";
    tag.textContent = localizeText(tool.usage);
    head.append(titleWrap, tag);

    const formula = createMathNode("span", "tool-card-formula", tool.preview);

    const foot = document.createElement("div");
    foot.className = "tool-card-foot";
    const meta = document.createElement("span");
    meta.className = "tool-card-subtitle";
    meta.textContent = `${tool.groups.length} ${language === "zh" ? "组" : "groups"}`;
    foot.appendChild(meta);

    button.append(head, formula, foot);
    button.addEventListener("click", () => {
      activeToolId = tool.id;
      persistState();
      renderToolGallery();
      openToolModal(tool.id);
      void renderCardMath();
    });
    elements.snippetGallery.appendChild(button);
  });
}

function renderToolDetailPanel() {
  elements.toolDetailPanel.textContent = "";
}

function renderToolModal(toolId) {
  const active = toolCatalog.find((tool) => tool.id === toolId);
  elements.toolModalNav.textContent = "";
  elements.toolModalBody.textContent = "";
  if (!active) {
    return;
  }

  elements.toolModalTitle.textContent = localizeText(active.title);
  elements.toolModalMeta.textContent = localizeText(active.usage);

  const searchTerm = activeToolSearch.trim().toLowerCase();
  const groups = active.groups
    .map((group, originalIndex) => {
      const filteredItems = !searchTerm
        ? group.items
        : group.items.filter((entry) => {
            const haystack = [
              entry.math,
              entry.insert,
              entry.zh,
              entry.en,
              localizeText(group.title),
              language === "zh" ? group.title.en : group.title.zh
            ]
              .join(" ")
              .toLowerCase();
            return haystack.includes(searchTerm);
          });

      return { ...group, originalIndex, items: filteredItems };
    })
    .filter((group) => group.items.length > 0);

  const normalizedIndex = Math.min(activeToolGroupIndex, Math.max(groups.length - 1, 0));
  activeToolGroupIndex = normalizedIndex;

  groups.forEach((group, index) => {
    const navButton = document.createElement("button");
    navButton.type = "button";
    navButton.className = "tool-modal-nav-button";
    navButton.classList.toggle("active", index === normalizedIndex);
    navButton.innerHTML = `
      <span class="tool-modal-nav-title">${localizeText(group.title)}</span>
      <span class="tool-modal-nav-subtitle">${language === "zh" ? group.title.en : group.title.zh} · ${group.items.length}</span>
    `;
    navButton.addEventListener("click", () => {
      activeToolGroupIndex = index;
      renderToolModal(toolId);
      void renderCardMath();
    });
    elements.toolModalNav.appendChild(navButton);
  });

  const group = groups[normalizedIndex];
  if (!group) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = t("toolEmpty");
    elements.toolModalBody.appendChild(empty);
    return;
  }

  const section = document.createElement("section");
  section.className = "tool-group";

  const head = document.createElement("div");
  head.className = "tool-group-head";

  const title = document.createElement("h3");
  title.className = "tool-group-title";
  title.textContent = localizeText(group.title);

  const subtitle = document.createElement("span");
  subtitle.className = "tool-group-subtitle";
  subtitle.textContent = language === "zh" ? group.title.en : group.title.zh;

  head.append(title, subtitle);

  const isSymbolLike = active.id === "symbol" || active.id === "greek";
  const grid = document.createElement("div");
  grid.className = isSymbolLike ? "tool-symbol-grid" : "detail-example-grid";

  group.items.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = isSymbolLike ? "symbol-chip" : "detail-example-card tool-example-card";
    button.addEventListener("click", () => {
      insertSnippet(entry.insert);
      closeToolModal();
    });

    if (isSymbolLike) {
      button.title = language === "zh" ? `${entry.zh} / ${entry.en}` : `${entry.en} / ${entry.zh}`;
      button.appendChild(createMathNode("span", "symbol-chip-math", entry.math));
    } else {
      const content = document.createElement("div");
      content.className = "detail-example-card-content";
      content.appendChild(createMathNode("span", "detail-example-math", entry.math));

      const labels = document.createElement("div");
      labels.className = "detail-example-labels";

      const textWrap = document.createElement("div");
      const titleNode = document.createElement("span");
      titleNode.className = "detail-example-title";
      titleNode.textContent = language === "zh" ? entry.zh : entry.en;
      const subtitleNode = document.createElement("span");
      subtitleNode.className = "detail-example-subtitle";
      subtitleNode.textContent = language === "zh" ? entry.en : entry.zh;
      textWrap.append(titleNode, subtitleNode);

      const tag = document.createElement("span");
      tag.className = "detail-example-tag";
      tag.textContent = active.id.toUpperCase();

      labels.append(textWrap, tag);
      content.appendChild(labels);
      button.appendChild(content);
    }

    grid.appendChild(button);
  });

  section.append(head, grid);
  elements.toolModalBody.appendChild(section);
}

function openToolModal(toolId) {
  closeTemplateModal();
  ensureToolCenterRendered();
  activeToolId = toolId;
  activeToolGroupIndex = 0;
  activeToolSearch = "";
  elements.toolModalSearch.value = "";
  renderToolModal(toolId);
  elements.toolModal.classList.remove("is-hidden");
  elements.toolModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  void renderCardMath();
}

function closeToolModal() {
  elements.toolModal.classList.add("is-hidden");
  elements.toolModal.setAttribute("aria-hidden", "true");
  if (elements.templateModal.classList.contains("is-hidden")) {
    document.body.classList.remove("modal-open");
  }
}

function renderToolCenter() {
  renderTemplateFilters();
  renderTemplateGallery();
  renderTemplateDetailPanel();
  renderToolGallery();
  void renderCardMath();
}

function ensureToolCenterRendered() {
  if (toolCenterInitialized) {
    return;
  }
  toolCenterInitialized = true;
  renderToolCenter();
}

function renderTemplateFilters() {
  elements.templateFilterBar.textContent = "";
  const keys = ["templateCategoryAll", ...new Set(templateCatalog.map((item) => item.categoryKey))];
  keys.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "toolbar-button compact";
    button.classList.toggle("active", key === activeTemplateCategory);
    button.textContent = t(key);
    button.addEventListener("click", () => {
      activeTemplateCategory = key;
      renderTemplateGallery();
      renderTemplateDetailPanel();
      void renderCardMath();
    });
    elements.templateFilterBar.appendChild(button);
  });
}

function updateTemplatePickerLabel() {
  const active = templateCatalog.find((item) => item.id === activeTemplateId);
  elements.templatePickerLabel.textContent = active ? t(active.titleKey) : t("templateQuadratic");
}

function openTemplateModal() {
  closeToolModal();
  ensureToolCenterRendered();
  renderTemplateGallery();
  renderTemplateDetailPanel();
  renderTemplateFilters();
  elements.templateModal.classList.remove("is-hidden");
  elements.templateModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  void renderCardMath();
}

function closeTemplateModal() {
  elements.templateModal.classList.add("is-hidden");
  elements.templateModal.setAttribute("aria-hidden", "true");
  if (elements.toolModal.classList.contains("is-hidden")) {
    document.body.classList.remove("modal-open");
  }
}

async function previewTemplateOnly() {
  const source = templates[activeTemplateId];
  if (!source) {
    return;
  }
  elements.preview.textContent = "";
  elements.preview.innerHTML = source;
  try {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise([elements.preview]);
    }
    setStatus("rendered");
  } catch (error) {
    setStatus("renderFailed");
  }
}

async function previewTemplateExample(exampleSource) {
  const wrapped = mode === "display" ? `\\[\n${exampleSource}\n\\]` : `\\(${exampleSource}\\)`;
  elements.preview.textContent = "";
  elements.preview.innerHTML = wrapped;
  closeTemplateModal();
  try {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise([elements.preview]);
    }
    setStatus("rendered");
  } catch (error) {
    setStatus("renderFailed");
  }
}

async function renderCardMath() {
  document.querySelectorAll("[data-math]").forEach((node) => {
    node.innerHTML = `\\(${node.dataset.math}\\)`;
  });

  if (window.MathJax?.typesetPromise) {
    try {
      await window.MathJax.typesetPromise([
        elements.templateGallery,
        elements.templateDetailPanel,
        elements.snippetGallery,
        elements.toolModalBody
      ]);
    } catch (error) {
    }
  }
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
  elements.preview.textContent = "";

  if (!source) {
    setStatus("waiting");
    return;
  }

  const wrapped = getWrappedSource(source);
  elements.preview.innerHTML = wrapped;

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
  elements.latexInput.value = templates[activeTemplateId];
  updateTemplatePickerLabel();
  renderTemplateGallery();
  renderTemplateDetailPanel();
  void renderCardMath();
  closeTemplateModal();
  scheduleRender();
}

function restoreState() {
  const query = new URLSearchParams(window.location.search);

  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    const rawHistory = localStorage.getItem(HISTORY_KEY);
    const saved = rawState ? JSON.parse(rawState) : {};
    historyItems = rawHistory ? JSON.parse(rawHistory) : [];
    elements.latexInput.value = query.get("latex") || saved.source || "";
    mode = query.get("mode") === "inline" || saved.mode === "inline" ? "inline" : "display";
    language = query.get("lang") === "zh" || saved.language === "zh" ? "zh" : "en";
    theme = query.get("theme") === "dark" || saved.theme === "dark" ? "dark" : "light";
    historyCollapsed = Boolean(saved.historyCollapsed);
    activeTemplateId = saved.activeTemplateId || "quadratic";
    activeToolId = saved.activeToolId || toolCatalog[0]?.id || "symbol";
  } catch (error) {
    elements.latexInput.value = "";
    historyItems = [];
  }

  updateTemplatePickerLabel();
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
elements.railLoadTemplateBtn.addEventListener("click", openTemplateModal);
elements.openTemplateModalBtn.addEventListener("click", openTemplateModal);
elements.templatePickerBtn.addEventListener("click", openTemplateModal);
elements.templatePreviewBtn.addEventListener("click", () => {
  void previewTemplateOnly();
  closeTemplateModal();
});
elements.templateUseBtn.addEventListener("click", loadTemplate);
elements.openToolModalBtn.addEventListener("click", () => openToolModal(activeToolId));

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

elements.toolModalClose.addEventListener("click", closeToolModal);
elements.toolModalBackdrop.addEventListener("click", closeToolModal);
elements.templateModalClose.addEventListener("click", closeTemplateModal);
elements.templateModalBackdrop.addEventListener("click", closeTemplateModal);
elements.templateModalSearch.addEventListener("input", (event) => {
  activeTemplateSearch = event.target.value;
  ensureToolCenterRendered();
  renderTemplateGallery();
  renderTemplateDetailPanel();
  void renderCardMath();
});
elements.toolModalSearch.addEventListener("input", (event) => {
  activeToolSearch = event.target.value;
  activeToolGroupIndex = 0;
  ensureToolCenterRendered();
  renderToolModal(activeToolId);
  void renderCardMath();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.toolModal.classList.contains("is-hidden")) {
    closeToolModal();
  }
  if (event.key === "Escape" && !elements.templateModal.classList.contains("is-hidden")) {
    closeTemplateModal();
  }
});

restoreState();
updateThemeUi();
updateI18nUi();
setRailActive(elements.railEditorBtn);
renderHistory();
scheduleRender();
