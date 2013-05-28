#pragma strict
var spawnCube : GameObject;

//pickup Good
var frequency : float = 1.0;
var freqTimer : float;
var freqTimerEnd : float = 2.0;
var pickupObj : GameObject;
var simSpawn : float = 2;
var freqChangingPoints : float[];
var freqChangingAmount : float[];

//pickup Bad
var frequencyBad : float = 1.0;
var freqTimerBad : float;
var pickupObjBad : GameObject;
var simSpawnBad : float = 2;
var freqChangingPointsBad: float[];
var freqChangingAmountBad : float[];

function Start () {
spawnCube = GameObject.Find("SpawnCube");
}

function Update () {
	ChangePoints();
	if(StatesScript.goingUp){
		SpawnUpGood();

	}
}

function SpawnUpGood(){
	freqTimer += Time.deltaTime * frequency;
	
	freqTimerBad += Time.deltaTime * frequencyBad;
	
	
	if(freqTimer>= freqTimerEnd){
		for (var i : int = 0;i < simSpawn; i++) {
			Instantiate(pickupObj,Vector3(Random.Range(spawnCube.transform.position.x -4.5,spawnCube.transform.position.x +4.5),Random.Range(spawnCube.transform.position.y -3,spawnCube.transform.position.y +3),0), Quaternion.identity);
		}
		freqTimer = 0;
	}
	
	if(freqTimerBad>= freqTimerEnd){
		for (var ib : int = 0;ib < simSpawnBad; ib++) {
			Instantiate(pickupObjBad,Vector3(Random.Range(spawnCube.transform.position.x -4.5,spawnCube.transform.position.x +4.5),Random.Range(spawnCube.transform.position.y -3,spawnCube.transform.position.y +3),0), Quaternion.identity);
		}
		freqTimerBad = 0;
	}

}

function ChangePoints(){
//	for (var f : float in freqChangingPoints){
//		
//	}
	for(var f : int = 0; f < freqChangingPoints.Length; f++){
		if(freqChangingPoints[f] <= StatesScript.overallTimer){
			frequency = freqChangingAmount[f];
		}
//		var place : int = f;
//		Debug.Log(freqChangingAmount[place]);
//		Debug.Log("The element in index " + f + " is " + freqChangingPoints[f]);
//		freqChangingAmount[f]
	
	}
	
		for(var fb : int = 0; fb < freqChangingPointsBad.Length; fb++){
		if(freqChangingPointsBad[fb] <= StatesScript.overallTimer){
			frequencyBad = freqChangingAmountBad[fb];
		}

	}
}
