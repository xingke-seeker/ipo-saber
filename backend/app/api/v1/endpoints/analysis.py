from fastapi import APIRouter, HTTPException, Query
from backend.app.schemas.analysis import AnalysisRequest, AnalysisResponse
from backend.app.services.ai_factory import get_ai_model
from backend.app.services.scraper_service import fetch_wechat_article
import traceback
import json
import logging

router = APIRouter()

logger = logging.getLogger("analysis")

BASIC_PROMPT_TEMPLATE = """
你是一名专业的知识管理与批判性思维分析师。
请深入分析我提供的文章，解构其核心论点、论证方式和关键信息，并提出启发性问题。你的分析需要帮助我快速、深度地吸收文章的精髓。
请严格按照以下 JSON 格式返回分析结果，不要在 JSON 结构之外添加任何解释性文字。

{{
  "core_arguments": ["提炼出的核心观点1", "提炼出的核心观点2"],
  "argument_analysis": ["对观点1的论证过程分析...", "..."],
  "critical_questions": ["批判性问题1", "..."],
  "key_quotes": ["金句1", "..."]
}}

# 文章内容

{article_content}
"""

def parse_ai_response(result: dict) -> dict:
    """
    兼容不同Qwen模型API返回结构，提取AI生成的JSON文本并转为dict
    """
    # DashScope标准返回
    if "output" in result and "text" in result["output"]:
        output_text = result["output"]["text"]
    # OpenAI兼容模式
    elif "choices" in result and result["choices"]:
        output_text = result["choices"][0]["message"]["content"]
    else:
        raise ValueError("AI返回结构不支持，无法提取文本")
    try:
        logger.info(f"AI原始返回: {output_text!r}")
        return json.loads(output_text)
    except Exception:
        logger.error(f"AI原始返回（解析失败）: {output_text!r}")
        raise ValueError("AI返回内容不是有效的JSON")

@router.post("/analysis", response_model=AnalysisResponse)
async def analyze_article(request: AnalysisRequest, model: str = Query("qwen")):
    try:
        ai_model = get_ai_model(model)
        # 只抓取公众号文章正文
        article = await fetch_wechat_article(request.url)
        content = article.get("content", "")
        prompt = BASIC_PROMPT_TEMPLATE.format(article_content=content)
        preview = content[:100] + ("..." if len(content) > 100 else "")
        logger.info(f"大模型入参 prompt: {prompt[:200]} ... [文章内容前100字]: {preview}")
        result = ai_model.analyze(prompt)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        data = parse_ai_response(result)
        return AnalysisResponse(**data)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
