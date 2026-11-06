/** Progressive enhancement: keep the screenshot readable without JavaScript. */
class ChatterThemePreview extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    const darkImage = this.querySelector('img');
    if (!darkImage) return;
    this.dataset.ready = 'true';
    this.dataset.theme = 'dark';

    const controls = document.createElement('div');
    controls.className = 'theme-preview-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Screenshot appearance');
    const frame = document.createElement('div');
    frame.className = 'theme-preview-frame';
    if (darkImage.width > 0 && darkImage.height > 0) frame.style.aspectRatio = `${darkImage.width} / ${darkImage.height}`;
    const card = document.createElement('div');
    card.className = 'theme-preview-card';
    const front = document.createElement('div');
    front.className = 'theme-preview-face theme-preview-dark';
    const back = document.createElement('div');
    back.className = 'theme-preview-face theme-preview-light';
    back.setAttribute('aria-hidden', 'true');
    const lightImage = darkImage.cloneNode(true) as HTMLImageElement;
    lightImage.src = this.dataset.lightSrc || '/images/chatter/home-light.webp';
    lightImage.alt = darkImage.alt.replace('dark mode', 'light mode');
    lightImage.loading = 'eager';
    lightImage.removeAttribute('fetchpriority');
    front.append(darkImage);
    back.append(lightImage);
    card.append(front, back);
    frame.append(card);

    for (const theme of ['dark', 'light'] as const) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = theme === 'dark' ? 'Dark' : 'Light';
      button.dataset.theme = theme;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.addEventListener('click', () => {
        this.dataset.theme = theme;
        controls.querySelectorAll('button').forEach((other) => {
          other.setAttribute('aria-pressed', String(other === button));
        });
        front.setAttribute('aria-hidden', String(theme !== 'dark'));
        back.setAttribute('aria-hidden', String(theme !== 'light'));
      });
      controls.append(button);
    }
    this.prepend(controls);
    this.append(frame);
  }
}
if (!customElements.get('chatter-theme-preview')) {
  customElements.define('chatter-theme-preview', ChatterThemePreview);
}
