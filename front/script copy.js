  const liste = document.querySelector('.listeSalle');
  let id = localStorage.getItem('id');
  console.log(id);
  function createPageSalle(user) {
        //header
          var note=document.querySelector("#note");
          document.querySelector("h1").textContent=user.nom;
          let partAvis=document.querySelector("section");

          let moy=0;
          if(user.avisListe!= null) {
            user.avisListe.forEach(avis => {
              moy+=avis.note;
              let p= document.createElement("p");
              p.innerHTML="Date : "+avis.date.substring(1,10)+"<br> Note : "+avis.note
              partAvis.appendChild(p);
            });
            moy=moy/user.avisListe.length

            note.textContent+=moy;
          }


        //main
        document.querySelector("#adresse").textContent+=user.adresse.numero+" "+user.adresse.voie+" , "+user.adresse.codePostal+" "+user.adresse.ville;
        document.querySelector("#capacite").textContent+=user.capacite;
        document.querySelector("#styles").textContent+=user.styles;
          
  }



fetch('https://localhost:44314/api/Salles/'+id)
.then(res => res.json())
.then(user => {
    console.log(user);
    createPageSalle(user);

})
.catch(error => console.error('Erreur de fetch :', error));


