/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (() => {

eval("\r\n\r\n/* global MediaRecorder, Blob, URL */\r\n\r\n/**\r\n * Get DOM element\r\n */\r\n// <video> element\r\nlet inputVideo = document.querySelector('#inputVideo')\r\nlet outputVideo = document.querySelector('#outputVideo')\r\n\r\n// <button> element\r\nlet startBtn = document.querySelector('#startBtn')\r\nlet stopBtn = document.querySelector('#stopBtn')\r\nlet resetBtn = document.querySelector('#resetBtn')\r\n\r\n// error message\r\nlet errorElement = document.querySelector('#errorMsg')\r\n\r\n// is-recording icon\r\nlet isRecordingIcon = document.querySelector('.is-recording')\r\n\r\n/**\r\n * Global variables\r\n */\r\nlet chunks = [] // 在 mediaRecord 要用的 chunks\r\n\r\n// 在 getUserMedia 使用的 constraints 變數\r\nlet constraints = {\r\n  audio: true,\r\n  video: true\r\n}\r\n\r\n// 第一次啟動攝影機\r\nmediaRecorderSetup()\r\n\r\n/**\r\n * MediaRecorder Related Event Handler\r\n */\r\nlet mediaRecorder = null\r\nlet inputVideoURL = null\r\nlet outputVideoURL = null\r\n\r\nstartBtn.addEventListener('click', onStartRecording)\r\nstopBtn.addEventListener('click', onStopRecording)\r\nresetBtn.addEventListener('click', onReset)\r\n\r\n/**\r\n * MediaRecorder Methods\r\n */\r\n// Start Recording: mediaRecorder.start()\r\nfunction onStartRecording(e) {\r\n  e.preventDefault()\r\n  e.stopPropagation()\r\n  isRecordingBtn('stop')\r\n  mediaRecorder.start()\r\n  console.log('mediaRecorder.start()')\r\n}\r\n\r\n// Stop Recording: mediaRecorder.stop()\r\nfunction onStopRecording(e) {\r\n  e.preventDefault()\r\n  e.stopPropagation()\r\n  isRecordingBtn('reset')\r\n  mediaRecorder.stop()\r\n  console.log('mediaRecorder.stop()')\r\n}\r\n\r\n// Reset Recording\r\nfunction onReset(e) {\r\n  e.preventDefault()\r\n  e.stopPropagation()\r\n\r\n  // 釋放記憶體\r\n  URL.revokeObjectURL(inputVideoURL)\r\n  URL.revokeObjectURL(outputVideoURL)\r\n  outputVideo.src = ''\r\n  outputVideo.controls = false\r\n  inputVideo.src = ''\r\n\r\n  // 重新啟動攝影機\r\n  mediaRecorderSetup()\r\n}\r\n\r\n/**\r\n * Setup MediaRecorder\r\n **/\r\n\r\nfunction mediaRecorderSetup() {\r\n  // 設定顯示的按鍵\r\n  isRecordingBtn('start')\r\n\r\n  // mediaDevices.getUserMedia() 取得使用者媒體影音檔\r\n  navigator.mediaDevices\r\n    .getUserMedia(constraints)\r\n    .then(function (stream) {\r\n      /**\r\n       * inputVideo Element\r\n       * 將串流的 inputVideo 設定到 <video> 上\r\n       **/\r\n      // Older browsers may not have srcObject\r\n      if ('srcObject' in inputVideo) {\r\n        inputVideo.srcObject = stream\r\n      } else {\r\n        // Avoid using this in new browsers, as it is going away.\r\n        inputVideo.src = window.URL.createObjectURL(stream)\r\n      }\r\n      inputVideo.controls = false\r\n\r\n      /**\r\n       * 透過 MediaRecorder 錄製影音串流\r\n       */\r\n      // 建立 MediaRecorder 準備錄影\r\n      // 如果沒有指定 mimeType，錄下來的 webm 影片在 Firefox 上可能不能看（Firefox 也不支援 h264)\r\n      mediaRecorder = new MediaRecorder(stream, {\r\n        mimeType: 'video/webm;codecs=VP9',\r\n        // bitsPerSecond: '512000',\r\n      })\r\n\r\n      /* MediaRecorder EventHandler */\r\n      mediaRecorder.addEventListener(\r\n        'dataavailable',\r\n        mediaRecorderOnDataAvailable\r\n      ) // 有資料傳入時觸發\r\n      mediaRecorder.addEventListener('stop', mediaRecorderOnStop) // 停止錄影時觸發\r\n\r\n      function mediaRecorderOnDataAvailable(e) {\r\n        console.log('mediaRecorder on dataavailable', e.data)\r\n        chunks.push(e.data)\r\n      }\r\n\r\n      function mediaRecorderOnStop(e) {\r\n        console.log('mediaRecorder on stop')\r\n        outputVideo.controls = true\r\n        var blob = new Blob(chunks, { type: 'video/webm' })\r\n        chunks = []\r\n        outputVideoURL = URL.createObjectURL(blob)\r\n        outputVideo.src = outputVideoURL\r\n\r\n        // saveData(outputVideoURL)\r\n\r\n        console.log(outputVideoURL);\r\n\r\n        var formData = new FormData();\r\n        formData.append('MyFile', 'test.webm');\r\n        formData.append(\"fileUpload\", blob);\r\n        formData.append(\"chunkIndex\", chunks);\r\n        // formData.append(\"totalSize\", totalSize);\r\n        // fetch post\r\n        fetch('http://localhost:3000/upload', {\r\n          method: 'POST',\r\n          body: fd,\r\n          headers: { 'Content-Type': 'multipart/form-data' },\r\n        })\r\n          .then((res) => res.json())\r\n          .then((data) => {\r\n            console.log(data)\r\n          })\r\n\r\n\r\n\r\n        // 停止所有的輸入或輸出的串流裝置（例如，關攝影機）\r\n        stream.getTracks().forEach(function (track) {\r\n          track.stop()\r\n        })\r\n      }\r\n    })\r\n    .catch(function (error) {\r\n      if (error.name === 'ConstraintNotSatisfiedError') {\r\n        errorMsg(\r\n          'The resolution ' +\r\n          constraints.video.width.exact +\r\n          'x' +\r\n          constraints.video.width.exact +\r\n          ' px is not supported by your device.'\r\n        )\r\n      } else if (error.name === 'PermissionDeniedError') {\r\n        errorMsg('Permissions have not been granted to use your media devices')\r\n      }\r\n      errorMsg('getUserMedia error: ' + error.name, error)\r\n    })\r\n}\r\n\r\n/**\r\n * DOM EventListener\r\n */\r\ninputVideo.addEventListener('loadedmetadata', function () {\r\n  inputVideo.play()\r\n  console.log('inputVideo on loadedmetadata')\r\n})\r\n\r\n/**\r\n * Other Function\r\n */\r\nfunction errorMsg(msg, error) {\r\n  console.log('errorElement', errorElement)\r\n  errorElement.classList.add('alert', 'alert-warning')\r\n  errorElement.innerHTML += msg\r\n  if (typeof error !== 'undefined') {\r\n    console.error(error)\r\n  }\r\n}\r\n\r\nfunction saveData(dataURL) {\r\n  var fileName = 'my-download-' + Date.now() + '.webm'\r\n  var a = document.createElement('a')\r\n  document.body.appendChild(a)\r\n  a.style = 'display: none'\r\n  a.href = dataURL\r\n  a.download = fileName\r\n  a.click()\r\n}\r\n\r\nfunction isRecordingBtn(recordBtnState) {\r\n  startBtn.style.display = 'none'\r\n  stopBtn.style.display = 'none'\r\n  resetBtn.style.display = 'none'\r\n  isRecordingIcon.style.display = 'none'\r\n  switch (recordBtnState) {\r\n    case 'start':\r\n      startBtn.style.display = 'block' // show startBtn\r\n      break\r\n    case 'stop':\r\n      stopBtn.style.display = 'block' // show stopBtn\r\n      isRecordingIcon.style.display = 'block'\r\n      break\r\n    case 'reset':\r\n      resetBtn.style.display = 'block' // show resetBtn\r\n      break\r\n    default:\r\n      console.warn('isRecordingBtn error')\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://shoppingcartapis/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/main.js"]();
/******/ 	
/******/ })()
;