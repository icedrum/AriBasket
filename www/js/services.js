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


    if (false) {
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
          F_Historico.add(PlayerV[i].id,"V",Periodo.ObtenerCuarto(),"P",Cuantos,Periodo.TiempoFormateado())
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
            F_Historico.add(PlayerV[i].id,"V",Periodo.ObtenerCuarto(),"F",1,Periodo.TiempoFormateado())


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
        //Para que no haga los cambios iniciales (poner el 5 titular)
        var TienePuntos_o_Faltas=false;
        var cadena = String(Origen) + " " + String(Fin);
        console.log(cadena);
        orden=13;
        indice1=20;
        indice2=20;

        //Para saber si tiene puntos o faltas

        for (var j = 0;j < 12; j++) {
          if (PlayerV[j].puntos>0 || PlayerV[j].faltas>0){
            TienePuntos_o_Faltas =true;
            j=13;
          } 
        };


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
          // Or exlusivo
          //return ( a || b ) && !( a && b );
          var grabar=false;
          if (TienePuntos_o_Faltas) grabar=(PlayerV[indice1].orden<5 && PlayerV[indice2].orden >=5) || (PlayerV[indice1].orden>=5 && PlayerV[indice2].orden <5);

          if (grabar){
             orden="S";
             if (PlayerV[indice1].orden<5) orden="E"
             F_Historico.add(PlayerV[indice1].id,"V",Periodo.ObtenerCuarto(),"C",orden,Periodo.TiempoFormateado());
             orden="S";
             if (PlayerV[indice2].orden<5) orden="E"
             F_Historico.add(PlayerV[indice2].id,"V",Periodo.ObtenerCuarto(),"C",orden,Periodo.TiempoFormateado());
          } 
        }

    }

})


.service('Periodo',function(){
  var QueCuarto =1;
  var TiempoActualEnSegundos=0;

   this.ObtenerCuarto=function(){
      return QueCuarto;
   }  

   this.CambiarCuarto = function(Mas_o_menos){
      
      var incremento=1;      
      if (Mas_o_menos <0)   incremento=-1;

      if (QueCuarto==1 && Mas_o_menos ==-1) {
      }
      else {
        QueCuarto=QueCuarto +  incremento;
        TiempoActualEnSegundos=0;      
      }
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

    this.TiempoFormateado = function(){




      var MinCuarto =10;
      if (QueCuarto>4) MinCuarto=5;      
      ResulSeg=MinCuarto * 60;

      if (TiempoActualEnSegundos<=0){
          return ("10 : 00");
      }

      if (TiempoActualEnSegundos>=ResulSeg){

          return "00 : 00" ;
      }

      ResulSeg= ResulSeg - TiempoActualEnSegundos;      
      MinCuarto=ResulSeg / 60 ;
      MinCuarto=Math.floor(MinCuarto);      
      ResulSeg=ResulSeg -  (MinCuarto*60);
      return "0" + String(MinCuarto) + " : " +  ("0" + ResulSeg).slice(-2); 

      
    }

    this.Tiempo100  = function(){
        //para el sliade range
      var MinCuarto =10;
      if (QueCuarto>4) MinCuarto=5;      
      MinCuarto=MinCuarto * 60 ;

      MinCuarto =(TiempoActualEnSegundos * 100)/MinCuarto;
      MinCuarto = Math.round((MinCuarto));
      if (MinCuarto>100) MinCuarto=100;

      return MinCuarto ;
    }

    this.PonerMinutosDesde100 = function(Porcentaje){
      var vMinut;
      var ResulSeg =10;

      if (QueCuarto>4) ResulSeg=5;
      // A segundos
      ResulSeg=ResulSeg * 60;


      vMinut=Math.round((Porcentaje*ResulSeg)/100,0);

      TiempoActualEnSegundos=vMinut;


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
    if (false) {
      if (localStorage.getItem("historico") != null) {
        var cadena=localStorage.getItem("historico");
        HistAcciones=JSON.parse(cadena);
      }
    }




  return {
    all: function() {
      return HistAcciones;
    },
    fitro: function(vPeriodo,vEquipo,vAccion) {

        if (vPeriodo==0 && vEquipo=="A" && vAccion=="T") return HistAcciones;
        console.log("Fitrol: " + String(vPeriodo) +  vEquipo + vAccion);
        var SeDevuelve;
        var ArrayDevuelto=[];
        for (var j = 0;j < HistAcciones.length; j++) {
          SeDevuelve=true;

          if (vPeriodo>0) {
            if (HistAcciones[j].Periodo!=vPeriodo)  SeDevuelve=false;
          }

          if (vEquipo != "A") {
            if (HistAcciones[j].Equipo !=vEquipo)  SeDevuelve=false;
          }

          if (vAccion != "T") {
            if (HistAcciones[j].Accion!=vAccion)  SeDevuelve=false;
          }

          if (SeDevuelve) ArrayDevuelto.push(HistAcciones[j]);          
          
        };    
        return ArrayDevuelto
    },
    allplayerN: function(Jug,Equi) {      
      return  HistAcciones.filter(function(item){
        return item.id == Jug && item.Equipo===Equi;
      });

    },
    add: function(idJugador,Equipo,vPeriodo,Accion,puntos,MinutoPartido){          
          var obj = {};
          obj["id"] = idJugador;
          obj["Equipo"] = Equipo;
          obj["Periodo"] = vPeriodo;
          obj["Accion"] = Accion;
          obj["faltas"] = 0;
          obj["puntos"] = puntos;
          obj["minuto"] = MinutoPartido;
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
        for (var i = 0; i < 12; i++) {
          var imagen="img/Visit" + String(i+4) + ".png";
          var obj = {};
          obj["id"] = i;
          obj["dorsal"] = i+4;
          obj["orden"] = i;
          obj["nombre"] = "Jugador dorsal " + String( i +4);
          obj["faltas"] = 0;
          obj["face"] =imagen ;
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
    face: 'img/local4.png', 
    puntos: 0
  }, {
    id: 1,
    dorsal: 5,
    orden: 3,
    nombre: 'Pepedona',
    faltas: 0,
    face: 'img/local5.png',
    puntos: 0
  }, {
    id: 2,
    dorsal: 6,
    orden: 4,
    nombre: 'Ximo JaggerMaster',
    faltas: 0,
    face: 'img/local6.png',
    puntos: 0
  }, {
    id: 3,
    dorsal: 7,
    orden: 5,
    nombre: 'The mexican Cati',
    faltas: 0,
    face: 'img/local7.png',
    puntos: 0
  }, {
    id: 4,
    dorsal: 8,
    orden: 1,
    nombre: 'Mr Bocina',
    faltas: 0,
    face: 'img/local8.png',
    puntos: 0
  }, {
    id: 5,
    dorsal: 9,
    orden: 6,
    nombre: 'Lobezno',
    faltas: 0,
    face: 'img/local9.png',
    puntos: 0
  }, {
    id: 6,
    dorsal: 10,
    orden: 7,
    nombre: 'Pistol Coque',
    faltas: 0,
    face: 'img/local10.png',
    puntos: 0
  }, {
    id: 7,
    dorsal: 11,
    orden:8,
    nombre: 'Moñaspower',
    faltas: 0,
    face: 'img/local11.png',
    puntos: 0
  }, {
    id: 8,
    dorsal: 12,
    orden: 12,
    nombre: 'LaserMan',
    faltas: 0,
    face: 'img/local12.png',
    puntos: 0
  }, {
    id: 9,
    dorsal: 13,
    orden: 9,
    nombre: 'Cirujano',
    faltas: 0,
    face: 'img/local13.png',
    puntos: 0
  }, {
    id: 10,
    dorsal: 15,
    orden: 10,
    nombre: 'Flash Benja',
    faltas: 0,
    face: 'img/local15.png',
    puntos: 0
  }, {
    id: 11,
    dorsal: 11,
    orden: 2,
    nombre: 'Ximo B-52',
    faltas: 0,
    face: 'img/local17.png',
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



