import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Gio from 'gi://Gio';

export default class I3LikeShortcutsExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._originalSettings = {};
        this._settings = null;
    }

    enable() {
        this._settings = this.getSettings();
        this._applyI3Shortcuts();
    }

    disable() {
        this._restoreOriginalSettings();
        this._settings = null;
    }

    _applyI3Shortcuts() {
        const wmSettings = new Gio.Settings({schema: 'org.gnome.desktop.wm.preferences'});
        const wmKeybindings = new Gio.Settings({schema: 'org.gnome.desktop.wm.keybindings'});
        const mutterSettings = new Gio.Settings({schema: 'org.gnome.mutter'});
        const shellKeybindings = new Gio.Settings({schema: 'org.gnome.shell.keybindings'});
        const mediaKeysSettings = new Gio.Settings({schema: 'org.gnome.settings-daemon.plugins.media-keys'});

        // Store original settings before changing them
        this._storeOriginalSetting(wmSettings, 'num-workspaces');
        this._storeOriginalSetting(mutterSettings, 'dynamic-workspaces');
        this._storeOriginalSetting(wmKeybindings, 'close');
        this._storeOriginalSetting(shellKeybindings, 'toggle-application-view');
        this._storeOriginalSetting(mediaKeysSettings, 'custom-keybindings');

        // Store original application switching shortcuts before disabling them
        for (let i = 1; i <= 9; i++) {
            this._storeOriginalSetting(shellKeybindings, `switch-to-application-${i}`);
        }

        // Configure workspace settings
        mutterSettings.set_boolean('dynamic-workspaces', false);
        wmSettings.set_int('num-workspaces', 10);

        // Configure close window shortcut (Super+Shift+Q)
        wmKeybindings.set_strv('close', ['<Super><Shift>q']);

        // Configure show all apps shortcut (Super+D)
        shellKeybindings.set_strv('toggle-application-view', ['<Super>d']);

        // Disable application switching shortcuts (Super+1-9) to avoid conflicts
        for (let i = 1; i <= 9; i++) {
            shellKeybindings.set_strv(`switch-to-application-${i}`, []);
        }

        // Configure workspace switching shortcuts (Super+1-0)
        for (let i = 1; i <= 9; i++) {
            const key = `switch-to-workspace-${i}`;
            this._storeOriginalSetting(wmKeybindings, key);
            wmKeybindings.set_strv(key, [`<Super>${i}`]);
        }
        this._storeOriginalSetting(wmKeybindings, 'switch-to-workspace-10');
        wmKeybindings.set_strv('switch-to-workspace-10', ['<Super>0']);

        // Configure move window to workspace shortcuts (Super+Shift+1-0)
        for (let i = 1; i <= 9; i++) {
            const key = `move-to-workspace-${i}`;
            this._storeOriginalSetting(wmKeybindings, key);
            wmKeybindings.set_strv(key, [`<Super><Shift>${i}`]);
        }
        this._storeOriginalSetting(wmKeybindings, 'move-to-workspace-10');
        wmKeybindings.set_strv('move-to-workspace-10', ['<Super><Shift>0']);

        // Configure terminal shortcut (Super+Enter)
        this._setupTerminalShortcut(mediaKeysSettings);

        console.log('i3-like shortcuts applied successfully');
    }

    _setupTerminalShortcut(mediaKeysSettings) {
        // Store original custom keybindings
        const originalKeybindings = mediaKeysSettings.get_strv('custom-keybindings');

        // Add terminal keybinding if not already present
        const terminalPath = '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/terminal/';
        if (!originalKeybindings.includes(terminalPath)) {
            const newKeybindings = [...originalKeybindings, terminalPath];
            mediaKeysSettings.set_strv('custom-keybindings', newKeybindings);
        }

        // Configure the terminal shortcut
        const terminalSettings = new Gio.Settings({
            schema: 'org.gnome.settings-daemon.plugins.media-keys.custom-keybinding',
            path: terminalPath
        });

        this._storeOriginalCustomKeybinding(terminalPath, 'name');
        this._storeOriginalCustomKeybinding(terminalPath, 'command');
        this._storeOriginalCustomKeybinding(terminalPath, 'binding');

        terminalSettings.set_string('name', 'Open Terminal');
        terminalSettings.set_string('command', '/usr/bin/ptyxis --maximize --new-window');
        terminalSettings.set_string('binding', '<Super>Return');
    }

    _storeOriginalSetting(settings, key) {
        const schemaId = settings.schema_id;
        const settingKey = `${schemaId}::${key}`;

        if (!(settingKey in this._originalSettings)) {
            try {
                this._originalSettings[settingKey] = {
                    settings: settings,
                    key: key,
                    value: settings.get_value(key)
                };
            } catch (e) {
                console.warn(`Could not store original setting for ${settingKey}: ${e.message}`);
            }
        }
    }

    _storeOriginalCustomKeybinding(path, key) {
        const settingKey = `custom-keybinding::${path}::${key}`;

        if (!(settingKey in this._originalSettings)) {
            try {
                const settings = new Gio.Settings({
                    schema: 'org.gnome.settings-daemon.plugins.media-keys.custom-keybinding',
                    path: path
                });
                this._originalSettings[settingKey] = {
                    settings: settings,
                    key: key,
                    value: settings.get_value(key)
                };
            } catch (e) {
                console.warn(`Could not store original custom keybinding for ${settingKey}: ${e.message}`);
            }
        }
    }

    _restoreOriginalSettings() {
        console.log('Restoring original settings...');

        for (const [settingKey, originalSetting] of Object.entries(this._originalSettings)) {
            try {
                originalSetting.settings.set_value(originalSetting.key, originalSetting.value);
            } catch (e) {
                console.warn(`Could not restore setting ${settingKey}: ${e.message}`);
            }
        }

        this._originalSettings = {};
        console.log('Original settings restored');
    }
}