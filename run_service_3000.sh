#!/usr/bin/env bash
# OSE Character Creator - Service Runner (Linux)
# Note: This creates a systemd user service instead of Windows Task Scheduler

SERVICE_NAME="ose_roller_dev_3000"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Create systemd user service
mkdir -p ~/.config/systemd/user

cat > ~/.config/systemd/user/${SERVICE_NAME}.service << EOF
[Unit]
Description=OSE Character Creator Dev Server
After=network.target

[Service]
Type=simple
WorkingDirectory=$SCRIPT_DIR
ExecStart=/usr/bin/npm run dev -- --port 3000 --host --strictPort
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
EOF

# Reload systemd and enable/start service
systemctl --user daemon-reload
systemctl --user enable ${SERVICE_NAME}.service
systemctl --user start ${SERVICE_NAME}.service

if [ $? -eq 0 ]; then
    echo "Service ${SERVICE_NAME} created and started on port 3000."
    echo "It will auto-start at user login."
    echo ""
    echo "To manage the service:"
    echo "  systemctl --user status ${SERVICE_NAME}"
    echo "  systemctl --user stop ${SERVICE_NAME}"
    echo "  systemctl --user disable ${SERVICE_NAME}"
else
    echo "Failed to start service ${SERVICE_NAME}"
    exit 1
fi
