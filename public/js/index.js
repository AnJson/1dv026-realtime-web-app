/**
 * The main js for client.
 *
 * @author Anders Jonsson
 * @version 1.0.0
 */
import '../socket.io/socket.io.js'
import { addIssue } from './add-issue.js'

const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  // Create a socket connection using Socket.IO.
  const socket = window.io()
  // Listen for "issue/create" message from the server.
  socket.on('issue/create', (issue) => addIssue(issue, issueTemplate))
}
