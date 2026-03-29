

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { analyzeScreenshot } = require('./vision');

(async () => {
  // Default to file:// index.html in this directory
  const defaultTarget = `file://${path.resolve(__dirname, 'index.html')}`;
  const url = process.env.TARGET_URL || defaultTarget;
  const outputDir = path.resolve(__dirname, 'output');
  const screenshotPath = path.join(outputDir, 'screenshot.png');
  const metaPath = path.join(outputDir, 'last-run.json');

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Final URL:', page.url());
  console.log('Page title:', await page.title());

  await page.screenshot({ path: screenshotPath, fullPage: true });

  await browser.close();

  if (fs.existsSync(screenshotPath)) {
    console.log('Screenshot saved to:', screenshotPath);
    // Write last-run.json metadata
    const meta = {
      timestamp: new Date().toISOString(),
      url,
      screenshot: 'output/screenshot.png'
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    console.log('Metadata written to:', metaPath);

    // Call vision API to analyze screenshot
    const visionResult = await analyzeScreenshot(screenshotPath, path.join(outputDir, 'visual-analysis.json'));
    if (visionResult && visionResult.httpStatus !== undefined) {
      console.log('Vision API HTTP status:', visionResult.httpStatus);
    }
    if (visionResult && visionResult.rawResponse) {
      console.log('Vision API raw response:', visionResult.rawResponse);
    }
    console.log('Visual analysis written to:', path.join(outputDir, 'visual-analysis.json'));
  } else {
    console.error('Screenshot failed.');
  }
})();
