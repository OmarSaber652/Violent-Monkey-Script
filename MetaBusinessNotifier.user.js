// ==UserScript==
// @name         Meta Business Notifier
// @namespace    OmarSaber
// @version      1.2
// @author       Omar Saber
// @description  Notify when a NEW incoming message arrives
// @match        https://business.facebook.com/latest/inbox/*
// @updateURL    https://raw.githubusercontent.com/OmarSaber652/Violent-Monkey-Script/master/MetaBusinessNotifier.user.js
// @downloadURL  https://raw.githubusercontent.com/OmarSaber652/Violent-Monkey-Script/master/MetaBusinessNotifier.user.js
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    console.log("==================================");
    console.log(" Meta Business Notifier v1.1");
    console.log("==================================");

    //-----------------------------------
    // Notification Permission
    //-----------------------------------

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    //-----------------------------------
    // Wait Until Meta Loads
    //-----------------------------------

    function waitForThread() {

        const row = document.querySelector('[data-surface*="thread_row0"]');

        if (!row) {
            setTimeout(waitForThread, 1000);
            return;
        }

        start(row);

    }

    //-----------------------------------
    // Main
    //-----------------------------------

    function start(row) {

        let fingerprint = row.innerText;

        console.log("✅ Initial fingerprint saved.");

        const observer = new MutationObserver(() => {

            const current = row.innerText.trim();

            if (current === fingerprint)
                return;

            fingerprint = current;

            //-----------------------------------
            // Ignore our own messages
            //-----------------------------------

            if (current.includes("أنت:")) {

                console.log("⏭ Ignored (Outgoing Message)");

                return;
            }

            //-----------------------------------
            // Incoming Message
            //-----------------------------------

            console.clear();

            console.log("==================================");
            console.log("📩 NEW INCOMING MESSAGE");
            console.log("==================================");

            console.log(current);

            notify();

            playSound();

        });

        observer.observe(row, {
            childList: true,
            subtree: true,
            characterData: true
        });

    }

    //-----------------------------------
    // Notification
    //-----------------------------------

    function notify() {

        if (Notification.permission !== "granted")
            return;

        new Notification("📩 رسالة جديدة", {
            body: "وصلت رسالة جديدة على Meta Business"
        });

    }

    //-----------------------------------
    // Sound
    //-----------------------------------

    function playSound() {

        const audio = new Audio(
            "https://raw.githubusercontent.com/OmarSaber652/Meta-Business-Notifier/main/sounds/notification.mp3"
        );

        audio.volume = 0.7;

        audio.play().catch(() => { });

    }

    waitForThread();

})();