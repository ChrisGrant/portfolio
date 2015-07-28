'use strict';

define([], function() {
    return function($scope, contactsService, corporationsService) {

      var self = this;

      this.sortType = 'firstName';
      this.sortReverse = false;
      this.searchTerm = '';

      this.itemsPerPage = 20;

      this.corporations = [];

      corporationsService.getCorporationPage(0, 999999, "name").then(function(corporations) {
        self.corporations = corporations;
      });

      this.pageChanged = function() {
        self.updateResults();
      };

      this.sortChanged = function() {
        self.updateResults();
      };

      this.updateResults = function() {
        self.getResultsPage($scope.currentPage - 1, self.sortType, self.sortReverse, self.searchTerm);
      };

      this.updateNumberOfResults = function() {
        var numberOfContactsPromise = contactsService.getNumberOfContacts(self.searchTerm, self.selectedCorporation);
        numberOfContactsPromise.then(function(numberOfContacts) {
          $scope.totalItems = numberOfContacts;
          self.updateResults();
        });
      };

      this.getResultsPage = function(pageNumber, sortKey, descending, searchTerm) {
        var contactsPagePromise = contactsService.getContactsListPage(pageNumber, this.itemsPerPage, sortKey, descending, searchTerm, self.selectedCorporation);
        contactsPagePromise.then(function(contacts) {
          self.contacts = contacts;
          $scope.$apply();
        });
      };

      this.sortClicked = function(sortKey) {
        if (self.sortType === sortKey) {
          self.sortReverse = !self.sortReverse;
        }
        else {
          self.sortType = sortKey;
          self.sortReverse = false;          
        }
        self.updateResults();
      };


      this.selectedCorporationFilter = function(corporation) {
        self.selectedCorporation = corporation;
        self.updateNumberOfResults();
      };

      this.removeCorporationFilter = function() {
        self.selectedCorporation = undefined;
        self.updateNumberOfResults();
      };

      this.updateNumberOfResults();

      this.classForFilterItem = function(corporation) {
        if (corporation === self.selectedCorporation) {
          return "active";
        }
        return "";
      };

    };
});
