show = document.getElementById('rules-btn')
close = document.getElementById('close-btn')

show.addEventListener('click', () => {
    rules.classList.add('show')
})

close.addEventListener('click', () => {
    rules.classList.remove('show')
})
