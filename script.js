<<<<<<< HEAD
const imageInput = document.getElementById('imageInput');
const resultText = document.getElementById('resultText');
const loader = document.getElementById('loader');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  if (!file) return;

  resultText.value = '';
  loader.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = async function () {
    const imageData = reader.result;
    const result = await Tesseract.recognize(imageData, 'eng', {
      logger: m => console.log(m)
    });
    resultText.value = result.data.text.trim();
    loader.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});

copyBtn.addEventListener('click', () => {
  resultText.select();
  document.execCommand('copy');
  alert('Text copied to clipboard!');
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([resultText.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'recognized_text.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
});
=======
const imageInput = document.getElementById('imageInput');
const resultText = document.getElementById('resultText');
const loader = document.getElementById('loader');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');


const langSelect = document.getElementById('langSelect');//增加多语言

imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  if (!file) return;

  resultText.value = '';
  loader.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = async function () {
    const imageData = reader.result;
    const result = await Tesseract.recognize(imageData, 'eng', {
      logger: m => console.log(m)
    });
    resultText.value = result.data.text.trim();
    loader.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});

copyBtn.addEventListener('click', () => {
  resultText.select();
  document.execCommand('copy');
  alert('Text copied to clipboard!');
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([resultText.value], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'recognized_text.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
});




imageInput.addEventListener('change', async () => {
  const file = imageInput.files[0];
  if (!file) return;

  resultText.value = '';
  loader.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = async () => {
    const imageData = reader.result;
    const lang = langSelect.value;  // 读取用户选择
    const worker = Tesseract.createWorker({
      // 如果你用本地 tessdata 目录，设定路径：
      // langPath: './tessdata',
      // 或者指向 CDN:
      langPath: './tessdata'     //'https://your-cdn.com/tessdata',
      cachePath: './tessdata'   //'https://your-cdn.com/tessdata',
      gzip: false
    });
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const { data: { text } } = await worker.recognize(imageData);
    resultText.value = text.trim();
    await worker.terminate();
    loader.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});

>>>>>>> 26a6730f2e23d1b084cd1691cf178be71bc3df70
