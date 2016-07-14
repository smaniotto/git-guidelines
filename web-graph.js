'use strict';

// --------------------------------------------
// ------------- WEB / BACKEND FLOW -----------
// --------------------------------------------

var webGraph = new GitGraph({
  template: "metro",
  orientation: "horizontal",
  mode: "compact",
  elementId: 'web-backend-graph',
});

// Init master and dev branches
var master = webGraph.branch('master')
                     .commit('Initial commit');
var dev = webGraph.branch('dev')
                  .commit('Dev branch');



// Graph epic
var epicGraph = dev.branch('epic/graph')
                   .commit('Steps epic');
var bernardoUi = epicGraph.branch('bernardo/ui')
                          .commit('Added UI');
var thiagoDep = epicGraph.branch('thiago/dependencies')
                         .commit('Added dependencies');

bernardoUi.merge(epicGraph);
thiagoDep.merge(epicGraph);

var thiagoGraph = epicGraph.branch('thiago/graph')
                           .commit('Loaded scripts')
                           .commit('Added web graph')
                           .commit('Added mobile graph')
                           .commit('Fixed code review comments - quotes consistency');
thiagoGraph.merge(epicGraph);



// Merge graph epic into dev
epicGraph.merge(dev);



// Steps epic
var epicSteps = dev.branch('epic/steps')
                   .commit('Graph epic');
var bernardoWeb = epicSteps.branch('bernardo/web')
                           .commit('Added web steps - part 1')
                           .commit('Added web steps - part 2');
var thiagoMobile = epicSteps.branch('thiago/mobile')
                            .commit('Added mobile steps - part 1')
                            .commit('Added mobile steps - part 2')
                            .commit('Added mobile steps - part 3');

bernardoWeb.merge(epicSteps);
thiagoMobile.merge(epicSteps);



// Hotfix -- in the middle of epic dev
var hotfix = master.branch('bernardo/fix-script-tag')
                   .commit('Removed unused closing script tag from index page.');
hotfix.merge(master);
master.merge(dev);



// Merge steps epic into dev
epicSteps.merge(dev);



// Merge dev into master
dev.merge(master);
