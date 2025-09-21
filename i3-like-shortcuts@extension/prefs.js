import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class I3LikeShortcutsPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: 'General',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup({
            title: 'i3-like Shortcuts Configuration',
            description: 'This extension automatically applies i3-style keyboard shortcuts to GNOME',
        });
        page.add(group);

        // Add info about what the extension does
        const infoLabel = new Gtk.Label({
            label: `This extension configures the following shortcuts when enabled:

• Super+Enter: Open Terminal
• Super+Shift+Q: Close Window
• Super+D: Show All Apps
• Super+1-9: Switch to Workspace 1-9
• Super+0: Switch to Workspace 10
• Super+Shift+1-9: Move Window to Workspace 1-9
• Super+Shift+0: Move Window to Workspace 10

The extension also:
• Sets 10 fixed workspaces
• Disables dynamic workspaces

All original settings are restored when the extension is disabled.`,
            wrap: true,
            xalign: 0,
            margin_top: 12,
            margin_bottom: 12,
            margin_start: 12,
            margin_end: 12,
        });

        const infoRow = new Adw.ActionRow({
            title: 'Extension Information',
        });
        infoRow.add_suffix(infoLabel);
        group.add(infoRow);

        // Add note about terminal application
        const terminalGroup = new Adw.PreferencesGroup({
            title: 'Terminal Configuration',
            description: 'The extension is configured to use Ptyxis terminal by default',
        });
        page.add(terminalGroup);

        const terminalNote = new Gtk.Label({
            label: `If you don't have Ptyxis installed, you can modify the terminal command in the extension code.
Common alternatives:
• /usr/bin/gnome-terminal --maximize
• /usr/bin/konsole
• /usr/bin/alacritty`,
            wrap: true,
            xalign: 0,
            margin_top: 12,
            margin_bottom: 12,
            margin_start: 12,
            margin_end: 12,
        });

        const terminalRow = new Adw.ActionRow({
            title: 'Terminal Application',
        });
        terminalRow.add_suffix(terminalNote);
        terminalGroup.add(terminalRow);
    }
}