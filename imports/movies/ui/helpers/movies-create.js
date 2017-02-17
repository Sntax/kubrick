import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-create.html';

Template.moviesCreate.events({
  /**
   * Creates a movie on submission.
   *
   * @param { Object } javascript event object
   * @return { Function } call to insert data into the Movies collection
   */
  'submit form'(event) {
    event.preventDefault();

    const title = document.querySelector('.title input').value;
    const year = document.querySelector('.year input').value;
    const director = document.querySelector('.director input').value;
    const cast = document.querySelector('.cast textarea').value;
    const description = document.querySelector('.description textarea').value;

    return Movies.insert({
      title,
      year,
      director,
      cast,
      description,
    }, (error) => {
      if (error) {
        throw new Meteor.Error('500', 'Error adding a new movie', error);
      }

      FlowRouter.go('/movies');
    });
  },

  /**
   * Navigate back to the movies list view when clicking the cancel button.
   *
   * @param { Object } javascript event object
   * @return { Function } navigate to the movies list view
   */
  'click .cancel'(event) {
    event.preventDefault();

    return history.back();
  },
});
