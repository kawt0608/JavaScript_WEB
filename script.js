// DOMContentLoadedイベントでスクリプトが実行されるようにする
document.addEventListener('DOMContentLoaded', () => {
    console.log("ページがロードされました。");

    // Promiseを返すシンプルな関数 (API呼び出しをシミュレート)
    function simulateApiCall(duration) {
        return new Promise(resolve => {
            setTimeout(() => {
                const randomValue = Math.floor(Math.random() * 100);
                resolve(`APIから${duration / 1000}秒後にデータが返されました: ${randomValue}`);
            }, duration);
        });
    }

    // async/awaitを使用した非同期処理の例 (ページロード時に実行)
    async function runAsyncDemo() {
        try {
            console.log("非同期デモを開始します...");
            const result1 = await simulateApiCall(1500); // 1.5秒待機
            console.log(result1);

            const result2 = await simulateApiCall(1000); // 1秒待機
            console.log(result2);

            console.log("非同期デモが完了しました。");
        } catch (error) {
            console.error("非同期デモ中にエラーが発生しました:", error);
        }
    }

    runAsyncDemo(); // ページロード時にデモを実行

    // インタラクティブな非同期データ取得デモ
    const fetchDataButton = document.getElementById('fetchDataButton');
    const dataOutput = document.getElementById('dataOutput');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    fetchDataButton.addEventListener('click', async () => {
        dataOutput.textContent = 'データを取得中...';
        buttonText.textContent = '取得中...';
        loadingSpinner.classList.remove('hidden');
        fetchDataButton.disabled = true; // ボタンを無効化

        try {
            const data = await simulateApiCall(2500); // 2.5秒待機
            dataOutput.textContent = data;
        } catch (error) {
            dataOutput.textContent = `エラーが発生しました: ${error.message}`;
            console.error("インタラクティブデモ中にエラー:", error);
        } finally {
            buttonText.textContent = 'データ取得を開始';
            loadingSpinner.classList.add('hidden');
            fetchDataButton.disabled = false; // ボタンを有効化
        }
    });

    // DOM操作の基本チュートリアル
    const changeTextButton = document.getElementById('changeTextButton');
    const domTextOutput = document.getElementById('domTextOutput');
    let clickCount = 0;

    changeTextButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount % 2 === 1) {
            domTextOutput.textContent = 'ボタンがクリックされました！テキストが変更されました。';
            domTextOutput.classList.add('bg-blue-50', 'text-blue-700');
            domTextOutput.classList.remove('bg-gray-100', 'text-gray-700');
        } else {
            domTextOutput.textContent = '元のテキストに戻りました。もう一度クリックしてください。';
            domTextOutput.classList.add('bg-gray-100', 'text-gray-700');
            domTextOutput.classList.remove('bg-blue-50', 'text-blue-700');
        }
    });
});
