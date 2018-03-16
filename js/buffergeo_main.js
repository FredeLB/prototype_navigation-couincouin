						
$(document).ready(function(){
	
	//three.js
	
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
	camera.position.set(0, 0, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var scene = new THREE.Scene();
	
	var MAX_POINTS = 500;

	// geometry
	var geometry = new THREE.BufferGeometry();

	// attributes
	var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

	// draw range
	var drawCount = 2; // draw the first 2 points, only
	geometry.setDrawRange( 0, drawCount );

	// material
	var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );

	// line
	var line = new THREE.Line( geometry,  material );
	scene.add( line );

	var positions = line.geometry.attributes.position.array;

	var x, y, z, index;
	x = y = z = index = 0;

	for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {

		positions[ index ++ ] = x;
		positions[ index ++ ] = y;
		positions[ index ++ ] = z;

		x += ( Math.random() - 0.5 ) * 30;
		y += ( Math.random() - 0.5 ) * 30;
		z += ( Math.random() - 0.5 ) * 30;

	}
	
	line.geometry.setDrawRange( 0, newValue );
	line.geometry.attributes.position.needsUpdate = true; // required after the first render

});
