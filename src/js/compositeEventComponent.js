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
                    "onInitialEvent": "{that}.events.onSingleEventA"
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
                    "onSubsequentEvent": "{that}.events.onSingleEventB"
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
        invokers: {
            fireAllEvents: {
                funcName: "sjrk.storyTelling.fireBothEvents",
                args: ["{that}.events.onSingleEventA", "{that}.events.onSingleEventB"]
            }
        }
    });

    sjrk.storyTelling.fireBothEvents = function (eventA, eventB) {
        eventA.fire();
        eventB.fire();
    };

})(jQuery, fluid);
