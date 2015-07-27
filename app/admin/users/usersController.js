'use strict';

define([], function() {
    return function($scope, contactsService) {

      var self = this;

      this.sortType = 'username';
      this.sortReverse = false;
      this.searchTerm = '';

      this.contacts = [];
      this.itemsPerPage = 20;
      this.currentPage = 0;
      this.numberOfContacts = 0;

      this.pageChanged = function(n) {
        self.currentPage = n;
        self.updateResults();
      };

      this.sortChanged = function() {
        self.updateResults();
      };

      this.updateResults = function() {
        self.getResultsPage(self.currentPage, self.sortType, self.sortReverse, self.searchTerm);
      };

      this.updateNumberOfResults = function() {
        var numberOfContactsPromise = contactsService.getNumberOfContacts(self.searchTerm);
        numberOfContactsPromise.then(function(numberOfContacts) {
          self.numberOfContacts = numberOfContacts;
          self.pageChanged(self.currentPage);
        });
      };

      this.getResultsPage = function(pageNumber, sortKey, descending, searchTerm) {
        var contactsPagePromise = contactsService.getContactsListPage(pageNumber, self.itemsPerPage, sortKey, descending, searchTerm);
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

      this.updateNumberOfResults();
    };
});
