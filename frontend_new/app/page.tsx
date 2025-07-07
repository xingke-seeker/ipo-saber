"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Globe, HelpCircle, Palette, Languages, Loader2, Sparkles, Zap, Target, ArrowRight, Rocket } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AnalysisResults from "@/components/analysis-results"
import { analyzeContent } from "@/lib/api"

export default function ArticleAnalyzer() {
  const [url, setUrl] = useState("")
  const [outputMode, setOutputMode] = useState<"concise" | "expert">("concise")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [language, setLanguage] = useState("zh")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showRocket, setShowRocket] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return
    setIsAnalyzing(true)
    setError(null);
    setElapsed(0);
    const start = Date.now();
    // 启动计时器，每秒更新一次
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    try {
      const result = await analyzeContent({ url })
      // 字段映射，兼容后端snake_case
      setAnalysisResult({
        ...result,
        coreViewpoints: (result as any).coreViewpoints || result.core_arguments,
        argumentAnalysis: (result as any).argumentAnalysis || result.argument_analysis || [],
        potentialIssues: (result as any).potentialIssues || result.critical_questions,
        goldenQuotes: (result as any).goldenQuotes || result.key_quotes,
        firstPrinciples: (result as any).firstPrinciples || (result as any).first_principles,
        boundaries: (result as any).boundaries,
        mode: outputMode,
        url: url,
      })
    } catch (e) {
      setError(language === "zh" ? "分析失败，请稍后重试！" : "Analysis failed, please try again later!");
    }
    // 结束计时
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const end = Date.now();
    setElapsed(Math.floor((end - start) / 1000));
    setIsAnalyzing(false);
  }

  const languages = [
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  const texts = {
    zh: {
      title: "智能文章分析",
      subtitle: "AI驱动的深度洞察",
      heroTitle: "将文章转化为\n深度洞察",
      heroDesc: "粘贴任意文章链接，即可获得AI驱动的深度分析、摘要和可执行的洞察",
      urlPlaceholder: "https://example.com/your-article",
      quickAnalysis: "快速分析",
      deepAnalysis: "深度分析",
      quickDesc: "核心要点和关键洞察",
      deepDesc: "全面分析与深度建议",
      startAnalysis: "开始分析",
      analyzing: "分析中...",
      fast: "快速",
      comprehensive: "全面",
    },
    en: {
      title: "Article Analyzer",
      subtitle: "AI-Powered Insights",
      heroTitle: "Transform Articles\nInto Insights",
      heroDesc: "Paste any URL and unlock deep AI-powered analysis, summaries, and actionable insights in seconds",
      urlPlaceholder: "https://example.com/your-article",
      quickAnalysis: "Quick Analysis",
      deepAnalysis: "Deep Analysis",
      quickDesc: "Essential insights and key takeaways",
      deepDesc: "In-depth insights with context and recommendations",
      startAnalysis: "Start Analysis",
      analyzing: "Analyzing...",
      fast: "Fast",
      comprehensive: "Comprehensive",
    },
  }

  const t = texts[language as keyof typeof texts]

  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过400px显示火箭
      setShowRocket(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      inputRef.current.focus()
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400/30 dark:bg-purple-300/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-indigo-400/30 dark:bg-indigo-300/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-400/30 dark:bg-pink-300/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 right-2/3 w-2 h-2 bg-cyan-400/30 dark:bg-cyan-300/20 rounded-full animate-float"></div>

        {/* Gradient Waves */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/10 to-purple-300/10 dark:from-blue-600/5 dark:to-purple-600/5 rounded-full blur-3xl animate-wave"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-pink-300/10 dark:from-indigo-600/5 dark:to-pink-600/5 rounded-full blur-3xl animate-wave-reverse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                >
                  <Languages className="h-4 w-4 mr-2" />
                  <span className="text-sm">{languages.find((l) => l.code === language)?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`${language === lang.code ? "bg-accent" : ""} text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Palette className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Advanced AI
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight whitespace-pre-line">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</p>
            </div>
          </div>

          {/* Analysis Interface */}
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardContent className="p-8 space-y-8">
              {/* URL Input */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <Globe className="absolute left-6 text-gray-400 w-5 h-5 z-10" />
                    <Input
                      ref={inputRef}
                      type="url"
                      placeholder={t.urlPlaceholder}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-16 pl-14 pr-6 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white/90 dark:bg-gray-800/90 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Medium
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse delay-300"></div>
                    WeChat
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse delay-700"></div>
                    CSDN
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse delay-1000"></div>
                    More...
                  </span>
                </div>
              </div>

              {/* Analysis Mode */}
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-200 ${
                    outputMode === "concise"
                      ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-lg backdrop-blur-sm"
                      : "bg-gray-50/80 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 backdrop-blur-sm"
                  }`}
                  onClick={() => setOutputMode("concise")}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          outputMode === "concise" ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      >
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.quickAnalysis}</h3>
                        <Badge variant={outputMode === "concise" ? "default" : "secondary"} className="mt-1">
                          {t.fast}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{t.quickDesc}</p>
                </div>

                <div
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-200 ${
                    outputMode === "expert"
                      ? "bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 shadow-lg backdrop-blur-sm"
                      : "bg-gray-50/80 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 backdrop-blur-sm"
                  }`}
                  onClick={() => setOutputMode("expert")}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          outputMode === "expert" ? "bg-purple-500" : "bg-gray-400"
                        }`}
                      >
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.deepAnalysis}</h3>
                        <Badge variant={outputMode === "expert" ? "default" : "secondary"} className="mt-1">
                          {t.comprehensive}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{t.deepDesc}</p>
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!url.trim() || isAnalyzing}
                className="w-full h-16 text-2xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-200 text-white [text-shadow:0_2px_16px_rgba(80,80,200,0.18)] hover:scale-105 hover:[text-shadow:0_4px_24px_rgba(80,80,200,0.32)]"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    {language === "zh"
                      ? `分析中...（${elapsed ?? 0}秒）`
                      : `Analyzing... (${elapsed ?? 0}s)`}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    {t.startAnalysis}
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
          {elapsed !== null && !isAnalyzing && (
            <div className="text-sm text-gray-500 text-center mt-2">
              {language === "zh"
                ? `本次分析耗时：${elapsed} 秒`
                : `Analysis time: ${elapsed} seconds`}
            </div>
          )}
          {analysisResult && (
            <AnalysisResults result={analysisResult} onReset={() => setAnalysisResult(null)} language={language} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t bg-white/60 dark:bg-gray-800/60 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-8">
          <Separator className="mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{t.title}</span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
              <p>
                {language === "zh"
                  ? "AI驱动分析 • 结果仅供参考 • © 2024 智能文章分析"
                  : "AI-powered analysis • Results for reference only • © 2024 Article Analyzer"}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Rocket To Top Button */}
      {showRocket && (
        <button
          onClick={scrollToInput}
          title={language === "zh" ? "回到顶部" : "Back to Top"}
          className="fixed z-50 bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
          style={{ boxShadow: "0 8px 32px 0 rgba(80, 80, 200, 0.25)" }}
        >
          <Rocket className="w-7 h-7 text-white drop-shadow-lg group-hover:animate-bounce" />
          <span className="sr-only">{language === "zh" ? "回到顶部" : "Back to Top"}</span>
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(-3px); }
          50% { transform: translateY(-12px) translateX(4px); }
          75% { transform: translateY(-6px) translateX(-2px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(3px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        
        @keyframes wave-reverse {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(0.9); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 20s linear infinite;
        }
        
        .animate-wave-reverse {
          animation: wave-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
