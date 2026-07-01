// ==UserScript==
// @name         Meta Business Notifier
// @namespace    OmarSaber
// @version      1.3
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

    const SOUND_BASE64 = `
    data:audio/ogg;base64,T2dnUwACAAAAAAAAAACW8P6AAAAAAL6V8HMBE09wdXNIZWFkAQE4AYC7AAAAAABPZ2dTAAAAAAAAAAAAAJbw/oABAAAAipCtBgEoT3B1c1RhZ3MGAAAAR29vZ2xlAQAAAA4AAABlbmNvZGVyPUdvb2dsZU9nZ1MABCmUAAAAAAAAlvD+gAIAAAAsy19ZLlCrRf8t+JKOiv89/z6UioqC/z7/L/8UgoaAhYN7dnl3cm1saWprZmdkYGVkOKL4f/xkF0rCTcBzdQ9XVRz8E599jFVtU3zJruXNr3efm8AAiDf5Gm7/eP7Julftocqi9oefBhHL+SSSYpeh8KP3JRpUbaNoWtSt05LpK8Krafh9x1WbHdEZk6TAM6tICyzRDW1pHkARR+zYr068+MGZlXENF3UcDrvgIDMP+AZ+XKPELLq2rVGs5Z4BjmPuXvNOY5FpsnN6VEGNNWKu+gFz76W3HRgxSXbrUyZTh1apHIrS9cksyfztG0xTy8Ufh1GgLSobDfSrqxoAGbzGqc1qb4WnCwlEEcLzPo/tzqdpXwiUMxFQOreOydTxJ105ID6rlgzNp8eOMYOrV/hhM1jA2wgRHrhI/Ep/wFNUlCQg0OnsKkahL6ZheI/XbjW7+leVup9UNZo0C5eJBZB0nALV4qBaiwjnkxuzztjWK7BAhfh+ob89/9wbvkWsOY98yyTlaJGjX9quyMT726vuHXr7oG2zdbY9kO1toILpXC7vU2VC/2vy0BjYC4sM/cMxHY6OyCgT4UkeGmXvy1r9b7u/E6Jsj0hOULIURWZlkHZ3y5LUQZPqeTy9tncNCVUy+aakviIOkRt5HOUOcHqfpfCS3QIOn1U453KYIfxBfDdG+zrO58WKOsvkbvGlDqQOyA4Ib7yT0u9ZV5gxXa0K2YcZH2HAgw6OTZzr6ttkyYNepu+4K8nx4WbW8/aGyGXQC7CM499EhCsQFlShp+FW4MgTE408cOanFqMIbmhaPS5hU0exGiaELQJDrjmZjK1xEWy1D1pPjETbIuVrJKBpcE0wMN+RXTAe9MLHUHD2QJ6tDSQWQBWOM8jM7KSe+Pi0ZQWJ3ReWgr94gJeFMIu0aDU3thvDt2VZFDWFkCvtGvZVsei1mroiKWycLF9qk4gFsqRBq/ATBkWwOmDMPwJ/E5jYdV5Oz1d0c8BlH0vNG925RYWJyhu/cNz5ELIAGx4ESxWm4/BF1iEcTgRnLY0rT+CkMkCrmD/YQznYHUVgaXxGMuwkqFX6qDVebDgFSN/xPsyL/Ejabmi4iWAz59ywwVDIzFm6qTCXM9mE1Oh8MUSXYAJlyEmjLP6o31ymD/Qy17i7g06WZaCw2Jg30SwoOVkxn3dbAcHN6JzHZlbVD+wvy5dMFV+tGhb/RUADxok1vx7OgpMQ+LN/pymB7tXwaabLKKSztyciuaxv6tnfSy8PoRryFB6QUOcf6J6sh0cSzbfsz/evKc6VBx6u2x9Dz5uqHjx8vlvrGFvuHuas13Cs/5AzZjPADGIacwt6N8xywmBaNxJTXKT6nk9n8NBa8PRUSzhyu7eSBDc6F19ujnkEP04TKeKHL8MuRltwMuybRGLF2EmChxf4QWCsdCA1+et7RCuOZVeL6p/t0emApF4ZcSVQRSn0hV8LG9TdWKiEnzj/TSjn+Gb6/VRQgwOrYAT6SdOvgZIDCjtkryRU3EW3JQ5LnLrN1qe7xm/35TVfgxcci7GYIY8BSDX3z9xxg/1hq+YsRh/ofivwePJrUtVApvS2/RBdcJ+4H7D/9Ty2XW5bAfGc+FFs0BYN6T21/moLJWxoNQfMbP3KYqi9Ti1rhPKaIg6cJbulYigUcNXlF3JnL36tRickjKO7EEsKnnkLYlhARuuVkMLhM6lax+3Y4lHHMmz/UmTw6OxUWvnF9E8O6pNAuIRx1LzBgpjwh6izQoEG8tabbg7LONalqRzu080xUz4MPDY6TaEftINN+H7aqGAvGYoGTc4BDdXim5mykj9rwwqbCU5f4vWyiowP1kDbLME7rPyec+LI+GSF9CUhdXTNMmqqSxJ3cBEOs0Q+iRxxbMM0z3KMMsjrG8yng+rzBqcmzg5rK1DGFFzhjzJ9NR08+lxuoIJ9IHrHxwxNTPDJ3YdryNe/1mVtfy58JzHSJfT1TTxkGHppEPGS6j1RA8F+sJ1Nm74ZIy5yB9lJ3OXY3wiCZPsL6L1QzuUJH/5xm60HjPCMHSXiZVZRNRsirkBepM9TQzAvlZ5UO2NGmXsSdm539uWsVAq3YCqz+d2ugf3WL6MJZNONUMyPQIiOLRv//1VI+r5XCajAwo7T/5fDHvquwNHQrE5yNnvU7DT5NqZZ2MKfojild3EzEq08uPeW15ZmB9SaFEfbGkvjs0BYaNnNMYosJfh1PNmnyY+3ku/ue+IJHrT1i5WQOnj1yt09L5E8YRCgA6bp44NO4a9JkwAnp22ojV8MMvXkW2VZe5HnOb21L81L3X3c36fm/5KQ4mzaIbcYAgqjjh1+DOVcKRiN63Gpy9AkVeu+76FbLLPkvj9oJqvT0fknwZUNJhG60yQ5MixIbx8jFL4P1y7uyZ7bc2GSGS0L+8Q89S6/7AhgaPO5Tu2UaYqF+P93XiFOTBKdBOaWVOSw2D+ne1hHr/geKIRAEh7PXZONQVmKqF2CwdWCz9VBUKP48XoyfZgLM5XC2j6uS6TsFxQ5Ow3vbWJXdeqgIZSJc66riU7PI2IEGGSWvs0uQ4r9dI81YrcGuAYfKVDqyVjuosoTl2uN2l0difiQ/0NwVPuLu+NoJALnlt87xmWOSfT7KlQnS+qLXYad+LJFciBMD+KiItYlx3EpNu8FufXUdde8vPLIz2Lf2Azg3W0tOe7+TNDmnKn88oOuvXMXCDQujV5TwtKN4/R/FVIAeX5/JtfxeeM6HH4XJ8vy5yNwqnpp4IBz4y9Limte0nyhjg7WBJQ7ShHU/2z7V8j4MumKDSG4ZlJLiLlZqoGSIaY1Ddzh4GMUYxoomRYNzTCdQvixiDUSIT++6lkQmDJb4r4HxWIOv9eR3MEgX5gz+Nmhysq5iCvh0ccxTu/kBYcGDqP0WJLOWgrOB7OFLrDQK4dfzwmOHhe7nuGmI+b5VombgWZrnVBPiZ9kJIP7nzVhK1Qz1ShIxshSX8oqKNPV8n4xzIJx0wAvg1iojgNWzg3eojpuFPYjsRDyQviyKj1W6p8l5I9zoesVOz1FyY1XJ4XA+Nbv2G44AgUE+19t0tx6JYUN5sAeQ5/xXC1cvy+y3a9EAFTaTbYSGLVHxCPrgdybdtFXu9vCLh3Sy3UAaEYJUhM+V+5/ZeVB6FV0iZuFR9u3bsQOJqmKdJhCAioobnEO/AkQz0FWnVPO2u/Yf6TaABpeQvhbIBW1e46b6/GJl1f4RzGHzFVdcgLqOMFtK7KPUK5vxqTBTj6IlrN1jv7e/c3XashM7xfklkfuKAeVI1DmQOIRmR0vCAaj7oBtUDMBnEVzQwNOVOj3PyAcCDKd2+QVP7e/HfNDQSHYvwLPZyxD53Y8uxo7/i4g5/B1G4hgHhuCOYb4f7xvgo6Tu1HfPvUqTWxkEECbT42qOwgvCj/B16NVpgl8Aj2tnTzsq5Y/VzbLuwHtNUtMC6+F6h8EaeUqTgqajuwFHAK5r9l6gdLC8OklCQ4GC2AClS8wy1KN1R2lG3+c0bGqD8v4ySwuB/9+084958nabvMJBFg6Q9N+wGU6+bWylTTqz6IIDhrW6fEeN0/taWLgkXX2NUxf45vh/MpyDVagg4Y4ybjpYmDo5v0PMjNIA3vX3UPd+FjegB2M0m1LpVFvyBVBiy+OhR5K7mh39eVTHzfe5OUX3mROFQ1d+vMRsFnm5z6+cvYFyJG0VgY34caOgRoOHDNMc/k8YvCLzkoae7h13q/x4kAifbFLvvYajCOxzOd2MMCUrxyB25Sqiw0qW3Pj66v/zmErp34o+H5kckOuzlxLcpT+Nvh3PG+WI6gHWiuWkXfiPqFCdq6WRIdMJf/gdXhYQlusfCXDfbtP5ePfqOHE0yJ8IgE35bHj+dKDgEuCyrgqvOOc2oIYure/h2ZzfFcLYYamfCFnNirXyCBLYPiqBTU696QEh15AE3qb9URmT5CQOppQkR2a01wgqjqBQIhwTx14Lf2OvLxsiibnuTO+gU1NHXqSdk0sJuwNY9rbiW0QAJyJKdEfRsB++rdo5EF+gd9D4qLdUNWFjlB+kmfa1VxONwDAJV0lzPNlr9hypxRXXreAMOIqrc2wFim1MV1OKVa9Fo6q3ignOelHXSMp3pg3MS//qsyT3QRS3w/Ssh/5pOAm6MtiyvoC2dwfFwWZZhGRSMLahX5SQ15VZcr8w0jTs4Ko/9ChUeT44vG2oT1v+J+/78HAT3CDOQ9HjAV69nEqxz42mj9AW2spmB6Ulf6qtfz4WF1FcOr2qxEcBsJDu1uuhbmuYpSUZZDdFdd5DGtlbhyO3p3pup6rXPdUgCPJCUuGppk4qIxxvphJZub7HoIwHHc0ZqYMONx3IobjPRssKR/8kxlmZCfojyxADv/gLR1uijnBpYT11x1/2jQYtLU6qA/JRRqM9EZ9X0yop0/au3xkEjxzHIX2HRe+NZmkhSww79qJcuc59oC5MtRMGG60S3+bjDY0muQ/RBsouzUydkr+L6d5nAfv8umOUuvE0rUAPddPYpSbJU+Wb+4MsMB57XWRWStZKU6AvgF/dKa76tsp5di/IhTVZhY5kdMQTLf4W3vTt5PPPmIee9cKCxqQCzn3ADHFozOSjhtuw6u7aSFpNZSdvcneyzd9AnTKKiFV1SfLWLbVJoIxkhfazN6JhPpFAEErSDGZksK4ZRzfiLLHisP54YxAk8RB2JIKXDj95I7iqrsppBf+k3L0kj5MukgJ3/JOPZHRFWEulLiq1yPx+FtQW/kFhlwaCV8A9jt5TS7K+2Iex/2v9F/smGoz4quGn6WLj0j6WPMNaRmzuh4i+WuImAl4pGz6WlwJBWknbRx2uoalyyq1ZC13eIHpq2jjtzQ2NQXkLGLKn4hq4ECXJRCi2q1bFh0i20HM/nalCk7tepmMI8vO9iU3AwufeLRiY3vUvXP4nTpVXdkngpYYv2zkMJA8iW58FGhCoQ+/w/NxavoAhskLNhtyttR/g4b4k+J6J1YQuVb3ICgz4Upt5+hvQTcZS3cy4VnCvAt8dhxhJkaBDHEi19RDfw5RFtkxJYEo2OvRjmfjsTEAD02D0mugFQgsvqxk77LDP5BnDx3Lv/N4dfheyz5sELfxL7t48XBYe41ZVOdJPMGSm9cbq743pJj/g7KuK8csPQx/2L804CPrr4+c5YB5TXyzX/AJAGjQQ85x5nbEDW18aUP1mM0HvS6ybEt6IASKdQJ/5CcfzL6Nfv3dAPpqi6y4GqUOUBZCOCVTcPYexUrXoUPPIb4T6b28QtnGIbv4nW2Zhk2Ex7gOx4QIqNj+ZGg+pGxRjijGgq5aCF9p8O3xvsZhhmpE4oZ+ExODROiKFJo+1QbLloDuNk7N5TJ4mdEAJSqlmMagdePxrNbVnla3LuO7EkJGbLg5KACyM/HWjd7W9DzV2noxqN8b+bWajoyhBqvz07hBTr4HqlPnZdhRdfidV1ZHyhIGnijlFNygZJ8A26rwgC8I3QmwFwqwCd5GDpvyvCSKgpCufmilOqnafdIiLLNxus61PvBAGsdecahblxvd1UBwx1G3MemkHGQWd0Dth+Eeur95ACpp4Kr+26L+4orOkJcnm76XH5x0cV83UZU/+AcS82yzdfidXXM5BmzfbEwAD58YScbniEIfNQK1kOeDkG961//YKk/F9VqVLHME+7+ONuCrAvw9UdgrIv4wJYXMKuKE2eCCSr2yp5VwEFzML1bJR9S1H0g0bCa8NyXuBmVSxTcZSYtiqj0pEuvF3y0M+NSvogA++xX8sHX4nVoOWbF4OOPhPMmK+Mi3ZQ931hG7i57Y5YGzgzvp/0UBTaMAjQDIPd+lMEWOBiGqL2Gvlmdo7il+EnpIINuktsNUN9Ah5/ZH9Ls25wKQekk6IjdHppbgYHhl8YZ30VqjVUHvjACLSUyjCb9ieN6ZaOxRAxcUXMx0+J06VC+4u2mTAPHERogRd3ofSMdECPd1tumR19nrkyzOY7A4bb1gJpFPr3WSYnwGUa3UvbACnf/2Mo2kfs4GRvkFKCcT5XaEkl+MwXnqGZDMdH0ElcsrOS6/rQSyZUQF4pH0i+fXAin2jMvGDJBc0Pz0DllgwnX4nV1whaO2tt45WEGhP/xY8WjFEbVpqpTl2bMqqejrjU4xhj6v+h3FOCwtfxoyLsyLyZOqy9ZswaulAmem/awz8o+ms4V3UgQDGRoXgVBLruKS2fXsy+W6XF0GtLdEXA55uLzUNwqHqvxkexLGzhRz/XX4nTmq5s+hOdnz/BMxWkN5PfmU+Lwi0ItfxjrnS8KUDzj8wuhRDAwizExToemUWei5rfyj4jVdDeOyKnxTA6QbRcwSa+YC//LudPM7QtyB+5N+1IMW4rRN4Ai2qdk3qaS/JKsiHTwbzamLOeJ1+J1YzVU3QLrTz5YvKffqASXMpMRUCVXQ3BE99wwd0f/+C8+7a/GO7o6RHtn/NUcIsB28PaxuvWqqeGB58ex0cP4RwwPxPVu8TEZdJgdCpGL/elyZaYGRl2RkDfama6VShgsMc+PY9ype70d1+J1eUIfK4ZbhVwkKUDylCE/JdDHUpX9uOC0qH3A9QRsUvuQXBXCMYiS8jqTmAdp5ThQ06gIZ9Nkyuy1jNv/kAwAK7atAx3p/tAz9bQs/q+4h9ttQlnrHzXOE7tZBH8jqvqIiLuA84W51+J1dIy6z/PCYjjFH+42rjQOfmEugkhZIX5NJiZcvm6qCJF/IthkY3XI/TMEWm0BD3WPnRcc0SB9cx9kX4FKf2UHco7kWflnV2+S4VwwQvmIIfji+Vx/AjtlVi4AXX71YWrJ6I2SmAoKTdfidXR2sT2gUDxFPlpJ0v6ateTDG9+Uid/aTtVQmYiPayuGawm8d6l48VwapRcYdVveoxOJqXS5IKWa5cYhojTy7+OmNv0+/EF7p3nh4zQcYZbKEDw03aheGmgve+H0R+1r00UjUccKDtYF1+J1eOlo/hwhLP/EvN+mpx4TFjAJMV5R+0c726OkAjTkoNdM3nICoOmNkPCgPo0/wB5TBp0v9IdCDlrpY9Uv4ftO99Ka3JCTiDfIKj3cMZ9T5isL6aDDzgl7dBjuHObKWRfFgnOpV+J1ubG+faHL/r6rMRQomXymCbf0G/YQ7CsvsZCZQdCFxzC8B+ko5Fiwi3OYTpoQT4ZqUKHE68VHWBDFasN5G3YswCDgik8QEDTORcQ5eLcWmCYiQrQCfDKVjCbkUdKK2yN3MBK4DVfhe5KLiOI7XHFnbEUFTDfiUtBz7GWzhgrD7Ol8MszrnF+eVtjgc/LJhRUnE+KsUgk4uaX9Hmfa6XvJAMTHgtTkSW+8qm/PPUJrHMQCqfee2/+Uut3XDFx28Bvv/r8vWY03rTpr4YHiasJXeT1WvBg5/0p7USVqii8E42Ht0jj78A0ZxbQnfkd+3QObwiECarX9+hgWZNsdYpAQhicFtI5TBbC2v0W+904qUNM+xqqt2AS4FO8wB4dCOyMa1wrE7I0Xow2f4YHkldmptjoaXv0PCZ/0qTqVQOC+eJLBP0K8knT2OFxSTpK1NurP3pJ1se92kvHSO9eEHF9HlnvwHNnHmr13T9+8nDgXIx3mW3Pt04MZ3AlcdnzJnm92J0q+6Izr2IPiRwiVIuvidXjGCKFXdhvyfuAq8Orh374P3HVa8onfMSQkekm8jHD+kurgnP96M8l4E5KQK228vsDcaf59K2y1W7xCFAFIhaUvIPyfaJI4txr6m3IfHtK+CZvRvYFAcEXUgObsicDLcXzX4YTqFKr3OCdDAZiwQv6/gNJX/oZr5Rn4extYXaT6oYr15sRKeIEp7FYkj+vxUze5nV2wpdpoPaPh9x7g+7iE4nm6+M6kjhPquk27N4GCh2aGIYj2M7nnm4r+YGFkPZQMfSvT7vgZB34xmEfRUilG4MRUgT7Fom+yNgfEh7xnIJ7nqYzmr3vxMRRMUTMwKhTxy21uWQO84pWdcb4MOUrDXd8mRDTfHfjhJgUKzhsCtA2ZAytpwDCGTFQhy+sTjLF8Zof0norqlEAc5ALqPKiOzly+LZI0IByMQnQ==
    `;
    function playSound() {

        const audio = new Audio(SOUND_BASE64);

        audio.volume = 0.7;

        audio.play().catch(() => { });

    }

    waitForThread();

})();