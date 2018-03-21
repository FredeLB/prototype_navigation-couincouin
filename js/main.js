						
$(document).ready(function(){
	
	//three.js
	
	
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	
	
	//Injecter la scene dans un div
	var divCouincouin = document.getElementById("couincouin");
	document.body.appendChild( divCouincouin );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	divCouincouin.appendChild(renderer.domElement);

	
	//Scene
	var scene = new THREE.Scene();
	var couleurBG = new THREE.Color( 0xffffff );
	scene.background = couleurBG;
	//scene.fog = new THREE.Fog( 0x000000, 1 );
	
	
	//		LUMIIÈRE

	var pointLight = new THREE.PointLight( 0xffffff, 4, 50 );
	pointLight.position.set( 1, 5, 1 );
	scene.add( pointLight );

	
	
	

	
	
	// 		TOUT CE QUI TOUCHE AU CLIQUABLE!!
	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();
	var danslazone = false;
	var nomObjetTouche;
	var faceTouchee;
	var nbrClics = 0;
	var flagAnimationCouinCouin = false;
	var premiersClics = 0;
	var flagInteractivite = false;
	
	//----La position x du pivot1
	var reperesAnim = [-(Math.PI/8), (Math.PI/8)];
	
	
	var facesInteractives = [
		
		//	P0 - À propos
		[
			{obj: "octa1", face: 7}, 
			{obj: "octa3", face: 3}
		],
		
		//	P1 - COMPÉTENCES
		[
			{obj: "octa2", face: 3}, 
			{obj: "octa4", face: 7}
		],
		
		//	P2 - PROJETS
		[
			{obj: "octa2", face: 0}, 
			{obj: "octa3", face: 4}
		],
		
		//	P3 - Contact
		[
			{obj: "octa4", face: 0}, 
			{obj: "octa1", face: 4}
		]
		
	];
	

	

	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Caméra
	var camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = 20;
	camera.position.y = 15;
	camera.position.z = 10;
	camera.lookAt(scene.position);
	
	
	
	//CONTROLS
	
	var controls = new THREE.OrbitControls( camera );
	controls.enableZoom = false;
	controls.autoRotate = true;
	controls.maxPolarAngle = Math.PI/3;
	controls.rotateSpeed = 0.4;
	
	
	
	
	
	
	//Créer mon efhweihrggone (octaèdre)
	
	//Créer l'objet de base
	var octahedron = new THREE.OctahedronGeometry();
	
	for ( var i = 0, l = octahedron.faces.length; i < l; i ++ ) {

		var face = octahedron.faces[ i ];
		face.materialIndex = i;

	}
	
	octahedron.sortFacesByMaterialIndex();

	
	var couleurBase = 0x36302A;
	
	//MATERIALS
	
	var materials = [];
	
	
	materials.push(new THREE.MeshStandardMaterial({color: couleurBase, metalness: 1, emissive: 0x3B342B})); 
	materials.push(new THREE.MeshBasicMaterial({color: 0xA31215})); 
	
	
	
	//Assigner couleurs
	var octa1 = new THREE.Mesh( octahedron, materials[0] );
	var octa2 = new THREE.Mesh( octahedron, materials[0] );
	var octa3 = new THREE.Mesh( octahedron, materials[0] );
	var octa4 = new THREE.Mesh( octahedron, materials[0] );
	octa1.name = "octa1";
	octa2.name = "octa2";
	octa3.name = "octa3";
	octa4.name = "octa4";
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Positions
	octa1.position.set(1,0,0);
	octa2.position.set(-1,0,0);
	octa3.position.set(0,0,1);
	octa4.position.set(0,0,-1);
	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	//Créer des mesh qui serviront de point de pivot!

	var pivot1 = new THREE.Object3D();
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
	
	
	
	
	
	//	INDICATEURS LUMINEUX

	
	var sphere = new THREE.SphereGeometry( 0.05, 16, 8 );


	var lumierep0 = new THREE.PointLight( 0x8F220E, 0.5, 1, 2);
	lumierep0.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x8F220E, transparent: true, opacity: 0.7  } ) ) );
	lumierep0.position.x = 0.5;
	lumierep0.position.y = 0.75;
	lumierep0.position.z = 0.5;
	scene.add( lumierep0 );


	var lumierep1 = new THREE.PointLight( 0x00D7AB, 0.5, 1, 2);
	lumierep1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00D7AB, transparent: true, opacity: 0.7  } ) ) );
	lumierep1.position.x = -0.5;
	lumierep1.position.y = 0.75;
	lumierep1.position.z = -0.5;
	scene.add( lumierep1 );


	var lumierep2 = new THREE.PointLight( 0xC5C40D, 0.5, 1, 2);
	lumierep2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xC5C40D, transparent: true, opacity: 0.7  } ) ) );
	lumierep2.position.x = -0.5;
	lumierep2.position.y = 0.75;
	lumierep2.position.z = 0.5;
	scene.add( lumierep2 );


	var lumierep3 = new THREE.PointLight( 0xC50CD0, 0.5, 1, 2);
	lumierep3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xC50CD0, transparent: true, opacity: 0.7  } ) ) );
	lumierep3.position.x = 0.5;
	lumierep3.position.y = 0.75;
	lumierep3.position.z = -0.5;
	scene.add( lumierep3 );
	
	
	
	
	

	

	
	
	//Pour s'adapter quand la fenêtre rapetisse/s'aggrandit
	
	function onWindowResize() {
		
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		
	}

	
	

	//Pour m'enligner avec les clic/touch
		
	
	function funcDansLaZone(event){
		
		if(flagInteractivite===true){
		
		/*	console.log(event);
			//console.log(danslazone);
			console.log("Id de l'objet: " + nomObjetTouche);
			console.log("Face touchée: " + faceTouchee);
			console.log("Lien cliqué = " + identifierLien(nomObjetTouche, faceTouchee));*/



			if((identifierLien(nomObjetTouche, faceTouchee)===null)===false){

				$('#modalTest .modal-body').html("Bienvenue sur la page " + identifierLien(nomObjetTouche, faceTouchee));
				$('#modalTest').modal('toggle');

			}
		}
	}
	
	
	function onMouseMove(event){
		
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
		
	}
	
	
	
	
	//		Matcher les faces avec les pages qu'elles ouvrent
	
	function identifierLien(objet, face){
		
		var faceA = {};
		var lien = null;
		
		faceA.obj = objet;
		faceA.face = face;
				
		for(var i=0; i<facesInteractives.length; i++){
			
			var match = false;
			var page = facesInteractives[i];
						
			for(var j=0; j<2; j++){
				
				var faceB = page[j];
				match = (faceB.face === faceA.face && faceB.obj === faceA.obj);
								
				if(match===true){
					
					lien = i;
					
				}
			}
		}
		
		return lien;
	}
	
	
	function setPosition1(){
		
		//ROUGE
		pivot1.rotation.x = -(Math.PI/8);
		pivot1.rotation.z = (Math.PI/7);

		//BLEU
		pivot2.rotation.x = (Math.PI/7);
		pivot2.rotation.z = -(Math.PI/8);

		//VERT
		pivot3.rotation.x = -(Math.PI/8);
		pivot3.rotation.z = (Math.PI/7);

		//JAUNE
		pivot4.rotation.x = (Math.PI/8);		
		pivot4.rotation.z = -(Math.PI/7);
		
	}
	
	function setPosition2(){
		
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
		pivot4.rotation.z = (Math.PI/7);		
		
	}
	
	
	

	function animCouicouin(v){
		
		if(flagAnimationCouinCouin===true){
			
			//De position 0 à 1
			
			if(nbrClics===0){
				
				pivot1.rotation.x -= v;
				pivot1.rotation.z += v;
				
				pivot2.rotation.x += v;
				pivot2.rotation.z -= v;
				
				pivot3.rotation.x -= v;
				pivot3.rotation.z += v;
				
				pivot4.rotation.x += v;
				pivot4.rotation.z -= v;
				
				
				if(pivot1.rotation.x <= reperesAnim[0]){
					
					nbrClics++;
					setPosition1();
					flagAnimationCouinCouin = false;
					
				}
				
			}else if(nbrClics===1){
				
				pivot1.rotation.x += v;
				//pivot1.rotation.z -= v;
				
				pivot2.rotation.x -= v;
				//pivot2.rotation.z -= v;
				
				//pivot3.rotation.x -= v;
				pivot3.rotation.z -= v;
				
				//pivot4.rotation.x += v;
				pivot4.rotation.z += v;
				
				
				if(pivot1.rotation.x >= reperesAnim[1]){
					
					nbrClics++;
					setPosition2();
					flagAnimationCouinCouin = false;
					
				}		
				
			}else if(nbrClics===2){
				
				pivot1.rotation.x -= v;
				//pivot1.rotation.z -= v;
				
				pivot2.rotation.x += v;
				//pivot2.rotation.z -= v;
				
				//pivot3.rotation.x -= v;
				pivot3.rotation.z += v;
				
				//pivot4.rotation.x += v;
				pivot4.rotation.z -= v;
				
				
				if(pivot1.rotation.x <= reperesAnim[0]){
					
					nbrClics--;
					setPosition1();
					flagAnimationCouinCouin = false;
					
				}		
			}
			
			changerMaterials();
		}	
	}
	
	
	
	function genererMaterials(faceIndex, t1, t2){
		
		var array = [];
		
		for(var i=0; i<octahedron.faces.length; i++){
			
			if(i===faceIndex){
				
				array.push(t2)
				
			}else{
				
				array.push(t1);
				
			}
		}
		
		return array;
	}
	
	function afficherFacesInters(page){
		
		var faces = facesInteractives[page];
		
		scene.getObjectByName(faces[0].obj).material = genererMaterials(faces[0].face, materials[0], materials[1]);
		scene.getObjectByName(faces[1].obj).material = genererMaterials(faces[1].face, materials[0], materials[1]);
		
	}
	
	function resetMesh(){
		
		for(var i=0; i<0; i++){
			
			octa1.material = materials[0];
			octa2.material = materials[0];
			octa3.material = materials[0];
			octa4.material = materials[0];
			
		}
	}
	

	function changerMaterials(){
		
		resetMesh();
		console.log("changerMaterials()");
		
		if(nbrClics===1){
			
			
			afficherFacesInters(0);
			afficherFacesInters(1);

			
		}else if(nbrClics===2){
			
			afficherFacesInters(2);
			afficherFacesInters(3);
			
		}
	}

	
	

	
	
//""""""""""""""""""""""""""""""" LOOP DE RENDU """""""""""""""""""""""""""""""""""""""
	

	
	
	function animate(){
		
		requestAnimationFrame(animate);
		
		//controls.update() must be called after any manual changes to the camera's transform
		controls.update();
		
		
		animCouicouin(0.09);
		
		
		
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( scene.children, true );
		danslazone = intersects.length > 0;
		
		//ANALYSER L'OBJET INTERSECT
		if(danslazone===true){
							
			var intersect = intersects[0];
			faceTouchee = intersect.faceIndex;
			var objetTouche = intersect.object;
			nomObjetTouche = intersect.object.name;
			
			//	TEST
			
	
	
			
						
		}else{

			
			faceTouchee = null;
			nomObjetTouche = null;
			
		}
		
		
		renderer.render(scene, camera);
		
	
		
	}
	
//""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
	
	
	
	
	
	
	
	
//========== CENTRE D'APPELS BONJPOUR/HI ===============
	
	animate();
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener("click", funcDansLaZone, false);
	//document.addEventListener("touchstart", funcDansLaZone, false);
	document.addEventListener( 'mousemove', onMouseMove, false );
	
	document.getElementById("btncouin").addEventListener('click', function(){
		
		flagAnimationCouinCouin = true;
		
		console.log(nbrClics);
		
		if(premiersClics===0){
						
			$("#btncouin").html("Cliquez encore!");
			premiersClics++;
			flagInteractivite = true;
						
		}else if(nbrClics>=1){
			
			$("#btncouin").html("Allez-y, encore!");
			
		}
		
				
		
	});
	
	
	
	
	
	//Aide pour les axes: x=rouge y=vert z=bleu
	
/*	var axesScene = new THREE.AxesHelper( 6 );
	//var axesOcta1 = new THREE.AxesHelper( 4 );
	scene.add( axesScene );
	//pivot1.add( axesOcta1 );
	
	//	HELPER LUMIERE
	
	var sphereSize = 1;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	scene.add( pointLightHelper );*/
	
	
	
	//Zone de tests
	


	
	
	
	

});
