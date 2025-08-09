import json
import os
from pathlib import Path

from flask import Flask, jsonify, render_template, request
import requests

app = Flask(__name__)

# Load actions and spells at startup
BASE_DIR = Path(__file__).parent
with open(BASE_DIR / "data" / "actions.json", "r", encoding="utf-8") as f:
    ACTIONS = json.load(f)
with open(BASE_DIR / "data" / "spells.json", "r", encoding="utf-8") as f:
    SPELLS = json.load(f)


def export_to_pastebin(content: str) -> str | None:
    """Export content to Pastebin if credentials are configured."""
    api_dev_key = os.getenv("PASTEBIN_API_KEY")
    if not api_dev_key:
        return None
    data = {
        "api_option": "paste",
        "api_dev_key": api_dev_key,
        "api_paste_code": content,
    }
    try:
        resp = requests.post("https://pastebin.com/api/api_post.php", data=data, timeout=10)
        if resp.status_code == 200:
            return resp.text.strip()
    except Exception:
        pass
    return None


@app.route("/")
def index():
    return render_template("index.html", actions=ACTIONS, spells=SPELLS)


@app.route("/export", methods=["POST"])
def export_commands():
    commands = request.json.get("commands", [])
    content = "\n".join(commands)
    paste_url = export_to_pastebin(content)
    return jsonify({"paste_url": paste_url, "content": content})


if __name__ == "__main__":
    app.run(debug=True)
