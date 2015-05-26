angular.module('TabCtrl', ['ui.bootstrap'])
    .controller("TabController", ['$scope','$http', function ($scope, $http) {
        console.log("This is TabController");
        var setAllInactive = function() {
            angular.forEach($scope.workspaces, function(workspace) {
                workspace.active = false;
            });
        };

        var Site = {
            numberOfMainframes: undefined,
            numberOfStorageFrames:  undefined,
            numberOfUnixServers:  undefined,
            numberOfBladeCenters: undefined,
            numberOfX86Servers: undefined
        };

        var addNewWorkspace = function() {
            var id = $scope.workspaces.length + 1;
            $scope.workspaces.push({
                id: id,
                name: "Sheet " + id,
                active: true
            });
        };

        $scope.workspaces =
            [
                { id: 1, name: "Sheet 1" ,active:true  },
                { id: 2, name: "Sheet 2" ,active:false  }
            ];

        $scope.addWorkspace = function () {
            setAllInactive();
            addNewWorkspace();
        };

        $scope.removeWorkspace = function() {
            angular.forEach($scope.workspaces, function(workspace) {
                if(workspace.active){
                    var index = $scope.workspaces.indexOf(workspace);
                    console.log('Active Workspace id: ' + index);
                    $scope.workspaces.splice(index,1);
                }
            })
        };

        $scope.collectValuesFromEachTab = function(){

            $scope.quote = new Object();
            $scope.quote.SalesForceId = $scope.salesForceId;
            $scope.quote.AccountName = $scope.accountName;
            $scope.quote.siteCollection = [];

            angular.forEach($scope.workspaces, function(workspace) {
                //console.log("Site: " + workspace.name);
                //console.log("Number of Mainframes: " + workspace.numberOfMainframes);
                //console.log("Number of Starage Frames" + workspace.numberOfStorageFrames);
                //console.log("Number of Unix/AIX Servers: " + workspace.numberOfUnixServers);
                //console.log("Number of Blade Centers: " + workspace.numberOfBladeCenters);
                //console.log("Number of x86 Servers: " + workspace.numberOfx86Servers);

                var site = new Object();
                site.SiteName = workspace.name;
                site.NumberOfMainframes = workspace.numberOfMainframes;
                site.NumberOfStorageFrames = workspace.numberOfStorageFrames;
                site.NumberOfUnixServers = workspace.numberOfUnixServers;
                site.NumberOfBladeCenters = workspace.numberOfBladeCenters;
                site.NumberOfX86Servers = workspace.numberOfx86Servers;

                $scope.quote.siteCollection.push(site);
            });
            var res = $http.post('http://10.211.55.26:8081/api/dcquote/testquote', $scope.quote);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }

    }]);
