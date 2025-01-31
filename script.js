let chapterData = [];
let currentLine = 0;
const maxLines = 20; // 最大表示行数を20に変更
const textContainer = document.getElementById('text-container');

// 章選択メニューの開閉
document.getElementById('menu-button').addEventListener('click', function() {
    let menu = document.getElementById('chapter-menu');
    menu.style.left = (menu.style.left === "0px") ? "-250px" : "0px";
});

// 章の読み込み
function loadChapter(chapterFile) {
    fetch(`text/${chapterFile}`)
    .then(response => response.text())
    .then(text => {
        chapterData = text.split("\n").filter(line => line.trim() !== ""); // 空行を削除
        currentLine = 0;
        textContainer.innerHTML = ""; // 初期化
        nextLine(); // 最初のセリフを表示
    })
    .catch(error => {
        console.error('テキストの読み込みに失敗しました:', error);
    });
}

// 1文字ずつ表示するアニメーション
function typeText(element, text, callback) {
    let index = 0;
    element.textContent = ""; // 初期化

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, 50); // 50ms間隔で次の文字を表示
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// クリックで次のセリフを追加
document.body.addEventListener('click', function() {
    nextLine();
});

function nextLine() {
    while (currentLine < chapterData.length && chapterData[currentLine].trim() === "") {
        currentLine++; // 空白行をスキップ
    }

    if (currentLine < chapterData.length) {
        if (textContainer.children.length >= maxLines) {
            textContainer.innerHTML = ""; // 20行超えたらリセット
        }

        let newLine = document.createElement("p");
        newLine.className = "text-line";
