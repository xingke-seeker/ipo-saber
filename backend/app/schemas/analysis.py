from pydantic import BaseModel, Field
from typing import List

class AnalysisRequest(BaseModel):
    url: str = Field(..., description="微信公众号文章链接")

class AnalysisResponse(BaseModel):
    core_arguments: List[str] = Field(..., description="核心观点提炼")
    argument_analysis: List[str] = Field(..., description="论证过程拆解")
    critical_questions: List[str] = Field(..., description="潜在问题与启发")
    key_quotes: List[str] = Field(..., description="金句摘录")
