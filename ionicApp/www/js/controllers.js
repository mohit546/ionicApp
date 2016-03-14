angular.module('ionicApp.controllers', [])

.controller('ionicAppCtrl', function($scope, $ionicModal, localStorageService){
	$scope.tasks = [];
	$scope.task = {};

	$ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newTaskModal = modal;
    });

	$scope.getTasks = function(){
		if (localStorageService.get('taskData')) {
			$scope.tasks = localStorageService.get('taskData');
		} else {
			$scope.tasks = [];
		}
	};
	$scope.createTask = function(){
		$scope.tasks.push($scope.task);
		localStorageService.set('taskData', $scope.tasks);
		$scope.task = {};
		$scope.newTaskModal.hide();
	};
	$scope.removeTask = function(index){
		console.log($scope.tasks);
		$scope.tasks.splice(index, 1);
		localStorageService.set('taskData', $scope.tasks);
	};
	$scope.completeTask = function(index){
		if (index !== -1) {
			$scope.tasks[index].completed = true;
		}
		localStorageService.set('taskData', $scope.tasks);
	};

	$scope.openTaskModal = function () {
		$scope.newTaskModal.show();
	};

	$scope.closeTaskModal = function () {
		$scope.newTaskModal.hide();
	};
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
	Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
	enableFriends: true
  };
});
