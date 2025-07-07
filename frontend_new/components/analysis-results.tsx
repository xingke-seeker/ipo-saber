"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Lightbulb,
  MessageSquare,
  AlertTriangle,
  Quote,
  Brain,
  Compass,
  ArrowLeft,
  ExternalLink,
  Copy,
  Share2,
  Download,
} from "lucide-react"

interface AnalysisResultsProps {
  result: {
    url: string
    title?: string
    mode: "concise" | "expert"
    coreViewpoints: string[]
    argumentAnalysis: string[]
    potentialIssues: string[]
    goldenQuotes: string[]
    firstPrinciples?: string[]
    boundaries?: string[]
  }
  onReset: () => void
  language: string
}

export default function AnalysisResults({ result, onReset, language }: AnalysisResultsProps) {
  const texts = {
    zh: {
      analysisReport: "深度分析报告",
      aiGeneratedReport: "AI生成的结构化分析报告",
      coreViewpoints: "核心观点提炼",
      argumentAnalysis: "论证过程拆解",
      potentialIssues: "潜在问题与启发",
      goldenQuotes: "金句摘录",
      firstPrinciples: "第一性原理",
      boundaryAnalysis: "边界分析",
      copy: "复制",
      share: "分享",
      export: "导出",
      analyzeNew: "分析新文章",
      quickAnalysis: "快速分析",
      deepAnalysis: "深度分析",
    },
    en: {
      analysisReport: "Analysis Report",
      aiGeneratedReport: "AI-generated structured analysis report",
      coreViewpoints: "Core Viewpoints",
      argumentAnalysis: "Argument Analysis",
      potentialIssues: "Potential Issues & Insights",
      goldenQuotes: "Golden Quotes",
      firstPrinciples: "First Principles",
      boundaryAnalysis: "Boundary Analysis",
      copy: "Copy",
      share: "Share",
      export: "Export",
      analyzeNew: "Analyze New Article",
      quickAnalysis: "Quick Analysis",
      deepAnalysis: "Deep Analysis",
    },
  }

  const t = texts[language as keyof typeof texts]

  const handleCopy = () => {
    const analysisText = `
${t.coreViewpoints}:
${result.coreViewpoints.map((point, i) => `${i + 1}. ${point}`).join("\n")}

${t.potentialIssues}:
${result.potentialIssues.map((issue, i) => `${i + 1}. ${issue}`).join("\n")}

${t.goldenQuotes}:
${result.goldenQuotes.map((quote, i) => `${i + 1}. "${quote}"`).join("\n")}
    `.trim()

    navigator.clipboard.writeText(analysisText)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: result.title,
        text: `${t.analysisReport}: ${result.title}`,
        url: result.url,
      })
    }
  }

  const handleDownload = () => {
    const analysisData = {
      title: result.title,
      url: result.url,
      mode: result.mode,
      timestamp: new Date().toISOString(),
      analysis: {
        coreViewpoints: result.coreViewpoints,
        argumentAnalysis: result.argumentAnalysis,
        potentialIssues: result.potentialIssues,
        goldenQuotes: result.goldenQuotes,
        ...(result.firstPrinciples && { firstPrinciples: result.firstPrinciples }),
        ...(result.boundaries && { boundaries: result.boundaries }),
      },
    }

    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analysis-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!result || !result.coreViewpoints || result.coreViewpoints.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          {language === "zh" ? "暂无分析数据" : "No analysis data available"}
        </div>
        <Button onClick={onReset} className="mt-4">
          {language === "zh" ? "重新分析" : "Try Again"}
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-12 space-y-6">
      {/* Header */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.analysisReport}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.aiGeneratedReport}</p>
              </div>
            </div>
            <Badge variant={result.mode === "expert" ? "default" : "secondary"}>
              {result.mode === "expert" ? t.deepAnalysis : t.quickAnalysis}
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">{result.title}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="truncate">{result.url}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {t.copy}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              {t.share}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              {t.export}
            </Button>
            <div className="flex-1" />
            <Button variant="outline" onClick={onReset}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.analyzeNew}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Core Viewpoints */}
      {result.coreViewpoints && result.coreViewpoints.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.coreViewpoints}</h3>
            </div>
            <div className="space-y-4">
              {result.coreViewpoints.map((viewpoint, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{viewpoint}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Argument Analysis */}
      {result.argumentAnalysis && result.argumentAnalysis.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.argumentAnalysis}</h3>
            </div>
            <div className="space-y-4">
              {result.argumentAnalysis.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Potential Issues */}
      {result.potentialIssues && result.potentialIssues.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.potentialIssues}</h3>
            </div>
            <div className="space-y-4">
              {result.potentialIssues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-lg border-l-4 border-orange-400"
                >
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{issue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Golden Quotes */}
      {result.goldenQuotes && result.goldenQuotes.length > 0 && (
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Quote className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.goldenQuotes}</h3>
            </div>
            <div className="space-y-4">
              {result.goldenQuotes.map((quote, index) => (
                <div
                  key={index}
                  className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg border-l-4 border-purple-400"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">"{quote}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expert Analysis Only */}
      {result.mode === "expert" && (
        <>
          {/* First Principles */}
          {result.firstPrinciples && result.firstPrinciples.length > 0 && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.firstPrinciples}</h3>
                </div>
                <div className="space-y-4">
                  {result.firstPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{principle}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Boundaries */}
          {result.boundaries && result.boundaries.length > 0 && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <Compass className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.boundaryAnalysis}</h3>
                </div>
                <div className="space-y-4">
                  {result.boundaries.map((boundary, index) => (
                    <div
                      key={index}
                      className="p-4 bg-cyan-50/50 dark:bg-cyan-900/10 rounded-lg border-l-4 border-cyan-400"
                    >
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{boundary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
