import { Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { useAI } from '../../hooks/useAI';

// 技能特长模块 - 香槟白暖色调设计
export const Skills = ({ data, onChange }) => {
  const { generateModule, loading } = useAI();

  const handleAIGenerate = async () => {
    try {
      const result = await generateModule('skills', { skills: data });
      onChange(result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.5s',
        borderLeft: '4px solid var(--secondary)',
        background: 'linear-gradient(135deg, var(--primary-light), white)'
      }}
    >
      {/* 模块标题 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }}
          >
            🛠️
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              技能特长
            </h2>
            <p className="text-sm text-muted">展示您的专业技能和技术栈</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          loading={loading} 
          onClick={handleAIGenerate}
        >
          ✨ AI 整理
        </Button>
      </div>

      <div 
        className="p-4 rounded-xl mb-4"
        style={{ background: 'var(--primary)' }}
      >
        <Textarea
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="请输入您的技能，例如：&#10;• 编程语言：JavaScript, TypeScript, Python&#10;• 前端框架：React, Vue, Angular&#10;• 后端技术：Node.js, Express, MongoDB&#10;• 工具：Git, Docker, VS Code"
          rows={5}
        />
      </div>
    </div>
  );
};

// 自我评价模块 - 香槟白暖色调设计
export const SelfIntro = ({ data, onChange }) => {
  const { generateModule, loading } = useAI();

  const handleAIGenerate = async () => {
    try {
      const result = await generateModule('selfIntro', { intro: data });
      onChange(result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.6s',
        borderLeft: '4px solid var(--secondary)',
        background: 'linear-gradient(135deg, var(--primary-light), white)'
      }}
    >
      {/* 模块标题 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }}
          >
            💭
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              自我评价
            </h2>
            <p className="text-sm text-muted">展示您的个人优势和职业态度</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          loading={loading} 
          onClick={handleAIGenerate}
        >
          ✨ AI 生成
        </Button>
      </div>

      <div 
        className="p-4 rounded-xl"
        style={{ background: 'var(--primary)' }}
      >
        <Textarea
          value={data || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="请输入自我评价，或点击上方「AI 生成」按钮智能生成..."
          rows={5}
        />
      </div>
    </div>
  );
};
