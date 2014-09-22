angular.module('gsApp.workspaces.workspace', [
  'ngGrid', 'ngSanitize', 'ui.router',
])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home/maps');

      $stateProvider
        .state('workspace.home', {
          url: '',
          templateUrl: '/workspaces/detail/workspace-home.tpl.html',
          controller: 'WorkspaceHomeCtrl'
        })
        .state('workspace.home.maps', {
          url: '/maps',
          templateUrl: '/workspaces/detail/workspace-maps.tpl.html'
        })
        .state('workspace.home.data', {
          url: '/data',
          templateUrl: '/workspaces/detail/workspace-data.tpl.html'
        });
    }])
.controller('WorkspaceHomeCtrl', ['$scope', '$stateParams',
  'GeoServer', '$log', '$sce', 'baseUrl', '$window', '$state',
    function($scope, $stateParams, GeoServer, $log, $sce, baseUrl,
      $window, $state) {

      // Allow tabs in url
      $scope.tabs = [
        { heading: 'Maps', route:'workspace.home.maps', active:false },
        { heading: 'Data', route:'workspace.home.data', active:false }
      ];
      $scope.go = function(route){
        $state.go(route);
      };
      $scope.active = function(route){
        return $state.is(route);
      };
      $scope.$on('$stateChangeSuccess', function() {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
      });

      var wsName = $stateParams.workspace;
      $scope.title = wsName;
      $scope.thumbnails = {};
      $scope.olmaps = {};

      // Maps

      GeoServer.maps.get({workspace: wsName}).$promise
        .then(function(maps) {

          $scope.maps = maps;

          // load all map thumbnails & metadata
          for (var i=0; i < $scope.maps.length; i++) {
            var map = $scope.maps[i];
            var layers = '';

            $scope.maps[i].workspace = wsName;
            $scope.maps[i].layergroupname = wsName + ':' + map.name;
            $scope.maps[i].layerCount = map.layers.length;
            var bbox = $scope.maps[i].bbox = '&bbox=' + map.bbox.west +
             ',' + map.bbox.south + ',' + map.bbox.east + ',' +
             map.bbox.north;

            var url = GeoServer.map.thumbnail.get(map.workspace, map,
              map.layergroupname, 250, 250);
            var srs = '&srs=' + map.proj.srs;

            $scope.thumbnails[map.name] = baseUrl + url + bbox +
              '&format=image/png' + srs;
          }
        });

      $scope.sanitizeHTML = function(description) {
        return $sce.trustAsHtml(description);
      };

      $scope.newOLWindow = function(map) {
        var baseUrl = GeoServer.map.openlayers.get(map.workspace,
          map.name, map.bbox, 800, 500);
        $window.open(baseUrl);
      };

      $scope.onEdit = function(map) {
        $state.go('map.compose', {
          workspace: map.workspace,
          name: map.name
        });
      };

      // Data

      $scope.datastores = GeoServer.datastores.get().datastores; // stub

      $scope.pagingOptions = {
        pageSizes: [25, 50, 100],
        pageSize: 25
      };
      $scope.gridOptions = {
        data: 'datastores',
        columnDefs: [
          {field: 'workspace', displayName: 'Workspace'},
          {field: 'store', displayName: 'Store'},
          {field: 'type', displayName: 'Data Type'},
          {field: 'source', displayName: 'Source', width: '30%'},
          {field: 'description', displayName: 'Description', width: '20%'},
          {field: 'srs', displayName: 'SRS'}
        ],
        enablePaging: true,
        enableColumnResize: false,
        showFooter: true,
        pagingOptions: $scope.pagingOptions,
        filterOptions: {
          filterText: '',
          useExternalFilter: true
        }
      };

    }]);

