# github-notifications-to-file
Collects GitHub notifications into plaintext NDJSON.

Usage:
```
GITHUB_TOKEN=fd688a65eae2f1e7baa3238aa7afe95533cdecbd node ./index.js -f data.tsv 
```

You decide externally how often to run this command.

This is useful for event-sourcing those notification updates.

