const STORAGE_KEY = "latex-online-editor";

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

const elements = {
  latexInput: document.getElementById("latexInput"),
  preview: document.getElementById("preview"),
  clearBtn: document.getElementById("clearBtn"),
  copyBtn: document.getElementById("copyBtn"),
  copyWrappedBtn: document.getElementById("copyWrappedBtn"),
  loadTemplateBtn: document.getElementById("loadTemplateBtn"),
  templateSelect: document.getElementById("templateSelect"),
  statusText: document.getElementById("statusText"),
  modeIndicator: document.getElementById("modeIndicator"),
  toggles: Array.from(document.querySelectorAll(".toggle")),
  snippetButtons: Array.from(document.querySelectorAll(".snippet-button"))
};

let mode = "display";
let renderTimer = null;

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

function setStatus(message) {
  elements.statusText.textContent = message;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(successMessage);
  } catch (error) {
    setStatus("Copy failed. Check browser permissions.");
  }
}

function persistState() {
  const payload = {
    source: elements.latexInput.value,
    mode
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function updateModeUi() {
  elements.modeIndicator.textContent = mode === "display" ? "Display Math" : "Inline Math";
  elements.toggles.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
}

async function renderMath() {
  const source = elements.latexInput.value.trim();
  const wrapped = getWrappedSource(source);
  elements.preview.textContent = "";
  elements.preview.innerHTML = wrapped;

  if (!source) {
    setStatus("Waiting for input");
    return;
  }

  try {
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise([elements.preview]);
    }
    setStatus("Rendered");
  } catch (error) {
    setStatus("Render failed. Check the LaTeX syntax.");
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
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    elements.latexInput.value = templates.quadratic;
    return;
  }

  try {
    const saved = JSON.parse(raw);
    elements.latexInput.value = saved.source || templates.quadratic;
    mode = saved.mode === "inline" ? "inline" : "display";
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
  void copyText(elements.latexInput.value, "Source copied.");
});

elements.copyWrappedBtn.addEventListener("click", () => {
  void copyText(getWrappedSource(elements.latexInput.value), "Wrapped source copied.");
});

elements.loadTemplateBtn.addEventListener("click", loadTemplate);

elements.toggles.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    updateModeUi();
    scheduleRender();
  });
});

elements.snippetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    insertSnippet(button.dataset.snippet);
  });
});

restoreState();
updateModeUi();
scheduleRender();
