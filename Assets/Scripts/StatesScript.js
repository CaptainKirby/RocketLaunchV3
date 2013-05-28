#pragma strict
static var restart : boolean;

static var goingUp : boolean;
static var goingDown : boolean;
static var onGround : boolean;
static var liftOff : boolean;
static var postLiftOff : boolean;
static var upDown : boolean;

static var overallTimer : float;

static var points : float;
static var pointsInt : float;

static var health : int = 3;

function Start () {
onGround = true;
}

function Update () {
if(goingUp || goingDown){
points += Time.deltaTime * 1;
}
pointsInt = Mathf.FloorToInt(points);
	if(goingUp || goingDown){
		overallTimer += Time.deltaTime * 1;
	}
	
	
if(health == 0){
		goingUp = false;
		upDown = true;

}

	if(restart){
		Restart();
	}
}

function OnGUI(){
GUI.Label (Rect (Screen.width - 65, 10, 100, 20), "Points:"+pointsInt);
GUI.Label (Rect (Screen.width - 55, Screen.height -20, 100, 20), "Health:"+health);
}

function Restart(){
		yield WaitForSeconds(3.0);
		Application.LoadLevel(0);
		restart = false;
		goingDown = false;
		goingUp = false;
		onGround = true;
		liftOff = false;
		health = 3;
		points = 0;
		pointsInt = 0;
		upDown = false;
		overallTimer = 0;
		
		var cam = GameObject.Find("Main Camera");
  		var camFollow = cam.GetComponent(CameraFollow);
  		camFollow.offsetY = camFollow.offsetYUp;

}