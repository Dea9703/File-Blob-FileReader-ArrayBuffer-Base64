const canvas = document.getElementById('canvasId')
const context = canvas.getContext('2d')
context.fillStyle = '#ff0000'
context.fillRect(0, 0, 200, 200)
const dataUrl = canvas.toDataURL()
console.log(dataUrl)