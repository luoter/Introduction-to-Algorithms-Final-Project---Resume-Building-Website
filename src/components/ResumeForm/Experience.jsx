import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { useAI } from '../../hooks/useAI';

// 工作/实习经历模块 - 香槟白暖色调设计
export const Experience = ({ data, onChange }) => {
  const { generateModule, loading } = useAI();

  const addExperience = () => {
    onChange([...data, { company: '', position: '', period: '', description: '' }]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  // AI 生成描述
  const handleAIGenerate = async (index) => {
    try {
      const result = await generateModule('experience', data[index]);
      updateExperience(index, 'description', result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.3s',
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
            💼
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              工作/实习经历
            </h2>
            <p className="text-sm text-muted">展示您的职场经验和成长历程</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          onClick={addExperience}
        >
          ➕ 添加
        </Button>
      </div>

      {data.map((exp, index) => (
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
          {/* 工作经历标题栏 */}
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
                第 {index + 1} 段工作经历
              </h3>
            </div>
            {data.length > 1 && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => removeExperience(index)}
              >
                🗑️ 删除
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="公司名称"
              value={exp.company || ''}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              placeholder="请输入公司名称"
            />
            <Input
              label="时间"
              value={exp.period || ''}
              onChange={(e) => updateExperience(index, 'period', e.target.value)}
              placeholder="如：2023.07 - 至今"
            />
            <Input
              label="职位"
              value={exp.position || ''}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              placeholder="请输入职位名称"
              className="md:col-span-2"
            />
          </div>

          {/* 工作描述区域 */}
          <div className="mt-5">
            <div 
              className="flex justify-between items-end mb-3 p-4 rounded-xl"
              style={{ background: 'var(--primary-dark)' }}
            >
              <div>
                <label className="block text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  工作描述
                </label>
                <p className="text-xs text-muted">描述您的工作职责和成就</p>
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
              value={exp.description || ''}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              placeholder="描述您的工作职责、主要成就和贡献..."
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
          <div className="text-5xl mb-4">💼</div>
          <p className="text-muted mb-4">暂无工作经历</p>
          <Button variant="primary" onClick={addExperience}>
            ➕ 添加第一条工作经历
          </Button>
        </div>
      )}
    </div>
  );
};
