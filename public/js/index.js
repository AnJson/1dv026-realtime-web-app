import '../socket.io/socket.io.js'

const issuesTemplate = document.querySelector('#issues-template')

if (issuesTemplate) {
  // Create a socket connection using Socket.IO.
  const socket = window.io()

  // Listen for "issues/create" message from the server.
  socket.on('issues/create', (issue) => insertIssuesItem(issue))
}

/**
 * Inserts a issue row at the end of the issue table.
 *
 * @param {object} issue - The issue to add.
 */
function insertIssuesItem (issue) {
  const issueList = document.querySelector('#issue-list')

  // Only add a issue if it's not already in the list.
  if (!issueList.querySelector(`[data-id="${issue.id}"]`)) {
    const issueNode = issuesTemplate.content.cloneNode(true)

    const taskRow = issueNode.querySelector('tr')
    const doneCheck = issueNode.querySelector('input[type=checkbox]')
    const descriptionCell = issueNode.querySelector('td:nth-child(2)')
    const [updateLink, deleteLink] = issueNode.querySelectorAll('a')

    taskRow.setAttribute('data-id', issue.id)

    if (issue.done) {
      doneCheck.setAttribute('checked', '')
      descriptionCell.classList.add('text-muted')
    } else {
      doneCheck.removeAttribute('checked')
      descriptionCell.classList.remove('text-muted')
    }

    descriptionCell.textContent = issue.description

    updateLink.href = `./issues/${issue.id}/update`
    deleteLink.href = `./issues/${issue.id}/delete`

    issueList.appendChild(issueNode)
  }
}
