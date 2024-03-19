show = document.getElementById('rules-btn')
close = document.getElementById('close-btn')

//open rules
show.addEventListener('click', () => {
    rules.classList.add('show')
})

//close rules
close.addEventListener('click', () => {
    rules.classList.remove('show')
})
