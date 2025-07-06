import os
import requests
from typing import Dict
from .base_ai_model import BaseAIModel

DASHSCOPE_API_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation"
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY", "")

class QwenAIModel(BaseAIModel):
    def analyze(self, prompt: str, model: str = "qwen-turbo", timeout: int = 20) -> Dict:
        if not DASHSCOPE_API_KEY:
            raise ValueError("未配置 DASHSCOPE_API_KEY 环境变量")
        headers = {
            "Authorization": f"Bearer {DASHSCOPE_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": model,
            "input": {
                "prompt": prompt
            }
        }
        try:
            with requests.Session() as session:
                response = session.post(
                    DASHSCOPE_API_URL,
                    headers=headers,
                    json=payload,
                    timeout=timeout
                )
                response.raise_for_status()
                return response.json()
        except requests.RequestException as e:
            return {"error": str(e)}
        except Exception as e:
            return {"error": str(e)}
