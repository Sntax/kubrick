import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Movies } from '/imports/movies/api/collection.js';
import '/imports/movies/ui/templates/movies-edit.html';

//
Template.moviesEdit.onCreated(() => {
  const templateInstance = Template.instance();

  Tracker.autorun(() => {
    templateInstance.movieId = FlowRouter.getParam('id');

    Meteor.subscribe('movies');
  });
});

//
Template.moviesEdit.helpers({
  /**
   *
   */
  movie: () => {
    const templateInstance = Template.instance();
    return Movies.findOne({ _id: templateInstance.movieId });
  },
});

//
Template.moviesEdit.events({
  /**
   *
   */
  'submit form'(event, template) {
    event.preventDefault();

    const title = document.querySelector('.title input').value;
    const location = document.querySelector('.location input').value;
    const description = document.querySelector('.description textarea').value;

    return Movies.update({
      _id: template.movieId,
    }, {
      $set: {
        title,
        location,
        description,
      },
    }, (error) => {
      if (error) {
        return sAlert.error(`There was an error editing ${title}.`);
      }

      sAlert.success(`${title} has been successfully updated.`);

      FlowRouter.go(`/movies/${template.movieId}`);
    });
  },

  /**
   *
   */
  'click .cancel'(event, template) {
    event.preventDefault();
    FlowRouter.go(`/movies/${template.movieId}`);
  },
});
