import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { useAI } from '../../hooks/useAI';

// 教育经历模块 - 香槟白暖色调设计
export const Education = ({ data, onChange }) => {
  const { generateModule, loading, error } = useAI();

  const addEducation = () => {
    onChange([...data, { school: '', major: '', degree: '', period: '', description: '' }]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  // AI 生成描述
  const handleAIGenerate = async (index) => {
    try {
      const result = await generateModule('education', data[index]);
      updateEducation(index, 'description', result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.2s',
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
            🎓
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              教育经历
            </h2>
            <p className="text-sm text-muted">从大学开始填写您的教育背景</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          onClick={addEducation}
        >
          ➕ 添加
        </Button>
      </div>

      {data.map((edu, index) => (
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
          {/* 教育经历标题栏 */}
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
                第 {index + 1} 段教育经历
              </h3>
            </div>
            {data.length > 1 && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => removeEducation(index)}
              >
                🗑️ 删除
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="学校名称"
              value={edu.school || ''}
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
              placeholder="请输入学校名称"
            />
            <Input
              label="时间"
              value={edu.period || ''}
              onChange={(e) => updateEducation(index, 'period', e.target.value)}
              placeholder="如：2019.09 - 2023.06"
            />
            <Input
              label="专业"
              value={edu.major || ''}
              onChange={(e) => updateEducation(index, 'major', e.target.value)}
              placeholder="请输入专业名称"
            />
            <Input
              label="学位"
              value={edu.degree || ''}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              placeholder="如：本科 / 硕士"
            />
          </div>

          {/* 描述区域 */}
          <div className="mt-5">
            <div 
              className="flex justify-between items-end mb-3 p-4 rounded-xl"
              style={{ background: 'var(--primary-dark)' }}
            >
              <div>
                <label className="block text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  描述
                </label>
                <p className="text-xs text-muted">可包含成绩、项目经验等</p>
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
              value={edu.description || ''}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              placeholder="简单描述您的学习成果、项目经验或获得的荣誉..."
              rows={3}
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div 
          className="text-center py-12 rounded-xl"
          style={{ background: 'var(--primary)' }}
        >
          <div className="text-5xl mb-4">📚</div>
          <p className="text-muted mb-4">暂无教育经历</p>
          <Button variant="primary" onClick={addEducation}>
            ➕ 添加第一条教育经历
          </Button>
        </div>
      )}
    </div>
  );
};
