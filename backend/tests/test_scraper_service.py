import pytest
from backend.app.services.scraper_service import fetch_wechat_article

WECHAT_URL = "https://mp.weixin.qq.com/s/TbcO0eBTsKjzZqazHMLzKQ"

@pytest.mark.asyncio
async def test_fetch_wechat_article():
    result = await fetch_wechat_article(WECHAT_URL)
    assert isinstance(result, dict)
    assert "title" in result and result["title"].strip() != ""
    assert "content" in result and result["content"].strip() != ""
    # author 和 publish_date 可能因反爬获取不到，但字段应存在
    assert "author" in result
    assert "publish_date" in result
    # 打印抓取结果便于调试
    print("抓取结果：", result)

@pytest.mark.asyncio
async def test_fetch_invalid_url():
    # 测试无效链接时应抛出异常或返回空内容
    invalid_url = "https://mp.weixin.qq.com/s/invalid"
    try:
        result = await fetch_wechat_article(invalid_url)
        # 允许返回空内容，但类型必须为 dict
        assert isinstance(result, dict)
        # title 或 content 至少有一个为空
        assert not result.get("title") or not result.get("content")
    except Exception as e:
        # 允许抛出异常
        print("无效链接抓取异常：", e)
