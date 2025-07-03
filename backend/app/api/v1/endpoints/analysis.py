from fastapi import APIRouter
from backend.app.schemas.analysis import AnalysisRequest, AnalysisResponse

router = APIRouter()

@router.post("/analysis", response_model=AnalysisResponse)
async def analyze_article(request: AnalysisRequest):
    # 返回mock数据
    return AnalysisResponse(
        core_arguments=[
            "作者认为AI将深刻改变内容产业。",
            "技术进步带来新的商业模式。"
        ],
        argument_analysis=[
            "作者引用了行业报告，数据较为充分。",
            "逻辑链条清晰，但部分观点缺乏反例支持。"
        ],
        critical_questions=[
            "AI内容生成是否会导致同质化？",
            "行业门槛降低后，优质内容如何突围？"
        ],
        key_quotes=[
            "“未来的内容创作，AI是标配。”",
            "“技术不是终点，内容才是核心。”"
        ]
    )
