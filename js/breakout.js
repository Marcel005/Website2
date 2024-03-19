show = document.getElementById('rules-btn')
rules = document.getElementById('rules')
close = document.getElementById('close-btn')

//open rules
show.addEventListener('click', () => {
    rules.classList.add('show')
})

//close rules
close.addEventListener('click', () => {
    rules.classList.remove('show')
})
