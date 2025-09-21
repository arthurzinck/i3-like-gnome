# i3-like GNOME Setup Guide

A guide to configure GNOME with i3-style keyboard shortcuts and workspace management using native GNOME features.

## Quick Setup

### 1. Configure GNOME Workspaces
```bash
# Set fixed workspaces (disable dynamic)
gsettings set org.gnome.mutter dynamic-workspaces false

# Set number of workspaces to 10
gsettings set org.gnome.desktop.wm.preferences num-workspaces 10
```

### 2. Setup Terminal Shortcut (Super+Enter)
```bash
# Set custom keybinding for terminal
gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings "['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/terminal/']"
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/terminal/ name "Open Terminal"
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/terminal/ command "/usr/bin/ptyxis --maximize --new-window"
gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/terminal/ binding "<Super>Return"
```

### 3. Setup Close Window Shortcut (Super+Shift+Q)
```bash
# Set close window shortcut
gsettings set org.gnome.desktop.wm.keybindings close "['<Super><Shift>q']"
```

### 4. Setup Show All Apps Shortcut (Super+D)
```bash
# Set show all apps shortcut
gsettings set org.gnome.shell.keybindings toggle-application-view "['<Super>d']"
```

### 5. Setup Workspace Shortcuts (Super+1-0)
```bash
# Switch to workspace shortcuts
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-7 "['<Super>7']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-8 "['<Super>8']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-9 "['<Super>9']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-10 "['<Super>0']"
```

### 6. Setup Move Window to Workspace Shortcuts (Super+Shift+1-0)
```bash
# Move window to workspace shortcuts
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-1 "['<Super><Shift>1']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-2 "['<Super><Shift>2']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-3 "['<Super><Shift>3']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-4 "['<Super><Shift>4']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-5 "['<Super><Shift>5']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-6 "['<Super><Shift>6']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-7 "['<Super><Shift>7']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-8 "['<Super><Shift>8']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-9 "['<Super><Shift>9']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-10 "['<Super><Shift>0']"
```

## One-Line Setup Script
```bash
# Complete workspace setup
gsettings set org.gnome.mutter dynamic-workspaces false && \
gsettings set org.gnome.desktop.wm.preferences num-workspaces 10 && \
for i in {1..9}; do gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-$i "['<Super>$i']"; done && \
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-10 "['<Super>0']" && \
for i in {1..9}; do gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-$i "['<Super><Shift>$i']"; done && \
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-10 "['<Super><Shift>0']"
```

## Keyboard Shortcuts

### GNOME Workspace Shortcuts (configured above)
| Action | Shortcut | Description |
|--------|----------|-------------|
| **Application Management** | | |
| Show All Apps | `Super+d` | Open application overview |
| **Workspace Switching** | | |
| Workspace 1-9 | `Super+1-9` | Switch to workspace 1-9 |
| Workspace 10 | `Super+0` | Switch to workspace 10 |
| **Move Window to Workspace** | | |
| Move to Workspace 1-9 | `Super+Shift+1-9` | Move window to workspace 1-9 |
| Move to Workspace 10 | `Super+Shift+0` | Move window to workspace 10 |

## Reset to Defaults
If you want to reset workspace shortcuts to GNOME defaults:
```bash
gsettings reset org.gnome.desktop.wm.keybindings switch-to-workspace-1
gsettings reset org.gnome.desktop.wm.keybindings move-to-workspace-1
# ... repeat for workspaces 2-10
```

## Troubleshooting

### Check Current Settings
```bash
# Check workspace count
gsettings get org.gnome.desktop.wm.preferences num-workspaces

# Check if dynamic workspaces are disabled
gsettings get org.gnome.mutter dynamic-workspaces

# Check specific shortcut
gsettings get org.gnome.desktop.wm.keybindings switch-to-workspace-5
```

### Additional i3-like Features
For more i3-like functionality (window focus, movement, resizing), you can install additional extensions or configure custom shortcuts in GNOME Settings → Keyboard → Keyboard Shortcuts.