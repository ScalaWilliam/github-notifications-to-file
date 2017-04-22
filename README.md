# github-notifications-to-file

Appends GitHub notifications into plaintext NDJSON.

Usage:
```
$ npm install -g github-notifications-to-file
$ GITHUB_TOKEN=abcd github-notifications-to-file -f - 
$ GITHUB_TOKEN=defg github-notifications-to-file -f notifications.tsv 
```

You decide externally how often to run this command.

This is useful for event-sourcing those notification updates.

