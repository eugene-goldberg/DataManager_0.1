angular.module('FileUploadCtrl', [])
    .controller('FileUploadController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        console.log('This is File Upload Controller');

        $scope.inputCategories = [
            {
                name: "Category 1"
            },
            {
                name: "Category 2"
            },
            {
                name: "Category 3"
            }
        ];

        var selectedCategory;



        var uploader = $scope.uploader = new FileUploader({
            url: 'http://10.211.55.25:8080/api/files',
            tabName: 'sheet1'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {

            angular.forEach( $scope.outputCategories, function( value, key ) {
                selectedCategory = value.name;
                item.formData.push({subjectCategory: selectedCategory});
            });

            item.formData.push({tabName: $scope.tabName,
                                originalDocumentName: $scope.originalDocumentName,

                                subject:    $scope.subject,
                                documentAuthor: $scope.documentAuthor,
                                dateDocumentProduced: $scope.dateDocumentProduced,
                                dateDocumentReceived: $scope.dateDocumentReceived,
                                documentSubmitter: $scope.documentSubmitter,
                                documentReviewer:   $scope.documentReviewer,
                                dataFields: $scope.dataFields});
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);
