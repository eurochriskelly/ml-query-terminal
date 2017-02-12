Run MarkLogic commands from the command line.

Usage:

    npm start -- -q examples/foo.xqy

Sends query to server, executes, and sends results back for parsing
with command line tools.

Useful for running simple setup commands from command line or running
on server where ssh is possible but http access to port 8000 is
restricted.