#pragma strict
var baseSpeedUp : float;
var speedUpMagnifier : float = 5;
var speedDecreaseSpeed : float = 5.0;
var speedIncreaseSpeed : float = 5.0;
var maxSpeedUp : float = 25;
var speedBoost : float = 5;


var baseSpeedDown : float;
var speedDownMagnifier : float = 5;
var maxSpeedDown : float = 30;
var speedDownIncreaseSpeed : float = 5.0;

var liftOffMagnifier : float = 1.0;
var liftOffGain : float = 0.5;


//cam
var offsetX : float;
var smooth : float = 5.0;
var mousePos : Vector3;


//durations
var liftoffDuration : float = 5.0;
var postLiftoffDuration : float = 5.0;
var upDownTurnDuration : float = 5.0;


var test : boolean;
var rotating = false;
var rotationDone : boolean;



//gasbar
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2 = new Vector2(20,60);


var gasoline : float = 1;
var gasolineLossSpeed : float = 0.05;
var maxGas : float;

//explosion
static var contact : ContactPoint;
static var explode : boolean;

//touchstuffs
 var speed : float = 10.0;
 
 private var leftFingerPos : Vector2 = Vector2.zero;

private var leftFingerLastPos : Vector2 = Vector2.zero;

private var leftFingerMovedBy : Vector2 = Vector2.zero;

 

public var slideMagnitudeX : float = 0.0;

public var slideMagnitudeY : float = 0.0;

var tiltSpeed : float = 1; 
 
 
//swipe vars 

 var comfortZoneVerticalSwipe: float = 500; // the vertical swipe will have to be inside a 50 pixels horizontal boundary
var comfortZoneHorizontalSwipe: float = 500; // the horizontal swipe will have to be inside a 50 pixels vertical boundary
var minSwipeDistance: float = 1; // the swipe distance will have to be longer than this for it to be considered a swipe
//the following 4 variables are used in some cases that I don’t want my character to be allowed to move on the board (it’s a board game)
//var allowGoUp: boolean = true;
//var allowGoRight: boolean = true;
//var allowGoLeft: boolean = true;
//var allowGoDown: boolean = true; 
 var startTime: float;

var startPos: Vector2;
var minSwipeDist: float = 1;

var maxSwipeTime: float = 200;
var moving : boolean;
function Start () {
baseSpeedUp = speedUpMagnifier;
baseSpeedDown = speedDownMagnifier;
maxGas = gasoline;
}

function Update () {


//Debug.Log(StatesScript.upDown);
mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);


if(StatesScript.onGround){
	OnGroundBehaviour();
}
if(StatesScript.goingUp){
	GoingUpBehaviour();
}
if(StatesScript.goingDown){
	GoingDownBehaviour();
}

if(StatesScript.liftOff){
	LiftOffBehaviour();
}

if(StatesScript.postLiftOff){
	PostLiftOffBehaviour();
}

if(StatesScript.upDown){
	UpDownTransition();
}

}



function OnGroundBehaviour(){
	if(Input.anyKeyDown){
		StatesScript.onGround = false;
		StatesScript.liftOff = true;
	
	}
}

function GoingUpBehaviour(){
	if(speedUpMagnifier < baseSpeedUp){
		speedUpMagnifier += Time.deltaTime * speedIncreaseSpeed;
	}
	if(speedUpMagnifier > baseSpeedUp){
		speedUpMagnifier -= Time.deltaTime * speedDecreaseSpeed;
	
	}
	if(gasoline > 0){
		gasoline -= Time.deltaTime * gasolineLossSpeed;
	}
	else{
		StatesScript.goingUp = false;
		StatesScript.upDown = true;
	}
	CameraFollow.following = true;
	//move upwards!
	transform.position.y += Time.deltaTime * transform.up.y * speedUpMagnifier;
	
	//movement function
	MoveToSides();
	
//	if(gasoline <= 0){
	if(test){
		StatesScript.goingUp = false;
		StatesScript.upDown = true;
		test = false;
	
	}

}

function UpDownTransition(){
	if(!rotationDone){
		RotateAndCamMove(180, upDownTurnDuration);
	
	  
	}
	if(rotationDone){
		StatesScript.upDown = false;
		StatesScript.goingDown = true;
		rotating = false;
	}

//Debug.Log(Time.deltaTime * upDownTurnSpeed);
//	transform.rotation = Quaternion.Lerp(Quaternion.Euler(0,0,0), Quaternion.Euler(0,0,180), Time.deltaTime * upDownTurnSpeed);
//if(transform.rotation.z >= 185){
//	transform.rotation.z = 180;
//	StatesScript.goingDown = true;
//	StatesScript.upDown = false;
//}

}
 
function GoingDownBehaviour(){
	//move downwards!
	speedDownMagnifier += Time.deltaTime * speedDownIncreaseSpeed;
	transform.position.y -= Time.deltaTime * -transform.up.y * speedDownMagnifier;
	//movement function
	MoveToSides();


}

function LiftOffBehaviour(){
//	CameraFollow.following = true;
	transform.position.y += Time.deltaTime * transform.up.y * liftOffMagnifier;
	if(Input.GetMouseButtonDown(0)){
		liftOffMagnifier += liftOffGain;
	}
	yield WaitForSeconds(liftoffDuration);
	if(StatesScript.liftOff){
		StatesScript.liftOff = false;
		StatesScript.goingUp = true;

	}


}


function PostLiftOffBehaviour(){
//fade from liftoffmagnifier to speedupmagnifier
//transform.position.y += Time.deltaTime * transform.up.y * Mathf.Lerp(liftOffMagnifier,speedUpMagnifier,Time.deltaTime * postLiftoffDuration);
}

function MoveToSides(){
//if (Input.touchCount > 0 &&
//
//Input.GetTouch(0).phase == TouchPhase.Moved) {
//
// 
//
//// Get movement of the finger since last frame
//
//var touchDeltaPosition:Vector2 = Input.GetTouch(0).deltaPosition;
//
// 
//
//// Move object across XY plane
//
////transform.Translate (touchDeltaPosition.x * speed,0, 0);
//transform.position.x = Mathf.Lerp(transform.position.x, touchDeltaPosition.x, Time.deltaTime * speed);
//
//}

 
var distance : float = Mathf.Abs((Input.mousePosition - Camera.main.WorldToScreenPoint(transform.position)).x);
//    var distance : float = (Input.mousePosition - Camera.main.WorldToScreenPoint(transform.position)).magnitude;
distance = distance / 20;
Debug.Log(distance);

SwipeDetect();

var dir : Vector3 = Vector3.zero;
 
    dir.x = -Input.acceleration.y*tiltSpeed;
 
    transform.position.x += dir.x;
//
if(Input.GetMouseButton(0)){ 
//if(StatesScript.goingUp){
// var translationUp : float = Input.GetAxis ("Mouse X");// * speed;
//   translationUp *= Time.deltaTime;
//   transform.Translate (translationUp, 0, 0);
//   
//}
//if(StatesScript.goingDown){
//	var translationDown : float = -Input.GetAxis ("Mouse X");// * speed;
//   translationDown *= Time.deltaTime;
//   transform.Translate (translationDown, 0, 0);
//
//}
transform.position.x = Mathf.Lerp(transform.position.x, mousePos.x+offsetX, Time.deltaTime * smooth / distance );
}
//transform.position.x += slideMagnitudeX * speed;
//DebugConsole.Log("slideMagnitude:"+ slideMagnitudeX);
//if (Input.touchCount == 1) 
//
//    {
//
//        var touch : Touch = Input.GetTouch(0);
//
//        
//
//        if (touch.phase == TouchPhase.Began)
//
//        {
//
//            leftFingerPos = Vector2.zero;
//
//            leftFingerLastPos = Vector2.zero;
//
//            leftFingerMovedBy = Vector2.zero;
//
//            
//
//            slideMagnitudeX = 0;
//
//            slideMagnitudeY = 0;
//
//            
//
//            // record start position
//
//            leftFingerPos = touch.position;
//
//            
//
//        }
//
//        
//
//        else if (touch.phase == TouchPhase.Moved)
//
//        {
//
//            leftFingerMovedBy = touch.position - leftFingerPos; // or Touch.deltaPosition : Vector2 
//
//                                                                // The position delta since last change.
//
//            leftFingerLastPos = leftFingerPos;
//
//            leftFingerPos = touch.position;
//
//            
//
//            // slide horz
//
//            slideMagnitudeX = leftFingerMovedBy.x / Screen.width;
//
//            
//
//            // slide vert
//
//            slideMagnitudeY = leftFingerMovedBy.y / Screen.height;
//
//            
//
//        }
//
//        
//
//        else if (touch.phase == TouchPhase.Stationary)
//
//        {
//
//            leftFingerLastPos = leftFingerPos;
//
//            leftFingerPos = touch.position;
//
//            
//
//            slideMagnitudeX = 0.0;
//
//            slideMagnitudeY = 0.0;
//
//        }
//
//        
//
//        else if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled)
//
//        {
//
//            slideMagnitudeX = 0.0;
//
//            slideMagnitudeY = 0.0;
//
//        }
//
//    }
}

function RotateAndCamMove(angle: float, duration: float){
  // don't start another rotation while the previous has not ended
  if (rotating) return;
  rotating = true; // set the flag to block other RotateZ calls
  var oldRot = transform.rotation;
  // calculate the new rotation - current rotation * desired rotation:
    var cam = GameObject.Find("Main Camera");
  var camFollow = cam.GetComponent(CameraFollow);
  var newRot = Quaternion.Euler(0, 0, angle) * oldRot;
  var t: float = 0; // t is the control variable
  while (t < 1){
    t += Time.deltaTime/duration;
    transform.rotation = Quaternion.Slerp(oldRot, newRot, t);
	cam.GetComponent(CameraFollow).offsetY = Mathf.Lerp(cam.GetComponent(CameraFollow).offsetYUp,cam.GetComponent(CameraFollow).offsetYDown,t);
    yield; // return and resume here next frame

  }

//  rotating = false; // rotation ended; //makes it continue forever?!?!
  if(t>1.0){
  	rotationDone = true;
  }
  

}

function OnGUI()
{

//    // draw the background:
GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y * gasoline),progressBarEmpty);
//        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);

        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x , size.y),progressBarFull);
//            GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();

    GUI.EndGroup ();
 
} 


function OnTriggerEnter(col : Collider){
	if(col.gameObject.CompareTag("ground")){
//		renderer.material.color.a = 0;
//		contact = col.contacts[0];
//		collider.isTrigger = true;
//		explode = true;
		Destroy(this.gameObject);
		
//		StatesScript.goingDown = false;
//		StatesScript.goingUp = false;
		StatesScript.restart = true;
		StatesScript.goingDown = false;
	}

}

function SwipeDetect(){
//DebugConsole.Log("test");
if (Input.touchCount >0) {
var touch = Input.touches[0];

switch (touch.phase) { //following are 2 cases
case TouchPhase.Began: //here begins the 1st case
startPos = touch.position;
startTime = Time.time;

break; //here ends the 1st case



case TouchPhase.Ended: //here begins the 2nd case
var swipeTime = Time.time - startTime;
var swipeDist = (touch.position - startPos).magnitude;
var endPos = touch.position;
//DebugConsole.Log("SwipeDist:"+swipeDist);
//DebugConsole.Log("SwipeTime:"+swipeTime);
//DebugConsole.Log("sign:"+ Mathf.Sign(touch.position.y - startPos.y));
//DebugConsole.Log("comfortzoneVertical"+Mathf.Abs(touch.position.x - startPos.x));
if ((Mathf.Abs(touch.position.x - startPos.x))<comfortZoneVerticalSwipe && (swipeTime < maxSwipeTime) && (swipeDist > minSwipeDistance) && Mathf.Sign(touch.position.y - startPos.y)>0 )//  && transform.position.z<3
{
//... then go up
//moving=true;
//[code here, to make character move the way you want (upwards)]
speedUpMagnifier += speedBoost;
DebugConsole.Log("swipe up!");
}


if ((Mathf.Abs(touch.position.x - startPos.x))<comfortZoneVerticalSwipe && (swipeTime < maxSwipeTime) && (swipeDist > minSwipeDistance) && Mathf.Sign(touch.position.y - startPos.y)<0)
{
//... then go down

//[code here, to make character move the way you want (downwards)]
DebugConsole.Log("swipe down!");
}


if ((Mathf.Abs(touch.position.y - startPos.y))<comfortZoneHorizontalSwipe && (swipeTime < maxSwipeTime) && (swipeDist > minSwipeDistance) && Mathf.Sign(touch.position.x - startPos.x)<0)
{
//... then go left

//[code here, to make character move the way you want (to the left)]	
DebugConsole.Log("swipe left!");
}

if ((Mathf.Abs(touch.position.y - startPos.y))<comfortZoneHorizontalSwipe && (swipeTime < maxSwipeTime) && (swipeDist > minSwipeDistance) && Mathf.Sign(touch.position.x - startPos.x)>0)
{
//...then go right

//[code here, to make character move the way you want (to the right)]	
DebugConsole.Log("swipe right!");
}
break;	 //here ends the 2nd case

}


}
} 
