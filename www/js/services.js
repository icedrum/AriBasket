angular.module('starter.services', [])




.service('EquipoLocal',function(DatosPorDefectoCHE,F_Historico,Periodo){
  var NombreEquipo="Rockeros CHE";
  var vPuntos=0;
  var puntosPorCuarto; 
  var faltasPorCuarto; 

  var PlayerV=[];
  PlayerV=DatosPorDefectoCHE.all();


    if (true) {
      if (localStorage.getItem("JugadoresEquipoLocal") != null) {
        var cadena=localStorage.getItem("JugadoresEquipoLocal");
        PlayerV=JSON.parse(cadena);

        //Leo los puntos
        for (var i = 0; i < PlayerV.length; i++) {
            vPuntos=vPuntos + PlayerV[i].puntos;
          }
      }
      if (localStorage.getItem("NombreEquipoLocal") != null) {
        NombreEquipo=localStorage.getItem("NombreEquipoLocal");
      }

    }


    function SumaLosPuntos(JugId,Cuantos) {
      for (var i = 0; i < PlayerV.length; i++) {
        
        if (PlayerV[i].id == parseInt(JugId)) {
          PlayerV[i].puntos=PlayerV[i].puntos + Cuantos;
          F_Historico.add(PlayerV[i].id,"L",Periodo.ObtenerCuarto(),"P",Cuantos,Periodo.TiempoFormateado())
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
        NombreEquipo = newNombre;
    }


    this.getPuntos = function(){
        return vPuntos;
    }

    this.getPuntosPorCuarto = function(){
        return puntosPorCuarto;
    }

    this.getFaltasPorCuarto = function(){
        console.log("get" + faltasPorCuarto);
        return faltasPorCuarto;
    }


    this.sumPuntos = function(Cuantos,JugId ){
        SumaLosPuntos(JugId,Cuantos);
        vPuntos = vPuntos + Cuantos;

    }     

    this.faltaPersonal = function(Cuarto,JugId ){
       

         for (var i = 0; i < PlayerV.length; i++) {
        
            if (PlayerV[i].id == parseInt(JugId)) {
              
              if ( PlayerV[i].faltas<5){
                PlayerV[i].faltas=PlayerV[i].faltas + 1;
                
                F_Historico.add(PlayerV[i].id,"L",Periodo.ObtenerCuarto(),"F",1,Periodo.TiempoFormateado())


              }else{
                  alert("Ya tiene 5 faltas!!!");

              }
        }
      }
    } 

    this.LimpiarJugadores=function(DatosRockeros){
      if (DatosRockeros) NombreEquipo="Rockeros CHE"
      PlayerV=DatosPorDefectoCHE.clear(DatosRockeros);  
      vPuntos=0;
      GuardarDatosFich(true); 

    }

    this.GuardarDatosFich=function(DesdeDentro){
        var cadena = JSON.stringify(PlayerV);
        localStorage.setItem("JugadoresEquipoLocal", cadena);    
        localStorage.setItem("NombreEquipoLocal",NombreEquipo);
        if (!DesdeDentro){ 
          F_Historico.guardar();
          Periodo.GuardarDatosFich();
        }
    }


    this.DatosPorCuarto=function(){
       var ptosCuarto =[0,0,0,0,0];
       var faltasCuarto =[0,0,0,0,0];
       var Ultimocuarto=0;
       var quecuarto;
            


        var acciones=F_Historico.all();
        for (var i = 0; i < acciones.length; i++) {

          if (acciones[i].Periodo> Ultimocuarto) Ultimocuarto=acciones[i].Periodo;
          if (acciones[i].Equipo == "L") { 

              quecuarto=acciones[i].Periodo;
              if (quecuarto>4) quecuarto=5;
              quecuarto=quecuarto-1;
              if (acciones[i].Accion == "P") ptosCuarto[quecuarto]=ptosCuarto[quecuarto] + acciones[i].puntos;
              if (acciones[i].Accion == "F") faltasCuarto[quecuarto]=faltasCuarto[quecuarto] + 1;
            }
        }
        

        quecuarto=3;
        if  (Ultimocuarto>4)  quecuarto=4;
        faltasPorCuarto="";
        puntosPorCuarto="";
        for (var i = 0; i <= quecuarto; i++) {
          faltasPorCuarto=faltasPorCuarto + String(faltasCuarto[i]);              
          puntosPorCuarto=puntosPorCuarto + String(ptosCuarto[i]);
          if (i < quecuarto){
              faltasPorCuarto=faltasPorCuarto + " + ";              
              puntosPorCuarto=puntosPorCuarto + " + ";
          }
        }
        
      }

    this.DatosPorCuartoJugador=function(LosPuntos,idJugador){
       var datosCuarto =[0,0,0,0,0];
       var Ultimocuarto=0;
       var quecuarto;
            
       var cadena;

        var acciones=F_Historico.all();
        for (var i = 0; i < acciones.length; i++) {

          if (acciones[i].Periodo> Ultimocuarto) Ultimocuarto=acciones[i].Periodo;
          if (acciones[i].Equipo == "L" && acciones[i].id == idJugador) { 

              quecuarto=acciones[i].Periodo;
              if (quecuarto>4) quecuarto=5;
              quecuarto=quecuarto-1;

              if (LosPuntos){
                if (acciones[i].Accion == "P") datosCuarto[quecuarto]=datosCuarto[quecuarto] + acciones[i].puntos;
              }
              else
              {
                if (acciones[i].Accion == "F") datosCuarto[quecuarto]=datosCuarto[quecuarto] + 1;
              }
            }

        }
        

        quecuarto=3;
        if  (Ultimocuarto>4)  quecuarto=4;
        cadena="";
        for (var i = 0; i <= quecuarto; i++) {
          cadena=cadena + String(datosCuarto[i]);
          if (i < quecuarto) cadena=cadena + " + ";              
          
        }
        return cadena;
        
      } 



    this.Cambio= function(Origen,Fin) {
        //Para que no haga los cambios iniciales (poner el 5 titular)
        var TienePuntos_o_Faltas=false;
        //var cadena = String(Origen) + " " + String(Fin);
        //console.log(cadena);
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
          //("Maaaal")
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
             F_Historico.add(PlayerV[indice1].id,"L",Periodo.ObtenerCuarto(),"C",orden,Periodo.TiempoFormateado());
             orden="S";
             if (PlayerV[indice2].orden<5) orden="E"
             F_Historico.add(PlayerV[indice2].id,"L",Periodo.ObtenerCuarto(),"C",orden,Periodo.TiempoFormateado());
          



          } 
        }
     }   

})


.service('EquipoVisitante',function(DatosPorDefectoVisit,F_Historico,Periodo){
    
    var vPuntos=0;
    var puntosPorCuarto; 
    var faltasPorCuarto; 

 

    var PlayerV={};
    PlayerV=DatosPorDefectoVisit.clear();


    if (true) {
      if (localStorage.getItem("JugadoresEquipoVisitante") != null) {
        var cadena=localStorage.getItem("JugadoresEquipoVisitante");
        PlayerV=JSON.parse(cadena);

        //Leo los puntos
        for (var i = 0; i < PlayerV.length; i++) {
            vPuntos=vPuntos + PlayerV[i].puntos;
        }


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

  function AnyadirFaltaPerosnal(JugId) {
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
        NombreEquipo = newNombre;
    }


    this.getPuntos = function(){
        return vPuntos;
    }

    this.sumPuntos = function(Cuantos,JugId ){
        SumaLosPuntos(JugId,Cuantos)
        vPuntos = vPuntos + Cuantos;
    }
    this.faltaPersonal = function(Cuarto,JugId ){
        AnyadirFaltaPerosnal(JugId,Cuarto);
    }

    this.getPuntosPorCuarto = function(){
        return puntosPorCuarto;
    }

    this.getFaltasPorCuarto = function(){
        return faltasPorCuarto;
    }

    this.GuardarDatosFichV=function(){
        
        var cadena = JSON.stringify(PlayerV);
        //console.log(cadena);
        localStorage.setItem("JugadoresEquipoVisitante", cadena);    
        localStorage.setItem("NombreEquipoVisitante",NombreEquipo);
        F_Historico.guardar();
        Periodo.GuardarDatosFich();
    }


    this.LimpiarJugadoresV=function(){
      PlayerV=DatosPorDefectoVisit.clear();
      vPuntos=0;
      var cadena = JSON.stringify(PlayerV);
      localStorage.setItem("JugadoresEquipoVisitante", cadena);         
    }

     this.DatosPorCuarto=function(){
       var ptosCuarto =[0,0,0,0,0];
       var faltasCuarto =[0,0,0,0,0];
       var Ultimocuarto=0;
       var quecuarto;
            
        var acciones=F_Historico.all();
        for (var i = 0; i < acciones.length; i++) {

          if (acciones[i].Periodo> Ultimocuarto) Ultimocuarto=acciones[i].Periodo;
          if (acciones[i].Equipo == "V") { 

              quecuarto=acciones[i].Periodo;
              if (quecuarto>4) quecuarto=5;
              quecuarto=quecuarto-1;
              if (acciones[i].Accion == "P") ptosCuarto[quecuarto]=ptosCuarto[quecuarto] + acciones[i].puntos;
              if (acciones[i].Accion == "F") faltasCuarto[quecuarto]=faltasCuarto[quecuarto] + 1;
            }
        }
        

        quecuarto=3;
        if  (Ultimocuarto>4)  quecuarto=4;
        faltasPorCuarto="";
        puntosPorCuarto="";
        for (var i = 0; i <= quecuarto; i++) {
          faltasPorCuarto=faltasPorCuarto + String(faltasCuarto[i]);              
          puntosPorCuarto=puntosPorCuarto + String(ptosCuarto[i]);
          if (i < quecuarto){
              faltasPorCuarto=faltasPorCuarto + " + ";              
              puntosPorCuarto=puntosPorCuarto + " + ";
          }
        }
        
      }



      this.DatosPorCuartoJugador=function(LosPuntos,idJugador){
       var datosCuarto =[0,0,0,0,0];
       var Ultimocuarto=0;
       var quecuarto;
            
       var cadena;

        var acciones=F_Historico.all();
        for (var i = 0; i < acciones.length; i++) {

          if (acciones[i].Periodo> Ultimocuarto) Ultimocuarto=acciones[i].Periodo;
          if (acciones[i].Equipo == "V" && acciones[i].id == idJugador) { 

              quecuarto=acciones[i].Periodo;
              if (quecuarto>4) quecuarto=5;
              quecuarto=quecuarto-1;

              if (LosPuntos){
                if (acciones[i].Accion == "P") datosCuarto[quecuarto]=datosCuarto[quecuarto] + acciones[i].puntos;
              }
              else
              {
                if (acciones[i].Accion == "F") datosCuarto[quecuarto]=datosCuarto[quecuarto] + 1;
              }
            }

        }
        

        quecuarto=3;
        if  (Ultimocuarto>4)  quecuarto=4;
        cadena="";
        for (var i = 0; i <= quecuarto; i++) {
          cadena=cadena + String(datosCuarto[i]);
          if (i < quecuarto) cadena=cadena + " + ";              
          
        }
        return cadena;
        
      } 




    this.Cambio= function(Origen,Fin) {
        //Para que no haga los cambios iniciales (poner el 5 titular)
        var TienePuntos_o_Faltas=false;
        //var cadena = String(Origen) + " " + String(Fin);
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





    if (true) {
      if (localStorage.getItem("Periodo") != null) {
        var cadena=localStorage.getItem("Periodo");

        QueCuarto=parseInt(cadena.substring(0,3));
        TiempoActualEnSegundos=parseInt(cadena.substring(3));
      }
    }


    this.GuardarDatosFich=function(){
            
        var cadena="000";
        cadena=cadena + String(QueCuarto);
        cadena=cadena.slice(-3);
        cadena=cadena + String(TiempoActualEnSegundos);
        localStorage.setItem("Periodo", cadena);    
    }

   this.ObtenerCuarto=function(){
      return QueCuarto;
   }  


   this.Reiniciar=function(){
      QueCuarto=1;
      TiempoActualEnSegundos=0;
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
      GuardarDatosFich();
    }




    this.PonerNombreCuarto = function(){
      console.log(QueCuarto);
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
             txtCuarto="Prorroga " + String(QueCuarto-4) + "(" + String(QueCuarto) + ")"
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
          if (QueCuarto>4) 
            return ("05 : 00");
          else  
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

    this.SumarSegundo=function(){
      var pararReloj=false;
      TiempoActualEnSegundos=TiempoActualEnSegundos +1;
      //console.log(String(QueCuarto) +  " - " + String(TiempoActualEnSegundos))
      if (QueCuarto<5)
        {        
          if (TiempoActualEnSegundos>=600){
            TiempoActualEnSegundos=600;
            pararReloj=true;
          }
        }
      else
      {
          if (TiempoActualEnSegundos>=300){
            TiempoActualEnSegundos=300;
            pararReloj=true;
          }
      }
      //console.log("Paro el reloj: " + pararReloj) ;
      return pararReloj;
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


    //this.MinutosCuarto = function(){
    //  if (QueCuarto<5) 
    //    return 10;
    //  else
    //    return 5;
    //     }
})



.factory('F_Historico', function(){


    HistAcciones=[];
    if (true) {
      if (localStorage.getItem("historico") != null) {
        var cadena=localStorage.getItem("historico");
        HistAcciones=JSON.parse(cadena);
      }
    }


    GuardarDatosFich=function(){
            
        var cadena = JSON.stringify(HistAcciones);
        //console.log(cadena);
        localStorage.setItem("historico", cadena);    
    }


  return {
    all: function() {
      return HistAcciones;
    },
    fitro: function(vPeriodo,vEquipo,vAccion) {

        var vfiltroPer=0;
        if (vPeriodo == "Primero") vfiltroPer=1;
        if (vPeriodo == "Segundo") vfiltroPer=2;
        if (vPeriodo == "Tercero") vfiltroPer=3;
        if (vPeriodo == "Cuarto") vfiltroPer=4;




        if (vfiltroPer==0 && vEquipo=="Ambos" && vAccion=="Todas") return HistAcciones;
        console.log("Fitro: " + String(vPeriodo) +  vEquipo + vAccion);
        var SeDevuelve;
        var ArrayDevuelto=[];
        for (var j = 0;j < HistAcciones.length; j++) {
          SeDevuelve=true;

          if (vfiltroPer>0) {
            if (HistAcciones[j].Periodo!=vfiltroPer)  SeDevuelve=false;
          }

          if (vEquipo != "Ambos") {
            if (HistAcciones[j].Equipo !=vEquipo.substring(0,1))  SeDevuelve=false;
          }

          if (vAccion != "Todas") {
            if (HistAcciones[j].Accion!=vAccion.substring(0,1))  SeDevuelve=false;
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
    guardar: function(){
      GuardarDatosFich();
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
      HistAcciones=[];
      return HistAcciones;
    }
  };

})






.factory('DatosPorDefectoVisit', function() {
  // Might use a resource here that returns a JSON array

  
 var jugs = [];

  function LimpiarJugadores() {


        if (jugs.length==0){
        
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
              obj["visible"] = true;
              
              jugs.push(obj);
            }
          }else{
            for (var i = 0; i < 12; i++) {              

              jugs[i].orden = i;
              jugs[i].faltas = 0;
              jugs[i].puntos = 0;
              jugs[i].visible = true;
          }      
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

  
 var Che = [
 {
    id: 0,
    dorsal: 4,
    orden: 2,
    nombre: 'Yoyo Barri',
    faltas: 0,
    face: 'img/local4.png', 
    puntos: 0,
    visible: true
  }, {
    id: 1,
    dorsal: 5,
    orden: 3,
    nombre: 'Pepedona',
    faltas: 0,
    face: 'img/local5.png',
    puntos: 0,
    visible: true
  }, {
    id: 2,
    dorsal: 6,
    orden: 4,
    nombre: 'Ximo JaggerMaster',
    faltas: 0,
    face: 'img/local6.png',
    puntos: 0,
    visible: true
  }, {
    id: 3,
    dorsal: 7,
    orden: 5,
    nombre: 'The mexican Cati',
    faltas: 0,
    face: 'img/local7.png',
    puntos: 0,
    visible: true
  }, {
    id: 4,
    dorsal: 8,
    orden: 1,
    nombre: 'Mr Bocina',
    faltas: 0,
    face: 'img/local8.png',
    puntos: 0,
    visible: true
  }, {
    id: 5,
    dorsal: 9,
    orden: 6,
    nombre: 'Lobezno',
    faltas: 0,
    face: 'img/local9.png',
    puntos: 0,
    visible: true
  }, {
    id: 6,
    dorsal: 10,
    orden: 7,
    nombre: 'Pistol Coque',
    faltas: 0,
    face: 'img/local10.png',
    puntos: 0,
    visible: true
  }, {
    id: 7,
    dorsal: 11,
    orden:8,
    nombre: 'Moñaspower',
    faltas: 0,
    face: 'img/local11.png',
    puntos: 0,
    visible: true
  }, {
    id: 8,
    dorsal: 12,
    orden: 12,
    nombre: 'LaserMan',
    faltas: 0,
    face: 'img/local12.png',
    puntos: 0,
    visible: true
  }, {
    id: 9,
    dorsal: 13,
    orden: 9,
    nombre: 'Cirujano',
    faltas: 0,
    face: 'img/local13.png',
    puntos: 0,
    visible: true
  }, {
    id: 10,
    dorsal: 15,
    orden: 10,
    nombre: 'Flash Benja',
    faltas: 0,
    face: 'img/local15.png',
    puntos: 0,
    visible: true
  }, {
    id: 11,
    dorsal: 17,
    orden: 2,
    nombre: 'Ximo B-52',
    faltas: 0,
    face: 'img/local17.png',
    puntos: 0,
    visible: true
  }
  ];
  var jugs=  [];

  function InicializarVector(){
         for (var i = 0; i < 12; i++) {
           
              var obj = {};
              obj["id"] =Che[i].id;
              obj["dorsal"] = Che[i].dorsal;
              obj["orden"] = i;
              obj["nombre"] = Che[i].nombre;
              obj["faltas"] = 0;
              obj["face"] =Che[i].face ;
              obj["puntos"] = 0;
              obj["visible"] = true;
              
              jugs.push(obj);
        }
    }



  function LimpiarJugadores(PonerRockeros) {
        
        var imagen;
        var dorsal;
        var nombre;
        console.log("Poner :" + PonerRockeros);
        for (var i = 0; i < 12; i++) {
         

          
          if (!PonerRockeros){

            dorsal=i+4;                      
            //nombre=jugs[i].nombre;
            nombre ="Jugador dorsal " + String( i +4);  
            imagen="img/local" + String(dorsal) + ".png";  
          }
          else
          {
            dorsal=Che[i].dorsal;
            nombre=Che[i].nombre ;        
            imagen=Che[i].face ; 
          }
          jugs[i].orden = i;
          console.log(i + " :" + Che[i].nombre); 
          jugs[i].dorsal=dorsal;
          jugs[i].face=imagen;
          jugs[i].nombre=nombre;
          jugs[i].faltas=0;
          jugs[i].puntos=0;
          jugs[i].visible=true;
          console.log(nombre+ " " + jugs[i].faltas);  
         }       
    }
  

  return {
    all: function() {
      if (jugs.length==0) InicializarVector();
      return jugs;
    },

    clear: function(PonerRockeros) {
      LimpiarJugadores(PonerRockeros);
      return jugs;
    }
  };
});



    