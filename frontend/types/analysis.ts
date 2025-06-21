export interface AnalysisReport {
  coreArguments: string[]
  argumentAnalysis: string
  criticalQuestions: string[]
  keyQuotes: string[]
  summary: string
}

export interface AnalysisRequest {
  type: "url" | "content"
  data: string
}
