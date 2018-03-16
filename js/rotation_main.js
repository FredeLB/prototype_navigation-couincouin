						
$(document).ready(function(){
	
	//three.js
	
	
	//Scene
	var scene = new THREE.Scene();
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Caméra
	var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 10;
	camera.position.y = 10;
	camera.position.z = 15;
	camera.lookAt(scene.position);

	
	//Injecter la scène dans mon HTML
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );	
	
	
	
	
	
	// Example 1
	var geo = new THREE.BoxGeometry(5,5,20,32);
	_mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
	
	//Then in the render loop, we rotate it around the Z axis (the blue axis):

	scene.add(geo);   
	

	function animate() {
		
		
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		
		//Mettre une'tite rotation automatique
		;_mesh.rotation.z = 1;
	}
	
	animate();

	

	
	

});
