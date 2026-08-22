# Prod Server (port 30001)

The prod server runs as a systemd **user** service that rebuilds `dist/` on
every start and serves it with `vite preview`.

## Unit

`~/.config/systemd/user/ose-creator.service`:

```ini
[Unit]
Description=OSE Character Creator — prod build on port 30001
After=network.target

[Service]
WorkingDirectory=/mnt/c/git-public/Old-School-Essentials-Character-Creator
ExecStartPre=%h/.local/bin/npm run build
ExecStart=%h/.local/bin/npx vite preview --port 30001 --host 0.0.0.0
Restart=on-failure
RestartSec=3
Environment=NODE_ENV=production
Environment=PATH=%h/.local/bin:/usr/local/bin:/usr/bin:/bin

[Install]
WantedBy=default.target
```

## Commands

```bash
systemctl --user daemon-reload
systemctl --user enable --now ose-creator.service   # start on WSL boot
systemctl --user restart ose-creator.service        # rebuild + restart
journalctl --user -u ose-creator.service -f         # logs
```

## Notes

- Every restart runs `npm run build` first, so a restart is also a redeploy.
- The Imgur/portrait endpoints (`/__save_portrait`, `/__imgur_status`) are
  attached in both dev and preview servers by `vite.config.ts`.
- `IMGUR_CLIENT_ID` is read from the repo `.env` (gitignored) at server start.
- The build adds ~10-25s to each (re)start while `dist/` regenerates.
