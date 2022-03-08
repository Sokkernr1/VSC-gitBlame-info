# Git Info

View the Git Blame information for your current line.<br>
Also links the commit to be opened and viewed in your browser.

# Install

1. Open _Visual Studio Code_
1. Go to extensions
1. Search for `git info`
1. Click install on _Git info_

# Configuration

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
    <tr>
      <th colspan="3">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>gitInfo.statusBarMessageDisplayLeft</code></td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <ul>
          <li>Should the info bar be displayed on the left or right</li>
      </ul>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarPositionPriority</code></td>
      <td><code>Integer</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <ul>
          <li>Priority of the info bars position. Higher values put it further to the left/right.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>gitInfo.infoMessageFormat</code></td>
      <td><code>String</code></td>
      <td><code>Summary: ${gitInfo.summary}</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <ul>
          <li>The message that is displayed in the info pop-up</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarMessageFormat</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)From: ${gitInfo.committer} (${gitInfo.timeAgo})</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar</li>
      </td>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarMessageNoFileOpened</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)Git info</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar when no file is opened</li>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarMessageNoRepo</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)Git info</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The messaage that is displayed in the info bar when the opened file is not part of any repo</li>
      </td>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarMessageIgnoredFile</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)File is ignored</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar when the opened file is being ignored by the .gitignore</li>
      </td>
    </tr>
    <tr>
      <td><code>gitInfo.statusBarMessageNoCommit</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)Not Committed Yet</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar when the current line has changes that are not yet committed</li>
      </td>
    </tr>
	 <tr>
      <td><code>gitInfo.statusBarMessageNoInfoFound</code></td>
      <td><code>String</code></td>
      <td><code>$(git-commit)No info found</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar when the extension couldnt find any git entries for the selected line</li>
      </td>
    </tr>
	 <tr>
      <td><code>gitInfo.statusBarMessageLoading</code></td>
      <td><code>String</code></td>
      <td><code>$(sync~spin)Loading...</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <li>The message that is displayed in the info bar when the extension is loading</li>
      </td>
    </tr>
  </tbody>
</table>

## Message Tokens (available globally for all settings)

| Token | Description |
|-------|-------------|
| `${gitInfo.hash}` | 40-bit hash unique to the commit |
| `${gitInfo.author}` | Name of the Author |
| `${gitInfo.committer}` | Name of the Committer |
| `${gitInfo.mail}` | E-Mail address of the committer |
| `${gitInfo.timestamp}` | Timestamp of when the commit was made |
| `${gitInfo.tz}` | Timezone of the committer |
| `${gitInfo.date}` | Date of the creation of the commit |
| `${gitInfo.summary}` | Summary of the commit |
| `${gitInfo.timeAgo}` | How long ago the commit was made |

# Acknowledgements

* Logo by [Jason Long](https://twitter.com/jasonlong).
* Influenced and inspired by [Wade Anderson](https://github.com/waderyan).
