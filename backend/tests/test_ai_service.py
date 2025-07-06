import os
import pytest
from backend.app.services.ai_service import call_qwen_api

@pytest.mark.skipif(not os.getenv("DASHSCOPE_API_KEY"), reason="未设置 DASHSCOPE_API_KEY 环境变量")
def test_call_qwen_api():
    prompt = "请用JSON格式输出：核心观点、论证分析、潜在问题、金句摘录。内容：人工智能正在改变世界。"
    result = call_qwen_api(prompt)
    assert isinstance(result, dict)
    assert "error" not in result, f"API 调用失败: {result.get('error')}"
    # 你可以根据实际返回结构进一步断言
    print("Qwen API 返回：", result)
