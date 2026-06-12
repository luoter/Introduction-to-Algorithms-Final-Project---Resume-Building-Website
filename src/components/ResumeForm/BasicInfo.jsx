import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { useAI } from '../../hooks/useAI';

// 基本信息模块 - 香槟白暖色调设计
export const BasicInfo = ({ data, onChange }) => {
  const { generateModule, loading, error } = useAI();

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // 点击 AI 生成介绍
  const handleAIGenerate = async () => {
    try {
      const result = await generateModule('basicInfo', data);
      onChange({ ...data, introduction: result });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="card animate-fade-in-up"
      style={{
        animationDelay: '0.1s',
        borderLeft: '4px solid var(--secondary)',
        background: 'linear-gradient(135deg, var(--primary-light), white)'
      }}
    >
      {/* 模块标题 */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: 'linear-gradient(135deg, var(--secondary), var(--accent))' }}
        >
          👤
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            基本信息
          </h2>
          <p className="text-sm text-muted">填写您的个人基本资料</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="姓名"
          value={data.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="请输入您的姓名"
        />
        <Input
          label="电话"
          value={data.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="请输入联系电话"
        />
        <Input
          label="邮箱"
          value={data.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="请输入电子邮箱"
        />
        <Input
          label="所在城市"
          value={data.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="请输入所在城市"
        />
        <Input
          label="求职意向"
          value={data.position || ''}
          onChange={(e) => handleInputChange('position', e.target.value)}
          placeholder="如：前端开发工程师"
          className="md:col-span-2"
        />
      </div>

      {/* 个人介绍区域 */}
      <div className="mt-6">
        <div 
          className="flex justify-between items-end mb-3 p-4 rounded-xl"
          style={{ background: 'var(--primary)' }}
        >
          <div>
            <label className="block text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              个人介绍
            </label>
            <p className="text-xs text-muted">简明扼要地介绍您的优势和特点</p>
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
        <Textarea
          value={data.introduction || ''}
          onChange={(e) => handleInputChange('introduction', e.target.value)}
          placeholder="请输入个人介绍，或点击上方「AI 生成」按钮智能生成..."
          rows={4}
        />
        {error && (
          <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
