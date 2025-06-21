"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { AnalysisReport } from "@/types/analysis"
import { Brain, MessageSquare, AlertTriangle, Quote, FileText } from "lucide-react"

interface ReportDisplayProps {
  report: AnalysisReport | null
  isLoading: boolean
}

export function ReportDisplay({ report, isLoading }: ReportDisplayProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 animate-pulse" />
            AI正在分析中...
          </CardTitle>
          <CardDescription>正在对文章进行深度分析，请稍候</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!report) return null

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          深度分析报告
        </CardTitle>
        <CardDescription>AI生成的结构化分析报告</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 核心观点 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">核心观点提炼</h3>
          </div>
          <div className="space-y-3">
            {report.coreArguments.map((argument, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  {index + 1}
                </Badge>
                <p className="text-gray-700 leading-relaxed">{argument}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* 论证分析 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold">论证过程拆解</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{report.argumentAnalysis}</p>
          </div>
        </section>

        <Separator />

        {/* 潜在问题与启发 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-xl font-semibold">潜在问题与启发</h3>
          </div>
          <div className="space-y-3">
            {report.criticalQuestions.map((question, index) => (
              <div key={index} className="border-l-4 border-orange-200 pl-4">
                <p className="text-gray-700 leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* 金句摘录 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold">金句摘录</h3>
          </div>
          <div className="space-y-4">
            {report.keyQuotes.map((quote, index) => (
              <blockquote key={index} className="border-l-4 border-purple-200 pl-4 italic">
                <p className="text-gray-700 leading-relaxed">"{quote}"</p>
              </blockquote>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
