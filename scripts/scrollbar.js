function clamp(value, min, max) {
    if (value < min)
        return min
    else if (value > max)
        return max

    return value
}

function initScrollbar() {
    const margin = 8

    const scrollbar = document.createElement('div')
    scrollbar.className = 'scrollbar'

    const thumb = document.createElement('div')
    thumb.className = 'scrollbar-thumb'

    const track = document.createElement('div')
    track.className = 'scrollbar-track'

    scrollbar.appendChild(thumb)
    scrollbar.appendChild(track)

    const bodySize = document.body.getBoundingClientRect()

    const { innerHeight } = window

    const scrollRange = { y: bodySize.height - innerHeight }

    const scrollbarHeight = (innerHeight / bodySize.height) * innerHeight - 2 * margin

    const scrollbarRange = { y: innerHeight - scrollbarHeight - 2 * margin }

    if (scrollRange.y > 0) {
        document.body.appendChild(scrollbar)

        let oldY = 0
        let dY = 0
        let scrollbarTop = 0
        let mouseDown = false

        track.style.height = `${innerHeight - 2 * margin}px`
        thumb.style.height = `${scrollbarHeight}px`
        scrollbar.style.top = `${margin}px`
        scrollbar.style.left = `calc(100% - var(--scrollbar-width) - ${margin}px)`

        thumb.addEventListener('mousedown', () => {
            mouseDown = true

            thumb.classList.add('scrollbar-thumb-active')
        })
        window.addEventListener('mouseup', () => {
            mouseDown = false

            thumb.classList.remove('scrollbar-thumb-active')
        })

        thumb.addEventListener('mouseover', () => {
            thumb.classList.add('scrollbar-thumb-hover')
        })

        thumb.addEventListener('mouseout', () => {
            thumb.classList.remove('scrollbar-thumb-hover')
        })

        window.addEventListener('mousemove', e => {
            if (mouseDown) {
                dY = e.clientY - oldY
                oldY = e.clientY
            }
        })

        const scrollbarTopChanged = () => {
            thumb.style.top = `${scrollbarTop}px`
        }

        const setScrollbarTop = (value) => {
            scrollbarTop = value
            scrollbarTopChanged()
        }

        const scrollThumbDrag = e => {
            window.scrollTo(0, clamp(window.scrollY + (dY / scrollbarRange.y) * scrollRange.y, 0, scrollRange.y))
        }

        window.addEventListener('scroll', e => {
            const t = window.scrollY / scrollRange.y
            setScrollbarTop(t * scrollbarRange.y)
        })

        thumb.addEventListener('mousemove', e => {
            if (mouseDown) {
                scrollThumbDrag(e)
            }
        })
        window.addEventListener('mousemove', e => {
            if (mouseDown) {
                scrollThumbDrag(e)
            }
        })

        /*track.addEventListener('mousedown', e => {
            setScrollbarTop(clamp(e.pageY - (scrollbarHeight / 2), 0, scrollbarRange.y + scrollbarHeight))
        })*/
    }
    
}

window.addEventListener('load', () => {
    initScrollbar()
})