function tips(e, n, t) {
    let o

    function r() {
        o = window.setTimeout((() => {
            document.body.removeChild(i)
        }), t)
    }

    t = t || 1500
    const i = document.createElement('div')
    i.innerHTML = e, i.style.cssText = 'position:fixed; left:50%; top:15px; margin-left:-150px;width:300px; padding:8px 15px;border-radius:5px; color:#' + ('error' === n ? 'f56c6c' : '67c23a') + '; background-color:#' + ('error' === n ? 'fef0f0' : 'f0f9eb') + ';text-align:center;font-size:12px', document.body.appendChild(i), i.onmouseover = () => window.clearTimeout(o), i.onmouseout = r, r()
}

function copyTo(e, n) {
    ClipboardJS.copy(n || (e.dataset ? e.dataset.text : e.getAttribute('data-text')), { container: e.parentNode }), tips('已复制')
}

function el(e) {
    return document.getElementById(e)
}

function query(e) {
    return array(document.querySelectorAll(e))
}

function value(e) {
    return 'string' == typeof e ? el(e)?.value : e?.value
}

function array(e) {
    return e instanceof Array ? e : Array.prototype.slice.call(e)
}

function linesOf(e) {
    return e.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter((e => !!e))
}

function showControl(e, n) {
    let t = el(`${e}-container`)
    if (!t) {
        const n = el('container')
        t = document.createElement('div'), t.id = `${e}-container`, t.innerHTML = `<h3>${e.toUpperCase()} - <span style="color: green;font-size: 14px;font-weight: normal">点击内容复制</span></h3>\n<pre style="cursor: pointer;font-family: Consolas;" id="${e}-contents" onclick="copyTo(this, this.textContent)"></pre>`, n.appendChild(t)
    }
    !1 !== n ? (el(`${e}-container`).style.display = 'block', el(`${e}-contents`).textContent = n) : el(`${e}-container`).style.display = 'none'
}

function getContents(e){
    return el(`${e}-contents`).textContent
}

function radio(e, n) {
    const t = query('input[name=' + e + ']').find((e => e.checked))
    return t ? t.value : n
}

function checkbox(e, n) {
    const t = query('input[name=' + e + ']').filter((e => e.checked))
    return !0 === n ? t : t.map((e => e.value))
}

function changeOptions(e) {
    array(e.parentNode.childNodes).filter((n => 'DIV' === n.nodeName && n !== e)).forEach((e => e.style.display = 'none' === e.style.display ? 'block' : 'none'))
}
