document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('export-btn');
  const resultDiv = document.getElementById('result');

  exportBtn.addEventListener('click', async () => {
    const commands = Array.from(document.querySelectorAll('.command:checked')).map(
      el => el.value
    );
    const response = await fetch('/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands })
    });
    const data = await response.json();
    if (data.paste_url) {
      resultDiv.innerHTML = `<p>Pasted to <a href="${data.paste_url}" target="_blank">${data.paste_url}</a></p>`;
    } else {
      resultDiv.innerHTML = `<p>Pastebin not configured. Copy commands below:</p><pre>${data.content}</pre>`;
    }
  });
});
