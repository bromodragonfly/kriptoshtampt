const container = document.createElement('div')

container.classList.add('sidebar_for_test')
// тоже вынести
container.style.background = 'rgba(3, 3, 3, 0.6)'
container.style.height = '100%'
container.style.width = '0px'
container.style.position = 'fixed'
container.style.top = '0px'
container.style.right = '0px'
container.style.padding = '5px'
container.style.zIndex = '9000000000000000000'
container.style.overflowY = 'scroll'
container.style.transition = '500ms all'

document.body.insertAdjacentElement('afterbegin', container)

const pages = document.getElementById('pages')

if (pages) {
    pages.addEventListener('click', async (e) => {
        const target = e.target

        if (target instanceof SVGImageElement) {
            return toggle('N/A', 'Картинка')
        }

        if (target instanceof SVGPathElement) {
            const container = target.closest('g[direction="ltr"]')

            if (container !== null) {
                const textNodes = Array.from(
                    container.querySelectorAll('g text')
                )
                const text = textNodes.map((item) => item.textContent).join(' ')
                return toggle(text, 'Текст')
            }
        }

        return toggle('UNKNOWN', getNode(target))
    })
}

//@ts-ignore
function getNode(node) {
    return node.__proto__
}

function toggle(content: string, node: string) {
    const container =
        document.querySelector<HTMLDivElement>('.sidebar_for_test')
    if (container) {
        if (container.style.width == '0px') {
            // можно вынести в отдельную функцию
            const elem = document.createElement('div')
            elem.style.background = '#fff'
            elem.style.padding = '5px'
            elem.style.marginTop = '20px'
            elem.style.borderRadius = '20px'
            elem.style.width = '100%'
            elem.style.textAlign = 'center'
            elem.textContent = `Teкст: ${content} 
            Элемент: ${node}`

            container.style.width = '400px'
            container.insertAdjacentElement('afterbegin', elem)
        } else {
            container.style.width = '0px'
        }
    }
}
console.log('Content Script loaded')
