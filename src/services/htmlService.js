// HTML 导出服务 - 将简历数据转换为个人展示网站
export const htmlService = {
  // 生成个人展示网站 HTML
  generatePersonalWebsite: (resumeData) => {
    const { basicInfo, education, experience, projects, skills, selfIntro } = resumeData;
    
    // 生成技能标签
    const skillsHtml = skills 
      ? skills.split(/[,，\n、]/)
          .filter(skill => skill.trim())
          .map(skill => `<span class="skill-tag">${skill.trim()}</span>`)
          .join('')
      : '';

    // 生成教育经历
    const educationHtml = education && education.length > 0
      ? education.map((edu, index) => `
        <div class="timeline-item" data-aos="fade-up">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h4>${edu.school}</h4>
            <p class="text-gray-500 text-sm">${edu.major} · ${edu.degree}</p>
            <p class="text-gray-400 text-xs">${edu.period}</p>
            ${edu.description ? `<p class="mt-2 text-gray-600 text-sm">${edu.description}</p>` : ''}
          </div>
        </div>
      `).join('')
      : '';

    // 生成工作经历
    const experienceHtml = experience && experience.length > 0
      ? experience.map((exp, index) => `
        <div class="experience-card" data-aos="fade-up">
          <div class="experience-header">
            <h3>${exp.company}</h3>
            <span class="experience-period">${exp.period}</span>
          </div>
          <p class="text-gray-600 mt-2">${exp.position}</p>
          ${exp.description ? `<p class="mt-3 text-gray-500">${exp.description}</p>` : ''}
        </div>
      `).join('')
      : '';

    // 生成项目经历
    const projectsHtml = projects && projects.length > 0
      ? projects.map((proj, index) => `
        <div class="project-card" data-aos="fade-up">
          <div class="project-icon">🚀</div>
          <div class="project-content">
            <h3>${proj.name}</h3>
            <p class="text-gray-400 text-sm">${proj.period}</p>
            ${proj.description ? `<p class="mt-2 text-gray-600">${proj.description}</p>` : ''}
          </div>
        </div>
      `).join('')
      : '';

    // 完整的 HTML 模板
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${basicInfo.name || '个人简历'} - 个人展示网站</title>
  <meta name="description" content="${basicInfo.introduction || '个人简历展示网站'}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
      min-height: 100vh;
    }

    /* 动画效果 */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    [data-aos="fade-up"] {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    [data-aos="fade-up"].delay-1 { animation-delay: 0.1s; opacity: 0; }
    [data-aos="fade-up"].delay-2 { animation-delay: 0.2s; opacity: 0; }
    [data-aos="fade-up"].delay-3 { animation-delay: 0.3s; opacity: 0; }
    [data-aos="fade-up"].delay-4 { animation-delay: 0.4s; opacity: 0; }
    [data-aos="fade-up"].delay-5 { animation-delay: 0.5s; opacity: 0; }

    /* 导航栏 */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      z-index: 100;
      padding: 1rem 5%;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-links a:hover {
      color: #667eea;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }

    .nav-links a:hover::after {
      width: 100%;
    }

    /* Hero 区域 */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem 5% 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      margin: 0 auto 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      color: white;
      animation: float 3s ease-in-out infinite;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      color: white;
      margin-bottom: 1rem;
      animation: fadeInUp 0.6s ease-out;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      animation: fadeInUp 0.6s ease-out 0.1s;
      opacity: 0;
    }

    .hero-intro {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.8);
      max-width: 600px;
      margin: 0 auto 3rem;
      animation: fadeInUp 0.6s ease-out 0.2s;
      opacity: 0;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      animation: fadeInUp 0.6s ease-out 0.3s;
      opacity: 0;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 25px;
      transition: all 0.3s ease;
    }

    .contact-item:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    /* 通用区块样式 */
    .section {
      padding: 6rem 5%;
    }

    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 4rem;
      color: #333;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 2px;
    }

    /* 关于我 */
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #666;
    }

    /* 技能区域 */
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    .skill-tag {
      padding: 0.7rem 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 25px;
      font-weight: 500;
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s ease-out;
    }

    .skill-tag:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    /* 时间线 */
    .timeline {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #667eea, #764ba2);
      transform: translateX(-50%);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
      display: flex;
      justify-content: center;
    }

    .timeline-item:nth-child(even) .timeline-content {
      margin-left: 2rem;
    }

    .timeline-item:nth-child(odd) .timeline-content {
      margin-right: 2rem;
      text-align: right;
    }

    .timeline-dot {
      position: absolute;
      left: 50%;
      top: 10px;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
      animation: pulse 2s ease-in-out infinite;
    }

    .timeline-content {
      width: 45%;
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .timeline-content:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }

    .timeline-content h4 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    /* 工作经历 */
    .experience-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .experience-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .experience-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .experience-header h3 {
      color: #333;
      font-size: 1.3rem;
    }

    .experience-period {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.85rem;
    }

    /* 项目经历 */
    .projects-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 1.5rem;
      transition: all 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .project-icon {
      font-size: 2.5rem;
      min-width: 60px;
      text-align: center;
    }

    .project-content h3 {
      color: #333;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    /* 页脚 */
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 3rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #667eea;
    }

    .footer-copyright {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .timeline::before {
        left: 20px;
      }

      .timeline-dot {
        left: 20px;
        transform: none;
      }

      .timeline-content {
        width: calc(100% - 50px);
        margin-left: 30px !important;
        margin-right: 0 !important;
        text-align: left !important;
      }

      .experience-container,
      .projects-container {
        grid-template-columns: 1fr;
      }

      .project-card {
        flex-direction: column;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <!-- 导航栏 -->
  <nav>
    <div class="nav-container">
      <div class="nav-logo">✨ ${basicInfo.name || '我的简历'}</div>
      <ul class="nav-links">
        <li><a href="#about">关于我</a></li>
        <li><a href="#education">教育经历</a></li>
        <li><a href="#experience">工作经历</a></li>
        <li><a href="#projects">项目经历</a></li>
        <li><a href="#skills">技能特长</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero 区域 -->
  <section class="hero">
    <div class="hero-container">
      <div class="avatar">
        ${basicInfo.name ? basicInfo.name.charAt(0) : '👤'}
      </div>
      <h1 class="hero-title">${basicInfo.name || '您的姓名'}</h1>
      <p class="hero-subtitle">${basicInfo.position || '追求卓越 · 持续成长'}</p>
      ${basicInfo.introduction ? `<p class="hero-intro">${basicInfo.introduction}</p>` : ''}
      <div class="contact-info">
        ${basicInfo.phone ? `<a href="tel:${basicInfo.phone}" class="contact-item">📞 ${basicInfo.phone}</a>` : ''}
        ${basicInfo.email ? `<a href="mailto:${basicInfo.email}" class="contact-item">✉️ ${basicInfo.email}</a>` : ''}
        ${basicInfo.location ? `<span class="contact-item">📍 ${basicInfo.location}</span>` : ''}
      </div>
    </div>
  </section>

  <!-- 关于我 -->
  <section id="about" class="section">
    <div class="section-container">
      <h2 class="section-title">关于我</h2>
      <div class="about-content">
        <div data-aos="fade-up">
          <h3>个人简介</h3>
          <p class="about-text">${selfIntro || '这是一个充满激情的人，热爱学习，勇于挑战，追求卓越。具有良好的团队合作精神和沟通能力，能够在压力下高效工作。'}</p>
        </div>
        <div data-aos="fade-up" class="delay-1">
          <h3>联系方式</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 1.1rem;">
            ${basicInfo.phone ? `<p>📞 电话：${basicInfo.phone}</p>` : ''}
            ${basicInfo.email ? `<p>✉️ 邮箱：${basicInfo.email}</p>` : ''}
            ${basicInfo.location ? `<p>📍 地址：${basicInfo.location}</p>` : ''}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 教育经历 -->
  <section id="education" class="section" style="background: #f8f9fa;">
    <div class="section-container">
      <h2 class="section-title">教育经历</h2>
      ${educationHtml ? `<div class="timeline">${educationHtml}</div>` : '<p style="text-align: center; color: #999;">暂无教育经历信息</p>'}
    </div>
  </section>

  <!-- 工作经历 -->
  <section id="experience" class="section">
    <div class="section-container">
      <h2 class="section-title">工作经历</h2>
      ${experienceHtml ? `<div class="experience-container">${experienceHtml}</div>` : '<p style="text-align: center; color: #999;">暂无工作经历信息</p>'}
    </div>
  </section>

  <!-- 项目经历 -->
  <section id="projects" class="section" style="background: #f8f9fa;">
    <div class="section-container">
      <h2 class="section-title">项目经历</h2>
      ${projectsHtml ? `<div class="projects-container">${projectsHtml}</div>` : '<p style="text-align: center; color: #999;">暂无项目经历信息</p>'}
    </div>
  </section>

  <!-- 技能特长 -->
  <section id="skills" class="section">
    <div class="section-container">
      <h2 class="section-title">技能特长</h2>
      ${skillsHtml ? `<div class="skills-container">${skillsHtml}</div>` : '<p style="text-align: center; color: #999;">暂无技能信息</p>'}
    </div>
  </section>

  <!-- 页脚 -->
  <footer>
    <div class="footer-content">
      <div class="footer-links">
        <a href="#about">关于我</a>
        <a href="#education">教育经历</a>
        <a href="#experience">工作经历</a>
        <a href="#projects">项目经历</a>
        <a href="#skills">技能特长</a>
      </div>
      <p class="footer-copyright">© ${new Date().getFullYear()} ${basicInfo.name || '个人简历'} · 用心打造每一份简历</p>
    </div>
  </footer>

  <script>
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
      } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    });
  </script>
</body>
</html>
    `;

    return html;
  },

  // 下载生成的 HTML 文件
  downloadWebsite: function(resumeData) {
    const html = this.generatePersonalWebsite(resumeData);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.basicInfo?.name || '个人简历'}_展示网站.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
