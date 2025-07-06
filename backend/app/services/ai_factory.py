from .qwen_service import QwenAIModel

MODEL_REGISTRY = {
    "qwen": QwenAIModel,
}

def get_ai_model(model_name: str = "qwen"):
    model_cls = MODEL_REGISTRY.get(model_name)
    if not model_cls:
        raise ValueError(f"不支持的模型: {model_name}")
    return model_cls()
