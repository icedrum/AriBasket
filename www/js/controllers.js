angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,EquipoLocal,EquipoVisitante,Periodo) {
  // $scope.EquipoLocalNombre=EquipoLocal.getNombre();
  // $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
  // $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
  // $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();

  $scope.init = function () {
      // check if there is query in url
      // and fire search in case its value is not empty
      console.log("A ver");
  };


  $scope.$on('$ionicView.enter',function(e){
    $scope.EquipoLocalNombre=EquipoLocal.getNombre();
    $scope.EquipoLocalPuntos=EquipoLocal.getPuntos();
    $scope.EquipoVisitanteNombre=EquipoVisitante.getNombre();
    $scope.EquipoVisitantePuntos=EquipoVisitante.getPuntos();
    $scope.Queperiodo=Periodo.PonerNombreCuarto();
  });



})

.controller('ChatsCtrl', function($scope,  $stateParams,F_Historico,EquipoVisitante) {
    $scope.ElHistorico=F_Historico.all();

    $scope.EquipoV=EquipoVisitante.getPlayers();
    // L  local      V visitante       T todos
    var Opcion =$stateParams.OpcionEquipoJugador.substr(1,1);
    if (Opcion="") Opcion="T";
    var Jugador=$stateParams.OpcionEquipoJugador.substr(2);

    console.lo(Opcion);
    $scope.Titulo=function(){
    switch(Opcion) {
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

    
    $scope.NombreJugador = function(id){
      
      return $scope.EquipoV[id].nombre;
      
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
     $scope.width = '120px';
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
