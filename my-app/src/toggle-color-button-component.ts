const style = `
:host {
    --toggle-color-button-criteria-len:var(--toggle-color-button-len,75px);
    width: var(--toggle-color-button-criteria-len);
    height: calc(var(--toggle-color-button-criteria-len) / 1.78);
}
div{
    position: relative;
    width: var(--toggle-color-button-criteria-len);
    height: calc(var(--toggle-color-button-criteria-len) / 1.78);
    margin: auto;
    display: inline-block;
}
input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin:0;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
}
label {
    width: 100%;
    height: 100%;
    background: #ffeb3b;
    position: relative;
    display: inline-block;
    border-radius: calc(var(--toggle-color-button-criteria-len)/1.63);
    transition: 0.4s;
    box-sizing: border-box;
}
label:after {
    content: '🌞';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    transition: 0.4s;
    font-size: calc(var(--toggle-color-button-criteria-len)/2.5);
    line-height: calc(var(--toggle-color-button-criteria-len)/1.70);
}
input:checked + label {
    background-color: #3d00a9;
}
input:checked + label:after {
    content: '🌙';
    left: calc(var(--toggle-color-button-criteria-len) / 2.14);
}
`;

const template = `
<div>
    <input id="toggle" type='checkbox' />
    <label for="toggle" />
</div>
`;

const tmpl = document.createElement("template");
tmpl.innerHTML = `<style>${style}</style>${template}`;

customElements.define("toggle-color-button", class extends HTMLElement {
    connectedCallback() {
        // shadowDOMの設定
        const shadowRoot = this.attachShadow({ mode: "closed" });
        shadowRoot.append(tmpl.content.cloneNode(true));
        // トグルする対象の要素
        const toggledElem = document.querySelector<HTMLElement>(this.dataset.toggled || "html");
        if (!toggledElem) return;
        // ボタンクリック時にトグル
        shadowRoot.querySelector("input")?.addEventListener("click", () => {
            toggledElem.dataset.mode =
                toggledElem.dataset.mode !== 'dark' ?
                    'dark'
                    : 'light';
        })
    }
});