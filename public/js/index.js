/**
 * The main js for client.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */
import { addIssue } from './add-issue.js'
import { updateIssue } from './update-issue.js'
import { toggleIssueState } from './toggle-issue-state.js'

const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  await import('../socket.io/socket.io.js')
  // Create a socket connection using Socket.IO.
  const base = document.querySelector('base')
  const path = base
    ? (new URL('socket.io', base.href)).pathname
    : '/socket.io'

  const socket = window.io.connect('/', { path })

  // Listen for messages from the server.
  socket.on('issue/create', (issue) => addIssue(issue, issueTemplate))
  socket.on('issue/close', (issue) => toggleIssueState(issue, 'close'))
  socket.on('issue/reopen', (issue) => toggleIssueState(issue, 'open'))
  socket.on('issue/update', (issue) => updateIssue(issue))
}
