#pragma strict
var rocketObj : GameObject;
var smooth : float = 5.0;
static var following : boolean;

//var offsetX : float;
var offsetY : float;
var offsetYUp : float;
var offsetYDown : float;
var offsetLiftoff : float;
function Start () {
rocketObj = GameObject.Find("Rocket");
//following = true;
//offsetY = offsetLiftoff;
}

//function Update () {
//
//}

function Update(){
//    transform.position = Vector3.Lerp (
//        transform.position, playerPlane.transform.position,
//        Time.deltaTime * smooth);
if(rocketObj){
if(following){
//transform.position.x = Mathf.Lerp(transform.position.x, playerPlane.transform.position.x, Time.deltaTime * smooth);
transform.position.y = Mathf.Lerp(transform.position.y, rocketObj.transform.position.y+offsetY, Time.deltaTime * smooth);
//Camera.main.orthographicSize = Mathf.Lerp(Camera.main.orthographicSize, 5, Time.deltaTime * smooth);
//if(Camera.main.orthographicSize
}
if(!following){
transform.position.y = Mathf.Lerp(transform.position.y, rocketObj.transform.position.y + offsetLiftoff, Time.deltaTime * smooth);


}
}

}