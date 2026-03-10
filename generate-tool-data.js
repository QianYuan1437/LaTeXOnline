const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "ref_latexlive", "public", "json", "map_input.json");
const targetPath = path.join(__dirname, "tool-data.js");

const englishTitleMap = {
  symbol: "Symbols",
  greek: "Greek Letters",
  frac: "Fractions & Derivatives",
  sqrt: "Radicals & Scripts",
  limit: "Limits & Logs",
  trig: "Trigonometric",
  integral: "Integral",
  sum: "Large Operators",
  bracket: "Brackets",
  matrix: "Matrices"
};

const englishUsageMap = {
  symbol: "Ops / Relations / Arrows",
  greek: "Letters / Variants / Sets",
  frac: "Fractions / Derivative / Modular",
  sqrt: "Radicals / Scripts / Accents",
  limit: "Limits / Logs / Bounds",
  trig: "Trig / Inverse / Hyperbolic",
  integral: "Single / Multiple / Path",
  sum: "Sum / Product / Set / Logic",
  bracket: "Delimiters / Floors / Norms",
  matrix: "Matrix / Multiline / Array"
};

function normalizeWhitespace(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function meaningfulText(value) {
  const normalized = normalizeWhitespace(value);
  return normalized === "-" ? "" : normalized;
}

function normalizeLatex(value) {
  return normalizeWhitespace(value)
    .replace(/^\{\\div\}$/, "\\div")
    .replace(/^\{\\div\}\s*/, "\\div ")
    .replace(/\s*…\s*/g, " ")
    .trim();
}

function buildSafeMath(categoryId, latex) {
  const normalized = normalizeLatex(latex);
  if (!normalized) {
    return "";
  }

  const exactMap = {
    "\\frac{}{}": "\\frac{a}{b}",
    "\\tfrac{}{}": "\\tfrac{a}{b}",
    "\\sqrt{}": "\\sqrt{x}",
    "\\sqrt[]{}": "\\sqrt[n]{x}",
    "\\dot{}": "\\dot{x}",
    "\\ddot{}": "\\ddot{x}",
    "{}'": "f'",
    "{}''": "f''",
    "{}^{(n)}": "f^{(n)}",
    "^{}": "x^{n}",
    "_{}": "x_{i}",
    "_{}^{}": "x_{i}^{n}",
    "\\hat{}": "\\hat{x}",
    "\\check{}": "\\check{x}",
    "\\grave{}": "\\grave{x}",
    "\\acute{}": "\\acute{x}",
    "\\tilde{}": "\\tilde{x}",
    "\\breve{}": "\\breve{x}",
    "\\bar{}": "\\bar{x}",
    "\\vec{}": "\\vec{v}",
    "\\not{}": "\\not=",
    "\\widetilde{}": "\\widetilde{AB}",
    "\\widehat{}": "\\widehat{AB}",
    "\\overleftarrow{}": "\\overleftarrow{AB}",
    "\\overrightarrow{}": "\\overrightarrow{AB}",
    "\\overline{}": "\\overline{AB}",
    "\\underline{}": "\\underline{AB}",
    "\\overbrace{}": "\\overbrace{a+b+c}",
    "\\underbrace{}": "\\underbrace{a+b+c}",
    "\\overset{}{}": "\\overset{a}{b}",
    "\\underset{}{}": "\\underset{a}{b}",
    "\\stackrel\\frown{}": "\\stackrel{\\frown}{AB}",
    "\\overset{}{\\leftarrow}": "\\overset{a}{\\leftarrow}",
    "\\overset{}{\\rightarrow}": "\\overset{a}{\\rightarrow}",
    "\\xleftarrow[]{}": "\\xleftarrow[n]{m}",
    "\\xrightarrow[]{}": "\\xrightarrow[n]{m}",
    "\\max_{}": "\\max_{x}",
    "\\min_{}": "\\min_{x}",
    "\\log_{}{}": "\\log_{a} b",
    "\\lg_{}{}": "\\lg x",
    "\\ln_{}{}": "\\ln x",
    "\\int_{}^{}": "\\int_{a}^{b}",
    "\\int\\limits_{}^{}": "\\int\\limits_{a}^{b}",
    "\\iint_{}^{}": "\\iint_{D}",
    "\\iint\\limits_{}^{}": "\\iint\\limits_{D}",
    "\\iiint_{}^{}": "\\iiint_{V}",
    "\\iiint\\limits_{}^{}": "\\iiint\\limits_{V}",
    "\\oint_{}^{}": "\\oint_{C}",
    "\\sum_{}^{}": "\\sum_{i=1}^{n}",
    "{\\textstyle \\sum_{}^{}}": "{\\textstyle \\sum_{i=1}^{n}}",
    "\\prod_{}^{}": "\\prod_{i=1}^{n}",
    "{\\textstyle \\prod_{}^{}}": "{\\textstyle \\prod_{i=1}^{n}}",
    "\\coprod_{}^{}": "\\coprod_{i=1}^{n}",
    "{\\textstyle \\coprod_{}^{}}": "{\\textstyle \\coprod_{i=1}^{n}}",
    "\\bigcup_{}^{}": "\\bigcup_{i=1}^{n}",
    "{\\textstyle \\bigcup_{}^{}}": "{\\textstyle \\bigcup_{i=1}^{n}}",
    "\\bigcap_{}^{}": "\\bigcap_{i=1}^{n}",
    "{\\textstyle \\bigcap_{}^{}}": "{\\textstyle \\bigcap_{i=1}^{n}}",
    "\\bigvee_{}^{}": "\\bigvee_{i=1}^{n}",
    "{\\textstyle \\bigvee_{}^{}}": "{\\textstyle \\bigvee_{i=1}^{n}}",
    "\\bigwedge_{}^{}": "\\bigwedge_{i=1}^{n}",
    "{\\textstyle \\bigwedge_{}^{}}": "{\\textstyle \\bigwedge_{i=1}^{n}}"
  };

  if (exactMap[normalized]) {
    return exactMap[normalized];
  }

  if (/^\\begin\{equation\}/.test(normalized)) {
    return normalized
      .replace(/^\\begin\{equation\}\s*/, "")
      .replace(/\s*\\end\{equation\}$/, "")
      .trim();
  }

  if (categoryId === "frac" && normalized === "\\mathrm{d}t") {
    return "\\mathrm{d}t";
  }

  return normalized;
}

function buildPreview(entries) {
  const samples = entries
    .filter((entry) => entry.tag !== "divider" && normalizeLatex(entry.latex))
    .slice(0, 3)
    .map((entry) => buildSafeMath("", entry.latex));

  return samples.join("\\ ");
}

function buildGroupTitle(categoryId, divider) {
  if (!divider) {
    return {
      zh: englishTitleMap[categoryId] ? "" : categoryId,
      en: englishTitleMap[categoryId] || categoryId
    };
  }

  const zh = normalizeWhitespace(divider.name_en ? divider.name.replace(divider.name_en, "") : divider.name);
  const en = normalizeWhitespace(divider.name_en || divider.name);
  return { zh, en };
}

function buildInsert(latex) {
  const normalized = normalizeLatex(latex);
  if (!normalized) {
    return "";
  }
  return normalized;
}

function transform() {
  const json = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const shortcut = json.shortcut[0];
  const layer1 = shortcut.layer1.cont;
  const layer2 = shortcut.layer2.cont;

  const catalog = layer1.map((category) => {
    const rawEntries = layer2[category.tag]?.cont || [];
    const groups = [];
    let currentDivider = null;
    let currentItems = [];

    const pushGroup = () => {
      if (!currentItems.length) {
        return;
      }
      groups.push({
        title: buildGroupTitle(category.tag, currentDivider),
        items: currentItems
      });
      currentItems = [];
    };

    rawEntries.forEach((entry) => {
      if (entry.tag === "divider") {
        pushGroup();
        currentDivider = entry;
        return;
      }

      const insertLatex = buildInsert(entry.latex);
      const previewLatex = buildSafeMath(category.tag, entry.latex);
      if (!insertLatex || !previewLatex) {
        return;
      }

      currentItems.push({
        math: previewLatex,
        insert: insertLatex,
        zh:
          meaningfulText(entry.zh) ||
          meaningfulText(entry.descript) ||
          meaningfulText(entry.tag) ||
          meaningfulText(category.descript),
        en:
          meaningfulText(entry.en) ||
          meaningfulText(entry.descript_en) ||
          meaningfulText(entry.tag) ||
          englishTitleMap[category.tag] ||
          category.tag
      });
    });

    pushGroup();

    if (!groups.length) {
      groups.push({
        title: {
          zh: normalizeWhitespace(category.descript),
          en: englishTitleMap[category.tag] || normalizeWhitespace(category.descript_en || category.descript)
        },
        items: []
      });
    }

    return {
      id: category.tag,
      title: {
        zh: normalizeWhitespace(category.descript),
        en: englishTitleMap[category.tag] || normalizeWhitespace(category.descript_en || category.descript)
      },
      usage: {
        zh: normalizeWhitespace(category.descript),
        en: englishUsageMap[category.tag] || normalizeWhitespace(category.descript_en || category.descript)
      },
      preview: buildPreview(rawEntries),
      groups
    };
  });

  const output = `window.toolCatalogData = ${JSON.stringify(catalog, null, 2)};\n`;
  fs.writeFileSync(targetPath, output, "utf8");
}

transform();
