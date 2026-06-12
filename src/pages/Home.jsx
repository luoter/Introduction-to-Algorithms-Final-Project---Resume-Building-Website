import { useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { BasicInfo } from '../components/ResumeForm/BasicInfo';
import { Education } from '../components/ResumeForm/Education';
import { Experience } from '../components/ResumeForm/Experience';
import { Project } from '../components/ResumeForm/Project';
import { Skills, SelfIntro } from '../components/ResumeForm/Skills';
import { ResumePreview } from '../components/ResumePreview';
import { docxService } from '../services/docxService';
import { htmlService } from '../services/htmlService';
import { aiService } from '../services/aiService';
import { useStorage, useResumeStorage } from '../hooks/useStorage';

// 初始简历数据
const initialResumeData = {
  basicInfo: {},
  education: [],
  experience: [],
  projects: [],
  skills: '',
  selfIntro: '',
};

const moduleOrderPresets = {
  student: ['education', 'projects', 'skills', 'experience', 'selfIntro'],
  internship: ['experience', 'projects', 'education', 'skills', 'selfIntro'],
  technical: ['projects', 'skills', 'experience', 'education', 'selfIntro'],
  balanced: ['education', 'experience', 'projects', 'skills', 'selfIntro'],
};

const moduleOrderLabels = {
  student: '应届生优先',
  internship: '实习经历优先',
  technical: '技术岗位优先',
  balanced: '通用顺序',
};

const sortModulesByPreset = (modules, presetKey) => {
  const preset = moduleOrderPresets[presetKey] || moduleOrderPresets.balanced;
  const rank = new Map(preset.map((id, index) => [id, index]));
  return [...modules].sort((a, b) => (rank.get(a.id) ?? 99) - (rank.get(b.id) ?? 99));
};

export const Home = () => {
  const [resumeData, setResumeData] = useStorage('currentResume', initialResumeData);
  const { addResume, updateResume } = useResumeStorage();
  const [showPreview, setShowPreview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [moduleOrderMode, setModuleOrderMode] = useStorage('moduleOrderMode', 'student');
  
  // API 设置相关状态
  const [showSettings, setShowSettings] = useState(false);
  const [apiProvider, setApiProvider] = useState('kimi');
  const [apiKey, setApiKey] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // 页面加载时读取已保存的 API 配置
  useEffect(() => {
    const config = aiService.getConfig();
    setApiProvider(config.provider);
    setApiKey(config.apiKey);
    if (config.apiKey) {
      setSettingsSaved(true);
    }
  }, []);

  // 页面加载动画
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 保存 API 配置
  const handleSaveApiConfig = () => {
    if (!apiKey.trim()) {
      alert('请输入 API Key');
      return;
    }
    aiService.setApiKey(apiProvider, apiKey);
    setSettingsSaved(true);
    setShowSettings(false);
    alert('API 配置已保存！');
  };

  // 保存简历
  const handleSave = () => {
    addResume(resumeData);
    alert('简历已保存！');
  };

  // 导出 Word
  const handleExport = async () => {
    try {
      await docxService.generateResumeDocx(resumeData);
    } catch (error) {
      console.error(error);
      alert('导出失败，请重试');
    }
  };

  // 导出个人展示网站 HTML
  const handleExportWebsite = () => {
    try {
      htmlService.downloadWebsite(resumeData);
    } catch (error) {
      console.error(error);
      alert('网站导出失败，请重试');
    }
  };

  // 重置
  const handleReset = () => {
    if (confirm('确定要清空所有内容吗？')) {
      setResumeData(initialResumeData);
    }
  };

  const resumeModules = [
    {
      id: 'education',
      component: (
        <Education
          data={resumeData.education}
          onChange={(data) => setResumeData({ ...resumeData, education: data })}
        />
      ),
    },
    {
      id: 'experience',
      component: (
        <Experience
          data={resumeData.experience}
          onChange={(data) => setResumeData({ ...resumeData, experience: data })}
        />
      ),
    },
    {
      id: 'projects',
      component: (
        <Project
          data={resumeData.projects}
          onChange={(data) => setResumeData({ ...resumeData, projects: data })}
        />
      ),
    },
    {
      id: 'skills',
      component: (
        <Skills
          data={resumeData.skills}
          onChange={(data) => setResumeData({ ...resumeData, skills: data })}
        />
      ),
    },
    {
      id: 'selfIntro',
      component: (
        <SelfIntro
          data={resumeData.selfIntro}
          onChange={(data) => setResumeData({ ...resumeData, selfIntro: data })}
        />
      ),
    },
  ];

  const sortedResumeModules = sortModulesByPreset(resumeModules, moduleOrderMode);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* 顶部导航 - 现代化设计 */}
      <header 
        className="bg-white shadow-lg sticky top-0 z-50" 
        style={{
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Logo区域 */}
            <div className="flex items-center gap-4 animate-fade-in-up">
              <div 
                className="text-4xl"
                style={{
                  color: 'var(--secondary)',
                }}
              >
                ✨
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold"
                  style={{
                    color: 'var(--primary)',
                  }}
                >
                  AI 简历生成器
                </h1>
                <p className="text-sm text-muted">智能优化 · 专业排版 · 高效求职</p>
              </div>
            </div>

            {/* 操作按钮组 */}
            <div className="flex gap-3 items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                variant={settingsSaved ? 'outline' : 'secondary'}
                onClick={() => setShowSettings(true)}
                className="shadow-md hover:shadow-lg"
                title={settingsSaved ? 'API 已配置' : '请先配置 API'}
              >
                ⚙️ {settingsSaved ? '已配置' : '设置'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleReset}
                className="shadow-md hover:shadow-lg"
              >
                🔄 重置
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave}
                className="shadow-md hover:shadow-lg"
              >
                💾 保存简历
              </Button>
              <Button 
                variant="primary" 
                onClick={handleExport}
                className="shadow-lg hover:shadow-xl"
              >
                📄 导出 Word
              </Button>
              <Button 
                variant="success" 
                onClick={handleExportWebsite}
                className="shadow-lg hover:shadow-xl"
              >
                🌐 导出网站
              </Button>
              <Button 
                variant="primary" 
                onClick={() => setShowPreview(!showPreview)}
                className="shadow-lg hover:shadow-xl"
              >
                {showPreview ? '📝 编辑模式' : '👁️ 预览模式'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main 
        className={`max-w-[1600px] mx-auto px-6 py-8 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {showPreview ? (
          // 全屏预览模式
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 
                className="text-2xl font-bold mb-3"
                style={{
                  color: 'var(--primary)',
                }}
              >
                📋 简历预览
              </h2>
              <p className="text-muted">实时查看简历最终效果</p>
            </div>
            <ResumePreview data={resumeData} />
          </div>
        ) : (
          // 编辑+预览模式 - 调整比例 (编辑区:预览区 = 7:5)
          <div className="grid gap-8" style={{ gridTemplateColumns: '7fr 5fr' }}>
            {/* 左侧表单编辑区 */}
            <div className="space-y-6 animate-slide-in">
              <BasicInfo 
                data={resumeData.basicInfo} 
                onChange={(data) => setResumeData({ ...resumeData, basicInfo: data })} 
              />
              <div className="module-sort-panel">
                <div>
                  <h2 className="text-lg font-bold">模块排序推荐</h2>
                  <p className="text-sm text-muted">根据求职场景自动调整简历模块优先级</p>
                </div>
                <select
                  value={moduleOrderMode}
                  onChange={(event) => setModuleOrderMode(event.target.value)}
                  className="module-sort-select"
                >
                  {Object.entries(moduleOrderLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {sortedResumeModules.map((module) => (
                <div key={module.id}>{module.component}</div>
              ))}
            </div>

            {/* 右侧实时预览区 */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="text-center mb-6 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" 
                    style={{ background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(196, 69, 105, 0.1))' }}>
                    <span className="text-lg">👁️</span>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                      实时预览
                    </h2>
                    <span className="badge badge-success">同步更新</span>
                  </div>
                  <p className="text-sm text-muted mt-2">编辑内容时，预览将实时更新</p>
                </div>
                
                {/* 预览容器 */}
                <div 
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.15)',
                    transform: 'scale(0.85)',
                    transformOrigin: 'top center'
                  }}
                >
                  <ResumePreview data={resumeData} />
                </div>

                {/* 提示信息 */}
                <div className="mt-6 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255, 217, 61, 0.1), rgba(255, 107, 107, 0.1))' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                        提示
                      </h3>
                      <p className="text-xs text-muted leading-relaxed">
                        点击各个模块的「AI生成」按钮，可以智能优化内容描述，提升简历质量。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="text-center py-8 text-sm text-muted border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-center items-center gap-2">
          <span>Made with</span>
          <span style={{ color: '#FF6B6B' }}>❤️</span>
          <span>by AI Resume Generator</span>
        </div>
      </footer>

      {/* API 设置模态框 */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'fadeInUp 0.3s ease' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">API 设置</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <p className="text-sm text-muted mb-6">
              配置 AI API 密钥以启用 AI 生成功能。密钥会保存在本地浏览器中，下次打开网站会自动加载。
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">AI 提供商</label>
                <select
                  value={apiProvider}
                  onChange={(e) => setApiProvider(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
                >
                  <option value="kimi">Kimi (月之暗面)</option>
                  <option value="siliconflow">硅基流动</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="请输入您的 API Key"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
                />
                <p className="text-xs text-muted mt-2">
                  {apiProvider === 'kimi' && '从 https://platform.moonshot.cn 获取 API Key'}
                  {apiProvider === 'siliconflow' && '从 https://www.siliconflow.cn 获取 API Key'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSaveApiConfig}
                className="flex-1"
              >
                保存配置
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
