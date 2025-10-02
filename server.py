#!/usr/bin/env python3
"""
Simple HTTP Server for Firebase Authentication
Run this to serve your files locally with proper protocol
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Configuration
PORT = 8000
HOST = 'localhost'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for Firebase
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🚀 Starting server at http://{HOST}:{PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"🌐 Open your browser to: http://{HOST}:{PORT}")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
            # Auto-open browser
            webbrowser.open(f'http://{HOST}:{PORT}')
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Try a different port.")
            print("💡 You can change the PORT variable in this script")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
