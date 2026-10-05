'use strict';
document.body.classList.add('js');
const navigation = document.querySelector('#navigation');
const menu = document.querySelector('#menu-toggle');
if (menu && navigation) {
  const closeMenu = () => { navigation.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.textContent='Menú'; };
  menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded',String(open)); menu.textContent=open?'Cerrar':'Menú'; });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{ if(event.key==='Escape' && navigation.classList.contains('open')) {closeMenu();menu.focus();} });
}
// Ideas generales: no se guardan ni envían las selecciones.
const plans = {
  perro: {
    10: ['Una pausa en compañía.','Busca un lugar tranquilo y comparte unos minutos de atención. Puedes proponer un juego breve que ya conozca y parar cuando pierda interés.'],
    30: ['Un paseo para explorar.','En una ruta habitual, dale tiempo para olfatear y observar. El recorrido importa menos que disfrutarlo juntos.'],
    60: ['La ruta de siempre, sin prisa.','Elige un horario cómodo y un recorrido adecuado a su condición. Combina el paseo con pausas y vuelve antes si muestra cansancio. Una hora disponible no tiene que ser una hora de actividad.']
  },
  gato: {
    10: ['Un pequeño juego de acecho.','Utiliza un juguete adecuado que pueda perseguir y atrapar. Supervisa el juego y guarda cuerdas u objetos pequeños cuando terminen.'],
    30: ['Una tarde para curiosear.','Ofrece una caja segura sin grapas ni cintas y un juguete habitual. Deja que explore por iniciativa propia y alterna juego con descanso.'],
    60: ['Compañía a su ritmo.','Instálate cerca de su lugar favorito con un libro o una actividad tranquila. Puedes proponer breves juegos si se acerca con interés, sin forzar el contacto.']
  }
};
const planButton = document.querySelector('#plan-button');
if (planButton) planButton.addEventListener('click',()=>{
  const animal=document.querySelector('input[name="animal"]:checked').value;
  const duration=document.querySelector('#duration').value;
  const plan=plans[animal][duration];
  document.querySelector('#plan-title').textContent=plan[0];
  document.querySelector('#plan-description').textContent=plan[1];
});
const articles={
  casa:{title:'Una casa que también es suya.',sections:[['Descansar sin interrupciones','Observa dónde prefiere descansar y prepara un lugar cómodo y seguro. Evita obligarlo a quedarse en una zona que no le gusta.'],['Compartir con acuerdos','Habla con quienes viven contigo sobre rutinas, límites y responsabilidades. La coherencia ayuda a que el día a día sea más predecible.'],['Pensar en su seguridad','Revisa ventanas, balcones y acceso a productos de limpieza. Utiliza soluciones adecuadas al espacio y a tu mascota.']]},
  pausa:{title:'Aprender a hacer una pausa.',sections:[['Mirar antes de insistir','Si se retira, evita el contacto o deja de interesarse por el juego, ofrece espacio. La compañía también puede ser silenciosa.'],['Respetar su ritmo','Alterna actividades con descanso y observa cómo responde. No todas las mascotas disfrutan los mismos planes.'],['Una atención que acompaña','Busca momentos tranquilos para estar cerca sin exigir interacción. Ante cambios persistentes o dudas, consulta con un profesional.']]},
  llegada:{title:'El hogar se descubre despacio.',sections:[['Empezar con calma','Prepara una zona tranquila con lo necesario para descansar. Las presentaciones pueden esperar hasta que esté más cómodo.'],['Una rutina predecible','Organiza horarios y responsabilidades. Durante los primeros días, evita llenar la agenda con visitas y actividades nuevas.'],['Pedir orientación','Pregunta al refugio o al cuidador anterior por sus hábitos y necesidades. Para presentar otras mascotas, solicita una pauta adaptada a tu caso.']]},
  juego:{title:'La curiosidad también se cuida.',sections:[['Descubrir qué disfruta','Prueba actividades breves y observa cuáles le interesan. Retira los objetos que no sean seguros o se deterioren.'],['Elegir con cuidado','Usa juguetes apropiados para su tamaño y juega bajo supervisión. No dejes cuerdas ni piezas pequeñas a su alcance sin vigilancia.'],['Terminar a tiempo','El juego no necesita durar mucho. Detente cuando pierda interés o necesite descansar y deja que vuelva a acercarse por iniciativa propia.']]}
};
const dialog=document.querySelector('#reading-dialog');
let previousFocus;
if(dialog){
  document.querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>{
    const article=articles[button.dataset.story];previousFocus=button;
    document.querySelector('#reading-title').textContent=article.title;
    const content=document.querySelector('#reading-content');content.replaceChildren();
    article.sections.forEach(([title,body])=>{const heading=document.createElement('h3');heading.textContent=title;const paragraph=document.createElement('p');paragraph.textContent=body;content.append(heading,paragraph);});
    dialog.showModal();
  }));
  dialog.querySelectorAll('.dialog-close,.dialog-done').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('close',()=>previousFocus?.focus());
  dialog.addEventListener('click',event=>{const bounds=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close();});
}