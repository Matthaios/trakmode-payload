#!/usr/bin/env bun
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'fs'
import { join, relative, dirname } from 'path'

interface TreeNode {
  name: string
  path: string
  children: TreeNode[]
  isFile: boolean
}

function buildTree(dirPath: string, basePath: string): TreeNode[] {
  const items: TreeNode[] = []

  try {
    const entries = readdirSync(dirPath)

    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const stat = statSync(fullPath)
      const relativePath = relative(basePath, fullPath)

      // Only include .ts and .tsx files
      if (stat.isFile() && (entry.endsWith('.ts') || entry.endsWith('.tsx'))) {
        items.push({
          name: entry,
          path: relativePath,
          children: [],
          isFile: true,
        })
      } else if (stat.isDirectory()) {
        const children = buildTree(fullPath, basePath)
        if (children.length > 0) {
          items.push({
            name: entry,
            path: relativePath,
            children,
            isFile: false,
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }

  // Sort directories first, then files, both alphabetically
  return items.sort((a, b) => {
    if (a.isFile !== b.isFile) {
      return a.isFile ? 1 : -1
    }
    return a.name.localeCompare(b.name)
  })
}

function generateMarkdown(node: TreeNode, prefix: string = '', isLast: boolean = true): string {
  let result = ''

  // Add the current node
  const connector = prefix + (isLast ? '└── ' : '├── ')
  result += connector + (node.isFile ? node.name : node.name + '/') + '\n'

  // Add children
  if (node.children.length > 0) {
    const newPrefix = prefix + (isLast ? '    ' : '│   ')
    node.children.forEach((child, index) => {
      const isLastChild = index === node.children.length - 1
      result += generateMarkdown(child, newPrefix, isLastChild)
    })
  }

  return result
}

function main() {
  const srcPath = join(process.cwd(), 'src')
  const outputDir = join(process.cwd(), '.flatten')
  const outputFile = join(outputDir, 'tree.md')

  console.log('Building file tree for src directory...')

  // Build the tree
  const tree = buildTree(srcPath, srcPath)

  // Generate markdown
  let markdown = '# Source Code Tree\n\n'
  markdown += '```\n'
  markdown += 'src/\n'
  tree.forEach((node, index) => {
    const isLast = index === tree.length - 1
    markdown += generateMarkdown(node, '', isLast)
  })
  markdown += '```\n'

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true })

  // Write to file
  writeFileSync(outputFile, markdown, 'utf8')

  console.log(`Tree written to ${outputFile}`)
  console.log(`Found ${countFiles(tree)} TypeScript files`)
}

function countFiles(nodes: TreeNode[]): number {
  let count = 0
  for (const node of nodes) {
    if (node.isFile) {
      count++
    } else {
      count += countFiles(node.children)
    }
  }
  return count
}

main()
