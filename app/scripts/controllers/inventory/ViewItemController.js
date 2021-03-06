(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewItemController: function(scope, routeParams , resourceFactory ,location,$modal) {
        scope.item = [];
        resourceFactory.itemResource.get({itemId: routeParams.id} , function(data) {
        	scope.item = data;
        });
        
        scope.deleteItem = function(){
            $modal.open({
                templateUrl: 'approve.html',
                controller: Approve,
                resolve:{}
            });
        
    		
    	};
    	var Approve = function ($scope, $modalInstance) {
            $scope.approve = function (act) {
                scope.approveData = {};
            resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
                    location.path('/inventory');

            });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
  });
  mifosX.ng.application.controller('ViewItemController', ['$scope', '$routeParams','ResourceFactory', '$location','$modal',mifosX.controllers.ViewItemController]).run(function($log) {
    $log.info("ViewItemController initialized");
  });
}(mifosX.controllers || {}));
