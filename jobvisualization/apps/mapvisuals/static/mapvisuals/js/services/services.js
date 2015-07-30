app
.service( 'Book', [ '$rootScope', function( $rootScope ) {

	this.functionName = function ( book ) {
		$rootScope.$broadcast( 'books.update' );
	};

}]);