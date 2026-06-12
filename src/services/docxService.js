import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// Word 文档生成服务
export const docxService = {
  // 生成简历 Word 文档
  async generateResumeDocx(resumeData) {
    const doc = new Document({
      sections: [{
        properties: {},
        children: this.buildResumeContent(resumeData),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${resumeData.basicInfo?.name || '简历'}.docx`);
  },

  // 构建简历内容
  buildResumeContent(resumeData) {
    const children = [];

    // 1. 个人信息
    children.push(...this.buildBasicInfoSection(resumeData.basicInfo));

    // 2. 个人介绍
    if (resumeData.basicInfo?.introduction) {
      children.push(...this.buildSectionTitle('个人介绍'));
      children.push(new Paragraph({
        children: [new TextRun(resumeData.basicInfo.introduction)],
        spacing: { after: 200 },
      }));
    }

    // 3. 教育经历
    if (resumeData.education && resumeData.education.length > 0) {
      children.push(...this.buildSectionTitle('教育经历'));
      resumeData.education.forEach(edu => {
        children.push(...this.buildEducationItem(edu));
      });
    }

    // 4. 工作/实习经历
    if (resumeData.experience && resumeData.experience.length > 0) {
      children.push(...this.buildSectionTitle('工作/实习经历'));
      resumeData.experience.forEach(exp => {
        children.push(...this.buildExperienceItem(exp));
      });
    }

    // 5. 项目经历
    if (resumeData.projects && resumeData.projects.length > 0) {
      children.push(...this.buildSectionTitle('项目经历'));
      resumeData.projects.forEach(proj => {
        children.push(...this.buildProjectItem(proj));
      });
    }

    // 6. 技能特长
    if (resumeData.skills) {
      children.push(...this.buildSectionTitle('技能特长'));
      children.push(new Paragraph({
        children: [new TextRun(resumeData.skills)],
        spacing: { after: 200 },
      }));
    }

    // 7. 自我评价
    if (resumeData.selfIntro) {
      children.push(...this.buildSectionTitle('自我评价'));
      children.push(new Paragraph({
        children: [new TextRun(resumeData.selfIntro)],
        spacing: { after: 200 },
      }));
    }

    return children;
  },

  // 构建个人信息部分
  buildBasicInfoSection(basicInfo) {
    if (!basicInfo) return [];

    const parts = [];

    // 姓名
    parts.push(new Paragraph({
      text: basicInfo.name || '',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
    }));

    // 联系方式
    const contactParts = [];
    if (basicInfo.phone) contactParts.push(`📞 ${basicInfo.phone}`);
    if (basicInfo.email) contactParts.push(`📧 ${basicInfo.email}`);
    if (basicInfo.location) contactParts.push(`📍 ${basicInfo.location}`);
    
    if (contactParts.length > 0) {
      parts.push(new Paragraph({
        children: [new TextRun(contactParts.join('  |  '))],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }));
    }

    return parts;
  },

  // 构建章节标题
  buildSectionTitle(title) {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: 28,
            color: '2563eb',
          }),
        ],
        border: {
          bottom: {
            color: '2563eb',
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        spacing: { before: 200, after: 200 },
      }),
    ];
  },

  // 构建教育经历项
  buildEducationItem(edu) {
    const items = [];
    
    // 学校 + 时间
    items.push(new Paragraph({
      children: [
        new TextRun({
          text: edu.school || '',
          bold: true,
        }),
        new TextRun({
          text: edu.period ? `  ${edu.period}` : '',
        }),
      ],
      spacing: { after: 100 },
    }));

    // 专业 + 学位
    const degreeLine = [];
    if (edu.major) degreeLine.push(edu.major);
    if (edu.degree) degreeLine.push(edu.degree);
    if (degreeLine.length > 0) {
      items.push(new Paragraph({
        children: [new TextRun(degreeLine.join(' · '))],
      }));
    }

    // 描述
    if (edu.description) {
      items.push(new Paragraph({
        children: [new TextRun(edu.description)],
        spacing: { after: 200 },
      }));
    }

    return items;
  },

  // 构建工作经历项
  buildExperienceItem(exp) {
    const items = [];

    // 公司 + 职位 + 时间
    items.push(new Paragraph({
      children: [
        new TextRun({
          text: exp.company || '',
          bold: true,
        }),
        new TextRun({
          text: exp.position ? ` · ${exp.position}` : '',
        }),
        new TextRun({
          text: exp.period ? `  ${exp.period}` : '',
        }),
      ],
      spacing: { after: 100 },
    }));

    // 工作描述
    if (exp.description) {
      items.push(new Paragraph({
        children: [new TextRun(exp.description)],
        spacing: { after: 200 },
      }));
    }

    return items;
  },

  // 构建项目经历项
  buildProjectItem(proj) {
    const items = [];

    // 项目名称 + 时间
    items.push(new Paragraph({
      children: [
        new TextRun({
          text: proj.name || '',
          bold: true,
        }),
        new TextRun({
          text: proj.period ? `  ${proj.period}` : '',
        }),
      ],
      spacing: { after: 100 },
    }));

    // 项目描述
    if (proj.description) {
      items.push(new Paragraph({
        children: [new TextRun(proj.description)],
        spacing: { after: 200 },
      }));
    }

    return items;
  },
};
