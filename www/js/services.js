angular.module('starter.services', [])




.service('EquipoLocal',function(DatosPorDefectoCHE){
  var NombreEquipo="Rockeros CHE";
  var vPuntos=0;
  var faltasEquipoCuarto=[0,0,0,0,0,0,0,0,0,0];
 // Some fake testing data
  var PlayerV = [{
    id: 4,
    dorsal: 4,
    orden: 1,
    nombre: 'Javi',   
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 5,
    dorsal: 55,
    orden: 3,
    nombre: 'Pepe',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  },{
    id: 8,
    dorsal: 8,
    orden: 2,
    nombre: 'David',
    faltas: 0,
    face: 'img/mike.png',
    puntos: 0
  }];

  PlayerV=[];
  PlayerV=DatosPorDefectoCHE.all();

    function SumaLosPuntos(JugId,Cuantos) {
      for (var i = 0; i < PlayerV.length; i++) {
        
        if (PlayerV[i].id == parseInt(JugId)) {
          PlayerV[i].puntos=PlayerV[i].puntos + Cuantos;
          }
      }
    }

    function AnyadirFaltaPerosnal(JugId,Cuarto) {
      var encontrado =false;
      for (var i = 0; i < PlayerV.length; i++) {
        
        if (PlayerV[i].id == parseInt(JugId)) {
          if ( PlayerV[i].faltas<5){
            PlayerV[i].faltas=PlayerV[i].faltas + 1;
            encontrado=true;
          }else{
              alert("Ya tiene 5 faltas!!!");

          }
        }
      }
      if (encontrado){
          faltasEquipoCuarto[Cuarto-1]=faltasEquipoCuarto[Cuarto-1] +1;
      }else{
          alert("Maaaal");
      }
    }    


   this.getPlayers=function(){
      return PlayerV;
   }  

   this.getNombre = function(){
        return NombreEquipo;
    }

    this.setNombre = function(newNombre){
        NombreEquipo = newData;
    }


    this.getPuntos = function(){
        return vPuntos;
    }

    this.sumPuntos = function(Cuantos,JugId ){
        SumaLosPuntos(JugId,Cuantos);
        vPuntos = vPuntos + Cuantos;
         
        //var Cadena="Local " + String(vPuntos) + " " + String(JugId);
        //alert(Cadena);
    }     

    this.faltaPersonal = function(Cuarto,JugId ){
        AnyadirFaltaPerosnal(JugId,Cuarto);

         
        //var Cadena="Local " + String(vPuntos) + " " + String(JugId);
        //alert(Cadena);
    } 


    this.GuardarDatosFich=function(){

        for (var i = 0; i < $scope.EquipoVisitante.length; i++) {
         console.log(i + $scope.EquipoVisitante[i].nombre);
         console.log(JSON.stringify($scope.EquipoVisitante[i]));
        }


        var cadena = JSON.stringify($scope.EquipoVisitante);
        console.log(cadena);
        localStorage.setItem("a", cadena);    
        localStorage.setItem("s", "El imperio contraataca");

    }

})


.service('EquipoVisitante',function(DatosPorDefectoVisit,F_Historico,Periodo){
    
    var vPuntos=0;
   
 

    PlayerV={};
    PlayerV=DatosPorDefectoVisit.clear();


    if (true) {
      if (localStorage.getItem("JugadoresEquipoVisitante") != null) {
        var cadena=localStorage.getItem("JugadoresEquipoVisitante");
        PlayerV=JSON.parse(cadena);
      }
    }

   


    var NombreEquipo="El imperio";
    if (localStorage.getItem("NombreEquipoVisitante") != null) {
      //...
      NombreEquipo=localStorage.getItem("NombreEquipoVisitante");
    }



   

  function SumaLosPuntos(JugId,Cuantos) {
      for (var i = 0; i < PlayerV.length; i++) {
        if (PlayerV[i].id === parseInt(JugId)) {
          PlayerV[i].puntos=PlayerV[i].puntos + Cuantos;
          //idJugador,Equipo,vPeriodo,Accion,puntos
          F_Historico.add(PlayerV[i].id,"V",Periodo.ObtenerCuarto(),"P",Cuantos)
          }
      }
  }

  function AnyadirFaltaPerosnal(JugId,Cuarto) {
      var encontrado =false;
      for (var i = 0; i < PlayerV.length; i++) {
        
        if (PlayerV[i].id == parseInt(JugId)) {
          if ( PlayerV[i].faltas<5){
            PlayerV[i].faltas=PlayerV[i].faltas + 1;
            encontrado=true;
            F_Historico.add(PlayerV[i].id,"V",Periodo.ObtenerCuarto(),"F",1)


          }else{
              alert("Ya tiene 5 faltas!!!");

          }
        }
      }
  } 

    
   this.getPlayers=function(){
      return PlayerV;
   }  

   this.getNombre = function(){
        return NombreEquipo;
    }

    this.setNombre = function(newNombre){
        NombreEquipo = newData;
    }


    this.getPuntos = function(){
        return vPuntos;
    }

    this.sumPuntos = function(Cuantos,JugId ){
        SumaLosPuntos(JugId,Cuantos)
        vPuntos = vPuntos + Cuantos;
        //var Cadena="Visitante " + String(Cuantos) + " " + String(JugId) ;
        //alert(Cadena);
    }
    this.faltaPersonal = function(Cuarto,JugId ){
        AnyadirFaltaPerosnal(JugId,Cuarto);

         
        //var Cadena="Local " + String(vPuntos) + " " + String(JugId);
        //alert(Cadena);
    } 


    this.GuardarDatosFich=function(){
                
  

        var cadena = JSON.stringify(PlayerV);
        console.log(cadena);
        localStorage.setItem("JugadoresEquipoVisitante", cadena);    
        localStorage.setItem("NombreEquipoVisitante", "El imperio contraataca");

    }

    this.Cambio= function(Origen,Fin) {
        var cadena = String(Origen) + " " + String(Fin);
        console.log(cadena);
        orden=13;
        indice1=20;
        indice2=20;
        for (var j = 0;j < 12; j++) {
          if (PlayerV[j].orden==Origen)
          {
            indice1=j;
            j=13;
          }
        };
        for (var j = 0;j < 12; j++) {
          if (PlayerV[j].orden==Fin)
          {
            indice2=j;
            j=13;
          }
        };

        if (indice1==20 || indice2==20)
        {
          alert("Maaaal")
        }
        else
        {
          var orden =PlayerV[indice1].orden; 
          PlayerV[indice1].orden=PlayerV[indice2].orden;
          PlayerV[indice2].orden=orden;
          if (PlayerV[indice1].orden<5 ||PlayerV[indice2].orden <5){
             F_Historico.add(PlayerV[Origen].id,"V",Periodo.ObtenerCuarto(),"C",0);
             F_Historico.add(PlayerV[Fin].id,"V",Periodo.ObtenerCuarto(),"C",0);
          } 
        }

    }

})


.service('Periodo',function(){
  var QueCuarto =3;

   this.ObtenerCuarto=function(){
      return QueCuarto;
   }  

   this.PonerCuarto = function(CualPeriodo){
      if (CualPeriodo<1)
          CualPeriodo=1;
        QueCuarto=CualPeriodo;
    }



    this.PonerNombreCuarto = function(){
      var txtCuarto;
      switch(QueCuarto) {
        case 1:
            txtCuarto="Primer"
            break;
        case 2:
            txtCuarto="Segundo"
            break;

        case 3:
            txtCuarto="Tercer"
            break;
        case 4:
            txtCuarto="Cuarto"
            break;
        default:
             txtCuarto="Prorroga " + string(txtCuarto)
       };
       if (QueCuarto<5) 
            txtCuarto=txtCuarto + " periodo";
       
       return txtCuarto;
    }

    this.MinutosCuarto = function(){
      if (QueCuarto<5) 
        return 10;
      else
        return 5;
      
       
    }
})



.factory('F_Historico', function(){


    HistAcciones=[];
    if (true) {
      if (localStorage.getItem("historico") != null) {
        var cadena=localStorage.getItem("historico");
        HistAcciones=JSON.parse(cadena);
      }
    }




  return {
    all: function() {
      return HistAcciones;
    },
    add: function(idJugador,Equipo,vPeriodo,Accion,puntos){

          var obj = {};
          obj["id"] = idJugador;
          obj["Equipo"] = Equipo;
          obj["Periodo"] = vPeriodo;
          obj["Accion"] = Accion;
          obj["faltas"] = 0;
          obj["puntos"] = puntos;
          obj["hora"] =  Date.now();
          HistAcciones.push(obj);
          //console.log(obj);
    },
    clear: function() {
      HistAcciones();
      return HistAcciones;
    }
  };

})






.factory('DatosPorDefectoVisit', function() {
  // Might use a resource here that returns a JSON array

  
 var jugs = [{
    id: 11,
    dorsal: 11,
    orden: 2,
    nombre: 'Anakin Skywalker',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 12,
    dorsal: 12,
    orden: 2,
    nombre: 'Han Solo',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }];

  function LimpiarJugadores(JugId,Cuarto) {
        jugs=[];
        for (var i = 0; i < 11; i++) {
          var obj = {};
          obj["id"] = i;
          obj["dorsal"] = i+4;
          obj["orden"] = i;
          obj["nombre"] = "Jugador dorsal " + String( i +4);
          obj["faltas"] = 0;
          obj["face"] = "img/ben.png";
          obj["puntos"] = 0;
          jugs.push(obj);      
      }
  }

  return {
    all: function() {
      return jugs;
    },

    clear: function() {
      LimpiarJugadores();
      return jugs;
    }
  };
})








.factory('DatosPorDefectoCHE', function() {
  // Might use a resource here that returns a JSON array

  
 var jugs = [
 {
    id: 0,
    dorsal: 4,
    orden: 2,
    nombre: 'Yoyo Barri',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 1,
    dorsal: 5,
    orden: 3,
    nombre: 'Pepedona',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }, {
    id: 2,
    dorsal: 6,
    orden: 4,
    nombre: 'Ximo JaggerMaster',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 3,
    dorsal: 7,
    orden: 5,
    nombre: 'The mexican Cati',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }, {
    id: 4,
    dorsal: 8,
    orden: 1,
    nombre: 'Mr Bocina',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 5,
    dorsal: 9,
    orden: 6,
    nombre: 'Lobezno',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 6,
    dorsal: 10,
    orden: 7,
    nombre: 'Pistol Coque',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }, {
    id: 7,
    dorsal: 11,
    orden:8,
    nombre: 'Moñaspower',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 8,
    dorsal: 12,
    orden: 12,
    nombre: 'LaserMan',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }, {
    id: 9,
    dorsal: 13,
    orden: 9,
    nombre: 'Cirujano',
    faltas: 0,
    face: 'img/ben.png',
    puntos: 0
  }, {
    id: 10,
    dorsal: 10,
    orden: 10,
    nombre: 'Flash Benja',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }, {
    id: 11,
    dorsal: 11,
    orden: 2,
    nombre: 'Ximo B-52',
    faltas: 0,
    face: 'img/max.png',
    puntos: 0
  }
  ];

  function LimpiarJugadores(JugId,Cuarto) {
        jugs=[];
        for (var i = 0; i < 11; i++) {
          var obj = [];
          obj["id"] = i;
          obj["dorsal"] = i+4;
          obj["orden"] = i;
          obj["nombre"] = "Jugador dorsal " + String( i +4);
          obj["faltas"] = 0;
          obj["face"] = "img/ben.png";
          obj["puntos"] = 0;
          jugs.push(obj);      
      }
  }

  return {
    all: function() {
      return jugs;
    },

    clear: function() {
      LimpiarJugadores();
      return jugs;
    }
  };
});



