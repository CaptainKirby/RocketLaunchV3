#pragma strict
var gasolineIncrease : float = 0.1;
var speedIncrease : float = 10;
var pointIncrease : float = 10;
var speedDecrease : float = 10;
function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider){
	if(col.CompareTag("rocket")){
		Destroy(this.gameObject);
		var rScript = col.gameObject.GetComponent(RocketScript);
		if(StatesScript.goingUp){
			StatesScript.points += pointIncrease;
			if(rScript.speedUpMagnifier < rScript.maxSpeedUp - speedIncrease){ 
				rScript.speedUpMagnifier += speedIncrease;
			}
			if(rScript.gasoline < rScript.maxGas - gasolineIncrease){
				rScript.gasoline += gasolineIncrease;
				
			}
		}	
		
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