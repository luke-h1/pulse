#!/bin/bash

root_path="/Users/${USER}/srv/dev/pulse"

# script to open a new terminal window and start pulse

osascript <<EOF
tell application "iTerm"
  set newWindow to (create window with default profile)
  tell current session of newWindow
    set name to "db"
    write text "pushd $root_path && cd apps/api && docker-compose up db"
  end tell

  tell newWindow
    set newTab to (create tab with default profile)
    tell current session of newTab
        set name to "redis"
        write text "pushd $root_path && cd apps/api && docker-compose up redis"
    end tell
  end tell

  tell newWindow
    set newTab to (create tab with default profile)
    tell current session of newTab
        set name to "api"
        write text "pushd $root_path && cd scripts && ./run.js api"
    end tell
  end tell

  tell newWindow
    set newTab to (create tab with default profile)
    tell current session of newTab
        set name to "admin"
        write text "pushd $root_path && cd scripts && ./run.js admin"
    end tell
  end tell

  tell newWindow
    set newTab to (create tab with default profile)
    tell current session of newTab
        set name to "frontend"
        write text "pushd $root_path && cd scripts && ./run.js frontend"
    end tell
  end tell

end tell
EOF