#!/usr/bin/env bash
# OSE Character Roller - Menu-based Launcher (Linux)

menu() {
    while true; do
        clear
        echo "========================================="
        echo "    OSE Character Roller - Launcher"
        echo "========================================="
        echo "  1. 🏃  Run as Dev Server (npm run dev)"
        echo "  2. 👀  Run as Preview (npm run preview)"
        echo "  3. 🛠️  Build Project (npm run build)"
        echo "  4. 📂  Open Project Folder"
        echo "  5. ❌  Exit"
        echo "========================================="
        read -p "Select an option (1-5): " choice

        case "$choice" in
            1)
                dev
                ;;
            2)
                preview
                ;;
            3)
                build
                ;;
            4)
                xdg-open . 2>/dev/null || echo "Could not open folder"
                read -p "Press Enter to continue..."
                ;;
            5)
                exit 0
                ;;
            *)
                echo "Invalid option."
                sleep 2
                ;;
        esac
    done
}

dev() {
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    cd "$SCRIPT_DIR" || exit 1
    npm run dev &
    NPM_PID=$!
    sleep 3
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173/
    fi
    wait $NPM_PID
    read -p "Press Enter to continue..."
}

preview() {
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    cd "$SCRIPT_DIR" || exit 1
    npm run preview &
    NPM_PID=$!
    sleep 3
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:4173/
    fi
    wait $NPM_PID
    read -p "Press Enter to continue..."
}

build() {
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    cd "$SCRIPT_DIR" || exit 1
    npm run build
    read -p "Press Enter to continue..."
}

menu
