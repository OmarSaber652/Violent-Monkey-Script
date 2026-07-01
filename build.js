const fs = require("fs");

const SOURCE_FILE = "MetaBusinessNotifier.source.user.js";
const OUTPUT_FILE = "MetaBusinessNotifier.user.js";
const SOUND_FILE = "notification.ogg";

// اقرأ السكريبت
let script = fs.readFileSync(SOURCE_FILE, "utf8");

// اقرأ الصوت
const sound = fs.readFileSync(SOUND_FILE);

// حوله لـ Base64
const soundBase64 =
    "data:audio/ogg;base64," +
    sound.toString("base64");

// حقن الصوت
script = script.replace(
    "__SOUND_BASE64__",
    soundBase64
);

// زيادة رقم الـ Version تلقائياً
script = script.replace(
    /@version\s+(\d+)\.(\d+)/,
    (match, major, minor) => {
        return `@version      ${major}.${Number(minor) + 1}`;
    }
);

// حفظ الملف النهائي
fs.writeFileSync(OUTPUT_FILE, script);

console.log("");
console.log("========================================");
console.log(" Meta Business Notifier Build");
console.log("========================================");
console.log("✔ Source Loaded");
console.log("✔ Sound Injected");
console.log("✔ Version Updated");
console.log("✔ Output Created");
console.log("");
console.log("Output:");
console.log("MetaBusinessNotifier.user.js");
console.log("");
console.log("Ready for Git Push 🚀");
console.log("========================================");