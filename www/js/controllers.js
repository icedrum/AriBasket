angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,EquipoLocal,EquipoVisitante,Periodo) {
  // $scope.EquipoLocalNombre=EquipoLocal.getNombre();
  // $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
  // $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
  // $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();




  $scope.valor=Periodo.Tiempo100();
  


  $scope.$on('$ionicView.enter',function(e){
    $scope.EquipoLocalNombre=EquipoLocal.getNombre();
    $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
    $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
    $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();
    $scope.Queperiodo=Periodo.PonerNombreCuarto();
    $scope.QueMinuto=Periodo.TiempoFormateado(); 

  });

  

  $scope.CambioSlide=function(value){
      Periodo.PonerMinutosDesde100(value);
      $scope.QueMinuto=Periodo.TiempoFormateado(); 
  };
})

.controller('ChatsCtrl', function($scope,  $stateParams,F_Historico,EquipoVisitante) {
    
        $scope.ElHistorico=F_Historico.all();

        
        // L  local      V visitante       T todos
        //if ($stateParams.OpcionEquipoJugador=="") $stateParams.OpcionEquipoJugador="T";
        $scope.Opcion =$stateParams.OpcionEquipoJugador.substr(1,1);
        $scope.IdJugador=$stateParams.OpcionEquipoJugador.substr(2);
        console.log(        $scope.Opcion + " " + $stateParams.OpcionEquipoJugador);
        
        $scope.AuxId=110;
  
    $scope.$on('$ionicView.enter',function(e){
      $scope.EquipoV=EquipoVisitante.getPlayers();
      if ($scope.Opcion == "V") {          
          $scope.jugador= $scope.EquipoV[$scope.IdJugador];
        } else {

        } 
    });
    

    $scope.NombreJugador=function(LocalVisitante,KJugador){
        console.log("E" + LocalVisitante + " -  " + String(KJugador) );
        
        if (String(LocalVisitante) == "V") {          
          return $scope.EquipoV[KJugador].nombre;
        } else {
          return "";
        } 
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
  // $scope.chats = Chats.all();
    $scope.jugadoresL=EquipoLocal.getPlayers();
    $scope.vEquipoLocal=EquipoLocal.getNombre();
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

      }
      $state.go('tab.dash');
   };


})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
})




;
