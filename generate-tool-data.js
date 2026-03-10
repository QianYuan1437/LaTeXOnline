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

function buildPreview(entries) {
  const samples = entries
    .filter((entry) => entry.tag !== "divider" && normalizeLatex(entry.latex))
    .slice(0, 3)
    .map((entry) => normalizeLatex(entry.latex).replace(/\{\}/g, "x"));

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

      const latex = buildInsert(entry.latex);
      if (!latex) {
        return;
      }

      currentItems.push({
        math: latex,
        insert: latex,
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
