## Open Git Bash Terminal From Sublime Text

Package Control

Sublime Terminal

http://wbond.net/sublime_packages/terminal

Sublime Terminal

```
{
    // The command to execute for the terminal, leave blank for the OS default
    // On OS X the terminal can be set to iTerm.sh to execute iTerm
    "terminal": "C:\\Program Files\\Git\\bin\\sh.exe",

    // A list of default parameters to pass to the terminal, this can be
    // overridden by passing the "parameters" key with a list value to the args
    // dict when calling the "open_terminal" or "open_terminal_project_folder"
    // commands
    "parameters": ["-c", "cd \"%CWD%\" && \"C:\\Program Files\\Git\\bin\\sh.exe\" -i -l"]
}
```

```
{
    // The command to execute for the terminal, leave blank for the OS default
    // On OS X the terminal can be set to iTerm.sh to execute iTerm
    "terminal": "C:\\Program Files\\Git\\bin\\sh.exe",

    // A list of default parameters to pass to the terminal, this can be
    // overridden by passing the "parameters" key with a list value to the args
    // dict when calling the "open_terminal" or "open_terminal_project_folder"
    // commands
    "parameters": ["--cd=%CWD%"]
}
```
