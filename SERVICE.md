# OSE Character Creator - Service Setup & Management

This guide documents how to install, configure, and manage the OSE Character Creator as a Linux systemd service.

## Current Status

✅ **Service is running!**

**Access URL:** `http://93.152.164.17:33971/`

---

## Overview

The OSE Character Creator is deployed as a Node.js service using the `serve` package to host the built React/Vite application on a fixed port.

**Service Name:** `ose-character-creator`
**Port:** 33971 (fixed and consistent)
**Local Access:** `http://localhost:33971/`
**Network Access:** `http://93.152.164.17:33971/`

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm
- Linux (systemd-based distributions)
- sudo/root access

### Step 1: Build the Application

```bash
cd /home/apoapostolov/git/projects/aistudio-apps/ose-character-creator
npm install
npm run build
```

This creates a production build in the `dist/` directory.

### Step 2: Install the Serve Package Globally

```bash
sudo npm install -g serve
```

### Step 3: Create the Systemd Service File

```bash
sudo nano /etc/systemd/system/ose-character-creator.service
```

Copy and paste the following content:

```ini
[Unit]
Description=OSE Character Creator Web Service
After=network.target

[Service]
Type=simple
User=apoapostolov
WorkingDirectory=/home/apoapostolov/git/projects/aistudio-apps/ose-character-creator
Environment=NODE_ENV=production
# If the build output is missing or empty, build it before starting
# Runs as the service user (same as `User=`) and uses absolute npm path
ExecStartPre=/usr/bin/bash -lc 'cd /home/apoapostolov/git/projects/aistudio-apps/ose-character-creator && if [ ! -d dist ] || [ -z "$(ls -A dist)" ]; then /usr/bin/npm install --silent && /usr/bin/npm run build --silent; fi'
ExecStart=/usr/bin/serve -s dist -l 33971
# Use a robust restart policy and limits to avoid tight restart loops
Restart=always
RestartSec=10
StartLimitIntervalSec=60
StartLimitBurst=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Save with `Ctrl+O`, `Enter`, `Ctrl+X`.

### Step 4: Enable and Start the Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ose-character-creator

# Recommended one-liner (run from project directory) to build and start in one step:
cd /home/apoapostolov/git/projects/aistudio-apps/ose-character-creator && npm install && npm run build && sudo systemctl daemon-reload && sudo systemctl enable --now ose-character-creator
```

### Step 5: Verify the Service is Running

```bash
sudo systemctl status ose-character-creator
```

You should see:

```
Active: active (running) since [date] ...
```

---

## Service Management Commands

### Check Status

```bash
sudo systemctl status ose-character-creator
```

### Start Service

```bash
sudo systemctl start ose-character-creator
```

### Stop Service

```bash
sudo systemctl stop ose-character-creator
```

### Restart Service

```bash
sudo systemctl restart ose-character-creator
```

### View Live Logs

```bash
sudo journalctl -u ose-character-creator -f
```

### View Last 50 Log Lines

```bash
sudo journalctl -u ose-character-creator -n 50
```

### Disable Auto-Start on Boot

```bash
sudo systemctl disable ose-character-creator
```

### Re-Enable Auto-Start on Boot

```bash
sudo systemctl enable ose-character-creator
```

---

## Updating the Application

When you update the code and want to deploy a new version:

```bash
cd /home/apoapostolov/Git/projects/aistudio-apps/ose-character-creator
npm install
npm run build
sudo systemctl restart ose-character-creator
```

---

## Troubleshooting

### Service won't start

1. Check the logs: `sudo journalctl -u ose-character-creator -n 50`
2. Verify `serve` is installed: `which serve`
3. Verify the working directory exists and user has permissions
4. Check if port 33971 is already in use: `sudo lsof -i :33971`

### Port 33971 is already in use

Find the process using the port:

```bash
sudo lsof -i :33971
```

Kill the process:

```bash
sudo kill -9 <PID>
```

Or change the port in the service file (change `-l 33971` to `-l <NEW_PORT>`):

```bash
sudo nano /etc/systemd/system/ose-character-creator.service
sudo systemctl daemon-reload
sudo systemctl restart ose-character-creator
```

### Service keeps restarting

Check logs for errors:

```bash
sudo journalctl -u ose-character-creator -f
```

Common issues:

- Missing `dist/` directory (rebuild the app: `npm run build`)
- Permission issues (check user and directory ownership)
- Node.js or serve not found (reinstall or check paths)

### High memory usage

The serve package uses minimal memory (~40MB). If memory is high:

1. Check for zombie processes: `ps aux | grep serve`
2. Restart the service: `sudo systemctl restart ose-character-creator`

---

## System Boot Behavior

The service is configured to:

- **Auto-start on system boot** (via `WantedBy=multi-user.target`)
- **Auto-restart on failure** (via `Restart=on-failure` with 10-second delay)

To disable auto-start on boot:

```bash
sudo systemctl disable ose-character-creator
```

---

## Security Notes

- The service runs as the `apoapostolov` user (non-root for security)
- Only accessible on localhost:3000 by default
- To expose to network, use a reverse proxy (nginx/Apache) or change `127.0.0.1` binding

### Expose to Network (nginx reverse proxy)

Install nginx:

```bash
sudo apt install nginx
```

Create `/etc/nginx/sites-available/ose-character-creator`:

```nginx
server {
    listen 80;
    server_name your.domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart nginx:

```bash
sudo ln -s /etc/nginx/sites-available/ose-character-creator /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## Service File Location

The service file is located at:

```
/etc/systemd/system/ose-character-creator.service
```

To edit it:

```bash
sudo nano /etc/systemd/system/ose-character-creator.service
```

After any changes, reload and restart:

```bash
sudo systemctl daemon-reload
sudo systemctl restart ose-character-creator
```

---

## Useful System Commands

```bash
# List all systemd services
sudo systemctl list-units --type=service

# Enable a service (start on boot)
sudo systemctl enable ose-character-creator

# Disable a service (don't start on boot)
sudo systemctl disable ose-character-creator

# Check if service is enabled
sudo systemctl is-enabled ose-character-creator

# View systemd journal for all services
sudo journalctl -x

# Clear old journal entries
sudo journalctl --vacuum=time=7d
```

---

## Quick Reference

| Task         | Command                                                       |
| ------------ | ------------------------------------------------------------- |
| Status       | `sudo systemctl status ose-character-creator`                 |
| Start        | `sudo systemctl start ose-character-creator`                  |
| Stop         | `sudo systemctl stop ose-character-creator`                   |
| Restart      | `sudo systemctl restart ose-character-creator`                |
| Logs         | `sudo journalctl -u ose-character-creator -f`                 |
| Enable Boot  | `sudo systemctl enable ose-character-creator`                 |
| Disable Boot | `sudo systemctl disable ose-character-creator`                |
| Edit Config  | `sudo nano /etc/systemd/system/ose-character-creator.service` |

---

## Support

For issues or questions, check:

1. Service logs: `sudo journalctl -u ose-character-creator -f`
2. Project README: [README.md](./README.md)
3. Vite/React documentation for build issues
