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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* 顶部导航栏 */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent">
        <div className="flex items-center gap-2">
          <img src="/globe.svg" alt="logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-wide">Article Analyzer</span>
        </div>
        <nav className="flex items-center gap-6">
          {/* 预留导航项，可后续扩展 */}
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-md">联系我们</button>
        </nav>
      </header>

      {/* 主体内容区 */}
      <main className="flex-1 flex flex-col items-center justify-center px-2">
        <section className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 py-8">
          {/* 大标题和副标题 */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              微信公众号文章 <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">深度分析</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              输入微信公众号文章链接，获得AI生成的结构化深度分析报告，包含核心观点、论证分析、潜在问题和金句摘录。
            </p>
          </div>

          {/* 分析表单卡片 */}
          <Card className="shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-sm w-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <span className="text-2xl">🔍</span>
                文章分析
              </CardTitle>
              <CardDescription className="text-gray-400">粘贴微信公众号文章链接，点击开始分析按钮获取深度报告</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6">
              <AnalysisForm
                onAnalysisStart={handleAnalysisStart}
                onAnalysisComplete={handleAnalysisComplete}
                isAnalyzing={isAnalyzing}
              />
            </CardContent>
          </Card>

          {/* 分析报告展示区 */}
          {(isAnalyzing || report) && (
            <div className="rounded-2xl shadow-lg bg-white/80 p-4 sm:p-6 w-full">
              <ReportDisplay report={report} isLoading={isAnalyzing} />
            </div>
          )}
        </section>
      </main>

      {/* 底部功能区 */}
      <footer className="w-full py-8 bg-transparent flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div className="bg-white/10 rounded-xl px-6 py-4 text-center text-white min-w-[180px]">
            <div className="text-lg font-bold mb-1">智能提取</div>
            <div className="text-sm text-gray-300">多平台内容精准提取</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-4 text-center text-white min-w-[180px]">
            <div className="text-lg font-bold mb-1">AI分析</div>
            <div className="text-sm text-gray-300">大模型驱动深度解读</div>
          </div>
          <div className="bg-white/10 rounded-xl px-6 py-4 text-center text-white min-w-[180px]">
            <div className="text-lg font-bold mb-1">多源支持</div>
            <div className="text-sm text-gray-300">支持多平台内容分析</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-4">本应用仅用于内容分析，结果由AI自动生成，仅供参考。</div>
      </footer>
    </div>
  )
}
