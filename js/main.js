						
$(document).ready(function(){
	
	//three.js
	
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	
	
	//Injecter la scene dans un div
	var divCouincouin = document.getElementById("couincouin");
	document.body.appendChild( divCouincouin );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	divCouincouin.appendChild(renderer.domElement);
	
	//document.body.appendChild( renderer.domElement );
	//$("canvas").wrap("<div></div");
	//$("canvas").parent().attr("id", "couincouin");
	
	//Scene
	var scene = new THREE.Scene();
	
	
	
	//TEST CLIQUABLE!!
	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var danslazone = false;
	

	

	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Caméra
	var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 20;
	camera.position.y = 15;
	camera.position.z = 15;
	camera.lookAt(scene.position);
	
	
	
	//CONTROLS
	
	//var controls = new THREE.OrbitControls( camera );
	
	//controls.update() must be called after any manual changes to the camera's transform
	//controls.update();
	
	
	
	
	
	//Créer mon efhweihrggone (octaèdre)
	
	//Créer l'objet de base
	var octahedron = new THREE.OctahedronGeometry();

	
	
	
	//Couleurs
	var color1 = new THREE.MeshBasicMaterial( { color: 0xBD2325, wireframe: true } );
	var color2 = new THREE.MeshBasicMaterial( { color: 0x153AC7, wireframe: true } );
	var color3 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var color4 = new THREE.MeshBasicMaterial( { color: 0xF0E812, wireframe: true } );
	
	
	
	
	//Assigner couleurs
	var octa1 = new THREE.Mesh( octahedron, color1 );
	var octa2 = new THREE.Mesh( octahedron, color2 );
	var octa3 = new THREE.Mesh( octahedron, color3 );
	var octa4 = new THREE.Mesh( octahedron, color4 );
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Positions
	octa1.position.set(1,0,0);
	octa2.position.set(-1,0,0);
	octa3.position.set(0,0,1);
	octa4.position.set(0,0,-1);
	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Créer des mesh qui serviront de point de pivot!

	var pivot1 = new THREE.Object3D();
	pivot1.id = "pivot";
	pivot1.add( octa1 );
	var pivot2 = new THREE.Object3D();
	pivot2.add( octa2 );
	var pivot3 = new THREE.Object3D();
	pivot3.add( octa3 );
	var pivot4 = new THREE.Object3D();
	pivot4.add( octa4 );
	
	
	
	
	
	//Ajouter les mesh qui contiennent les objets à la scène
	scene.add( pivot1 );
	scene.add( pivot2 );
	scene.add( pivot3 );
	scene.add( pivot4 );
	
	
	
	
	
	//Position couincouin fermé!
/*	pivot1.rotation.z = (Math.PI/4).toFixed(3);
	pivot2.rotation.z = -(Math.PI/4).toFixed(3);
	pivot3.rotation.x = -(Math.PI/4).toFixed(3);
	pivot4.rotation.x = (Math.PI/4).toFixed(3);	*/
	
	
	
	
	//Position couincouin fermé à moitié 1
	
	//ROUGE
/*	pivot1.rotation.x = -(Math.PI/8);
	pivot1.rotation.z = (Math.PI/7);
	
	//BLEU
	pivot2.rotation.x = (Math.PI/7);
	pivot2.rotation.z = -(Math.PI/8);
	
	//VERT
	pivot3.rotation.x = -(Math.PI/8);
	pivot3.rotation.z = (Math.PI/7);
	
	//JAUNE
	pivot4.rotation.x = (Math.PI/8);		
	pivot4.rotation.z = -(Math.PI/7);	*/
	
	
	
	//Position couincouin fermé à moitié 2
/*	
	//ROUGE
	pivot1.rotation.x = (Math.PI/8);
	pivot1.rotation.z = (Math.PI/7);
	
	//BLEU
	pivot2.rotation.x = -(Math.PI/7);
	pivot2.rotation.z = -(Math.PI/8);
	
	//VERT
	pivot3.rotation.x = -(Math.PI/8);
	pivot3.rotation.z = -(Math.PI/7);
	
	//JAUNE
	pivot4.rotation.x = (Math.PI/8);		
	pivot4.rotation.z = (Math.PI/7);	*/	
	
	
	
	
	//Fonction pour convertir le nom de l'objet en chiffre
	
	function trouverIndex(a){
		
		var id = a.id;
		var index = 0;
		
		for(var i = 0; i<flagsPivots.length; i++){
			
			if (id === flagsPivots[i].id ){
				
				index = i;
				
			}	
			
		}
		
		return index;
		
	}
	
	
	
	
	function rotation(a, b, c, v){
		
		var sens;
		
		if(c === "moins"){
			
			sens = -(v);
			
		}else{
			
			sens = v;	
		}
		
		if(b === "x"){
			
			a.rotation.x += sens;
			
		}else if(b === "y"){
			
			a.rotation.y += sens;
			
		}else if(b === "z"){
			
			a.rotation.z += sens; 
			
		}
		
	}
	
	
	
	
	//Animation en loop!!!
	
	var flagsPivots = [
		
		{id: pivot1.id, flag: true, compteur: 0},
		{id: pivot2.id, flag: true, compteur: 0},
		{id: pivot3.id, flag: true, compteur: 0},
		{id: pivot4.id, flag: true, compteur: 0}	
		
	];
	

		
	function vaEtVient(a, b, c, d, v){
		
		var obj = a;
		var plus = v;
		var moins = -(v);
		var axe = d;
		var lim1 = b;
		var lim2 = c;
		
		// à faire!!!
		var flagAnim = flagsPivots[trouverIndex(obj)].flag;
		var compteurAnim = flagsPivots[trouverIndex(obj)].compteur;
		
		
		if(lim1>lim2){
			
			if(flagAnim === true){

				if(compteurAnim < lim1){

					compteurAnim += plus; 
					rotation(obj, axe, "plus", v);

				}else if(compteurAnim > lim1){

					flagAnim = false;
					compteurAnim = lim1;

				}

			}else{

				if(compteurAnim > lim2){

					compteurAnim += moins; 
					rotation(obj, axe, "moins", v);

				}else if(compteurAnim < lim2){

					flagAnim = true;
					compteurAnim = lim2;

				}
				
			}
			
		}else{
			
			
			if(flagAnim === true){

				if(compteurAnim > lim1){

					compteurAnim += moins; 
					rotation(obj, axe, "moins", v);

				}else if(compteurAnim < lim1){

					flagAnim = false;
					compteurAnim = lim1;

				}

			}else{

				if(compteurAnim < lim2){

					compteurAnim += plus; 
					rotation(obj, axe, "plus", v);

				}else if(compteurAnim > lim2){

					flagAnim = true;
					compteurAnim = lim2;

				}
				
			}
			
			
			
		}

		
		flagsPivots[trouverIndex(obj)].flag = flagAnim;
		flagsPivots[trouverIndex(obj)].compteur = compteurAnim;
		
	}

	
	
	
	
	
	//Pour s'adapter quand la fenêtre rapetisse/s'aggrandit
	
	function onWindowResize() {
		
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		
	}

	
	

	//Pour m'enligner avec les clic/touch
		
	
	function dansLaZone(event){
		
		console.log(event);
		console.log(danslazone);
		
	}
	
	function onMouseMove(event){
		
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
		
	}
	
	
	
	


	
	
	
//""""""""""""""""""""""""""""""" LOOP DE RENDU """""""""""""""""""""""""""""""""""""""
	

	
	
	function animate(){
		
		requestAnimationFrame(animate);
		
/*		var vitesseAnim = 0.009;
		
		vaEtVient(pivot1, 0.5, 0, "z", vitesseAnim);
		vaEtVient(pivot2, -0.5, 0, "z", vitesseAnim);
		vaEtVient(pivot3, -0.5, 0, "x", vitesseAnim);
		vaEtVient(pivot4, 0.5, 0, "x", vitesseAnim);*/
		
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( scene.children );
		danslazone = intersects.length > 0;
		//console.log(danslazone);

		for ( var i = 0; i < intersects.length; i++ ) {

			

		}

		
		renderer.render(scene, camera);
		
	
		
	}
	
//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
	
	
	
	
	
	
	
	
//========== CENTRE D'APPELS BONJPOUR/HI ===============
	
	animate();
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener("click", dansLaZone, false);
	document.addEventListener("touchstart", dansLaZone, false);
	document.addEventListener( 'mousemove', onMouseMove, false );
	
	
	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	
	var axesScene = new THREE.AxesHelper( 6 );
	//var axesOcta1 = new THREE.AxesHelper( 4 );
	scene.add( axesScene );
	//pivot1.add( axesOcta1 );
	
	
	
	//Zone de tests


	
	
	
	

});
