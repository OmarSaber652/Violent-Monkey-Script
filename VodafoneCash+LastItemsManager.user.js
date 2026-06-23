// ==UserScript==
// @name         Vodafone Cash + Advanced Last Items Manager for Foodics
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  تأكيد فودافون كاش + إدارة احترافية لـ Last Items بقوائم جاهزة وإضافة وحذف متقدم
// @author       Omar Saber
// @match        https://console.foodics.com/*
// @grant        GM_xmlhttpRequest
// @updateURL    https://raw.githubusercontent.com/OmarSaber652/Violent-Monkey-Script/master/VodafoneCash+LastItemsManager.user.js
// @downloadURL  https://raw.githubusercontent.com/OmarSaber652/Violent-Monkey-Script/master/VodafoneCash+LastItemsManager.user.js
// ==/UserScript==

(function () {
    'use strict';


    //////////////////////////// قوائم جاهزة ////////////////////////////
    const predefinedLastItems = {
        "فته لحمه": [
            "فتة لحم وسط",
            "فتة شاورما لحم",
            "فتة شاورما ميكس",
            "فتة ميكس",
            "لحم سايب"
        ],

        "فته فراخ": [
            "فتة فراخ",
            "فتة ميكس",
            "السنجل",
            "صينية الشيخ",
            "فتة شاورما دجاج",
            "دجاج سايب"

        ],

        "فراخ مكنه": [
            "فروج",
            "دبل ورك",
            "اوشا",
            "دوبل تشيكن",
            "الماجيك",
            "العز",
            "السنجل",
            "الملوكي"
        ],

        "رز": [
            "ارز",
            "ريزو",
            "فتة",
            "صدر",
            "ورك",
            "مع الارز",
            "دبل ورك",
            "اوشا",
            "ماجيك",
            "دبل تشيكن",
            "صينية",
            "وجبة كرسبى",
            "وجبة زنجر",
            "وجبة فاهيتا",
            "وجبة اسكالوب",
            "وجبة شيش",
            "السنجل",
            "الملوكي"
        ],
        "ماريا": [
            "ماريا",
            "دوبل تشيكن",
            "صينية العز"
        ],

        "فرنساوى": [
            "فرنساوى"
        ],

        "كيزر شاورما": [
            "كيزر"
        ],

        "شاورما فراخ": [
            "فتة فراخ",
            "فتة ميكس",
            "فتة شاورما دجاج",
            "دجاج سايب",
            "شاورما دجاج",
            "شاورما ميكس",
            "عربى دجاج",
            "عربى ميكس",
            "ماريا دجاج",
            "ماريا ميكس",
            "قطعة ميكس",
            "قطعة دجاج",
            "تريبل تيست",
            "بيتزا شاورما دجاج",
            "بيتزا شاورما فراخ",
            "بيتزا فورسيزون",
            "بيتزا ميكس فراخ",
            "كريب شاورما دجاج",
            "كريب سوبريم دجاج",
            "كريب ميكس فراخ",
            "الموف اون",
            "دوبل تشيكن",
            "العز",
            "السنجل",
            "الشيخ",
            "عكرش",
            "4 شاورما دجاج وسط + واحد هدية",
            "6 ساندوتش شاورما دجاج وسط + 2 هدية",
            "الفورسيزون"
        ],

        "شاورما لحمه": [
            "شاورما لحم",
            "شاورما ميكس",
            "عربى لحم",
            "عربى ميكس",
            "ماريا لحم",
            "ماريا ميكس",
            "فتة لحم",
            "فتة ميكس",
            "لحم سايب",
            "تريبل تيست",
            "قطعة لحم",
            "قطعة ميكس",
            "بيتزا شاورما لحم",
            "بيتزا ميكس لحوم",
            "بيتزا فورسيزون",
            "كريب شاورما لحم",
            "كريب ميكس لحوم",
            "الموف اون",
            "اوشا",
            "العز",
            "الفورسيزون"

        ],

        "فاهيتا فراخ": [
            "فاهيتا",
            "مكسيكانو"
        ],

        "شيش": [
            "شيش",
            "الماجيك",
            "صينية الصحاب",
            "صينية الشيخ",
            "بيتزا مكس دجاج",
            "بيتزا ميكس دجاج",
            "بيتزا سوبريم دجاج",
            "كريب سوبريم دجاج",
            "كريب ميكس دجاج",
            "كريب ايلاند",
            "كريب تشكين باربكيو",
            "كريب اطياب الشام"
        ],

        "كرسبي+زنجر+اسكالوب": [
            "كرسبى",
            "زنجر",
            "اسكالوب",
            "سكالوب",
            "بوكس تريبل تيست",
            "فتة ريزو",
            "سوبر كرانشي",
            "كريب ايلاند",
            "كريب اطياب الشام",
            "اوشا",
            "الموف اون",
            "الماجيك",
            "صينية الصحاب",
            "صينية الشيخ",
            "الصينية الملوكي",
            "بيتزا تشيكن رانش",
            "بيتزا تشيكن",
            "بيتزا تشكن",
            "الفورسيزون",
            "بطاطس كرسبى"
        ],

         "مفروم": [
            "مفروم",
            "ميكس لحوم",
            "مكس لحوم",
            "سوبريم لحم"
        ],
         "سجق": [
            "سجق",
            "ميكس لحوم",
            "مكس لحوم"
        ],
        "عكرش": [
            "عكرش"
        ],
        "كيزر برجر": [
            "ساندوتش برجر لحم"
        ]
        
    };

    const GOOGLE_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbzmgYKqlJnHIXFs7pp0UvNh1fh93Hm0XlpvMk_3L5tFr7kyM5cwYuK90EjEAa5rqbClXw/exec';


    async function savePresetsToGoogle(presets) {

        return new Promise((resolve) => {

            GM_xmlhttpRequest({

                method: 'POST',

                url: GOOGLE_SCRIPT_URL,

                headers: {
                    'Content-Type': 'application/json'
                },

                data: JSON.stringify(presets),

                onload: function (response) {

                    console.log(
                        'Google Save Success:',
                        response.responseText
                    );

                    resolve(true);
                },

                onerror: function (error) {

                    console.error(
                        'Google Save Error:',
                        error
                    );

                    resolve(false);
                }

            });

        });

    }

    async function loadPresetsFromGoogle() {

        return new Promise((resolve) => {

            GM_xmlhttpRequest({

                method: 'GET',

                url: GOOGLE_SCRIPT_URL,

                onload: function (response) {

                    try {

                        const data =
                            JSON.parse(response.responseText);

                        localStorage.setItem(
                            'lastPresets',
                            JSON.stringify(data)
                        );

                        let syncedItems = [];

                        data.forEach(preset => {

                            if (predefinedLastItems[preset]) {

                                syncedItems.push(
                                    ...predefinedLastItems[preset]
                                );

                            }

                        });

                        syncedItems = [...new Set(syncedItems)];

                        localStorage.setItem(
                            'lastItems',
                            JSON.stringify(syncedItems)
                        );

                        resolve(data);

                    } catch {

                        resolve([]);
                    }

                },

                onerror: function (error) {

                    console.error(
                        'Google Load Error:',
                        error
                    );

                    resolve([]);
                }

            });

        });

    }

    //////////////////////////// زر تأكيد الطلب ////////////////////////////
    function createVodafoneCashButton() {
        const originalSubmit = document.getElementById('order.submit');
        if (!originalSubmit || document.getElementById('vodafoneCashConfirmBtn')) return;

        originalSubmit.style.display = 'none';

        const confirmBtn = document.createElement('button');
        confirmBtn.id = 'vodafoneCashConfirmBtn';
        confirmBtn.textContent = 'تأكيد الطلب';
        confirmBtn.className = 'custom-button';

        originalSubmit.parentNode.insertBefore(confirmBtn, originalSubmit);

        confirmBtn.addEventListener('click', async () => {
            const hasLastItem = await checkLastItemsInOrder();

            if (hasLastItem) {
                openLastItemConfirmation(async (continueOrder) => {
                    if (!continueOrder) return;
                    proceedWithVodafoneCheck(originalSubmit);
                });

                return;
            }

            proceedWithVodafoneCheck(originalSubmit);
        });
    }

    //////////////////////////// متابعة التأكيد ////////////////////////////
    function proceedWithVodafoneCheck(originalSubmit) {
        openVodafoneCashPopup(async (confirmed) => {
            const noteField = document.getElementById('form_field_ملاحظات_الفاتورة');

            if (!noteField) {
                createWarningPopup('⚠️ لم يتم العثور على حقل الملاحظات!');
                return;
            }

            if (confirmed) {
                const text = "تم الدفع فودافون كاش";

                if (!noteField.value.includes(text)) {
                    await setNote(noteField, text);
                }
            }

            originalSubmit.disabled = false;
            originalSubmit.click();
        });
    }

    //////////////////////////// زر إدارة Last Items ////////////////////////////
    function createLastItemsButton() {
        const vodafoneBtn = document.getElementById('vodafoneCashConfirmBtn');
        if (!vodafoneBtn || document.getElementById('lastItemsBtn')) return;

        const lastBtn = document.createElement('button');
        lastBtn.id = 'lastItemsBtn';
        lastBtn.textContent = 'إدارة Last Items';
        lastBtn.className = 'custom-button';

        vodafoneBtn.insertAdjacentElement('afterend', lastBtn);

        lastBtn.addEventListener('click', manageLastItems);
    }

    //////////////////////////// التصميم ////////////////////////////
    const style = document.createElement('style');

    style.innerHTML = `
    .custom-button {
        background-color: #0066ff;
        color: white;
        font-size: 16px;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        cursor: pointer;
        margin-top: 12px;
        font-weight: 600;
        transition: background-color 0.3s, transform 0.2s;
    }

    .custom-button:hover {
        background-color: #0052cc;
        transform: translateY(-2px);
    }

    .custom-button:active {
        background-color: #0041a8;
        transform: translateY(0);
    }
`;

    document.head.appendChild(style);

    //////////////////////////// قراءة الطلب ////////////////////////////
    async function getOrderItems() {
        const itemsElements = document.querySelectorAll(
            '.py-4 .cursor-pointer .flex.justify-between .truncate .truncate label .font-semibold'
        );

        return Array.from(itemsElements).map(el => el.textContent.trim());
    }

    async function checkLastItemsInOrder() {
        const orderItems = await getOrderItems();

        const additionItemsElements = document.querySelectorAll('.truncate.me-2');

        const additionItems = Array.from(additionItemsElements)
            .map(el => el.textContent.trim())
            .filter(Boolean);

        const lastItems = JSON.parse(localStorage.getItem('lastItems') || '[]');

        const allItems = [...orderItems, ...additionItems];

        return allItems.some(orderItem =>
            lastItems.some(lastItem =>
                orderItem.includes(lastItem) ||
                lastItem.includes(orderItem)
            )
        );
    }

    //////////////////////////// قالب النوافذ ////////////////////////////
    function popupTemplate(title, content, width = '450px') {
        return `
    <style>
        #popupOverlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
        }

        #popupBox {
            background: white;
            padding: 30px;
            border-radius: 20px;
            width: ${width};
            text-align: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        #popupTitle {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
        }

        #popupClose {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4d4d;
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }

        select, textarea {
            font-size: 16px;
        }
    </style>

    <div id="popupOverlay">
        <div id="popupBox">
            <button id="popupClose">×</button>
            <div id="popupTitle">${title}</div>
            ${content}
        </div>
    </div>`;
    }

    //////////////////////////// فودافون كاش ////////////////////////////
    function openVodafoneCashPopup(onDecision) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('تأكيد فودافون كاش', `
        <div style="display:flex; justify-content:center; gap:40px;">
            <button id="cancelPayment" style="background:#e74c3c; color:white;">لا</button>
            <button id="confirmPayment" style="background:#2ecc71; color:white;">نعم</button>
        </div>
    `, '400px');

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#cancelPayment').onclick = () => {
            div.remove();
            onDecision(false);
        };

        div.querySelector('#confirmPayment').onclick = () => {
            div.remove();
            onDecision(true);
        };
    }

    //////////////////////////// تنبيه Last Item ////////////////////////////
    function openLastItemConfirmation(onDecision) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('⚠️ تنبيه Last Items', `
        <div style="font-size:18px; margin-bottom:20px;">
            هل أنت متأكد؟ الأصناف تحتوي على منتج Last Item
        </div>

        <div style="display:flex; justify-content:center; gap:30px;">
            <button id="cancelLastItem" style="background:#e74c3c; color:white;">لا</button>
            <button id="confirmLastItem" style="background:#2ecc71; color:white;">نعم</button>
        </div>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        div.querySelector('#cancelLastItem').onclick = () => {
            div.remove();
            onDecision(false);
        };

        div.querySelector('#confirmLastItem').onclick = () => {
            div.remove();
            onDecision(true);
        };
    }

    //////////////////////////// إدارة Last Items ////////////////////////////

    async function manageLastItems() {

        const activePresets =
            JSON.parse(
                localStorage.getItem('lastPresets') || '[]'
            );

        const presetCheckboxes = Object.keys(predefinedLastItems)
            .map(preset => {

                const isActive =
                    activePresets.includes(preset);

                return `
                <label style="
                    display:block;
                    text-align:right;
                    margin:6px 0;
                ">
                    <input
                        type="checkbox"
                        class="managePresetCheckbox"
                        value="${preset}"
                        ${isActive ? 'checked' : ''}
                    >
                    ${preset}
                </label>
            `;
            })
            .join('');

        const div = document.createElement('div');

        div.innerHTML = popupTemplate('⚙️ إدارة Last Items', `
        <div style="width:100%; text-align:center;">

            <div style="
                width:90%;
                margin:auto;
                max-height:300px;
                overflow:auto;
                border:1px solid #ddd;
                border-radius:8px;
                padding:10px;
                text-align:right;
            ">
                ${presetCheckboxes}
            </div>

            <br>

            <button
                id="saveManageLastItems"
                style="background:#3498db;color:white;"
            >
                💾 حفظ التغييرات
            </button>

            <br><br>

            <button
                id="deleteAllLastItems"
                style="background:#e74c3c;color:white;"
            >
                🔥 حذف الكل
            </button>

        </div>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();

        // حفظ التغييرات
        div.querySelector('#saveManageLastItems').onclick = async () => {

            let updatedItems = [];

            const selectedPresets = Array.from(
                div.querySelectorAll('.managePresetCheckbox:checked')
            ).map(cb => cb.value);

            localStorage.setItem(
                'lastPresets',
                JSON.stringify(selectedPresets)
            );

            savePresetsToGoogle(selectedPresets);


            selectedPresets.forEach(preset => {

                if (predefinedLastItems[preset]) {

                    updatedItems.push(
                        ...predefinedLastItems[preset]
                    );

                }

            });

            updatedItems = [...new Set(updatedItems)];

            localStorage.setItem(
                'lastItems',
                JSON.stringify(updatedItems)
            );

            div.remove();

            createWarningPopup(
                '✅ تم حفظ التغييرات بنجاح.'
            );
        };

        // حذف الكل
        div.querySelector('#deleteAllLastItems').onclick = async () => {

            if (!confirm(
                'هل أنت متأكد من حذف جميع Last Items؟'
            )) {
                return;
            }

            localStorage.removeItem('lastItems');
            localStorage.removeItem('lastPresets');

            await savePresetsToGoogle([]);

            div.remove();

            createWarningPopup(
                '✅ تم حذف جميع العناصر.'
            );
        };
    }

    //////////////////////////// إضافة ////////////////////////////
    // ==================== استبدل بداية addLastItems بالكامل ====================


    //////////////////////////// تحذير ////////////////////////////
    function createWarningPopup(message) {
        const div = document.createElement('div');

        div.innerHTML = popupTemplate('⚠️ تنبيه', `
        <div style="font-size:18px; font-weight:bold; color:#333;">
            ${message}
        </div>

        <br>

        <button id="okBtn" style="background:#3498db; color:white;">
            حسناً
        </button>
    `);

        document.body.appendChild(div);

        div.querySelector('#popupClose').onclick = () => div.remove();
        div.querySelector('#okBtn').onclick = () => div.remove();
    }

    //////////////////////////// كتابة الملاحظات ////////////////////////////
    async function setNote(field, text) {
        const setter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            'value'
        ).set;

        setter.call(
            field,
            field.value + (field.value ? '\n' : '') + text
        );

        field.dispatchEvent(
            new Event('input', { bubbles: true })
        );
    }


    function autoResetLastItemsAt4AM() {
        const now = new Date();
        const currentHour = now.getHours();
        const today = now.toLocaleDateString();

        const lastResetDate = localStorage.getItem('lastResetDate');

        // بعد الساعة 4 صباحًا مرة واحدة يوميًا
        if (currentHour >= 4 && lastResetDate !== today) {
            localStorage.removeItem('lastItems');
            localStorage.setItem('lastResetDate', today);
        }


    }

    // تشغيل مباشر عند فتح الصفحة
    autoResetLastItemsAt4AM();

    // فحص كل دقيقة
    setInterval(autoResetLastItemsAt4AM, 60000);

    setInterval(async () => {

        const presets =
            await loadPresetsFromGoogle();

        localStorage.setItem(
            'lastPresets',
            JSON.stringify(presets)
        );

    }, 5000);



    //////////////////////////// تشغيل ////////////////////////////
    const observer = new MutationObserver(() => {
        createVodafoneCashButton();
        createLastItemsButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


})();
