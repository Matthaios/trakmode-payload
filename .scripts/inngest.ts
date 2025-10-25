#!/usr/bin/env bun
import { readdirSync, statSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join, relative } from 'path'

function findTypeScriptFiles(dirPath: string, basePath: string): string[] {
  const files: string[] = []

  try {
    const entries = readdirSync(dirPath)

    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const stat = statSync(fullPath)
      const relativePath = relative(basePath, fullPath)

      if (stat.isFile() && (entry.endsWith('.ts') || entry.endsWith('.tsx'))) {
        files.push(relativePath)
      } else if (stat.isDirectory()) {
        const subFiles = findTypeScriptFiles(fullPath, basePath)
        files.push(...subFiles)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }

  return files
}

function main() {
  const srcPath = join(process.cwd(), 'src')
  const outputDir = join(process.cwd(), '.flatten')
  const outputFile = join(outputDir, 'inngest.md')

  console.log('Finding all TypeScript files in src directory...')

  // Find all TypeScript files
  const tsFiles = findTypeScriptFiles(srcPath, srcPath)

  // Sort files for consistent output
  tsFiles.sort()

  console.log(`Found ${tsFiles.length} TypeScript files`)

  // Generate markdown content
  let markdown = ''

  for (const file of tsFiles) {
    const fullPath = join(srcPath, file)

    try {
      const content = readFileSync(fullPath, 'utf8')

      markdown += '-----\n'
      markdown += `FILE: ${file}\n\n`
      markdown += 'Content:\n'
      markdown += content
      markdown += '\n---\n\n'
    } catch (error) {
      console.error(`Error reading file ${file}:`, error)
      markdown += '-----\n'
      markdown += `FILE: ${file}\n\n`
      markdown += 'Content: [Error reading file]\n'
      markdown += '---\n\n'
    }
  }

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true })

  // Write to file
  writeFileSync(outputFile, markdown, 'utf8')

  console.log(`Content written to ${outputFile}`)
}

main()
