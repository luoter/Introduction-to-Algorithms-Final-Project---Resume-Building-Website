// AI 服务 - 负责调用 AI API 生成/优化简历内容
// 支持多种 AI provider：Kimi（月之暗面）、硅基流动等
// 参考真实简历最佳实践优化

// 配置 AI Provider
const AI_CONFIG = {
  kimi: {
    baseURL: 'https://api.moonshot.cn/v1',
    model: 'moonshot-v1-8k',
    apiKeyKey: 'KIMI_API_KEY',
  },
  siliconflow: {
    baseURL: 'https://api.siliconflow.cn/v1',
    model: 'Qwen/Qwen2.5-7B-Instruct',
    apiKeyKey: 'SILICONFLOW_API_KEY',
  }
};

// 从 localStorage 读取配置
const getConfig = () => {
  const savedProvider = localStorage.getItem('AI_PROVIDER') || 'kimi';
  const savedApiKey = localStorage.getItem(AI_CONFIG[savedProvider].apiKeyKey) || '';
  return {
    provider: savedProvider,
    apiKey: savedApiKey,
    ...AI_CONFIG[savedProvider],
  };
};

// 调用 AI API
const callAI = async (messages, options = {}) => {
  const config = getConfig();
  
  if (!config.apiKey) {
    throw new Error('请先在设置中配置 API Key');
  }

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'AI 调用失败');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI 调用错误:', error);
    throw error;
  }
};

// 基于真实简历最佳实践的提示词构建
// 参考：CSDN应届生简历通关指南、Resume Templates最佳实践、领英简历技巧等
const buildPrompt = (moduleType, inputData) => {
  // 通用系统提示词 - 资深HR推荐的简历撰写标准
  const systemPrompt = `
你是一位资深HR，拥有10年+招聘经验，擅长筛选和撰写高质量简历。
你深知HR看一份应届生简历平均只花10-30秒，核心看三点：能力匹配度、态度学习力、稳定性。

简历撰写黄金法则：
1. 【匹配度优先】所有内容围绕求职意向展开，无关信息果断删减
2. 【成果导向】用具体成果和数字说话，把"做了什么"改成"做成了什么"
3. 【STAR法则】情境-任务-行动-结果，每条经历都要有量化结果
4. 【动词开头】使用"负责、主导、参与、设计、实现、优化、提升"等强动词
5. 【简洁专业】语言精炼，每条不超过2行，不超过30字
6. 【ATS友好】包含行业关键词，提升简历检索通过率

输出要求：
- 直接输出内容，不要前缀解释
- 使用分号或换行分隔条目
- 每项内容动词开头
- 量化成果优先（提升XX%、处理XX条、服务XX人等）
`;

  const prompts = {
    basicInfo: `
根据以下个人基本信息，生成一段简洁有力的个人简介（3句话以内）：

${JSON.stringify(inputData)}

输出格式示例（直接输出，不要标题）：
[求职意向]专业的[专业名]应届毕业生，求职[岗位名]
[核心优势]具备扎实的[技能1]、[技能2]能力，有[项目/实习]经验
[个人特质]擅长[特长]，善于团队协作，能快速学习上手

要求：
- 不超过3行，每行用换行分隔
- 突出专业背景、核心技能、求职意向
- 不要写空洞的形容词（如"认真负责"），要用具体事实
`,

    education: `
根据以下教育经历，生成标准的教育背景描述：

${JSON.stringify(inputData)}

输出格式示例（直接输出，每行一个学历）：
[时间] | [学校名称] | [专业名称] | [学历]
时间格式：2020.09 - 2024.06
可选加分项（成绩优秀才写）：
  - GPA 3.8/4.0（≥3.0才写）
  - 专业排名前20%
  - 核心课程：课程1、课程2、课程3（选3-5门与岗位相关的）

要求：
- 按时间倒序（最新的在前面）
- 只写与目标岗位相关的核心课程
- 有奖学金或重要奖项可单独列一行
`,

    experience: `
根据以下工作/实习经历，使用STAR法则生成专业的简历描述：

${JSON.stringify(inputData)}

STAR法则输出格式（每条经历按此格式）：
[情境S]：为解决[业务问题/项目背景]
[任务T]：担任[职位]，负责[核心职责]
[行动A]：采用[方法/技术]，完成[具体工作]
[结果R]：[量化成果]，如[提升XX%/节省XX成本/覆盖XX用户]

加分写法（动词+量化）：
✅ 正确：主导用户反馈数据整理，分类统计1000+条信息，形成周报辅助产品优化
❌ 错误：负责整理文件、接待客户（太模糊，没成果）

要求：
- 每条经历3-5个要点
- 优先写与目标岗位相关的经历
- 量化成果用数字展示（XX%、XX人、XX次、XX元等）
- 重要经历放在前面
`,

    project: `
根据以下项目经历，生成专业的项目描述：

${JSON.stringify(inputData)}

输出格式（分四部分，每部分一行）：
项目名称：[项目名]
项目背景：[一句话说明要解决什么问题]
个人职责：[你的具体工作，用动词开头]
技术栈：[使用的技术1、技术2、技术3]
项目成果：[量化成果，用数字说话]

加分写法示例：
✅ 正确：设计并实现用户画像系统，日均处理数据10万+，支撑精准营销
✅ 正确：优化推荐算法，A/B测试点击率提升15%，带来额外收入5万元
❌ 错误：参与了项目开发（没有具体职责和成果）

要求：
- 个人职责用动词开头（负责、主导、设计、实现、优化等）
- 成果务必量化
- 技术栈写核心3-5个
- 按项目重要性排序
`,

    skills: `
根据以下技能信息，生成专业的技能描述：

${JSON.stringify(inputData)}

输出格式（按类别分组，每类一行）：
专业技能：[技能1]、[技能2]、[技能3]（按熟练度/重要程度排序）
工具能力：[工具1]、[工具2]、[工具3]
语言能力：[英语四级]、[口语流利]等
证书认证：[证书1]、[证书2]

要求：
- 只写与目标岗位相关的技能
- 重要技能放前面
- 不要写"精通Office"这种废话，写具体如"Excel（数据透视表、VLOOKUP）"
- 控制数量，每类不超过8项
`,

    selfIntro: `
根据以下信息，生成一段专业且有说服力的自我评价：

${JSON.stringify(inputData)}

输出格式（3-4句话，用分号分隔）：
[专业背景]XX专业应届毕业生，具备XX技术基础和XX项目经验
[能力优势]擅长XX，曾通过XX取得XX成果
[职业态度]对XX领域有浓厚兴趣，热衷于持续学习
[求职意愿]期望在XX方向发展，为贵公司创造价值

要求：
- 不超过150字
- 用具体事实支撑，不要空洞形容词
- 结合目标岗位需求
- 最后表达求职意愿和稳定性
`,

    optimizeResume: `
请优化以下简历内容，使其更专业、更符合HR筛选标准：

${inputData}

优化要点：
1. 【删除废话】删除无关信息（身高体重政治面貌等）
2. 【量化成果】把描述改成有数字支撑的成果
3. 【动词升级】把"参与、协助"改成"负责、主导、设计、实现"
4. 【关键词植入】加入行业专业术语，提升ATS通过率
5. 【结构优化】按重要性排序，相关经历前置
6. 【语言精炼】每条不超过2行，删除冗余词汇

示例优化：
优化前：负责微信公众号内容撰写，参与粉丝互动
优化后：负责公众号内容策划与撰写，产出10+篇优质推文，单篇最高阅读量5000+，涨粉200+
`,
  };

  return {
    system: systemPrompt.trim(),
    user: prompts[moduleType]?.trim() || ''
  };
};

// 导出服务
export const aiService = {
  // 生成单个模块内容
  async generateModule(moduleType, inputData) {
    const prompt = buildPrompt(moduleType, inputData);
    const messages = [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user }
    ];
    return await callAI(messages);
  },

  // 优化整份简历
  async optimizeResume(resumeText) {
    const prompt = buildPrompt('optimizeResume', resumeText);
    const messages = [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user }
    ];
    return await callAI(messages);
  },

  // 配置 API
  setApiKey(provider, apiKey) {
    localStorage.setItem('AI_PROVIDER', provider);
    localStorage.setItem(AI_CONFIG[provider].apiKeyKey, apiKey);
  },

  // 获取当前配置
  getConfig
};
