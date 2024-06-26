show = document.getElementById('rules-btn')
rules = document.getElementById('rules')
close = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
start = document.getElementById('start')
retry = document.getElementById('retry')


score = 0

brickRowCount = 9
brickColumnCount = 5

// create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 7,
    dx: 7,
    dy: -7,
}

//create paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 150,
    h: 10,
    speed: 10,
    dx: 0,
}

//create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

// create bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

//draw a ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.closePath()
}

//draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.closePath()
}

//draw score on canvas
function drawScore() {
    ctx.font ='20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

// draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? 'orange' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

//draw everything
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

//Move paddle on canvas
function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    //Wall detection
    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

//Keydown event
function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e. key == 'Left') {
        paddle.dx = -paddle.speed
    }
}

//Keyup event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}

//keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

// Move ball fucntion
function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    //wall collision (top)
    if (ball.y - ball.size < 0) {
        ball.dy = -1 * ball.dy
    }

    //wall col (right)
    if (ball.x + ball.size > canvas.width) {
        ball.dx = -1 * ball.dx
    }

    //wall col (bottom)
    if (ball.y + ball.size > canvas.height) {
        drawLoss()
        pause()
    }

    //wall col (left)
    if (ball.x - ball.size < 0) {
        ball.dx = -1 * ball.dx
    }

    //paddle collision
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -1 * ball.speed
    }

    //Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size >  brick.x && //left brick side
                    ball.x + ball.size < brick.x + brick.w && //right side
                    ball.y + ball.size > brick.y && //top
                    ball.y - ball.size < brick.y + brick.h //bottom
                ) {
                ball.dy = -1 * ball.dy
                brick.visible = false
                increaseScore()
                }
            }
        })
    })
}

//increase score
function increaseScore() {
    score++
}

function drawWin() {
    ctx.font = '80px Arial'
    ctx.fillStyle = 'blue'
    ctx.fillText(`YOU WIN!!!`, canvas.width / 2 - 200, canvas.height / 2)
}

function drawLoss() {
    ctx.font = '80px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText(`YOU LOSE!!!`, canvas.width / 2 - 200, canvas.height / 2)
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick=> {
            brick.visible = true
        })
    })
}

// Update canvas drawing and animation
function update() {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
    if (score == 45) {
        drawWin()
        ball.dx = 0
        ball.dy = 0
        ball.speed = 0
    }
}

//draw initial canvas
function begin() {
    draw()
}

begin()



//start game
start.addEventListener('click', () => {
    update()
})

//retry button
retry.addEventListener('click', () => {
    location.reload()
    showAllBricks()
    score = 0
    clearRect()
})



//open rules
show.addEventListener('click', () => {
    rules.classList.add('show')
})

//close rules
close.addEventListener('click', () => {
    rules.classList.remove('show')
})
