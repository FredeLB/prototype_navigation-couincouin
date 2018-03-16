						
$(document).ready(function(){
	
	//three.js
	
	
	//Scene
	var scene = new THREE.Scene();
	
	
	//Caméra
	var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
	
	camera.position.x = 10;
	camera.position.y = 5;
	camera.position.z = 15;
	camera.lookAt(scene.position);
	
	
	
	//Injecter dans mon HTML
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );	
	
	
	//UN CUBE BORDEL!!!!
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x921FC4, wireframe: true } );
	var cube = new THREE.Mesh( geometry, material );
	var _matrix = THREE.Matrix4();
	
	//Bouger!
	cube.position.set(0.5,0.5,0.5);
	
	
	//Ajouter à la scène
	//scene.add( cube );
	
	
	//Tentative de pivot (http://jafty.com/blog/tag/change-pivot-point-of-three-js-object/)
	
	var pivot = new THREE.Object3D();
	pivot.add( cube );
	scene.add( pivot );
	
	
	
	
	//ROTATION EN VA ET VIENT!!
	
	function vaEtVient(a, b, c){
		
		
		var antihoraire = 0.01;
		var horaire = -0.01;
		var test = compteurpivot.toFixed(3);
		console.log(test);
		
		
		
		if(flag===true && test<b){
		   	
		   	compteurpivot += antihoraire; 
			a.rotation.z += antihoraire;
		   
		}else if(flag===true && test>b){
			
			flag = false;
			
		}else if(flag===false && test < c){
			
			flag=true;
			
		}else if(flag===false){
			
			compteurpivot += horaire; 
			a.rotation.z += horaire;
			
		}
		
		
	}
	
	

	
	
	
	var flag = true;
	var compteurpivot = 0;
	
	//LOOP DE RENDU
	function animate() {
		
		
		requestAnimationFrame( animate );
		
		
		//Mettre une'tite rotation automatique
		//cube.rotation.y += 0.01;
		
		//vaEtVient(pivot,0.449, -1);
		
		
		renderer.render( scene, camera );
	
	}
	
	animate();
	
	
	
	var axesScene = new THREE.AxesHelper( 6 );
	var axesCube = new THREE.AxesHelper( 2 );
	scene.add( axesScene );
	pivot.add( axesCube );
	

	
	

});
