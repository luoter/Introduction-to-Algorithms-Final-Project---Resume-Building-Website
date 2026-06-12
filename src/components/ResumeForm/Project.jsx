import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { useAI } from '../../hooks/useAI';

// 项目经历模块 - 香槟白暖色调设计
export const Project = ({ data, onChange }) => {
  const { generateModule, loading } = useAI();

  const addProject = () => {
    onChange([...data, { name: '', period: '', description: '' }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  // AI 生成描述
  const handleAIGenerate = async (index) => {
    try {
      const result = await generateModule('project', data[index]);
      updateProject(index, 'description', result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.4s',
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
            🚀
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              项目经历
            </h2>
            <p className="text-sm text-muted">展示您的项目经验和实际能力</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          onClick={addProject}
        >
          ➕ 添加
        </Button>
      </div>

      {data.map((proj, index) => (
        <div 
          key={index} 
          className="mb-6 p-6 rounded-xl transition-all duration-300"
          style={{
            background: 'var(--primary)',
            border: '1px solid var(--border)',
            animation: 'fadeInUp 0.4s ease',
            animationDelay: `${index * 0.1}s`
          }}
        >
          {/* 项目标题栏 */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                style={{ 
                  background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                  fontSize: '16px'
                }}
              >
                {index + 1}
              </div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                第 {index + 1} 个项目
              </h3>
            </div>
            {data.length > 1 && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => removeProject(index)}
              >
                🗑️ 删除
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="项目名称"
              value={proj.name || ''}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              placeholder="请输入项目名称"
            />
            <Input
              label="时间"
              value={proj.period || ''}
              onChange={(e) => updateProject(index, 'period', e.target.value)}
              placeholder="如：2023.03 - 2023.06"
            />
          </div>

          {/* 项目描述区域 */}
          <div className="mt-5">
            <div 
              className="flex justify-between items-end mb-3 p-4 rounded-xl"
              style={{ background: 'var(--primary-dark)' }}
            >
              <div>
                <label className="block text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  项目描述
                </label>
                <p className="text-xs text-muted">描述项目背景、技术栈和您的贡献</p>
              </div>
              <Button 
                variant="primary" 
                size="sm"
                loading={loading}
                onClick={() => handleAIGenerate(index)}
              >
                ✨ AI 优化
              </Button>
            </div>
            <Textarea
              value={proj.description || ''}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              placeholder="描述项目背景、使用的技术栈、您的职责和项目成果..."
              rows={4}
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div 
          className="text-center py-12 rounded-xl"
          style={{ background: 'var(--primary)' }}
        >
          <div className="text-5xl mb-4">🚀</div>
          <p className="text-muted mb-4">暂无项目经历</p>
          <Button variant="primary" onClick={addProject}>
            ➕ 添加第一个项目
          </Button>
        </div>
      )}
    </div>
  );
};
