/*
Copyright 2017 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/BlueSlug/composite-event-bug/master/LICENSE.txt
*/

/* global fluid, sjrk */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.storyTelling.compositeEventComponent", {
        gradeNames: ["fluid.viewComponent"],
        events: {
            "onSingleEventA": null,
            "onAllEvents": {
                events: {
                    "onInitialEvent": "{that}.subcomponentA.events.onSubEvent"
                }
            }
        },
        listeners: {
            "onSingleEventA.log": {
                "this": "console",
                "method": "log",
                "args": ["A fired"]
            },
            "onAllEvents.log": {
                "this": "console",
                "method": "log",
                "args": ["All events fired"]
            }
        },
        components: {
            subcomponentA: {
                type: "sjrk.storyTelling.compositeEventSubcomponent"
            }
        }
    });

    fluid.defaults("sjrk.storyTelling.compositeEventComponentWithExtension", {
        gradeNames: ["sjrk.storyTelling.compositeEventComponent"],
        selectors: {
            testButton: ".sjrkc-storyTelling-testButton"
        },
        events: {
            "onSingleEventB": null,
            "onAllEvents": {
                events: {
                    "onSubsequentEvent": "{that}.subcomponentB.events.onSubEvent"
                }
            }
        },
        listeners: {
            "onSingleEventB.log": {
                "this": "console",
                "method": "log",
                "args": ["B fired"]
            }
        },
        components: {
            subcomponentB: {
                type: "sjrk.storyTelling.compositeEventSubcomponent"
            }
        },
        invokers: {
            fireAllEvents: {
                funcName: "sjrk.storyTelling.fireBothEvents",
                args: ["{that}.subcomponentA.events.onSubEvent", "{that}.subcomponentB.events.onSubEvent"]
            }
        }
    });

    fluid.defaults("sjrk.storyTelling.compositeEventSubcomponent", {
        gradeNames: ["fluid.component"],
        events: {
            "onSubEvent": null
        },
        listeners: {
            "onSubEvent.log": {
                "this": "console",
                "method": "log",
                "args": ["Subevent fired"]
            }
        }
    });

    sjrk.storyTelling.fireBothEvents = function (eventA, eventB) {
        eventA.fire();
        eventB.fire();
    };

})(jQuery, fluid);
