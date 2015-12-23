angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,EquipoLocal,EquipoVisitante,Periodo,F_Historico,$interval,$timeout) {
  // $scope.EquipoLocalNombre=EquipoLocal.getNombre();
  // $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
  // $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
  // $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();


  $scope.Data = {
       Minuto : Periodo.Tiempo100()
   }
  
  $scope.EnMarchaReloj=false;
  
  var stop = $interval(function() {
      var paroElReloj=false;      
      $timeout(function(){
         if ($scope.EnMarchaReloj) {
            
            //console.log($scope.Data.Minuto);
            paroElReloj=Periodo.SumarSegundo();
            //console.log(paroElReloj);  
            $scope.QueMinuto=Periodo.TiempoFormateado(); 
            $scope.Data.Minuto=Periodo.Tiempo100();                
          }
      });

      if (paroElReloj) {
            $scope.EnMarchaReloj=false;
            
      }                                                                                                                                                                                                                                                                   
  }, 1000);


  $scope.AccionReloj=function(encenderReloj){   
    //console.log(encenderReloj);  
    $scope.EnMarchaReloj=encenderReloj;
  }


  $scope.$on('$ionicView.enter',function(e){
    $scope.EquipoLocalNombre=EquipoLocal.getNombre();
    $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
    $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
    $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();
    $scope.Queperiodo=Periodo.PonerNombreCuarto();
    $scope.QueMinuto=Periodo.TiempoFormateado(); 
    $scope.NumCuarto=Periodo.ObtenerCuarto();
    $scope.LocalMas4=Mas4Faltas("L");
    $scope.VisitanteMas4=Mas4Faltas("V");
    $scope.Data.Minuto=Periodo.Tiempo100();
  });

  //L local   V Visitante
  Mas4Faltas=function(Equipo){
    var FaltasEnEste=0;
    var acciones=F_Historico.all();
    for (var i = 0; i < acciones.length; i++) {
      if (acciones[i].Accion == "F") {  
        if (acciones[i].Periodo == $scope.NumCuarto) {
           if (acciones[i].Equipo == Equipo) FaltasEnEste=FaltasEnEste+1;           
        }
      }
    }
    return FaltasEnEste>3
  }

  $scope.CambiarCuarto=function(Incremento){     
      Periodo.CambiarCuarto(Incremento);
      $scope.Queperiodo=Periodo.PonerNombreCuarto();
      $scope.QueMinuto=Periodo.TiempoFormateado(); 
      $scope.NumCuarto=Periodo.ObtenerCuarto();
      $scope.LocalMas4=false;
      $scope.VisitanteMas4=false;
      $scope.EnMarchaReloj=false;
      $scope.Data.Minuto=Periodo.Tiempo100();
  };



  $scope.CambioSlide=function(value){
      $scope.EnMarchaReloj=false;
      Periodo.PonerMinutosDesde100($scope.Data.Minuto);
      $scope.QueMinuto=Periodo.TiempoFormateado(); 
  };
})

.controller('ChatsCtrl', function($scope,  $stateParams,F_Historico,EquipoVisitante,EquipoLocal) {
    
     

        
      // L  local      V visitante       T todos
      //if ($stateParams.OpcionEquipoJugador=="") $stateParams.OpcionEquipoJugador="T";
      $scope.Opcion =$stateParams.OpcionEquipoJugador.substr(1,1);
      $scope.IdJugador=$stateParams.OpcionEquipoJugador.substr(2);
      
      
  
      
      $scope.AuxId=110;

      $scope.EquipoV=EquipoVisitante.getPlayers(); 
      $scope.EquipoL=EquipoLocal.getPlayers();

      $scope.$on('$ionicView.enter',function(e){
       
        if ($scope.Opcion == "V") {          
            $scope.jugador= $scope.EquipoV[$scope.IdJugador];
          } else {
    
            $scope.jugador= $scope.EquipoL[$scope.IdJugador];  
          } 

      });

      if ($scope.Opcion == "T") {
          $scope.ElHistorico=F_Historico.all();
        } else
        {
          vEq =$stateParams.OpcionEquipoJugador.substr(1,1);
          vJug=$stateParams.OpcionEquipoJugador.substr(2);
          console.log("Equipo" + vEq);
          $scope.ElHistorico=F_Historico.allplayerN(vJug,vEq);    
        };

    $scope.NombreJugador=function(LocalVisitante,KJugador){
        
        if (String(LocalVisitante) == "V") {          
          return $scope.EquipoV[KJugador].nombre;
        } else {
          return  $scope.EquipoL[KJugador].nombre;;
        } 
    }
    $scope.filtroPeriodo=0;
    $scope.filtroEquipo="A";
    $scope.filtroAccion="T";
    $scope.selectUpdatedPer = function(filtroPeriodo) {
        var vfiltro=0;
        if (filtroPeriodo == "Primero") vfiltro=1;
        if (filtroPeriodo == "Segundo") vfiltro=2;
        if (filtroPeriodo == "Tercero") vfiltro=3;
        if (filtroPeriodo == "Cuarto") vfiltro=4;
        $scope.filtroPeriodo=vfiltro;
        ValoreConFiltro();
    }
    $scope.selectUpdatedEqu = function(filtroEquipo) {
        $scope.filtroEquipo=filtroEquipo.substr(0,1);
        ValoreConFiltro();
    }
    $scope.selectUpdatedAcc = function(filtroAccion) {
        $scope.filtroAccion=filtroAccion.substr(0,1);
        ValoreConFiltro();
    }


    ValoreConFiltro=function(){
      // console.log("Filtro cambiado: ");      
      // console.log("Periodo: " + $scope.filtroPeriodo);
      // console.log("Equipo: " + $scope.filtroEquipo);
      // console.log("Accion: " + $scope.filtroAccion);

      $scope.ElHistorico=F_Historico.fitro($scope.filtroPeriodo,$scope.filtroEquipo, $scope.filtroAccion);    
      

    } 




    $scope.LaAccion=function(vAccion){
      switch(vAccion) {
      case "C":
          return "Cambio"
          break;
      case "P":
          return "Canasta"
          break;
      case "F":
          return "Falta"
          break;

      default:
      };

    }    
    
    $scope.Titulo=function(){
      switch($scope.Opcion) {
      case "L":
          return "Local"
          break;
      case "V":
          return "visitante"
          break;
      case "T":
          return "Historico de acciones"
          break;

      default:
      };

    }


    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {


})


.controller('LocalCtrl', function($scope, $stateParams,EquipoLocal) {
     $scope.EquipoLocal=EquipoLocal.getPlayers();
     console.log(JSON.stringify($scope.EquipoLocal));
     $scope.Nombre=EquipoLocal.getNombre();
     $scope.width = '80px';
     $scope.bgColor = 'grey';
    
     $scope.value=true;
     $scope.data = {
          showDelete: $scope.value,
          showReorder: !$scope.value
        };
        

      $scope.toggleChange = function(){
        $scope.value=!$scope.value;
        $scope.data.showDelete=$scope.value;
        $scope.data.showReorder=!$scope.value;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {  
          EquipoLocal.Cambio(fromIndex, toIndex);  
      };


      $scope.guardarDatos=function(){
          EquipoLocal.GuardarDatosFich();
      }
})

.controller('VisitanteCtrl', function($scope, $stateParams,EquipoVisitante) {

     
     $scope.EquipoVisitante=EquipoVisitante.getPlayers();
     $scope.Nombre=EquipoVisitante.getNombre();
     $scope.width = '80px';
     $scope.bgColor = 'grey';
    
     $scope.value=true;
     $scope.data = {
          showDelete: $scope.value,
          showReorder: !$scope.value
        };
        

      $scope.toggleChange = function(){
        $scope.value=!$scope.value;
        $scope.data.showDelete=$scope.value;
        $scope.data.showReorder=!$scope.value;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {  
          EquipoVisitante.Cambio(fromIndex, toIndex);  
      };


      $scope.guardarDatos=function(){
          EquipoVisitante.GuardarDatosFich();
      }

})

.controller('seleccionCtrl', function($scope,$state, $stateParams,EquipoVisitante,EquipoLocal) {
   var EsElEquipoLocal ;
   var ArrayJug=[];
   var CuantosPuntos=0;
   var EsFaltaPersonal =false;

   EsFaltaPersonal =$stateParams.EquipoPuntos.substr(1,1)=="1";
   EsElEquipoLocal=$stateParams.EquipoPuntos.substr(2,1)=="0";

   if (!EsElEquipoLocal)
   {
    NombreE=EquipoVisitante.getNombre(); 
    ArrayJug=EquipoVisitante.getPlayers();

   }
   else
   {

    NombreE=EquipoLocal.getNombre();
    ArrayJug=EquipoLocal.getPlayers();

   }
   $scope.EquipoPlayers=ArrayJug;
   $scope.Nombre=NombreE;
   $scope.EsUnaFaltaPersonal=EsFaltaPersonal;
   CuantosPuntos=parseInt($stateParams.EquipoPuntos.substr(4));
   switch(CuantosPuntos) {
    case 1:
        $scope.TextoCanasta="Tiro libre"
        break;
    case 2:
        $scope.TextoCanasta="Canasta de dos"
        break;
    default:
    };

   $scope.RealizarAccion=function(idJugador){
      if (!EsFaltaPersonal){

          if (EsElEquipoLocal)
          {
              EquipoLocal.sumPuntos(CuantosPuntos,idJugador)
          }
          else
          {
              EquipoVisitante.sumPuntos(CuantosPuntos,idJugador);
          };
      } else {
          if (EsElEquipoLocal)
          {
              EquipoLocal.faltaPersonal(1,idJugador)
          }
          else
          {
              EquipoVisitante.faltaPersonal(1,idJugador);
          };

      };
      if (EsElEquipoLocal)
      {
          EquipoLocal.GuardarDatosFich(false);
      }
      else
      {
          EquipoVisitante.GuardarDatosFich();
      }
      
      $state.go('tab.dash');
   };


})


.controller('AccountCtrl', function($scope,EquipoVisitante,EquipoLocal,Periodo,F_Historico, $ionicPopup) {
   $scope.checkboxModel = {
       Rockeros : true
   }

    // A confirm dialog
  $scope.VaciarDatos = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Reiniciar',
       template: '¿Estas seguro que quieres reiniciar?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         VaciarDatos2();
       } else {

       }
     });
   };

  VaciarDatos2=function(){
      console.log('eeee');
       localStorage.clear();
       Periodo.Reiniciar();
       F_Historico.clear();
       EquipoLocal.LimpiarJugadores($scope.checkboxModel.Rockeros);
       EquipoVisitante.LimpiarJugadores();
  }


});
