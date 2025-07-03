"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Link, FileText } from "lucide-react"
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
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("url")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const inputContent = activeTab === "url" ? url : content
    if (!inputContent.trim()) {
      setError("请输入文章链接或内容")
      return
    }

    onAnalysisStart()

    try {
      const report = await analyzeContent({ url: inputContent.trim() })
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            链接分析
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            内容分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div>
            <Label htmlFor="url">微信公众号文章链接</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://mp.weixin.qq.com/s/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="content">文章内容</Label>
            <Textarea
              id="content"
              placeholder="请粘贴完整的文章内容..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isAnalyzing}
              className="mt-2 min-h-[200px]"
            />
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isAnalyzing}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
