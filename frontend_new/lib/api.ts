export interface AnalysisRequest {
  url: string
}

export interface AnalysisReport {
  core_arguments: string[]
  argument_analysis: string[]
  critical_questions: string[]
  key_quotes: string[]
  // 可根据后端返回扩展字段
}

export async function analyzeContent(req: AnalysisRequest): Promise<AnalysisReport> {
  const res = await fetch('http://127.0.0.1:8000/api/v1/analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('API 请求失败');
  return res.json();
}
