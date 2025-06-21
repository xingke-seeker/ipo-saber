import type { AnalysisRequest, AnalysisReport } from "@/types/analysis"

// Mock API function - in real implementation, this would call your FastAPI backend
export async function analyzeContent(request: AnalysisRequest): Promise<AnalysisReport> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Mock response based on the type of analysis
  if (request.type === "url") {
    return {
      coreArguments: [
        "数字化转型是企业在新时代生存发展的必然选择，不是可选项而是必选项",
        "成功的数字化转型需要从战略、组织、技术三个维度同步推进",
        "企业文化和员工思维的转变是数字化转型成功的关键因素",
      ],
      argumentAnalysis: `作者通过多个维度论证了数字化转型的重要性：

1. **市场环境论证**：引用了疫情期间线上业务激增的数据，说明数字化已成为刚需
2. **案例分析**：对比了传统零售企业与数字化先行者的业绩差异
3. **理论支撑**：结合了管理学理论，从组织变革角度分析转型路径

论证逻辑较为严谨，但在某些数据引用上缺乏最新的行业报告支撑，部分观点偏向理想化。`,
      criticalQuestions: [
        "作者强调数字化转型的必要性，但对于中小企业的资源限制和实施难度讨论不足，是否存在一刀切的问题？",
        "文章提到的成功案例多为大型企业，这些经验是否适用于不同规模和行业的企业？",
        "数字化转型的投入产出比如何量化？作者未提供具体的ROI评估方法",
        "在强调技术重要性的同时，是否忽略了行业特殊性和监管要求的影响？",
      ],
      keyQuotes: [
        "数字化转型不是技术问题，而是一场深刻的商业模式革命",
        "在数字化时代，企业的核心竞争力不再是规模，而是敏捷性和适应性",
        "最大的风险不是转型失败，而是不敢开始转型",
      ],
      summary: "文章深度分析了企业数字化转型的必要性和实施路径",
    }
  } else {
    return {
      coreArguments: [
        "基于用户输入内容的核心观点分析",
        "文章主要论述了当前话题的重要性和影响",
        "作者提出了具体的解决方案和建议",
      ],
      argumentAnalysis: `基于您提供的内容，文章采用了以下论证方式：

1. **问题提出**：明确指出了当前面临的挑战
2. **原因分析**：从多个角度分析问题产生的根源
3. **解决方案**：提出了具体可行的应对策略

整体论证结构清晰，逻辑链条完整。`,
      criticalQuestions: [
        "文章提出的观点是否考虑了不同情境下的适用性？",
        "作者的论证是否存在偏见或局限性？",
        "提出的解决方案在实际执行中可能面临哪些挑战？",
      ],
      keyQuotes: ["从您提供的内容中提取的关键表述", "体现作者核心思想的重要句子", "具有启发意义的精彩论述"],
      summary: "基于用户提供内容的深度分析",
    }
  }
}
