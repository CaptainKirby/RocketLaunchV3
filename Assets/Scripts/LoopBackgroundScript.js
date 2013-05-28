#pragma strict
var backgroundObj1 : GameObject;
var backgroundObj2 : GameObject;
var backgroundObj3 : GameObject;
var prevObjLocation : Vector3;
var prevObjMesh : Mesh;

var prevObjLocation2 : Vector3;
var prevObjMesh2 : Mesh;

var backgroundCount : int;
function Start () {
var screenStartPoint = Camera.main.ScreenToWorldPoint(Vector3(Screen.width,Screen.height,0));
Instantiate(backgroundObj1,Vector3(screenStartPoint.x - screenStartPoint.x,screenStartPoint.y - screenStartPoint.y, 10),Quaternion.identity);
}

function Update () {
var hit : RaycastHit;
var ray = Camera.main.ScreenPointToRay(Vector3( Screen.width / 2 , Screen.height+200, 0));
var ray2 = Camera.main.ScreenPointToRay(Vector3( Screen.width / 2 , Screen.height-100 - Screen.height-100, 0)); 
Debug.DrawRay(ray2.origin,ray2.direction* 100, Color.red); 
if(Physics.Raycast(ray.origin,ray.direction,hit,100)){
//	if(hit.collider.CompareTag("background")){
	prevObjLocation = hit.collider.transform.position;
//	prevObjMesh = hit.collider.GetComponent(MeshFilter).mesh;
	//hitting background
	
	}
	else{
	Debug.Log("not hitting");
//	var mesh = hit.collider.GetComponent(MeshFilter).mesh;
//	Debug.Log(prevObjMesh.bounds);
		Instantiate(backgroundObj1,Vector3(prevObjLocation.x, prevObjLocation.y +20,10),Quaternion.identity);
		Instantiate(backgroundObj2,Vector3(prevObjLocation.x, prevObjLocation.y +20,10),Quaternion.identity);
		Instantiate(backgroundObj3,Vector3(prevObjLocation.x, prevObjLocation.y +20,10),Quaternion.identity);
		backgroundCount += 1;
	}


if(Physics.Raycast(ray2.origin,ray2.direction,hit,100)){
//	if(hit.collider.CompareTag("background")){
	prevObjLocation2 = hit.collider.transform.position;
//	prevObjMesh = hit.collider.GetComponent(MeshFilter).mesh;
	//hitting background
	
	}
	else{
//	Debug.Log("not hitting");
//	var mesh = hit.collider.GetComponent(MeshFilter).mesh;
//	Debug.Log(prevObjMesh.bounds);
		Instantiate(backgroundObj1,Vector3(prevObjLocation2.x, prevObjLocation2.y -20,10),Quaternion.identity);
	}
}

//}