"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalysisForm } from "@/components/analysis-form"
import { ReportDisplay } from "@/components/report-display"
import type { AnalysisReport } from "@/types/analysis"

export default function HomePage() {
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalysisComplete = (newReport: AnalysisReport) => {
    setReport(newReport)
    setIsAnalyzing(false)
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(true)
    setReport(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">微信公众号文章深度分析</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            输入微信公众号文章链接，获得AI生成的结构化深度分析报告，包含核心观点、论证分析、潜在问题和金句摘录
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              文章分析
            </CardTitle>
            <CardDescription>粘贴微信公众号文章链接，点击开始分析按钮获取深度报告</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalysisForm
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              isAnalyzing={isAnalyzing}
            />
          </CardContent>
        </Card>

        {(isAnalyzing || report) && <ReportDisplay report={report} isLoading={isAnalyzing} />}
      </div>
    </div>
  )
}
