#pragma strict
var gasolineDecrease : float = 0.1;
var speedDecrease : float = 10;
var pointsDecrease : float = 10;
function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider){
	if(col.CompareTag("rocket")){
		Destroy(this.gameObject);
		var rScript = col.gameObject.GetComponent(RocketScript);
		if(StatesScript.goingUp){
//			if(rScript.speedUpMagnifier > rScript.baseSpeedUp + speedDecrease){
				
//			}

//			if(rScript.speedUpMagnifier < rScript.maxSpeedUp - speedIncrease){ 
//				rScript.speedUpMagnifier += speedIncrease;
//			}
//			if(rScript.gasoline < rScript.maxGas - gasolineIncrease){
//				rScript.gasoline += gasolineIncrease;
//				
//			}
			if(rScript.speedUpMagnifier > 0 + speedDecrease){
			rScript.speedUpMagnifier -= speedDecrease;
			}
			StatesScript.points -= pointsDecrease;
			StatesScript.health -= 1;
			
			
		}	
//		
		if(StatesScript.goingDown){
			if(rScript.speedDownMagnifier > rScript.maxSpeedDown - speedDecrease){
				rScript.speedDownMagnifier -= speedDecrease;
			}
		}
	}
	if(col.CompareTag("pickup")){
		Destroy(this.gameObject);
	}
	
}