# ml-query-terminal

Execute MarkLogic queries from the command line.

## Install

    yarn add https://github.com/eurochriskelly/ml-query-termina
    
## Setup

- Configure config.json 
- Configure privileges for user in config.json (if not admin)
- add to package.json

    "scripts" : { "mlqt" : "node_modules/ml-query-terminal/index.js" }

## Usage:

    npm run mlqt -- -q examples/foo.xqy

Sends query to server, executes, and sends results back for parsing
with command line tools.

Useful for running simple setup commands from command line or running
on server where ssh is possible but http access to port 8000 is
restricted.

## Advanced options:

Watch functionality is possible using the w flag. This will re-run
every time the query changes.

Usage:

    npm run mlqt -- -wq examples/foo.xqy
