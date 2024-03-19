show = document.getElementById('rules-btn')
rules = document.getElementById('rules')
close = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

// create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

//create paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

//draw a ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.closePath()
}


drawBall()



//open rules
show.addEventListener('click', () => {
    rules.classList.add('show')
})

//close rules
close.addEventListener('click', () => {
    rules.classList.remove('show')
})
