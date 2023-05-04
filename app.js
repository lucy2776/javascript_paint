const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")

canvas.width = 710
canvas.height = 710

ctx.lineCap = "round"

/*
canvas.onclick = function (event) {
    const x = event.clientX - ctx.canvas.offsetLeft;
    const y = event.clientY - ctx.canvas.offsetTop;

    ctx.fillRect(x - 15, y - 15, 30, 30);
} // 마우스 클릭 시 사각형 그려짐    
*/


/*
****************
(0, 0) 시작 좌표
fillrect, fillstroke, fillStyle, beginPath/closePath
(x, y, w(idth), h(eight))
****************

ctx.rect(50, 50, 100, 50, 50)
ctx.rect(150, 150, 100, 100)
ctx.rect(250, 250, 100, 100)
ctx.fill()

ctx.beginPath()
ctx.rect(350, 350, 100, 100)
ctx.rect(450, 450, 100, 100)
ctx.fillStyle = "red"
ctx.fill()
*/


/*
****************
moveTo, fill
****************

ctx.moveTo(480, 70)
ctx.lineTo(450, 40)
ctx.lineTo(400, 20)
ctx.lineTo(350, 30)
ctx.lineTo(320, 50)
ctx.lineTo(300, 80)
ctx.lineTo(290, 130)
ctx.lineTo(300, 180)
ctx.lineTo(320, 220)
ctx.lineTo(350, 250)
ctx.lineTo(410, 300)
ctx.lineTo(450, 330)
ctx.lineTo(480, 350)

ctx.moveTo(480, 70)
ctx.lineTo(510, 40)
ctx.lineTo(560, 20)
ctx.lineTo(610, 30)
ctx.lineTo(640, 50)
ctx.lineTo(660, 80)
ctx.lineTo(670, 130)
ctx.lineTo(660, 180)
ctx.lineTo(640, 220)
ctx.lineTo(610, 250)
ctx.lineTo(550, 300)
ctx.lineTo(510, 330)
ctx.lineTo(480, 350)
// 하트
// ctx.stroke()
ctx.fillStyle = "pink" // .fill() 앞에 위치
ctx.fill() // 색 채울려면 필수
*/


/*
****************
lineWidth
****************

ctx.lineWidth = 2; // 선 굵기

ctx.fillStyle = "green"
ctx.fillRect(200, 200, 50, 200); // 왼쪽 벽
ctx.fillRect(400, 200, 50, 200); // 오른쪽 벽
ctx.fillRect(200, 200, 250, 20); // 천장


ctx.fillStyle = "yellow"
// ctx.strokeRect(300, 270, 50, 130); // 문
ctx.fillRect(300, 270, 50, 130); // 문


ctx.moveTo(150, 200); // 지붕
ctx.lineTo(325, 100);
ctx.lineTo(500, 200);
ctx.lineTo(150, 200);
ctx.stroke()
*/


/*
****************
arc
****************

ctx.fillRect(150, 70, 15, 100); // 왼팔
ctx.fillRect(150, 160, 70, 15);

ctx.fillRect(290, 150, 15, 200); // 오른팔

ctx.fillRect(240, 130, 20, 20); // 목
ctx.fillRect(220, 150, 60, 200); // 몸
ctx.fillRect(180, 150, 40, 30);
ctx.fillRect(280, 150, 30, 50);
ctx.arc(250, 80, 50, 0, 2 * Math.PI); // 머리
ctx.fill();

ctx.beginPath(); // 눈
ctx.fillStyle = "#fff";
ctx.arc(270, 80, 8, 1 * Math.PI, 2 * Math.PI);
ctx.arc(230, 80, 8, 1 * Math.PI, 2 * Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath(); // 입
ctx.fillStyle = "red";
ctx.arc(250, 90, 30, 0, 1 * Math.PI);
ctx.fill();
ctx.closePath();

ctx.beginPath(); // 다리
ctx.fillStyle = "#000";
ctx.fillRect(220, 350, 20, 250);
ctx.fillRect(260, 350, 20, 250);
ctx.fillRect(200, 580, 20, 20); // 발
ctx.fillRect(270, 580, 20, 20);
ctx.fill();
ctx.closePath();
*/


/*
****************
addEventListener
****************

ctx.lineWidth = 2

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
]

let x = 0;
let y = 0;

canvas.onmousemove = function (e) {
    ctx.beginPath()

    // ctx.moveTo(0, 0)
    ctx.moveTo(x, y)
    x = e.offsetX
    y = e.offsetY

    const color = colors[Math.floor(Math.random() * colors.length)]
    ctx.strokeStyle = color

    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}
*/


/*
****************
mousedown > mousemove > mouseup, mouseleave
****************/

const cw = 710
const ch = 710

let isPainting = false

function onMove(e) {
    if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()

        return
    }

    // 선 그을 때마다 새로운 Path
    // 선 굵기 변경할 때마다 다른 Path
    ctx.beginPath()

    ctx.moveTo(e.offsetX, e.offsetY)
}
function startPainting(e) {
    isPainting = true
}
function cancelPainting(e) {
    isPainting = false
    ctx.beginPath()
}

canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mouseup", cancelPainting)
canvas.addEventListener("mouseleave", cancelPainting)

canvas.addEventListener("touchmove", onMove)
canvas.addEventListener("touchstart", startPainting, false)
canvas.addEventListener("touchend", cancelPainting, false)
canvas.addEventListener("touchcancel", cancelPainting, false)


// line-width *******************************************
const lineWidth = document.getElementById("line-width")
ctx.lineWidth = lineWidth.value

function onLineWidthChange(e) {
    ctx.lineWidth = e.target.value
}

lineWidth.addEventListener("change", onLineWidthChange)


// color *******************************************
const color = document.getElementById("color")
const colorOptions = Array.from(
    document.getElementsByClassName("color-option") // HTMLCollection
)

function onColorChange(e) {
    ctx.strokeStyle = ctx.fillStyle = e.target.value
}
function onColorClick(e) {
    const colorValue = e.target.dataset.color
    // console.dir(colorValue)
    ctx.strokeStyle = ctx.fillStyle = color.value = colorValue
}

color.addEventListener("change", onColorChange)
colorOptions.forEach(color => color.addEventListener("click", onColorClick))


// fill *******************************************
const fillBtn = document.getElementById("fill-btn")

let isFilling = false
let filledColor = "white";

function onFillClick() {
    if (isFilling) {
        isFilling = false
    } else {
        isFilling = true
    }
}
function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, cw, ch)
        filledColor = ctx.fillStyle;

        isFilling = false
    }
}

fillBtn.addEventListener("click", onFillClick)
canvas.addEventListener("click", onCanvasClick)


// reset *******************************************
const resetBtn = document.getElementById("reset-btn")

function onResetClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, cw, ch)
}

resetBtn.addEventListener("click", onResetClick)


// erase *******************************************
const eraseBtn = document.getElementById("erase-btn")

function onEraseClick() {
    isFilling = false
    ctx.strokeStyle = filledColor
}

eraseBtn.addEventListener("click", onEraseClick)


// file *******************************************
const file = document.getElementById("file")

function onFileChange(e) {
    // console.dir(e.target.files)
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)

    const image = new Image() // == <img src"" /> on HTML
    image.src = url

    image.onload = function () {
        ctx.drawImage(image, 0, 0)
        fileInput.value = null
    } // onload event
}

file.addEventListener("change", onFileChange)


// text *******************************************
const textInput = document.getElementById("text")
const fontSelect = document.getElementById("fontSelect")
ctx.font = fontSelect.value

function onfontChange(e) {
    ctx.font = e.target.value
}
function onDoubleClick(e) {
    ctx.save()

    ctx.lineWidth = 1
    ctx.font = `${fontSelect.value} serif`

    const text = textInput.value
    ctx.fillText(text, e.offsetX, e.offsetY)

    ctx.restore()
}

canvas.addEventListener("dblclick", onDoubleClick)
fontSelect.addEventListener("change", onfontChange)


// save image *******************************************
const saveBtn = document.getElementById("save-btn")

function onSaveClick() {
    const url = canvas.toDataURL()

    const a = document.createElement("a")
    a.href = url
    a.download = "myDrawing.png"
    a.click()
}

saveBtn.addEventListener("click", onSaveClick)

