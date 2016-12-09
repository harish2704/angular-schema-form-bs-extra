/* ഓം ബ്രഹ്മാർപ്പണം. */

angular.module( 'asf.bs-extra', ['ui.select', 'ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngImgCrop' ] )
  .service( 'bseDataSource', function(){
    var sources = {};
    this.addSource = function( name, fn ){
      sources[name] = fn;
    };

    this.search = function ( ref, str ){
      var searchFn = sources.default;
      if( ref && ref.searchFn ){
        searchFn = sources[ref.sourceFn];
        if( !searchFn ){
          throw new Error('asf-bs-extra: Search function '+ref.searchFn+' is not registered' );
        }
      }
      return searchFn( ref, str );
    };
  })
  .controller( 'typeaheadCtrl', [ '$scope', 'bseDataSource', '$interpolate', function( $scope, bseDataSource, $interpolate ){
    var functionCache = {};
    $scope.optionsData = [];
    function fillArr( arr, items ){
      arr.splice(0);
      items.forEach( function(v){ arr.push(v); });
    }

    $scope.search = function(ref, str ){
      if( str === ''){ str = $scope.model[$scope.form.key]; }
      if( $scope.form.isAsync ){
        bseDataSource.search( ref, str ).then( function( items ){
          fillArr( $scope.optionsData, items );
        });
      } else {
        fillArr( $scope.optionsData, bseDataSource.search( ref, str ) );
      }
    };

    $scope.getVal = function( item, prop ){
      if( prop === undefined ){ return item; }
      if( !functionCache[prop] ){
        functionCache[prop] = $interpolate( prop );
      }
      return functionCache[prop](item);
    };
  }])
  .directive( 'bseFileupload', [ 'Upload', function( Upload ){
    return {
      restrict: 'A',
      scope:    true,
      require:  'ngModel',
      link:     function (scope, element, attrs, ngModel) {

        scope.isImage = /image\//.test( scope.form.accept );
        scope._state = 'empty';

        scope.fieldName = scope.form.key[0];
        scope.picFile = null;

        scope.$watch( attrs.ngModel, function(){
          scope.itemVal = ngModel.$modelValue;
          scope._state = ( scope.itemVal && Object.keys( scope.itemVal ).length ) ? 'loaded' : 'empty';
        });

        scope.$watch( 'picFile', function( newVal, old, scope ){
          if( newVal ){
            scope._state = 'changed';
          }
        });


        function setModelValue( ngModel, val ){
          if( ngModel.$modelValue ){
            Object.assign( ngModel.$modelValue, val );
            scope._state = 'loaded';
          } else {
            ngModel.$setViewValue( val, 'change' );
            ngModel.$commitViewValue();
          }
        }


        function _upload ( file ) {
          Upload.upload({
            url: '/upload?group=' + scope.form.groupName,
            data: {
              file: file,
            },
          }).then(function (response) {
            setModelValue( ngModel, response.data[0] );
          }, function (response) {
            if (response.status > 0) scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          });
        }

        scope.upload = function( dataUrl, name ){
          _upload( Upload.dataUrltoBlob( dataUrl, name ) );
        };
        scope.uploadFile = _upload;
      }
    };
  }]);

angular.module('asf.bs-extra').config(
  ['schemaFormDecoratorsProvider', 'sfBuilderProvider', 'schemaFormProvider', 'sfPathProvider',
    function (schemaFormDecoratorsProvider, sfBuilderProvider, schemaFormProvider, sfPathProvider ) {

      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'bse:multiselect',
        'asf-bs-extra/multi-select.html',
        sfBuilderProvider.stdBuilders
      );
      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'bse:select',
        'asf-bs-extra/select.html',
        sfBuilderProvider.stdBuilders
      );
      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'bse:datetime',
        'asf-bs-extra/datetime.html',
        sfBuilderProvider.stdBuilders
      );
      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'bse:fileupload',
        'asf-bs-extra/fileupload-file.html',
        sfBuilderProvider.stdBuilders
      );
      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'bse:typeahead',
        'asf-bs-extra/typeahead.html',
        sfBuilderProvider.stdBuilders
      );
    }]);

