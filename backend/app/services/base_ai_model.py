from typing import Dict

class BaseAIModel:
    def analyze(self, prompt: str) -> Dict:
        raise NotImplementedError
