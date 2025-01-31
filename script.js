let chapterData = [];
let currentPage = 0;
let currentLine = 0;
const linesPerPage = 5; // 1ページに表示する行数

// 章選択メニューの開閉
document.getElementById('menu-button').addEventListener('click', function() {
    let menu = document.getElementById('chapter-menu');
    menu.style.left = (menu.style.left === "0px") ? "-250px" : "0px";
});

// 章の読み込み
function loadChapter(chapterFile) {
    console.log(`Trying to load: text/${chapterFile}`); // デバッグ用ログ

    fetch(`text/${chapterFile}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        console.log("Successfully loaded chapter:", chapterFile); // デバッグ用ログ
        chapterData = text.split("\n").filter(line => line.trim() !== ""); // 空行を削除
        currentPage = 0;
        currentLine = 0;
        displayPage();
    })
    .catch(error => {
        console.error('Failed to load chapter file:', error);
    });
}

// 1セリフずつ表示（画面クリックで進む）
function nextLine() {
    if (currentLine < chapterData.length) {
        document.getElementById('novel-text').innerText = chapterData[currentLine];
        currentLine++;

        if ((currentLine % linesPerPage === 0) || (currentLine === chapterData.length)) {
            currentPage++;
        }
    }
}

// ページを表示
function displayPage() {
    if (chapterData.length > 0) {
        document.getElementById('novel-text').innerText = chapterData.slice(currentPage * linesPerPage, (currentPage + 1) * linesPerPage).join("\n");
    } else {
        document.getElementById('novel-text').innerText = "（この章には本文がありません）";
    }
}

// 初期ロード（デフォルトで第1章を表示）
window.onload = function() {
    loadChapter('chapter1.txt');
};
