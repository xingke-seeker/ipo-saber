import type { AnalysisRequest, AnalysisReport } from "@/types/analysis"

// Mock API function - in real implementation, this would call your FastAPI backend
export async function analyzeContent(request: AnalysisRequest): Promise<AnalysisReport> {
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
