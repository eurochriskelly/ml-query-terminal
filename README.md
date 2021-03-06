# ml-query-terminal

Execute MarkLogic queries from the command line.

## Install

   npm add eurochriskelly/ml-query-terminal
    
## Setup

- Configure config.json
- Configure privileges for user in config.json (if not admin)
- OPTIONAL: add scripts to package.json

```
    "scripts" : {
      "mlqt" : "mlqt",
      "xq:setup" : "mlqt -q setup-file.xqy",
      "js:setup" : "mlqt -q setup.js",
    }
```    

## Usage:

   With npm, adding to package.json scripts is not required by
   default. So you can just run:

    npm run mlqt -- -q examples/foo.xqy

Sends query to server, executes, and sends results back for parsing
with command line tools.

Useful for running custom build scripts from command line, or running
on server where ssh is possible but http access to port 8000 is
restricted.

## Advanced options:

Watch functionality is possible using the w flag. This will re-run
every time the query changes.

Usage:

    npm run mlqt -- -wq examples/foo.xqy
