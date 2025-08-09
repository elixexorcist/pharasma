document.addEventListener('DOMContentLoaded', () => {
  const actionsList = document.getElementById('actions-list');
  const spellsList = document.getElementById('spells-list');
  const exportBtn = document.getElementById('export-btn');
  const resultDiv = document.getElementById('result');
  const keyInput = document.getElementById('pastebin-key');

  Promise.all([
    fetch('data/actions.json').then(r => r.json()),
    fetch('data/spells.json').then(r => r.json())
  ]).then(([actions, spells]) => {
    actions.forEach(action => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" class="command" value="${action.command}">${action.name}</label>`;
      actionsList.appendChild(li);
    });
    spells.forEach(spell => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="checkbox" class="command" value="${spell.command}">${spell.name}</label>`;
      spellsList.appendChild(li);
    });
  });

  exportBtn.addEventListener('click', async () => {
    const commands = Array.from(document.querySelectorAll('.command:checked')).map(
      el => el.value
    );
    const content = commands.join('\n');
    const apiDevKey = keyInput.value.trim();
    let pasteUrl = null;
    if (apiDevKey) {
      const form = new URLSearchParams();
      form.append('api_option', 'paste');
      form.append('api_dev_key', apiDevKey);
      form.append('api_paste_code', content);
      try {
        const resp = await fetch('https://pastebin.com/api/api_post.php', {
          method: 'POST',
          body: form
        });
        if (resp.ok) {
          const text = await resp.text();
          if (text.startsWith('http')) {
            pasteUrl = text.trim();
          }
        }
      } catch (e) {
        // ignore
      }
    }
    if (pasteUrl) {
      resultDiv.innerHTML = `<p>Pasted to <a href="${pasteUrl}" target="_blank">${pasteUrl}</a></p>`;
    } else {
      resultDiv.innerHTML = `<p>Pastebin not configured or failed. Copy commands below:</p><pre>${content}</pre>`;
    }
  });
});
