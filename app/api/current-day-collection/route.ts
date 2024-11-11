import type { IServant } from "@/@types/data"
import type { NextRequest } from "next/server"
import { chromium } from 'playwright'

interface IData {
  order: string | null
  url: string
  servants: IServant[]
}

function formatted(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\d)([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .toUpperCase()
    .trim()
}

export async function POST(req: NextRequest) {
  const servants: IServant[] = await req.json()
  const data: IData[] = []
  const matter: string[] = []

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://www.iomat.mt.gov.br/')

  await page.locator('xpath=//*[@id="downloadPdf"]').click()
  await page.locator('xpath=//*[@id="html-interna"]/a').click()

  await page.waitForTimeout(3000)

  const element = page.getByRole('listitem').filter({ hasText: 'DEFENSORIA PÚBLICA ' })
  await element.click()

  const listItems = element.locator('ul > li')
  await listItems.first().waitFor({ state: 'visible' })
  const itemCount = await listItems.count()

  for (let i = 0; i < itemCount; i++) {
    const listitem = listItems.nth(i)
    await listitem.locator('a').click()

    await page.waitForTimeout(3000)

    const order = await page.locator('xpath=//*[@id="info"]/strong[3]').textContent()
    const url = page.url()

    const iframeElement = page.locator('xpath=//*[@id="view_materia"]')
    const iframe = iframeElement.contentFrame()

    await page.waitForTimeout(3000)

    const textLocator = iframe.locator('xpath=/html/body')
    const textContent = await textLocator.textContent()

    if (textContent) {
      matter.length = 0
      matter.push(formatted(textContent))
    }

    const foundServants = servants.filter((servant: IServant) =>
      matter.some((name: string) => name.includes(servant.name))
    )

    data.push({
      order: order,
      url: url,
      servants: foundServants,
    })
  }

  await page.waitForTimeout(3000)
  await browser.close()

  return Response.json({ data })
}