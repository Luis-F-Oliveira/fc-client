import type { IServant } from "@/types/data"
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

function generateDateList(start: Date): string[] {
  const dateList: string[] = []
  const startDate = new Date(start)
  const endDate = new Date()

  while (startDate <= endDate) {
    dateList.push(startDate.toLocaleDateString())
    startDate.setDate(startDate.getDate() + 1)
  }

  return dateList
}

export async function POST(req: NextRequest) {
  const { name, date } = await req.json()
  const data: IData[] = []
  const dates = generateDateList(date)

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  for (const element of dates) {
    console.log('Rodando: ' + element)
    let dialogAppeared = false
    page.on('dialog', async dialog => { 
      dialogAppeared = true
    })

    await page.waitForTimeout(5000)
    await page.goto('https://www.iomat.mt.gov.br/')
    
    const input = page.locator('xpath=//*[@id="dataEdicaoPortal"]')
    await input.click()
    await input.press('Control+A')
    await input.press('Backspace')
    await input.type(element, { delay: 100 })
    await page.locator('xpath=//*[@id="sbmt1"]').click()

    if (dialogAppeared) {
      console.log(`elemento pulado: ${element}`)
      continue
    } else {
      console.log('continuando função')
    }

    // await page.waitForTimeout(5000)
  }

  await browser.close()

  return Response.json({ data })
}