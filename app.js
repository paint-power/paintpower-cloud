#!/usr/bin/env node
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

function runCommand(command, args, opts = {}) {
  return spawn(command, args, { stdio: 'inherit', env: process.env, ...opts })
}

(async function () {
  try {
    const nextLocalScript = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next.js')
    const hasLocalNext = fs.existsSync(nextLocalScript)

    function runNext(args) {
      if (hasLocalNext) {
        return runCommand(process.execPath, [nextLocalScript, ...args])
      }
      // fallback to global `next` if local script not available
      return runCommand('next', args)
    }

    const nextDir = path.join(__dirname, '.next')
    if (!fs.existsSync(nextDir)) {
      console.log('.next not found — running build (this may take a while)...')
      await new Promise((resolve, reject) => {
        const b = runNext(['build'])
        b.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('build failed'))))
        b.on('error', reject)
      })
    }

    const port = process.env.PORT || '3000'
    console.log(`Starting Next.js on port ${port}...`)
    const s = runNext(['start', '-p', port])
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
