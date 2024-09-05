function tips(message, type, duration) {
    let timer;
    duration = duration  || 1500

    function tryCloseTip(){
        timer = window.setTimeout(() => {
            document.body.removeChild(inner);
        }, duration)
    }


    const inner = document.createElement('div')
    inner.innerHTML = message
    inner.style.cssText
        = "position:fixed; left:50%; top:15px; margin-left:-150px;width:300px; padding:8px 15px;border-radius:5px; "
        + "color:#" + (type === 'error' ? "f56c6c" : "67c23a") + "; background-color:#" + (type === 'error' ? "fef0f0" : "f0f9eb") + ";text-align:center;font-size:12px"
    document.body.appendChild(inner)

    inner.onmouseover = () => window.clearTimeout(timer)
    inner.onmouseout = tryCloseTip
    tryCloseTip();
}
function copyTo(target, text){
    ClipboardJS.copy( text || (target.dataset ? target.dataset.text : target.getAttribute('data-text')), {
        container: target.parentNode
    })
    tips('已复制')
}
function el(id){
    return document.getElementById(id)
}
function query(path){
    return array(document.querySelectorAll(path))
}
function value(id){
    if(typeof id === 'string') return el(id)?.value
    return id?.value;
}
function array(source){
    if(source instanceof Array) return source;
    return  Array.prototype.slice.call(source)
}
function linesOf (contents) {
    return contents.replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n')
        .filter(t => !!t)
}
function showControl(name, content){
    let contentsContainer = el(`${name}-container`);
    if(!contentsContainer){
        const parentContainer = el('container')
        contentsContainer = document.createElement('div')
        contentsContainer.id = `${name}-container`
        contentsContainer.innerHTML = `<h3>${name.toUpperCase()} - <span style="color: green;font-size: 14px;font-weight: normal">点击内容复制</span></h3>
<pre style="cursor: pointer;font-family: Consolas;" id="${name}-contents" onclick="copyTo(this, this.textContent)"></pre>`
        parentContainer.appendChild(contentsContainer)
    }
    if(content === false){
        el(`${name}-container`).style.display ='none'
        return;
    }
    el(`${name}-container`).style.display = 'block'
    el(`${name}-contents`).textContent = content
}

function radio(name, defaultValue){
    const el = query('input[name=' + name + ']').find(t=>t.checked)
    if(!el) return defaultValue;
    return el.value
}

function checkbox(name, returnNodes) {
    const nodes = query('input[name=' + name + ']').filter(t => t.checked);
    if (returnNodes === true) return nodes;

    return nodes.map(t => t.value)
}
