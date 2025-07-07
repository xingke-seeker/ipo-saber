"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Link, FileText, Globe, BookOpen, Newspaper } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { AnalysisReport } from "@/types/analysis"
import { analyzeContent } from "@/lib/api"

interface AnalysisFormProps {
  onAnalysisStart: () => void
  onAnalysisComplete: (report: AnalysisReport) => void
  isAnalyzing: boolean
}

export function AnalysisForm({ onAnalysisStart, onAnalysisComplete, isAnalyzing }: AnalysisFormProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState("quick") // quick/deep

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!url.trim()) {
      setError("请输入文章链接")
      return
    }
    onAnalysisStart()
    try {
      // 未来可根据url自动识别dataSource
      const report = await analyzeContent({ url: url.trim() })
      onAnalysisComplete(report)
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请重试")
      onAnalysisComplete({
        core_arguments: [],
        argument_analysis: [],
        critical_questions: [],
        key_quotes: []
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 px-2">
      {/* 输入框 */}
      <div className="flex flex-col items-center">
        <Input
          type="url"
          placeholder="粘贴文章链接，如 https://mp.weixin.qq.com/s/..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={isAnalyzing}
          className="text-lg rounded-xl shadow-md px-6 py-4 bg-white/90 border-0 focus:ring-2 focus:ring-blue-300 w-full"
        />
      </div>
      {/* 分析模式卡片切换 */}
      <div className="flex gap-4 justify-center">
        <div
          className={`flex-1 min-w-[140px] cursor-pointer rounded-2xl border-2 transition-all px-6 py-4 flex flex-col items-start gap-2 shadow-sm
            ${mode === 'quick' ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-white/80 hover:border-blue-200'}`}
          onClick={() => setMode('quick')}
        >
          <div className="flex items-center gap-2 text-blue-600 font-bold text-base">
            <svg width="20" height="20" fill="none"><path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            快速分析
          </div>
          <div className="text-xs text-gray-500">核心要点与精简摘要</div>
        </div>
        <div
          className={`flex-1 min-w-[140px] cursor-pointer rounded-2xl border-2 transition-all px-6 py-4 flex flex-col items-start gap-2 shadow-sm
            ${mode === 'deep' ? 'border-purple-500 bg-purple-50' : 'border-transparent bg-white/80 hover:border-purple-200'}`}
          onClick={() => setMode('deep')}
        >
          <div className="flex items-center gap-2 text-purple-600 font-bold text-base">
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            深度分析
          </div>
          <div className="text-xs text-gray-500">上下文洞察与详细解读</div>
        </div>
      </div>
      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* 主按钮 */}
      <Button
        type="submit"
        disabled={isAnalyzing}
        className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg border-0"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            正在分析中...
          </>
        ) : (
          "开始分析"
        )}
      </Button>
    </form>
  )
}
