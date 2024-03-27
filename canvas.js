
const canvas = document.getElementById("canvas");
const reset = document.getElementById("reset");

canvas.width = window.innerWidth - 500;
canvas.height = window.innerHeight - 200;

const c = canvas.getContext("2d");

let circleFillStyles = ["#ffea00","#3356ff", "#ec4040", "#70e000"];
let circleStrokeStyles = ["#ffc300","#0d47a1", "#bb0000", "#38b000"];

let dummyCircleFillStyles = ["#ffea00","#3356ff", "#ec4040", "#70e000"];
let dummyCircleStrokeStyles = ["#ffc300","#0d47a1", "#bb0000", "#38b000"];

let arrowFillStyles = ["#ffea00","#3356ff", "#ec4040", "#70e000"];
let arrowStrokeStyles = ["#ffc300","#0d47a1", "#bb0000", "#38b000"];

let circles = [{ x: 150, y: 105 }, { x: 150, y: 210 }, { x: 150, y: 315 }, { x: 150, y: 420 }];
let arrows = [{x:800, y:105}, {x:800, y:210}, {x:800, y:315}, {x:800, y:420}];

let arrowTouchCircle = [false, false, false, false];

// draw circle
function drawCircle(){

    
    for(let i=0; i<4; i++)
    {
        // circles
        c.beginPath();
        c.arc(circles[i].x, circles[i].y, 35, 0, 2*Math.PI, true);
        c.fillStyle = circleFillStyles[i];
        c.fill();
        c.strokeStyle = circleStrokeStyles[i];
        c.lineWidth = 3;
        c.stroke();
        c.closePath();
    }
}
    
// draw arrow
function drawArrow(){
    for(let i=0; i<4; i++){
        // arrows
        c.beginPath();
        c.moveTo(arrows[i].x, arrows[i].y);
        c.lineTo(arrows[i].x+30, arrows[i].y-20);
        c.lineTo(arrows[i].x+30, arrows[i].y-6);
        c.lineTo(arrows[i].x+80, arrows[i].y-6);
        c.lineTo(arrows[i].x+80, arrows[i].y+6);
        c.lineTo(arrows[i].x+30, arrows[i].y+6);
        c.lineTo(arrows[i].x+30, arrows[i].y+20);
        c.lineTo(arrows[i].x, arrows[i].y);
        c.strokeStyle = arrowStrokeStyles[i];
        c.lineWidth = 3;
        c.stroke();
        c.fillStyle = arrowFillStyles[i];
        c.fill();
        c.closePath();
    }

}
    

// initial sketch
drawCircle();
drawArrow()

function animate(idx, width, height){

    if(arrowTouchCircle[idx]){
        if(arrows[idx].x >= 800)
        {
            c.clearRect(0, 0, width, height);
            circleFillStyles[idx] = dummyCircleFillStyles[idx];;
            circleStrokeStyles[idx] = dummyCircleStrokeStyles[idx];
            drawCircle();
            drawArrow();
            arrowTouchCircle[idx] = !arrowTouchCircle[idx];
            return;
        }
    }
    else
    {
        if(arrows[idx].x < 185)
        {
            c.clearRect(0, 0, width, height);
            circleFillStyles[idx] = "#ccc";
            circleStrokeStyles[idx] = "#666";
            drawCircle();
            drawArrow();
            arrowTouchCircle[idx] = !arrowTouchCircle[idx];
            return;
        }

    }

    c.clearRect(0, 0, width, height);

    const dx = 4;
    if(arrowTouchCircle[idx]){
        arrows[idx].x += dx;
    }else{
        arrows[idx].x -= dx;
    }

    drawCircle();
    drawArrow();
    

    setTimeout(()=>{
        requestAnimationFrame(animate(idx, width, height));
    }, 5);
}


canvas.addEventListener("click", (eve)=>{
    const box = canvas.getBoundingClientRect();
    console.log(box);
    const clickX = eve.clientX - box.left;
    const clickY = eve.clientY - box.top;
    // console.log(clickX + " " + clickY);
    
    for(let i=0; i<4; i++)
    {
        
        const length = Math.sqrt( (clickX - circles[i].x)**2 + (clickY - circles[i].y)**2 );
        // console.log(length);

        if(length < 35)
        {
            animate(i, box.width, box.height);
        }
    }    
})

reset.addEventListener("click", ()=>{   
    const box = canvas.getBoundingClientRect();
    console.log(box);

    circleFillStyles = ["#ffea00","#3356ff", "#ec4040", "#70e000"];
    circleStrokeStyles = ["#ffc300","#0d47a1", "#bb0000", "#38b000"];

    circles = [{ x: 150, y: 105 }, { x: 150, y: 210 }, { x: 150, y: 315 }, { x: 150, y: 420 }];
    arrows = [{x:800, y:105}, {x:800, y:210}, {x:800, y:315}, {x:800, y:420}];

    arrowTouchCircle = [false, false, false, false];

    c.clearRect(0, 0, box.width, box.height);
    drawCircle();
    drawArrow();
})
