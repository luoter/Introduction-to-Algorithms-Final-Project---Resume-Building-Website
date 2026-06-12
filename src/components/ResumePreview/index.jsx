// 简历预览组件 - 专业简洁商务风格
export const ResumePreview = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden resume-print">
      <div className="p-6 sm:p-8">
        {/* 个人信息头部 - 简洁专业设计 */}
        <header className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {data.basicInfo?.name || '您的姓名'}
              </h1>
              {data.basicInfo?.position && (
                <p className="text-gray-700 font-medium">{data.basicInfo.position}</p>
              )}
            </div>
            <div className="text-right text-sm text-gray-500 space-y-1">
              {data.basicInfo?.phone && <p>📞 {data.basicInfo.phone}</p>}
              {data.basicInfo?.email && <p>✉️ {data.basicInfo.email}</p>}
              {data.basicInfo?.location && <p>📍 {data.basicInfo.location}</p>}
            </div>
          </div>
        </header>

        {/* 个人介绍 */}
        {data.basicInfo?.introduction && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              个人介绍
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.basicInfo.introduction}
            </p>
          </section>
        )}

        {/* 教育经历 */}
        {data.education && data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              教育经历
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    {edu.period}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{edu.school}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {edu.major} · {edu.degree}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 工作/实习经历 */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              工作/实习经历
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    {exp.period}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-medium text-gray-800 text-sm">{exp.company}</h3>
                      <span className="text-xs text-gray-500">|</span>
                      <span className="text-xs text-gray-500">{exp.position}</span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 项目经历 */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              项目经历
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    {proj.period}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 技能特长 */}
        {data.skills && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              技能特长
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(/[,，\n、]/).filter(skill => skill.trim()).map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 自我评价 */}
        {data.selfIntro && (
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
              自我评价
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.selfIntro}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
