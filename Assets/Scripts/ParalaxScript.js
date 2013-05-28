#pragma strict
var speed : float = 5;
function Start () {

}

function Update () {
if(StatesScript.goingUp){
transform.position.y += speed * Time.deltaTime;
}
if(StatesScript.goingDown){
transform.position.y -= speed * Time.deltaTime;
}

}