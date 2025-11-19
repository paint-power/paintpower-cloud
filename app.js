#!/usr/bin/env node
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

function run(cmd, args) {
  const child = spawn(cmd, args, { stdio: 'inherit', shell: true, env: process.env })
  return child
}

(async function () {
  try {
    const nextDir = path.join(__dirname, '.next')
    if (!fs.existsSync(nextDir)) {
      console.log('.next not found — running build (this may take a while)...')
      await new Promise((resolve, reject) => {
        const b = run('npx', ['next', 'build'])
        b.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('build failed'))))
        b.on('error', reject)
      })
    }

    const port = process.env.PORT || '3000'
    console.log(`Starting Next.js on port ${port}...`)
    const s = run('npx', ['next', 'start', '-p', port])
    s.on('exit', (code) => process.exit(code))
    s.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
