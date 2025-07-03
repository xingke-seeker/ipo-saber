export interface AnalysisReport {
  core_arguments: string[]
  argument_analysis: string[]
  critical_questions: string[]
  key_quotes: string[]
}

export interface AnalysisRequest {
  url: string
}

export async function analyzeContent(request: AnalysisRequest): Promise<AnalysisReport> {
  console.log("请求体：", request); // 调试用
  const res = await fetch("http://127.0.0.1:8000/api/v1/analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    throw new Error("API 请求失败");
  }
  return res.json();
}
