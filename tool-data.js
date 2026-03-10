window.toolCatalogData = (() => {
  function item(math, insert, zh, en) {
    return { math, insert: insert || math, zh, en };
  }

  function group(zh, en, items) {
    return { title: { zh, en }, items };
  }

  return [
    {
      id: "symbol",
      title: { zh: "常用符号", en: "Symbols" },
      usage: { zh: "运算 / 关系 / 箭头", en: "Ops / Relations / Arrows" },
      preview: String.raw`\times\ \leq\ \Rightarrow`,
      groups: [
        group("二元运算符", "Binary operations", [
          item("+", "+ ", "加", "plus"),
          item("-", "- ", "减", "minus"),
          item(String.raw`\times`, String.raw`\times `, "乘", "times"),
          item(String.raw`\div`, String.raw`\div `, "除", "division"),
          item(String.raw`\pm`, String.raw`\pm `, "加减", "plus-minus"),
          item(String.raw`\mp`, String.raw`\mp `, "减加", "minus-plus"),
          item(String.raw`\cdot`, String.raw`\cdot `, "点乘", "dot"),
          item(String.raw`\star`, String.raw`\star `, "星号", "star"),
          item(String.raw`\ast`, String.raw`\ast `, "星形", "asterisk"),
          item(String.raw`\cup`, String.raw`\cup `, "并集", "union"),
          item(String.raw`\cap`, String.raw`\cap `, "交集", "intersection"),
          item(String.raw`\sqcup`, String.raw`\sqcup `, "方并", "sq union"),
          item(String.raw`\sqcap`, String.raw`\sqcap `, "方交", "sq intersection"),
          item(String.raw`\vee`, String.raw`\vee `, "析取", "vee"),
          item(String.raw`\wedge`, String.raw`\wedge `, "合取", "wedge"),
          item(String.raw`\circ`, String.raw`\circ `, "圆乘", "circ"),
          item(String.raw`\bullet`, String.raw`\bullet `, "实心点", "bullet"),
          item(String.raw`\oplus`, String.raw`\oplus `, "直和", "oplus"),
          item(String.raw`\ominus`, String.raw`\ominus `, "圆减", "ominus"),
          item(String.raw`\odot`, String.raw`\odot `, "圆点", "odot"),
          item(String.raw`\oslash`, String.raw`\oslash `, "圆斜杠", "oslash"),
          item(String.raw`\otimes`, String.raw`\otimes `, "张量积", "otimes"),
          item(String.raw`\diamond`, String.raw`\diamond `, "菱形", "diamond"),
          item(String.raw`\uplus`, String.raw`\uplus `, "并和", "uplus"),
          item(String.raw`\bigtriangleup`, String.raw`\bigtriangleup `, "上三角", "triangle up"),
          item(String.raw`\bigtriangledown`, String.raw`\bigtriangledown `, "下三角", "triangle down"),
          item(String.raw`\triangleleft`, String.raw`\triangleleft `, "左三角", "triangle left"),
          item(String.raw`\triangleright`, String.raw`\triangleright `, "右三角", "triangle right"),
          item(String.raw`\setminus`, String.raw`\setminus `, "集合差", "setminus"),
          item(String.raw`\wr`, String.raw`\wr `, "花积", "wreath product")
        ]),
        group("二元关系符", "Binary relations", [
          item("<", "< ", "小于", "less than"),
          item(">", "> ", "大于", "greater than"),
          item("=", "= ", "等于", "equals"),
          item(String.raw`\leq`, String.raw`\leq `, "小于等于", "less or equal"),
          item(String.raw`\geq`, String.raw`\geq `, "大于等于", "greater or equal"),
          item(String.raw`\equiv`, String.raw`\equiv `, "恒等", "equivalent"),
          item(String.raw`\ll`, String.raw`\ll `, "远小于", "much less"),
          item(String.raw`\gg`, String.raw`\gg `, "远大于", "much greater"),
          item(String.raw`\doteq`, String.raw`\doteq `, "点等", "dot equals"),
          item(String.raw`\prec`, String.raw`\prec `, "先于", "precedes"),
          item(String.raw`\succ`, String.raw`\succ `, "后于", "succeeds"),
          item(String.raw`\sim`, String.raw`\sim `, "相似", "similar"),
          item(String.raw`\simeq`, String.raw`\simeq `, "近似相等", "similar equal"),
          item(String.raw`\approx`, String.raw`\approx `, "约等于", "approx"),
          item(String.raw`\subset`, String.raw`\subset `, "真子集", "subset"),
          item(String.raw`\supset`, String.raw`\supset `, "真超集", "supset"),
          item(String.raw`\subseteq`, String.raw`\subseteq `, "子集", "subseteq"),
          item(String.raw`\supseteq`, String.raw`\supseteq `, "超集", "supseteq"),
          item(String.raw`\in`, String.raw`\in `, "属于", "in"),
          item(String.raw`\ni`, String.raw`\ni `, "包含", "contains"),
          item(String.raw`\propto`, String.raw`\propto `, "正比于", "proportional"),
          item(String.raw`\models`, String.raw`\models `, "满足", "models"),
          item(String.raw`\perp`, String.raw`\perp `, "垂直", "perpendicular"),
          item(String.raw`\parallel`, String.raw`\parallel `, "平行", "parallel"),
          item(String.raw`\bowtie`, String.raw`\bowtie `, "连接", "bowtie"),
          item(String.raw`\smile`, String.raw`\smile `, "相容", "smile"),
          item(String.raw`\frown`, String.raw`\frown `, "不相容", "frown"),
          item(String.raw`\neq`, String.raw`\neq `, "不等于", "not equal")
        ]),
        group("箭头符号", "Arrows", [
          item(String.raw`\leftarrow`, String.raw`\leftarrow `, "左箭头", "left arrow"),
          item(String.raw`\rightarrow`, String.raw`\rightarrow `, "右箭头", "right arrow"),
          item(String.raw`\leftrightarrow`, String.raw`\leftrightarrow `, "左右箭头", "left-right"),
          item(String.raw`\uparrow`, String.raw`\uparrow `, "上箭头", "up arrow"),
          item(String.raw`\downarrow`, String.raw`\downarrow `, "下箭头", "down arrow"),
          item(String.raw`\updownarrow`, String.raw`\updownarrow `, "上下箭头", "up-down"),
          item(String.raw`\Leftarrow`, String.raw`\Leftarrow `, "双左箭头", "double left"),
          item(String.raw`\Rightarrow`, String.raw`\Rightarrow `, "双右箭头", "double right"),
          item(String.raw`\Leftrightarrow`, String.raw`\Leftrightarrow `, "双向箭头", "double both"),
          item(String.raw`\mapsto`, String.raw`\mapsto `, "映射到", "mapsto"),
          item(String.raw`\hookleftarrow`, String.raw`\hookleftarrow `, "钩左箭头", "hook left"),
          item(String.raw`\hookrightarrow`, String.raw`\hookrightarrow `, "钩右箭头", "hook right"),
          item(String.raw`\longleftarrow`, String.raw`\longleftarrow `, "长左箭头", "long left"),
          item(String.raw`\longrightarrow`, String.raw`\longrightarrow `, "长右箭头", "long right"),
          item(String.raw`\Longleftrightarrow`, String.raw`\Longleftrightarrow `, "长双向箭头", "long both"),
          item(String.raw`\nearrow`, String.raw`\nearrow `, "东北箭头", "north-east"),
          item(String.raw`\searrow`, String.raw`\searrow `, "东南箭头", "south-east"),
          item(String.raw`\swarrow`, String.raw`\swarrow `, "西南箭头", "south-west"),
          item(String.raw`\nwarrow`, String.raw`\nwarrow `, "西北箭头", "north-west")
        ]),
        group("其他符号", "Others", [
          item(String.raw`\ldots`, String.raw`\ldots `, "省略号", "ellipsis"),
          item(String.raw`\cdots`, String.raw`\cdots `, "中线省略", "center dots"),
          item(String.raw`\vdots`, String.raw`\vdots `, "竖省略", "vertical dots"),
          item(String.raw`\ddots`, String.raw`\ddots `, "斜省略", "diagonal dots"),
          item(String.raw`\forall`, String.raw`\forall `, "任意", "for all"),
          item(String.raw`\exists`, String.raw`\exists `, "存在", "exists"),
          item(String.raw`\infty`, String.raw`\infty `, "无穷", "infinity"),
          item(String.raw`\partial`, String.raw`\partial `, "偏导", "partial"),
          item(String.raw`\nabla`, String.raw`\nabla `, "梯度", "nabla"),
          item(String.raw`\angle`, String.raw`\angle `, "角", "angle"),
          item(String.raw`\triangle`, String.raw`\triangle `, "三角形", "triangle"),
          item(String.raw`\square`, String.raw`\square `, "方形", "square"),
          item(String.raw`\diamondsuit`, String.raw`\diamondsuit `, "方片", "diamond suit"),
          item(String.raw`\heartsuit`, String.raw`\heartsuit `, "红心", "heart suit"),
          item(String.raw`\clubsuit`, String.raw`\clubsuit `, "梅花", "club suit"),
          item(String.raw`\spadesuit`, String.raw`\spadesuit `, "黑桃", "spade suit"),
          item(String.raw`\flat`, String.raw`\flat `, "降号", "flat"),
          item(String.raw`\sharp`, String.raw`\sharp `, "升号", "sharp"),
          item(String.raw`\natural`, String.raw`\natural `, "还原号", "natural"),
          item(String.raw`\emptyset`, String.raw`\emptyset `, "空集", "empty set")
        ])
      ]
    },
    {
      id: "greek",
      title: { zh: "希腊字母", en: "Greek Letters" },
      usage: { zh: "小写 / 大写 / 变体", en: "Lower / Upper / Variants" },
      preview: String.raw`\alpha\ \beta\ \Gamma\ \Omega`,
      groups: [
        group("小写", "Lowercase", [
          item(String.raw`\alpha`, String.raw`\alpha `, "阿尔法", "alpha"),
          item(String.raw`\beta`, String.raw`\beta `, "贝塔", "beta"),
          item(String.raw`\gamma`, String.raw`\gamma `, "伽马", "gamma"),
          item(String.raw`\delta`, String.raw`\delta `, "德尔塔", "delta"),
          item(String.raw`\epsilon`, String.raw`\epsilon `, "艾普西龙", "epsilon"),
          item(String.raw`\zeta`, String.raw`\zeta `, "泽塔", "zeta"),
          item(String.raw`\eta`, String.raw`\eta `, "伊塔", "eta"),
          item(String.raw`\theta`, String.raw`\theta `, "西塔", "theta"),
          item(String.raw`\iota`, String.raw`\iota `, "约塔", "iota"),
          item(String.raw`\kappa`, String.raw`\kappa `, "卡帕", "kappa"),
          item(String.raw`\lambda`, String.raw`\lambda `, "拉姆达", "lambda"),
          item(String.raw`\mu`, String.raw`\mu `, "缪", "mu"),
          item(String.raw`\nu`, String.raw`\nu `, "纽", "nu"),
          item(String.raw`\xi`, String.raw`\xi `, "克西", "xi"),
          item(String.raw`\pi`, String.raw`\pi `, "派", "pi"),
          item(String.raw`\rho`, String.raw`\rho `, "柔", "rho"),
          item(String.raw`\sigma`, String.raw`\sigma `, "西格玛", "sigma"),
          item(String.raw`\tau`, String.raw`\tau `, "陶", "tau"),
          item(String.raw`\upsilon`, String.raw`\upsilon `, "宇普西龙", "upsilon"),
          item(String.raw`\phi`, String.raw`\phi `, "斐", "phi"),
          item(String.raw`\chi`, String.raw`\chi `, "卡伊", "chi"),
          item(String.raw`\psi`, String.raw`\psi `, "普赛", "psi"),
          item(String.raw`\omega`, String.raw`\omega `, "欧米伽", "omega")
        ]),
        group("大写", "Uppercase", [
          item(String.raw`\Gamma`, String.raw`\Gamma `, "大伽马", "Gamma"),
          item(String.raw`\Delta`, String.raw`\Delta `, "大德尔塔", "Delta"),
          item(String.raw`\Theta`, String.raw`\Theta `, "大西塔", "Theta"),
          item(String.raw`\Lambda`, String.raw`\Lambda `, "大拉姆达", "Lambda"),
          item(String.raw`\Xi`, String.raw`\Xi `, "大克西", "Xi"),
          item(String.raw`\Pi`, String.raw`\Pi `, "大派", "Pi"),
          item(String.raw`\Sigma`, String.raw`\Sigma `, "大西格玛", "Sigma"),
          item(String.raw`\Upsilon`, String.raw`\Upsilon `, "大宇普西龙", "Upsilon"),
          item(String.raw`\Phi`, String.raw`\Phi `, "大斐", "Phi"),
          item(String.raw`\Psi`, String.raw`\Psi `, "大普赛", "Psi"),
          item(String.raw`\Omega`, String.raw`\Omega `, "大欧米伽", "Omega")
        ]),
        group("其他", "Others", [
          item(String.raw`\varepsilon`, String.raw`\varepsilon `, "变体 epsilon", "variant epsilon"),
          item(String.raw`\vartheta`, String.raw`\vartheta `, "变体 theta", "variant theta"),
          item(String.raw`\varpi`, String.raw`\varpi `, "变体 pi", "variant pi"),
          item(String.raw`\varrho`, String.raw`\varrho `, "变体 rho", "variant rho"),
          item(String.raw`\varsigma`, String.raw`\varsigma `, "变体 sigma", "variant sigma"),
          item(String.raw`\varphi`, String.raw`\varphi `, "变体 phi", "variant phi")
        ])
      ]
    },
    {
      id: "frac",
      title: { zh: "分数微分", en: "Fractions & Derivatives" },
      usage: { zh: "分式 / 导数 / 模算术", en: "Fractions / Derivative / Modular" },
      preview: String.raw`\frac{a+b}{c+d}`,
      groups: [
        group("分数", "Fractions", [
          item(String.raw`\frac{a}{b}`, String.raw`\frac{a}{b}`, "标准分数", "fraction"),
          item(String.raw`\dfrac{a}{b}`, String.raw`\dfrac{a}{b}`, "显示分数", "display fraction"),
          item(String.raw`\tfrac{a}{b}`, String.raw`\tfrac{a}{b}`, "行内分数", "text fraction"),
          item(String.raw`a\over b`, String.raw`{a \over b}`, "横线分数", "over"),
          item(String.raw`\binom{n}{k}`, String.raw`\binom{n}{k}`, "二项式", "binomial"),
          item(String.raw`\cfrac{1}{1+\cfrac{1}{x}}`, String.raw`\cfrac{1}{1+\cfrac{1}{x}}`, "连分数", "continued fraction")
        ]),
        group("导数", "Derivative", [
          item(String.raw`\frac{d}{dx}`, String.raw`\frac{d}{dx}`, "导数算子", "derivative operator"),
          item(String.raw`\frac{dy}{dx}`, String.raw`\frac{dy}{dx}`, "一阶导", "first derivative"),
          item(String.raw`\frac{d^2y}{dx^2}`, String.raw`\frac{d^2y}{dx^2}`, "二阶导", "second derivative"),
          item(String.raw`\partial_x f`, String.raw`\partial_x f`, "偏导简写", "partial shorthand"),
          item(String.raw`\frac{\partial y}{\partial x}`, String.raw`\frac{\partial y}{\partial x}`, "偏导分式", "partial derivative"),
          item(String.raw`\frac{\partial^2 y}{\partial x^2}`, String.raw`\frac{\partial^2 y}{\partial x^2}`, "二阶偏导", "second partial"),
          item(String.raw`\dot{x}`, String.raw`\dot{x}`, "一阶点导", "dot derivative"),
          item(String.raw`\ddot{x}`, String.raw`\ddot{x}`, "二阶点导", "double dot")
        ]),
        group("模算术", "Modular arithmetic", [
          item(String.raw`a \bmod n`, String.raw`a \bmod n`, "取模", "mod"),
          item(String.raw`a \pmod{n}`, String.raw`a \pmod{n}`, "同余模", "parenthesized mod"),
          item(String.raw`a \equiv b \pmod{n}`, String.raw`a \equiv b \pmod{n}`, "同余", "congruence"),
          item(String.raw`\gcd(a,b)`, String.raw`\gcd(a,b)`, "最大公约数", "gcd"),
          item(String.raw`\operatorname{lcm}(a,b)`, String.raw`\operatorname{lcm}(a,b)`, "最小公倍数", "lcm")
        ])
      ]
    },
    {
      id: "sqrt",
      title: { zh: "根式角标", en: "Radicals & Scripts" },
      usage: { zh: "根式 / 上下标 / 重音", en: "Radicals / Scripts / Accents" },
      preview: String.raw`\sqrt[n]{x^2+y^2}`,
      groups: [
        group("根式", "Radicals", [
          item(String.raw`\sqrt{x}`, String.raw`\sqrt{x}`, "平方根", "square root"),
          item(String.raw`\sqrt[n]{x}`, String.raw`\sqrt[n]{x}`, "n 次根", "nth root"),
          item(String.raw`\sqrt{a^2+b^2}`, String.raw`\sqrt{a^2+b^2}`, "勾股型", "pythagorean"),
          item(String.raw`\sqrt{\frac{1}{x}}`, String.raw`\sqrt{\frac{1}{x}}`, "分式根", "fraction root"),
          item(String.raw`\sqrt{1-\sin^2 x}`, String.raw`\sqrt{1-\sin^2 x}`, "函数根式", "function root")
        ]),
        group("上下标", "Sub & Super", [
          item(String.raw`x^2`, String.raw`x^2`, "上标", "superscript"),
          item(String.raw`x_i`, String.raw`x_i`, "下标", "subscript"),
          item(String.raw`x_i^2`, String.raw`x_i^2`, "混合脚标", "mixed scripts"),
          item(String.raw`a_{n+1}`, String.raw`a_{n+1}`, "组合下标", "compound subscript"),
          item(String.raw`e^{i\theta}`, String.raw`e^{i\theta}`, "复指数", "complex exponential"),
          item(String.raw`x^{y^z}`, String.raw`x^{y^z}`, "嵌套上标", "nested power"),
          item(String.raw`A_{m,n}`, String.raw`A_{m,n}`, "双下标", "double subscript")
        ]),
        group("重音符及其他", "Accents and Others", [
          item(String.raw`\hat{x}`, String.raw`\hat{x}`, "帽子", "hat"),
          item(String.raw`\bar{x}`, String.raw`\bar{x}`, "横线", "bar"),
          item(String.raw`\vec{v}`, String.raw`\vec{v}`, "向量", "vector"),
          item(String.raw`\tilde{f}`, String.raw`\tilde{f}`, "波浪", "tilde"),
          item(String.raw`\overline{AB}`, String.raw`\overline{AB}`, "上横线", "overline"),
          item(String.raw`\underline{x+y}`, String.raw`\underline{x+y}`, "下划线", "underline"),
          item(String.raw`\overbrace{a+b+\cdots+z}^{26}`, String.raw`\overbrace{a+b+\cdots+z}^{26}`, "上括号注释", "overbrace"),
          item(String.raw`\underbrace{x_1+\cdots+x_n}_{n\ terms}`, String.raw`\underbrace{x_1+\cdots+x_n}_{n\ terms}`, "下括号注释", "underbrace")
        ])
      ]
    },
    {
      id: "limit",
      title: { zh: "极限对数", en: "Limits & Logs" },
      usage: { zh: "极限 / 指数 / 界限", en: "Limits / Logs / Bounds" },
      preview: String.raw`\lim_{x\to 0}\frac{\sin x}{x}`,
      groups: [
        group("极限", "Limits", [
          item(String.raw`\lim_{x \to 0} f(x)`, String.raw`\lim_{x \to 0} f(x)`, "普通极限", "limit"),
          item(String.raw`\lim_{n \to \infty} a_n`, String.raw`\lim_{n \to \infty} a_n`, "无穷极限", "limit at infinity"),
          item(String.raw`\inf_{x \in A} f(x)`, String.raw`\inf_{x \in A} f(x)`, "下确界", "infimum"),
          item(String.raw`\sup_{x \in A} f(x)`, String.raw`\sup_{x \in A} f(x)`, "上确界", "supremum"),
          item(String.raw`\min_{x \in A} f(x)`, String.raw`\min_{x \in A} f(x)`, "最小值", "minimum"),
          item(String.raw`\max_{x \in A} f(x)`, String.raw`\max_{x \in A} f(x)`, "最大值", "maximum")
        ]),
        group("对数指数", "Logarithms and exponentials", [
          item(String.raw`\log x`, String.raw`\log x`, "对数", "log"),
          item(String.raw`\ln x`, String.raw`\ln x`, "自然对数", "natural log"),
          item(String.raw`\log_a b`, String.raw`\log_a b`, "换底对数", "log base a"),
          item(String.raw`\exp(x)`, String.raw`\exp(x)`, "指数函数", "exp"),
          item(String.raw`e^x`, String.raw`e^x`, "自然指数", "exponential"),
          item(String.raw`a^{x+y}`, String.raw`a^{x+y}`, "幂指数", "power")
        ]),
        group("界限", "Bounds", [
          item(String.raw`\limsup_{n\to\infty} a_n`, String.raw`\limsup_{n\to\infty} a_n`, "上极限", "limsup"),
          item(String.raw`\liminf_{n\to\infty} a_n`, String.raw`\liminf_{n\to\infty} a_n`, "下极限", "liminf"),
          item(String.raw`\arg\min_x f(x)`, String.raw`\arg\min_x f(x)`, "极小点", "arg min"),
          item(String.raw`\arg\max_x f(x)`, String.raw`\arg\max_x f(x)`, "极大点", "arg max")
        ])
      ]
    },
    {
      id: "trig",
      title: { zh: "三角函数", en: "Trigonometric" },
      usage: { zh: "三角 / 反三角 / 双曲", en: "Trig / Inverse / Hyperbolic" },
      preview: String.raw`\sin\theta+\cos\theta`,
      groups: [
        group("三角函数", "Trigonometric functions", [
          item(String.raw`\sin x`, String.raw`\sin x`, "正弦", "sin"),
          item(String.raw`\cos x`, String.raw`\cos x`, "余弦", "cos"),
          item(String.raw`\tan x`, String.raw`\tan x`, "正切", "tan"),
          item(String.raw`\cot x`, String.raw`\cot x`, "余切", "cot"),
          item(String.raw`\sec x`, String.raw`\sec x`, "正割", "sec"),
          item(String.raw`\csc x`, String.raw`\csc x`, "余割", "csc")
        ]),
        group("反三角函数", "Inverse trigonometric functions", [
          item(String.raw`\arcsin x`, String.raw`\arcsin x`, "反正弦", "arcsin"),
          item(String.raw`\arccos x`, String.raw`\arccos x`, "反余弦", "arccos"),
          item(String.raw`\arctan x`, String.raw`\arctan x`, "反正切", "arctan"),
          item(String.raw`\operatorname{arccot} x`, String.raw`\operatorname{arccot} x`, "反余切", "arccot")
        ]),
        group("双曲函数", "Hyperbolic functions", [
          item(String.raw`\sinh x`, String.raw`\sinh x`, "双曲正弦", "sinh"),
          item(String.raw`\cosh x`, String.raw`\cosh x`, "双曲余弦", "cosh"),
          item(String.raw`\tanh x`, String.raw`\tanh x`, "双曲正切", "tanh"),
          item(String.raw`\coth x`, String.raw`\coth x`, "双曲余切", "coth")
        ]),
        group("反双曲函数", "Inverse hyperbolic functions", [
          item(String.raw`\operatorname{arsinh} x`, String.raw`\operatorname{arsinh} x`, "反双曲正弦", "arsinh"),
          item(String.raw`\operatorname{arcosh} x`, String.raw`\operatorname{arcosh} x`, "反双曲余弦", "arcosh"),
          item(String.raw`\operatorname{artanh} x`, String.raw`\operatorname{artanh} x`, "反双曲正切", "artanh"),
          item(String.raw`\operatorname{arcoth} x`, String.raw`\operatorname{arcoth} x`, "反双曲余切", "arcoth")
        ])
      ]
    },
    {
      id: "integral",
      title: { zh: "积分运算", en: "Integral" },
      usage: { zh: "单积分 / 多重积分 / 曲线积分", en: "Single / Multiple / Path" },
      preview: String.raw`\int_a^b f(x)\,dx`,
      groups: [
        group("积分", "Integral", [
          item(String.raw`\int f(x)\,dx`, String.raw`\int f(x)\,dx`, "不定积分", "indefinite integral"),
          item(String.raw`\int_a^b f(x)\,dx`, String.raw`\int_a^b f(x)\,dx`, "定积分", "definite integral"),
          item(String.raw`\oint_C f(z)\,dz`, String.raw`\oint_C f(z)\,dz`, "闭合积分", "closed integral")
        ]),
        group("双重积分", "Double integral", [
          item(String.raw`\iint_D f(x,y)\,dA`, String.raw`\iint_D f(x,y)\,dA`, "二重积分", "double integral"),
          item(String.raw`\iint_R x^2+y^2\,dx\,dy`, String.raw`\iint_R x^2+y^2\,dx\,dy`, "区域积分", "region integral")
        ]),
        group("三重积分", "Triple integral", [
          item(String.raw`\iiint_V f(x,y,z)\,dV`, String.raw`\iiint_V f(x,y,z)\,dV`, "三重积分", "triple integral"),
          item(String.raw`\iiint_V xyz\,dx\,dy\,dz`, String.raw`\iiint_V xyz\,dx\,dy\,dz`, "体积分", "volume integral")
        ]),
        group("曲线积分", "Closed line or path integral", [
          item(String.raw`\int_C \mathbf{F}\cdot d\mathbf{r}`, String.raw`\int_C \mathbf{F}\cdot d\mathbf{r}`, "路径积分", "line integral"),
          item(String.raw`\oint_C \mathbf{E}\cdot d\mathbf{r}`, String.raw`\oint_C \mathbf{E}\cdot d\mathbf{r}`, "闭合路径积分", "closed path"),
          item(String.raw`\oiint_S \mathbf{F}\cdot d\mathbf{S}`, String.raw`\oiint_S \mathbf{F}\cdot d\mathbf{S}`, "曲面积分", "surface integral"),
          item(String.raw`\oiiint_V \nabla\cdot \mathbf{F}\,dV`, String.raw`\oiiint_V \nabla\cdot \mathbf{F}\,dV`, "体散度积分", "volume flux")
        ])
      ]
    },
    {
      id: "sum",
      title: { zh: "大型运算", en: "Large Operators" },
      usage: { zh: "求和 / 乘积 / 并交 / 逻辑", en: "Sum / Product / Set / Logic" },
      preview: String.raw`\sum_{i=1}^{n} a_i`,
      groups: [
        group("求和", "Summation", [
          item(String.raw`\sum_{i=1}^{n} a_i`, String.raw`\sum_{i=1}^{n} a_i`, "求和", "sum"),
          item(String.raw`\sum_{k=0}^{\infty} x^k`, String.raw`\sum_{k=0}^{\infty} x^k`, "无穷和", "infinite sum"),
          item(String.raw`\sum_{\substack{1\leq i\leq n\\ i\ \mathrm{odd}}} i`, String.raw`\sum_{\substack{1\leq i\leq n\\ i\ \mathrm{odd}}} i`, "多条件求和", "conditional sum")
        ]),
        group("乘积余积", "Product and coproduct", [
          item(String.raw`\prod_{i=1}^{n} a_i`, String.raw`\prod_{i=1}^{n} a_i`, "连乘", "product"),
          item(String.raw`\coprod_{i=1}^{n} X_i`, String.raw`\coprod_{i=1}^{n} X_i`, "余积", "coproduct"),
          item(String.raw`\bigotimes_{i=1}^{n} V_i`, String.raw`\bigotimes_{i=1}^{n} V_i`, "大张量积", "big otimes"),
          item(String.raw`\bigoplus_{i=1}^{n} V_i`, String.raw`\bigoplus_{i=1}^{n} V_i`, "大直和", "big oplus")
        ]),
        group("并集交集", "Union and intersection", [
          item(String.raw`\bigcup_{i=1}^{n} A_i`, String.raw`\bigcup_{i=1}^{n} A_i`, "大并集", "big union"),
          item(String.raw`\bigcap_{i=1}^{n} A_i`, String.raw`\bigcap_{i=1}^{n} A_i`, "大交集", "big intersection"),
          item(String.raw`\bigsqcup_{i=1}^{n} A_i`, String.raw`\bigsqcup_{i=1}^{n} A_i`, "大方并", "big sqcup"),
          item(String.raw`\bigsqcap_{i=1}^{n} A_i`, String.raw`\bigsqcap_{i=1}^{n} A_i`, "大方交", "big sqcap")
        ]),
        group("析取合取", "Disjunction and conjunction", [
          item(String.raw`\bigvee_{i=1}^{n} p_i`, String.raw`\bigvee_{i=1}^{n} p_i`, "大析取", "big vee"),
          item(String.raw`\bigwedge_{i=1}^{n} p_i`, String.raw`\bigwedge_{i=1}^{n} p_i`, "大合取", "big wedge"),
          item(String.raw`\bigodot_{i=1}^{n} a_i`, String.raw`\bigodot_{i=1}^{n} a_i`, "大圆点", "big odot")
        ])
      ]
    },
    {
      id: "bracket",
      title: { zh: "括号取整", en: "Brackets" },
      usage: { zh: "定界符 / 取整 / 范数", en: "Delimiters / Floors / Norms" },
      preview: String.raw`\left( \frac{a}{b} \right)`,
      groups: [
        group("括号", "Brackets", [
          item(String.raw`\left( x \right)`, String.raw`\left(  \right)`, "圆括号", "parentheses"),
          item(String.raw`\left[ x \right]`, String.raw`\left[  \right]`, "方括号", "brackets"),
          item(String.raw`\left\{ x \right\}`, String.raw`\left\{  \right\}`, "花括号", "braces"),
          item(String.raw`\left| x \right|`, String.raw`\left|  \right|`, "绝对值", "absolute value"),
          item(String.raw`\left\langle x \right\rangle`, String.raw`\left\langle  \right\rangle`, "角括号", "angle brackets"),
          item(String.raw`\left\lfloor x \right\rfloor`, String.raw`\left\lfloor  \right\rfloor`, "下取整", "floor"),
          item(String.raw`\left\lceil x \right\rceil`, String.raw`\left\lceil  \right\rceil`, "上取整", "ceiling"),
          item(String.raw`\left\| x \right\|`, String.raw`\left\|  \right\|`, "范数", "norm")
        ]),
        group("常用", "Commons", [
          item(String.raw`\binom{n}{k}`, String.raw`\binom{n}{k}`, "二项式括号", "binomial"),
          item(String.raw`\left.\frac{dy}{dx}\right|_{x=0}`, String.raw`\left.\frac{dy}{dx}\right|_{x=0}`, "评价括号", "evaluation"),
          item(String.raw`\left\{ \begin{aligned} x+y&=1\\ x-y&=3 \end{aligned} \right.`, String.raw`\left\{ \begin{aligned} x+y&=1\\ x-y&=3 \end{aligned} \right.`, "方程组", "piecewise system"),
          item(String.raw`\left( \begin{matrix} a&b\\ c&d \end{matrix} \right)`, String.raw`\left( \begin{matrix} a&b\\ c&d \end{matrix} \right)`, "带括号矩阵", "bracketed matrix"),
          item(String.raw`\left[ 0,1 \right)`, String.raw`\left[ 0,1 \right)`, "区间", "interval")
        ])
      ]
    },
    {
      id: "matrix",
      title: { zh: "数组矩阵", en: "Matrices" },
      usage: { zh: "矩阵 / 多行 / 分块", en: "Matrix / Multiline / Array" },
      preview: String.raw`\begin{bmatrix}1&0\\0&1\end{bmatrix}`,
      groups: [
        group("矩阵与多行", "Matrices and Multilines", [
          item(String.raw`\begin{matrix} a&b\\ c&d \end{matrix}`, String.raw`\begin{matrix} a & b \\ c & d \end{matrix}`, "基础矩阵", "basic matrix"),
          item(String.raw`\begin{pmatrix} a&b\\ c&d \end{pmatrix}`, String.raw`\begin{pmatrix} a & b \\ c & d \end{pmatrix}`, "圆括号矩阵", "pmatrix"),
          item(String.raw`\begin{bmatrix} a&b\\ c&d \end{bmatrix}`, String.raw`\begin{bmatrix} a & b \\ c & d \end{bmatrix}`, "方括号矩阵", "bmatrix"),
          item(String.raw`\begin{Bmatrix} a&b\\ c&d \end{Bmatrix}`, String.raw`\begin{Bmatrix} a & b \\ c & d \end{Bmatrix}`, "花括号矩阵", "Bmatrix"),
          item(String.raw`\begin{vmatrix} a&b\\ c&d \end{vmatrix}`, String.raw`\begin{vmatrix} a & b \\ c & d \end{vmatrix}`, "行列式", "vmatrix"),
          item(String.raw`\begin{Vmatrix} a&b\\ c&d \end{Vmatrix}`, String.raw`\begin{Vmatrix} a & b \\ c & d \end{Vmatrix}`, "双竖线矩阵", "Vmatrix"),
          item(String.raw`\begin{cases} x^2,&x\\ge 0\\\\ -x,&x<0 \end{cases}`, String.raw`\begin{cases} x^2,&x\\ge 0\\\\ -x,&x<0 \end{cases}`, "分段函数", "cases"),
          item(String.raw`\begin{aligned} a&=b+c\\ &=d+e \end{aligned}`, String.raw`\begin{aligned} a&=b+c\\ &=d+e \end{aligned}`, "对齐多行", "aligned")
        ]),
        group("数组", "Arrays", [
          item(String.raw`\begin{array}{cc} a&b\\ c&d \end{array}`, String.raw`\begin{array}{cc} a&b\\ c&d \end{array}`, "数组", "array"),
          item(String.raw`\begin{array}{rcl} y&=&mx+b\\ y-b&=&mx \end{array}`, String.raw`\begin{array}{rcl} y&=&mx+b\\ y-b&=&mx \end{array}`, "三列对齐", "rcl array"),
          item(String.raw`\begin{smallmatrix} a&b\\ c&d \end{smallmatrix}`, String.raw`\begin{smallmatrix} a&b\\ c&d \end{smallmatrix}`, "小矩阵", "smallmatrix")
        ]),
        group("定界与分块", "Delimiters", [
          item(String.raw`\left[\begin{array}{cc|c}1&0&1\\0&1&2\end{array}\right]`, String.raw`\left[\begin{array}{cc|c}1&0&1\\0&1&2\end{array}\right]`, "增广矩阵", "augmented matrix"),
          item(String.raw`\begin{pmatrix} A&B\\ C&D \end{pmatrix}`, String.raw`\begin{pmatrix} A&B\\ C&D \end{pmatrix}`, "分块矩阵", "block matrix")
        ])
      ]
    }
  ];
})();
