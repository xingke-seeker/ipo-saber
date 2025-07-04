import asyncio
from typing import Dict
from playwright.async_api import async_playwright

async def fetch_wechat_article(url: str) -> Dict:
    """
    使用 Playwright 抓取微信公众号文章内容。
    返回 dict: {title, author, content, publish_date}
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url, timeout=60000)
        # 简单提取，实际可根据公众号文章 DOM 结构调整
        title = await page.title()
        author = await page.locator('meta[name="author"]').get_attribute('content')
        # 公众号文章正文一般在 #js_content
        content = await page.locator('#js_content').inner_text()
        # 发布时间一般在 #publish_time
        try:
            publish_date = await page.locator('#publish_time').inner_text()
        except Exception:
            publish_date = None
        await browser.close()
        return {
            "title": title,
            "author": author,
            "content": content,
            "publish_date": publish_date
        }
